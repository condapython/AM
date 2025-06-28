import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import GlassEffect from "@/components/ui/glass-effect";

const blogPosts = [
  {
    id: 1,
    category: "AI & Automation",
    title: "The Future of AI Chatbots in Customer Service",
    excerpt: "Discover how AI chatbots are revolutionizing customer service and what this means for businesses in 2024...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    date: "Dec 15, 2023",
    categoryColor: "text-blue-400",
    hoverColor: "group-hover:text-blue-400",
  },
  {
    id: 2,
    category: "Email Marketing",
    title: "10 Email Automation Workflows That Convert",
    excerpt: "Learn the most effective email automation workflows that turn subscribers into loyal customers...",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    date: "Dec 12, 2023",
    categoryColor: "text-purple-400",
    hoverColor: "group-hover:text-purple-400",
  },
  {
    id: 3,
    category: "Web Development",
    title: "Why 3D Websites Are the Future of Web Design",
    excerpt: "Explore how 3D elements are transforming user experience and why your business needs a 3D website...",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    date: "Dec 10, 2023",
    categoryColor: "text-emerald-400",
    hoverColor: "group-hover:text-emerald-400",
  },
];

export default function Blog() {
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
    <section id="blog" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Automation Insights
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay ahead of the curve with our latest insights on automation
            trends, best practices, and industry developments.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <GlassEffect className="rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className={`text-sm ${post.categoryColor} mb-2`}>
                    {post.category}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-3 ${post.hoverColor} transition-colors`}
                  >
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div
                      className={`${post.categoryColor} hover:${post.categoryColor.replace(
                        "text-",
                        "text-"
                      )} transition-colors flex items-center text-sm`}
                    >
                      Read More <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </div>
              </GlassEffect>
            </motion.article>
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
            variant="outline"
            size="lg"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white text-lg px-8 py-4"
          >
            View All Articles
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
