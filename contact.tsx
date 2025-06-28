import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, Calendar, CheckCircle2 } from "lucide-react";
import GlassEffect from "@/components/ui/glass-effect";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const faqItems = [
    {
      question: "How long does implementation take?",
      answer: "Most projects are completed within 2-8 weeks, depending on complexity and scope.",
      color: "text-blue-400",
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer 24/7 monitoring and support packages to ensure optimal performance.",
      color: "text-purple-400",
    },
    {
      question: "What's the ROI timeframe?",
      answer: "Most clients see positive ROI within 3-6 months of implementation.",
      color: "text-emerald-400",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Ready to Automate Your Success?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's discuss how our automation solutions can transform your
            business. Get a free consultation and custom proposal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassEffect className="rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Get Your Free Consultation</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-muted border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-muted border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-muted border-border focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-muted border-border focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-muted border-border focus:border-primary">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="chatbot">AI Chatbot Development</SelectItem>
                            <SelectItem value="email">Email Marketing Automation</SelectItem>
                            <SelectItem value="3d-web">3D Website Development</SelectItem>
                            <SelectItem value="growth">Growth Automation</SelectItem>
                            <SelectItem value="app">App Development</SelectItem>
                            <SelectItem value="custom">Custom Solutions</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Tell us about your project and automation goals..."
                            className="bg-muted border-border focus:border-primary resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full btn-gradient-accent hover:shadow-xl transition-all text-lg py-4"
                  >
                    {contactMutation.isPending ? (
                      <div className="loading-spinner mr-2" />
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2" size={18} />
                        Get Free Consultation
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </GlassEffect>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <GlassEffect className="rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 btn-gradient-primary rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <p className="text-muted-foreground">dascam099@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 btn-gradient-secondary rounded-lg flex items-center justify-center">
                    <Phone className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-muted-foreground">+1 (437) 243-4197</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 btn-gradient-accent rounded-lg flex items-center justify-center">
                    <Calendar className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Book a Meeting</h4>
                    <p className="text-muted-foreground">Schedule a 30-minute strategy session</p>
                    <Button
                      variant="link"
                      className="text-purple-400 hover:text-purple-300 pl-0 mt-1"
                    >
                      View Available Times →
                    </Button>
                  </div>
                </div>
              </div>
            </GlassEffect>

            {/* FAQ Section */}
            <GlassEffect className="rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className={`font-bold ${item.color} mb-2`}>
                      {item.question}
                    </h4>
                    <p className="text-muted-foreground text-sm">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </GlassEffect>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
