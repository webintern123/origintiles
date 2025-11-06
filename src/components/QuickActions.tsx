import { useState } from "react";
import { Plus, Calculator, Eye, MapPin, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface QuickActionsProps {
  onNavigate: (page: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Calculator,
      label: "Tile Calculator",
      page: "Tile Calculator",
      color: "bg-[#223b57] hover:bg-[#2a4561]",
    },
    {
      icon: Eye,
      label: "Visualize Room",
      page: "Visualization",
      color: "bg-[#223b57] hover:bg-[#2a4561]",
    },
    {
      icon: MapPin,
      label: "Find Dealer",
      page: "Dealers Locator",
      color: "bg-[#223b57] hover:bg-[#2a4561]",
    },
    {
      icon: Phone,
      label: "Contact",
      action: () => {
        toast.info("Contact us", {
          description: "Call us at +91 9098383833",
        });
      },
      color: "bg-[#223b57] hover:bg-[#2a4561]",
    },
  ];

  return (
    <div 
      className="fixed bottom-24 right-8 z-40"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col gap-3 mb-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  size="icon"
                  className={`${action.color} shadow-lg h-12 w-12 rounded-full transition-colors duration-200`}
                  onClick={() => {
                    if (action.page) {
                      onNavigate(action.page);
                    } else if (action.action) {
                      action.action();
                    }
                    setIsOpen(false);
                  }}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#223b57] hover:bg-[#2a4561] shadow-xl"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.div>
      </Button>
    </div>
  );
}
