import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Mail,
  Box,
  TrendingUp,
  Smartphone,
  Settings,
} from "lucide-react";

const services = [
  {
    id: "chatbot",
    icon: Bot,
    title: "AI Chatbot Development",
    description:
      "Deploy intelligent chatbots that handle customer inquiries 24/7, increasing satisfaction and reducing support costs by up to 60%.",
    features: [
      "Natural Language Processing",
      "Multi-platform Integration",
      "Lead Qualification",
      "24/7 Customer Support",
    ],
    gradient: "from-blue-500 to-cyan-400",
    borderColor: "border-blue-400",
    textColor: "text-blue-400",
    hoverColor: "hover:bg-blue-400",
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Marketing Automation",
    description:
      "Create personalized email sequences that nurture leads and drive conversions with advanced segmentation and behavioral triggers.",
    features: [
      "Behavioral Triggers",
      "Advanced Segmentation",
      "A/B Testing",
      "Performance Analytics",
    ],
    gradient: "from-purple-500 to-pink-400",
    borderColor: "border-purple-400",
    textColor: "text-purple-400",
    hoverColor: "hover:bg-purple-400",
  },
  {
    id: "3d-web",
    icon: Box,
    title: "3D Website Development",
    description:
      "Stand out with immersive 3D websites that captivate visitors and showcase your products in unprecedented detail.",
    features: [
      "Interactive 3D Models",
      "WebGL Optimization",
      "Mobile-First Design",
      "Performance Optimized",
    ],
    gradient: "from-emerald-500 to-blue-400",
    borderColor: "border-emerald-400",
    textColor: "text-emerald-400",
    hoverColor: "hover:bg-emerald-400",
  },
  {
    id: "growth",
    icon: TrendingUp,
    title: "Growth Automation",
    description:
      "Scale your business with automated workflows that optimize your sales funnel and maximize revenue opportunities.",
    features: [
      "Sales Funnel Optimization",
      "Lead Scoring",
      "Conversion Tracking",
      "ROI Analytics",
    ],
    gradient: "from-orange-500 to-red-400",
    borderColor: "border-orange-400",
    textColor: "text-orange-400",
    hoverColor: "hover:bg-orange-400",
  },
  {
    id: "app",
    icon: Smartphone,
    title: "App Development",
    description:
      "Build custom mobile and web applications that automate your business processes and enhance customer engagement.",
    features: [
      "Cross-Platform Development",
      "API Integration",
      "Cloud Deployment",
      "Scalable Architecture",
    ],
    gradient: "from-pink-500 to-purple-400",
    borderColor: "border-pink-400",
    textColor: "text-pink-400",
    hoverColor: "hover:bg-pink-400",
  },
  {
    id: "custom",
    icon: Settings,
    title: "Custom Solutions",
    description:
      "Get tailored automation solutions designed specifically for your unique business requirements and industry challenges.",
    features: [
      "Business Process Analysis",
      "Custom Workflow Design",
      "Integration Services",
      "Ongoing Support",
    ],
    gradient: "from-cyan-500 to-blue-400",
    borderColor: "border-cyan-400",
    textColor: "text-cyan-400",
    hoverColor: "hover:bg-cyan-400",
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-muted/30 parallax-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Our Automation Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered chatbots to complete digital transformation, we
            provide end-to-end automation solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="btn-gradient-primary hover:shadow-xl transition-all text-lg px-8 py-4"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
