import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 btn-gradient-primary rounded-lg flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold gradient-text">
              0to1 Automation
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: "Services", id: "services" },
              { label: "About", id: "about" },
              { label: "Testimonials", id: "testimonials" },
              { label: "Resources", id: "blog" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleSmoothScroll(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => handleSmoothScroll("interactive-demo")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View Demo
            </Button>
            <Button
              onClick={() => handleSmoothScroll("contact")}
              className="btn-gradient-primary hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { label: "Services", id: "services" },
                { label: "About", id: "about" },
                { label: "Testimonials", id: "testimonials" },
                { label: "Resources", id: "blog" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSmoothScroll(item.id)}
                  className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSmoothScroll("interactive-demo")}
                >
                  View Demo
                </Button>
                <Button
                  className="w-full btn-gradient-primary"
                  onClick={() => handleSmoothScroll("contact")}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
