import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, User, Clock, CheckCheck, Phone, Video, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  agentName?: string;
}

interface LiveChatRealtimeProps {
  agentName?: string;
  agentTitle?: string;
  responseTime?: string;
}

export function LiveChatRealtime({ 
  agentName = "Sarah Miller",
  agentTitle = "Senior Tile Specialist",
  responseTime = "Usually replies instantly"
}: LiveChatRealtimeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentOnline, setAgentOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastSeen, setLastSeen] = useState<Date>(new Date());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatInitializedRef = useRef(false);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('originTilesChatHistory');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('originTilesChatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Send welcome message when chat opens for the first time
  useEffect(() => {
    if (isOpen && !chatInitializedRef.current && messages.length === 0) {
      chatInitializedRef.current = true;
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: `Hello! 👋 Welcome to Origin Tiles. I'm ${agentName}, and I'm here to help you find the perfect tiles for your space. How can I assist you today?`,
          sender: 'agent',
          timestamp: new Date(),
          status: 'read',
          agentName
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen, messages.length, agentName]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Simulate agent online/offline status
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentOnline(Math.random() > 0.1); // 90% uptime
      setLastSeen(new Date());
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate realistic typing indicator
  const simulateAgentTyping = (duration: number = 2000) => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve(true);
      }, duration);
    });
  };

  // Update message status realistically
  const updateMessageStatus = (messageId: string, status: Message['status']) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    ));
  };

  // Get intelligent auto-response with context awareness
  const getIntelligentResponse = (userMessage: string, conversationHistory: Message[]): string => {
    const message = userMessage.toLowerCase();
    
    // Context-aware responses based on conversation
    const userMessageCount = conversationHistory.filter(m => m.sender === 'user').length;
    
    // Pricing related
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('budget')) {
      return "I'd be happy to help with pricing! Our tile prices vary based on the collection, size, quantity, and finish. For an accurate quote tailored to your project:\n\n📋 I can connect you with our sales team for a detailed quote\n📧 Email: sales@origintiles.com\n📞 Call: +91 9098383833\n\nWhat type of tiles are you interested in? I can give you a general price range.";
    }
    
    // Sample requests
    if (message.includes('sample')) {
      return "Excellent! Getting physical samples is a great way to see the quality and feel of our tiles. 📦\n\n✨ We offer FREE samples delivered to your doorstep!\n\nYou can request samples through:\n1️⃣ Our Sample Request page\n2️⃣ Or I can help you right now!\n\nWhich collection interests you? (Vitrified, Ceramic, Porcelain, Digital, Elevation, or Designer)";
    }
    
    // Collections and products
    if (message.includes('collection') || message.includes('product') || message.includes('catalog') || message.includes('types')) {
      return "We have 6 premium tile collections, each with unique characteristics:\n\n🔷 **Vitrified** - High durability, low porosity\n🔶 **Ceramic** - Classic, versatile, affordable\n⬛ **Porcelain** - Premium, water-resistant\n🎨 **Digital** - High-definition prints\n🏢 **Elevation** - Exterior facades\n✨ **Designer** - Luxury statement pieces\n\nWhat type of space are you tiling? (Kitchen, Bathroom, Living room, Outdoor, etc.)";
    }
    
    // Dealer/Store location
    if (message.includes('dealer') || message.includes('showroom') || message.includes('store') || message.includes('location') || message.includes('near me')) {
      return "You can find our authorized dealers and showrooms using our Dealers Locator! 📍\n\n🌍 We have 500+ dealers across India and international locations\n🏪 All dealers carry our complete range\n👨‍💼 Expert consultants available\n\nWhich city are you located in? I can help you find the nearest dealer.";
    }
    
    // Installation
    if (message.includes('installation') || message.includes('install') || message.includes('laying') || message.includes('contractor')) {
      return "Professional installation ensures your tiles look perfect and last longer! 🛠️\n\n📚 We provide:\n✅ Detailed installation guidelines\n✅ Video tutorials\n✅ Certified installer network\n✅ Technical support\n\nWould you like me to:\n1. Send you our installation guide?\n2. Connect you with certified installers in your area?";
    }
    
    // Warranty
    if (message.includes('warranty') || message.includes('guarantee')) {
      return "All Origin Tiles come with comprehensive warranty coverage! 🛡️\n\n✅ Manufacturing defects covered\n✅ Quality assurance guarantee\n✅ Terms vary by product line\n\nOur Warranty page has complete details, or I can email you the warranty documentation. What product are you interested in?";
    }
    
    // Calculator
    if (message.includes('calculator') || message.includes('how many') || message.includes('quantity') || message.includes('square')) {
      return "Our Tile Calculator makes it super easy to calculate exactly what you need! 🧮\n\n✨ Features:\n📏 Enter room dimensions\n📊 Automatic wastage calculation\n💰 Instant quantity estimate\n📦 Box/carton calculation\n\nJust input your:\n- Room length\n- Room width\n- Tile size\n\nWould you like me to guide you to the calculator?";
    }
    
    // Visualization
    if (message.includes('visualize') || message.includes('3d') || message.includes('vr') || message.includes('see') || message.includes('look')) {
      return "Our 3D VR Room Visualizer is amazing! 🎨✨\n\nYou can:\n👁️ See tiles in realistic room settings\n🔄 Try different combinations\n📱 Works on desktop & mobile\n🎯 Make confident decisions\n\nIt's like having a showroom in your pocket! Want to explore it? I can guide you there.";
    }
    
    // Technical specs
    if (message.includes('specification') || message.includes('technical') || message.includes('size') || message.includes('thickness')) {
      return "I'd be happy to share technical specifications! 📋\n\nOur tiles come in various:\n📐 Sizes: 200x200mm to 1200x1800mm\n📏 Thickness: 8mm to 12mm\n💧 Water absorption varies by type\n⚡ PEI ratings for wear resistance\n\nWhich collection are you interested in? I can provide detailed specs for specific products.";
    }
    
    // Maintenance and cleaning
    if (message.includes('clean') || message.includes('maintenance') || message.includes('care') || message.includes('maintain')) {
      return "Proper care keeps your tiles looking beautiful for years! ✨\n\n🧼 General care:\n✅ Regular sweeping/vacuuming\n✅ Mild detergent cleaning\n✅ Avoid harsh chemicals\n✅ Immediate spill cleanup\n\nWe have detailed maintenance guides for each tile type. Which collection do you have or are planning to buy?";
    }
    
    // Delivery and shipping
    if (message.includes('delivery') || message.includes('shipping') || message.includes('transport')) {
      return "We ensure safe and timely delivery of your tiles! 🚚\n\n📦 Delivery details:\n✅ Pan-India delivery available\n✅ Secure packaging\n✅ Insurance coverage\n✅ Delivery time: 7-14 days typically\n\nDelivery charges vary by location and quantity. Would you like to know the delivery time for your area?";
    }
    
    // Color and design
    if (message.includes('color') || message.includes('design') || message.includes('pattern') || message.includes('style')) {
      return "We have an incredible range of colors and designs! 🎨\n\n✨ Popular styles:\n🤍 Marble look\n🪵 Wood grain\n⬛ Solid colors\n🎭 Geometric patterns\n🌿 Natural stone look\n\nWhat's your interior style? (Modern, Traditional, Minimalist, Industrial, etc.) I can suggest perfect matches!";
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return userMessageCount > 2 
        ? "Hello again! How else can I help you today? 😊"
        : "Hi there! Great to chat with you. What would you like to know about our tiles?";
    }
    
    // Thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! 😊 Is there anything else you'd like to know about our tiles or services? I'm here to help!";
    }
    
    // Default intelligent response
    const topics = [
      "🏠 Tile collections and products",
      "💰 Pricing and quotes", 
      "📦 Free samples",
      "📍 Dealer locations",
      "🛠️ Installation guidance",
      "🧮 Tile calculator",
      "🎨 3D visualizer",
      "🛡️ Warranty information"
    ];
    
    return `I'm here to help! I can assist you with:\n\n${topics.join('\n')}\n\nWhat specific information are you looking for? Feel free to ask me anything! 😊`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate message status progression
    setTimeout(() => updateMessageStatus(newMessage.id, 'sent'), 300);
    setTimeout(() => updateMessageStatus(newMessage.id, 'delivered'), 800);
    setTimeout(() => updateMessageStatus(newMessage.id, 'read'), 1200);

    // Calculate typing duration based on response length
    const responseText = getIntelligentResponse(inputValue, messages);
    const typingDuration = Math.min(Math.max(responseText.length * 20, 1500), 4000);

    // Simulate realistic agent typing
    await simulateAgentTyping(typingDuration);
    
    // Agent response
    const agentResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'agent',
      timestamp: new Date(),
      status: 'read',
      agentName
    };
    
    setMessages(prev => [...prev, agentResponse]);
    
    // Play notification sound (optional)
    playNotificationSound();
    
    // Update unread count if chat is minimized or closed
    if (isMinimized || !isOpen) {
      setUnreadCount(prev => prev + 1);
      toast('New message from ' + agentName, {
        description: agentResponse.text.substring(0, 100) + '...',
      });
    }
  };

  const playNotificationSound = () => {
    // Simple beep sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio not supported or blocked
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setUnreadCount(0);
    }
  };

  const clearChat = () => {
    if (confirm('Clear all chat history?')) {
      setMessages([]);
      localStorage.removeItem('originTilesChatHistory');
      chatInitializedRef.current = false;
      toast.success('Chat history cleared');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Active now';
    if (minutes < 60) return `Active ${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Active ${hours}h ago`;
    return 'Active recently';
  };

  // Quick reply suggestions with context
  const getQuickReplies = () => {
    if (messages.length <= 1) {
      return [
        "Request a Sample 📦",
        "View Collections 🎨",
        "Find Dealer 📍",
        "Get Quote 💰"
      ];
    }
    return [
      "Calculate tiles needed 🧮",
      "See 3D visualizer 👁️",
      "Installation guide 🛠️",
      "Warranty info 🛡️"
    ];
  };

  return (
    <>
      {/* Chat Widget Button - Positioned on RIGHT */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-28 z-40 group"
            aria-label="Open live chat"
          >
            {/* Glassmorphism Button */}
            <div className="relative p-4 rounded-full bg-[#223b57] text-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <MessageCircle className="w-6 h-6" />
              
              {/* Unread Badge */}
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
              
              {/* Online Status Indicator */}
              {agentOnline && (
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
              )}
              
              {/* Pulse Animation */}
              <span className="absolute inset-0 rounded-full bg-[#223b57] opacity-75 animate-ping" />
            </div>

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
              💬 Chat with {agentName}
              <span className="block text-xs text-gray-300 mt-0.5">
                {agentOnline ? '🟢 Online now' : '🟡 Away'}
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Positioned on RIGHT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-28 z-50 w-[400px] max-w-[calc(100vw-3rem)]"
          >
            {/* Glassmorphism Chat Container */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#223b57] to-[#2a4561] text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                        <User className="w-6 h-6" />
                      </div>
                      {agentOnline ? (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                      ) : (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[15px]">{agentName}</p>
                      <p className="text-xs text-white/90">{agentTitle}</p>
                      <p className="text-[10px] text-white/70 mt-0.5">
                        {agentOnline ? '🟢 Online' : formatLastSeen(lastSeen)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toast.info('Voice call feature coming soon!')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Start voice call"
                      title="Voice call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toast.info('Video call feature coming soon!')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Start video call"
                      title="Video call"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                    <button
                      onClick={toggleMinimize}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                    >
                      <Minimize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={toggleChat}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Response Time */}
                {!isMinimized && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-white/90">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{responseTime}</span>
                  </div>
                )}
              </div>

              {/* Messages Area */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 450 }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="h-[450px] overflow-y-auto p-4 space-y-4 bg-[#F5F3F0]">
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                            <div
                              className={`px-4 py-3 rounded-2xl shadow-sm ${
                                message.sender === 'user'
                                  ? 'bg-[#223b57] text-white rounded-br-sm'
                                  : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                            </div>
                            <div className={`flex items-center gap-1.5 mt-1 px-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <span className="text-xs text-gray-500">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.sender === 'user' && message.status && (
                                <span className="text-xs text-gray-500">
                                  {message.status === 'sending' && <Clock className="w-3 h-3" />}
                                  {message.status === 'sent' && <Check className="w-3 h-3" />}
                                  {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                                  {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-200">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-600 mr-2">{agentName} is typing</span>
                              <span className="w-2 h-2 bg-[#223b57] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 bg-[#223b57] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 bg-[#223b57] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {messages.length <= 2 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-2 font-medium">Quick actions:</p>
                        <div className="flex flex-wrap gap-2">
                          {getQuickReplies().map((reply) => (
                            <button
                              key={reply}
                              onClick={() => {
                                setInputValue(reply);
                                setTimeout(() => handleSendMessage(), 100);
                              }}
                              className="px-3 py-1.5 text-xs bg-[#F5F3F0] hover:bg-[#223b57] hover:text-white border border-gray-300 rounded-full transition-all duration-200 font-medium"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="flex gap-2 items-end">
                        <div className="flex-1 flex gap-2">
                          <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2.5 bg-[#F5F3F0] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#223b57] focus:border-transparent text-sm transition-all"
                          />
                        </div>
                        <button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim()}
                          className="p-2.5 bg-[#223b57] text-white rounded-xl hover:bg-[#2a4561] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                          aria-label="Send message"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[10px] text-gray-500">
                          🔒 Secure & Encrypted
                        </p>
                        {messages.length > 0 && (
                          <button
                            onClick={clearChat}
                            className="text-[10px] text-gray-500 hover:text-red-600 transition-colors"
                          >
                            Clear history
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
