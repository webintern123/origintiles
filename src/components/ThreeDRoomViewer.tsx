import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Sky, Environment, Html, Box, Plane } from '@react-three/drei';
import { TextureLoader, RepeatWrapping, Vector3, HemisphereLight, DirectionalLight, PointLight } from 'three';
import { Button } from './ui/button';
import { Maximize2, Minimize2, RotateCw, Move, ZoomIn } from 'lucide-react';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface ThreeDRoomViewerProps {
  tileTexture: string;
  roomType: 'living' | 'kitchen' | 'bathroom';
  tileOpacity: number;
  onVRModeToggle?: () => void;
}

// Floor
function Floor({ tileTexture, opacity }: { tileTexture: string; opacity: number }) {
  const ref = useRef<any>(null);
  const texture = useLoader(TextureLoader, tileTexture);

  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(8, 8);
    }
  }, [texture]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -Math.PI / 2 + Math.sin(state.clock.getElapsedTime() / 2) * 0.01;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() / 3) * 0.01;
    }
  });

  return (
    <Plane
      ref={ref}
      args={[20, 20]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      material-map={texture}
      material-transparent
      material-opacity={opacity / 100}
    />
  );
}

// Wall
function Wall({ position, rotation, width, height }: { 
  position: [number, number, number]; 
  rotation: [number, number, number];
  width: number;
  height: number;
}) {
  return <Plane args={[width, height]} position={position} rotation={rotation} receiveShadow />;
}

// Furniture
function Furniture({ roomType }: { roomType: string }) {
  if (roomType === 'living') return (
    <>
      <Box args={[4, 1, 2]} position={[-3, 0.5, -7]} castShadow />
      <Box args={[2, 0.6, 1]} position={[0, 0.3, -5]} castShadow />
    </>
  );
  if (roomType === 'kitchen') return (
    <>
      <Box args={[8, 1.8, 2]} position={[-5, 0.9, -6]} castShadow />
      <Box args={[3, 1.8, 2]} position={[0, 0.9, -2]} castShadow />
    </>
  );
  if (roomType === 'bathroom') return (
    <>
      <Box args={[3, 1.2, 1.5]} position={[-4, 0.6, -7]} castShadow />
      <Box args={[2, 1.6, 1]} position={[4, 0.8, -5]} castShadow />
    </>
  );
  return null;
}

// Lights Component
function RoomLights() {
  const { scene } = useThree();

  useEffect(() => {
    // HemisphereLight as ambient replacement
    const hemiLight = new HemisphereLight(0xffffff, 0x444444, 0.5);
    scene.add(hemiLight);

    // Directional Light
    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Point Light
    const pointLight = new PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Cleanup on unmount
    return () => {
      scene.remove(hemiLight, dirLight, pointLight);
    };
  }, [scene]);

  return null;
}

// Room Scene
function RoomScene({ tileTexture, roomType, opacity }: { tileTexture: string; roomType: string; opacity: number }) {
  return (
    <>
      <RoomLights />

      <Floor tileTexture={tileTexture} opacity={opacity} />

      <Wall position={[0, 5, -10]} rotation={[0, 0, 0]} width={20} height={10} />
      <Wall position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} width={20} height={10} />
      <Wall position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]} width={20} height={10} />

      <Plane args={[20, 20]} position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]} />

      <Furniture roomType={roomType} />

      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="apartment" />
    </>
  );
}

// Camera Controller
function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 3, 8);
    camera.lookAt(new Vector3(0, 2, -5));
  }, [camera]);
  return null;
}

// Loading Fallback
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 bg-white/90 p-6 rounded-2xl shadow-lg">
        <div className="w-12 h-12 border-4 border-[#223B57] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-[#223B57]">Loading 3D Room...</p>
      </div>
    </Html>
  );
}

// Main Viewer
export function ThreeDRoomViewer({ tileTexture, roomType, tileOpacity, onVRModeToggle }: ThreeDRoomViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [controlsEnabled, setControlsEnabled] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetCamera = () => {
    setControlsEnabled(false);
    setTimeout(() => setControlsEnabled(true), 100);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <CameraController />
        <Suspense fallback={<LoadingFallback />}>
          <RoomScene tileTexture={tileTexture} roomType={roomType} opacity={tileOpacity} />
        </Suspense>
        {controlsEnabled && <OrbitControls enablePan enableZoom enableRotate />}
      </Canvas>

      {/* Control Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/40 pointer-events-auto"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-semibold text-[#223B57]">3D Interactive View</p>
          </div>
          <p className="text-xs text-neutral-600">
            {roomType.charAt(0).toUpperCase() + roomType.slice(1)} Room
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2 pointer-events-auto"
        >
          <Button
            size="sm"
            variant="outline"
            onClick={resetCamera}
            className="bg-white/95 backdrop-blur-md hover:bg-white border-white/40 rounded-xl shadow-lg"
            title="Reset Camera"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleFullscreen}
            className="bg-white/95 backdrop-blur-md hover:bg-white border-white/40 rounded-xl shadow-lg"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </motion.div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/40 pointer-events-auto"
      >
        <p className="text-xs text-neutral-600 mb-2 font-medium">Controls:</p>
        <div className="flex flex-col gap-1 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Move className="w-3 h-3" />
            <span>Left Click + Drag to Rotate</span>
          </div>
          <div className="flex items-center gap-2">
            <Move className="w-3 h-3" />
            <span>Right Click + Drag to Pan</span>
          </div>
          <div className="flex items-center gap-2">
            <ZoomIn className="w-3 h-3" />
            <span>Scroll to Zoom</span>
          </div>
        </div>
      </motion.div>

      {/* VR Mode Badge */}
      {onVRModeToggle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-4 right-4 pointer-events-auto"
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-3 py-2 shadow-lg">
            <span className="text-xs">VR Ready</span>
          </Badge>
        </motion.div>
      )}
    </div>
  );
}
