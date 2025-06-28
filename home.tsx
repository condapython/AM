import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import InteractiveDemo from "@/components/sections/interactive-demo";
import About from "@/components/sections/about";
import Testimonials from "@/components/sections/testimonials";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import ChatbotWidget from "@/components/ui/chatbot-widget";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <InteractiveDemo />
        <About />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
