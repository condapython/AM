import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import GlassEffect from "./glass-effect";

interface ChatMessage {
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: "bot",
      message: "Hi! I'm your AI assistant. How can I help you with our automation services today?",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        sessionId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      const botMessage: ChatMessage = {
        type: "bot",
        message: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    },
    onError: () => {
      const errorMessage: ChatMessage = {
        type: "bot",
        message: "Sorry, I'm having trouble connecting right now. Please try again or contact us directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const userMessage: ChatMessage = {
        type: "user",
        message: currentMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      chatMutation.mutate(currentMessage);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-80 h-96 mb-4"
          >
            <GlassEffect className="rounded-xl shadow-2xl h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 btn-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="text-white" size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-sm">AI Assistant</span>
                    <div className="text-xs text-muted-foreground">Online</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start space-x-2 ${
                      msg.type === "user" ? "justify-end" : ""
                    }`}
                  >
                    {msg.type === "bot" && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 max-w-xs text-sm ${
                        msg.type === "bot"
                          ? "bg-blue-600 text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                    {msg.type === "user" && (
                      <div className="w-6 h-6 bg-muted rounded-full flex-shrink-0"></div>
                    )}
                  </motion.div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="bg-blue-600 text-white rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-muted border-border text-sm"
                    disabled={chatMutation.isPending}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || chatMutation.isPending}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send size={14} />
                  </Button>
                </div>
              </div>
            </GlassEffect>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 btn-gradient-primary rounded-full flex items-center justify-center shadow-lg chatbot-pulse"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="text-white" size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="text-white" size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
