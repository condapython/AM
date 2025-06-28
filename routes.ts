import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid contact data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create contact" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(newsletterData);
      res.json({ success: true, subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid email address", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to subscribe to newsletter" });
      }
    }
  });

  // Get all newsletter subscribers (for admin purposes)
  app.get("/api/newsletters", async (req, res) => {
    try {
      const newsletters = await storage.getNewsletterSubscribers();
      res.json(newsletters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch newsletter subscribers" });
    }
  });

  // Chat message handling
  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const chatMessage = await storage.createChatMessage(messageData);
      
      // Get previous messages for context
      const previousMessages = await storage.getChatMessages(messageData.sessionId);
      const conversationLength = previousMessages.length;
      
      // Enhanced AI response system with context awareness
      let response = generateContextualResponse(messageData.message, conversationLength, previousMessages);
      
      // Update the chat message with the response
      await storage.updateChatMessageResponse(chatMessage.id, response);
      
      res.json({ 
        success: true, 
        message: chatMessage.message,
        response: response
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process chat message" });
      }
    }
  });

function generateContextualResponse(message: string, conversationLength: number, previousMessages: any[]): string {
  const lowerMessage = message.toLowerCase();
  
  // Greeting responses
  const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
  if (greetings.some(greeting => lowerMessage.includes(greeting)) && conversationLength <= 1) {
    const greetingResponses = [
      "Hello! Welcome to 0to1 Automation. I'm here to help you discover how our AI-powered solutions can transform your business. What would you like to know?",
      "Hi there! Thanks for reaching out. I'd love to tell you about our automation services that have helped businesses increase efficiency by up to 300%. What's your biggest business challenge right now?",
      "Hey! Great to meet you. We specialize in AI chatbots, email marketing automation, and 3D web development. Which area interests you most?",
    ];
    return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
  }
  
  // Service-specific responses with variations
  if (lowerMessage.includes('chatbot') || lowerMessage.includes('chat bot') || lowerMessage.includes('ai bot')) {
    const chatbotResponses = [
      "Our AI Chatbots are game-changers! They handle 80% of customer inquiries automatically, work 24/7, and can reduce your support costs by 60%. They're trained on your specific business knowledge and integrate seamlessly with your existing systems. Would you like to see a demo?",
      "AI Chatbots are perfect for scaling customer support! Our clients typically see 40% faster response times and 25% higher customer satisfaction. The chatbot learns from every interaction and gets smarter over time. What kind of customer questions do you handle most often?",
      "Smart choice! Our chatbots can handle everything from basic FAQs to complex product recommendations. They're like having a super-efficient team member who never sleeps. Plus, they capture valuable customer data for insights. What's your current customer support setup like?",
    ];
    return chatbotResponses[Math.floor(Math.random() * chatbotResponses.length)];
  }
  
  if (lowerMessage.includes('email') || lowerMessage.includes('marketing')) {
    const emailResponses = [
      "Email Marketing Automation is where the magic happens! We create personalized customer journeys that adapt based on behavior. Our clients see average conversion increases of 65% and revenue boosts of 40%. It's like having a marketing team that works while you sleep. What's your current email strategy?",
      "Email automation is incredibly powerful! We set up triggered sequences, behavioral targeting, and advanced segmentation. One client increased their email revenue by 180% in just 3 months. The system sends the right message to the right person at exactly the right time. How many email subscribers do you currently have?",
      "Perfect timing! Email marketing automation can nurture leads automatically, recover abandoned carts, and re-engage inactive customers. We use AI to optimize send times, subject lines, and content for each individual subscriber. What's your biggest email marketing challenge right now?",
    ];
    return emailResponses[Math.floor(Math.random() * emailResponses.length)];
  }
  
  if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('3d')) {
    const webResponses = [
      "3D Web Development is the future! Our immersive websites increase visitor engagement by 200% and time-on-site by 150%. We create stunning visual experiences with interactive elements that make your brand unforgettable. Think of it as your digital showroom that works 24/7. What kind of business do you have?",
      "Amazing choice! 3D websites aren't just beautiful - they convert better too. Our clients see 85% higher conversion rates compared to traditional sites. We use cutting-edge technology to create smooth, fast-loading experiences that work perfectly on all devices. What's your vision for your website?",
      "3D web development is our specialty! We create websites that feel like interactive experiences rather than static pages. Visitors can explore products in 3D, navigate through immersive environments, and engage with your brand in entirely new ways. It's like bringing your physical space online. What industry are you in?",
    ];
    return webResponses[Math.floor(Math.random() * webResponses.length)];
  }
  
  if (lowerMessage.includes('automation') || lowerMessage.includes('growth')) {
    const automationResponses = [
      "Growth Automation is a total game-changer! We automate everything from lead capture to customer onboarding, social media posting to follow-up sequences. Our clients typically save 15-20 hours per week and see 30% faster business growth. It's like cloning your best employees. What processes take up most of your time?",
      "Business automation is incredible for scaling! We create systems that handle repetitive tasks, qualify leads automatically, and nurture customers through personalized journeys. One client automated 70% of their sales process and doubled their revenue. What's currently eating up most of your daily time?",
      "Smart thinking! Growth automation connects all your business processes into one smooth system. From the moment someone visits your website to becoming a loyal customer - everything happens automatically. We've helped businesses reduce manual work by 80% while growing faster than ever. What's your biggest operational challenge?",
    ];
    return automationResponses[Math.floor(Math.random() * automationResponses.length)];
  }
  
  // Pricing and cost questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    const pricingResponses = [
      "Great question! Our pricing depends on your specific needs and goals. We offer flexible packages starting from basic automation setups to comprehensive digital transformation. Most clients see ROI within 2-3 months. I'd love to understand your requirements better to give you accurate pricing. What's your budget range and main objectives?",
      "Investment varies based on scope, but think of it as hiring a digital team that works 24/7 for a fraction of the cost. Our solutions typically pay for themselves within 90 days through increased efficiency and revenue. Should we schedule a free consultation to discuss your specific needs and create a custom quote?",
      "Pricing is tailored to each business because every automation need is different. We have solutions for startups to enterprise companies. The best part? Most clients save more in operational costs than they spend on our services. Want to hop on a quick call to discuss your specific situation?",
    ];
    return pricingResponses[Math.floor(Math.random() * pricingResponses.length)];
  }
  
  // Timeline questions
  if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('when')) {
    const timelineResponses = [
      "Great question! Timeline depends on complexity, but most projects launch within 2-6 weeks. Simple chatbot implementations can be live in 1-2 weeks, while comprehensive automation systems take 4-8 weeks. We work in phases so you start seeing results quickly. What's your ideal launch timeline?",
      "We move fast! Basic setups can be completed in 1-2 weeks, while full automation systems typically take 3-6 weeks. We prioritize the highest-impact features first so you start seeing ROI immediately. Plus, we provide training and ongoing support. When would you ideally like to get started?",
      "Speed is our strength! Most clients are amazed how quickly we deliver results. Simple projects take 1-2 weeks, complex ones 4-8 weeks. We break everything into phases so you're not waiting months to see benefits. What's driving your timeline requirements?",
    ];
    return timelineResponses[Math.floor(Math.random() * timelineResponses.length)];
  }
  
  // Follow-up and engagement responses
  const hasAskedQuestions = previousMessages.some(msg => 
    msg.response && (msg.response.includes('?') || msg.response.includes('Would you like') || msg.response.includes('What'))
  );
  
  if (conversationLength > 3 && !hasAskedQuestions) {
    const engagementResponses = [
      "I'd love to learn more about your specific situation! Every business is unique, and I want to make sure I'm giving you the most relevant information. What's your biggest business challenge right now that automation could help solve?",
      "You seem interested in our services! To give you the best recommendations, could you tell me a bit about your business? What industry are you in and what are your main goals?",
      "Great conversation! I think our solutions could be perfect for your needs. Would you like to schedule a free 15-minute consultation where we can dive deeper into your specific requirements and show you exactly how we can help?",
    ];
    return engagementResponses[Math.floor(Math.random() * engagementResponses.length)];
  }
  
  // Default responses with personality
  const defaultResponses = [
    "I'm here to help you discover how automation can transform your business! Whether it's AI chatbots, email marketing, 3D websites, or growth automation - we have solutions that deliver real results. What specific challenge are you looking to solve?",
    "Thanks for reaching out! We specialize in helping businesses automate and grow through AI-powered solutions. Our clients typically see significant improvements in efficiency, customer engagement, and revenue. What aspect of your business would you most like to improve?",
    "I'd love to help you explore our automation services! We've helped hundreds of businesses streamline operations, boost sales, and create amazing customer experiences. What's the most time-consuming part of running your business right now?",
    "Great to connect with you! 0to1 Automation creates custom solutions that work while you focus on what matters most. Whether you need better customer support, more effective marketing, or a stunning website - we've got you covered. What's your biggest priority right now?",
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

  // Get chat history for a session
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
