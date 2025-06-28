import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import GlassEffect from "./glass-effect";

interface ServiceCardProps {
  service: {
    id: string;
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    features: string[];
    gradient: string;
    borderColor: string;
    textColor: string;
    hoverColor: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { icon: Icon, title, description, features, gradient, borderColor, textColor, hoverColor } = service;

  const handleLearnMore = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
      transition={{ duration: 0.3 }}
      className="service-card group"
    >
      <GlassEffect className="rounded-xl p-8 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mb-6`}>
          <Icon className="text-2xl text-white" size={24} />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 flex-grow">
          {description}
        </p>
        
        <ul className="text-sm text-muted-foreground mb-6 space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              <Check className="text-green-400 mr-2 flex-shrink-0" size={16} />
              {feature}
            </motion.li>
          ))}
        </ul>
        
        <Button
          onClick={handleLearnMore}
          variant="outline"
          className={`w-full ${borderColor} ${textColor} ${hoverColor} hover:text-white transition-all duration-300`}
        >
          Learn More
        </Button>
      </GlassEffect>
    </motion.div>
  );
}
