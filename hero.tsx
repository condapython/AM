import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import Floating3DElement from "@/components/ui/floating-3d-element";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 1500);
  };

  const handleWatchDemo = () => {
    const demoSection = document.getElementById("interactive-demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with tech grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>

      {/* Floating 3D elements */}
      <Floating3DElement
        className="absolute top-20 left-10 w-20 h-20"
        type="circle"
        color="from-blue-500 to-cyan-400"
        delay={0}
      />
      <Floating3DElement
        className="absolute top-40 right-20 w-16 h-16"
        type="square"
        color="from-purple-500 to-pink-400"
        delay={-2}
      />
      <Floating3DElement
        className="absolute bottom-32 left-20 w-12 h-12"
        type="circle"
        color="from-emerald-500 to-blue-400"
        delay={-4}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Transform Your Business</span>
            <br />
            <span className="text-foreground text-shadow">From 0 to 1</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Unlock the power of automation with AI Chatbots, Email Marketing, 3D
            Web Development, and Growth Solutions that scale your business
            exponentially.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              onClick={handleGetStarted}
              disabled={isLoading}
              size="lg"
              className="btn-gradient-primary hover:shadow-xl transition-all transform hover:scale-105 text-lg px-8 py-4"
            >
              {isLoading ? (
                <div className="loading-spinner mr-2" />
              ) : (
                <>
                  Start Your Automation Journey
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            <Button
              onClick={handleWatchDemo}
              variant="outline"
              size="lg"
              className="border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary text-lg px-8 py-4"
            >
              <Play className="mr-2" size={18} />
              Watch Demo
            </Button>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
