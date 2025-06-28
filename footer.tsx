import { Bot, Linkedin, Github, Mail, Phone, Calendar } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 btn-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold gradient-text">
                0to1 Automation
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transforming businesses through intelligent automation, AI-powered
              solutions, and cutting-edge 3D web experiences.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-600 hover:border-blue-600 transition-colors"
                onClick={() => window.open("https://www.linkedin.com/in/ashutosh-modh-900681279", "_blank")}
              >
                <Linkedin size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-green-500 hover:border-green-500 transition-colors"
                onClick={() => window.open("https://wa.me/14372434197", "_blank")}
              >
                <SiWhatsapp size={18} />
              </Button>
              
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button
                  onClick={() => handleSmoothScroll("services")}
                  className="hover:text-foreground transition-colors"
                >
                  AI Chatbot Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll("services")}
                  className="hover:text-foreground transition-colors"
                >
                  Email Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll("services")}
                  className="hover:text-foreground transition-colors"
                >
                  3D Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll("services")}
                  className="hover:text-foreground transition-colors"
                >
                  Growth Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll("services")}
                  className="hover:text-foreground transition-colors"
                >
                  App Development
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button
                  onClick={() => handleSmoothScroll("about")}
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll("testimonials")}
                  className="hover:text-foreground transition-colors"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll("blog")}
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll("contact")}
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 0to1 Automation. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
