import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Rocket, TrendingUp } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Brain,
      title: "AI-First Approach",
      description:
        "Every solution is powered by advanced AI algorithms that learn and adapt to your business needs.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: Rocket,
      title: "Rapid Implementation",
      description:
        "Get up and running in weeks, not months, with our streamlined deployment process.",
      gradient: "from-emerald-500 to-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description:
        "Track ROI with detailed analytics and reporting that shows exactly how automation impacts your bottom line.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern automation technology workspace"
                className="relative rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Why Choose 0to1 Automation?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We don't just build automation – we engineer transformation. Our
              team combines cutting-edge AI, stunning 3D experiences, and proven
              growth strategies to take your business from zero to industry
              leader.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center`}
                  >
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8"
            >
              <Button
                size="lg"
                className="btn-gradient-accent hover:shadow-xl transition-all text-lg px-8 py-4"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Learn More About Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
