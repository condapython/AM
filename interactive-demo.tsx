import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Send, TrendingUp, ArrowUp } from "lucide-react";
import GlassEffect from "@/components/ui/glass-effect";

export default function InteractiveDemo() {
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: "Hi! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
    {
      type: "user",
      message: "I'm interested in your services",
      timestamp: new Date(),
    },
    {
      type: "bot",
      message:
        "Great! Which service interests you most? AI Chatbots, Email Marketing, or 3D Web Development?",
      timestamp: new Date(),
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        type: "user" as const,
        message: currentMessage,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, newMessage]);
      setCurrentMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          type: "bot" as const,
          message:
            "Thanks for your interest! I'd be happy to provide more details about our services. Would you like to schedule a free consultation?",
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const analyticsData = [
    { label: "Conversion Rate", value: "24.5%", change: "+12%", color: "text-emerald-400" },
    { label: "New Leads", value: "1,247", change: "+28%", color: "text-blue-400" },
    { label: "Revenue Growth", value: "$45.2K", change: "+35%", color: "text-purple-400" },
    { label: "Cost Savings", value: "$12.8K", change: "+18%", color: "text-orange-400" },
  ];

  return (
    <section id="interactive-demo" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Experience Our Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Try our interactive demos to see how our automation solutions can
            transform your business operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Chatbot Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassEffect className="rounded-xl p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Bot className="text-blue-400 mr-3" />
                  AI Chatbot Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="bg-muted/50 rounded-lg p-6 h-80 overflow-y-auto mb-4 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start space-x-3 ${
                        msg.type === "user" ? "justify-end" : ""
                      }`}
                    >
                      {msg.type === "bot" && (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Bot size={16} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 max-w-xs ${
                          msg.type === "bot"
                            ? "bg-blue-600 text-white"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      {msg.type === "user" && (
                        <div className="w-8 h-8 bg-muted rounded-full"></div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-muted border-border focus:border-blue-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </CardContent>
            </GlassEffect>
          </motion.div>

          {/* Growth Analytics Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassEffect className="rounded-xl p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <TrendingUp className="text-emerald-400 mr-3" />
                  Growth Analytics Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {analyticsData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-muted/50 rounded-lg p-4"
                    >
                      <div className={`text-2xl font-bold ${item.color}`}>
                        {item.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className={`text-xs ${item.color} flex items-center`}>
                        <ArrowUp size={12} className="mr-1" />
                        {item.change} this month
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Simplified chart representation */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-3">
                    Revenue Growth
                  </div>
                  <div className="h-32 flex items-end space-x-2">
                    {[40, 60, 80, 100, 85, 95].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className={`w-8 rounded-t ${
                          index < 4
                            ? "bg-gradient-to-t from-blue-500 to-blue-400"
                            : "bg-gradient-to-t from-emerald-500 to-emerald-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full btn-gradient-secondary hover:shadow-lg transition-all"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  View Full Dashboard
                </Button>
              </CardContent>
            </GlassEffect>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
