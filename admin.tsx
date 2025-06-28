import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, User, Building, MessageSquare, Calendar, Phone, Users, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import type { Contact } from "@shared/schema";

export default function Admin() {
  const { data: contacts, isLoading, error } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: newsletters } = useQuery<any[]>({
    queryKey: ["/api/newsletters"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <Card className="bg-red-950/50 border-red-800">
          <CardContent className="p-6">
            <p className="text-red-400">Error loading data. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalContacts = contacts?.length || 0;
  const totalNewsletters = Array.isArray(newsletters) ? newsletters.length : 0;
  const recentContacts = contacts?.slice(0, 5) || [];
  
  const thisMonthContacts = contacts?.filter(c => {
    const contactDate = new Date(c.createdAt);
    const now = new Date();
    return contactDate.getMonth() === now.getMonth() && 
           contactDate.getFullYear() === now.getFullYear();
  }).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage contacts and newsletter subscriptions</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
                  <p className="text-3xl font-bold text-purple-400">{totalContacts}</p>
                </div>
                <Users className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Newsletter Subscribers</p>
                  <p className="text-3xl font-bold text-pink-400">{totalNewsletters}</p>
                </div>
                <Mail className="h-8 w-8 text-pink-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold text-blue-400">{thisMonthContacts}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Form Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contacts && contacts.length > 0 ? (
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {contacts.map((contact, index) => (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {contact.firstName} {contact.lastName}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {contact.email}
                                </span>
                                {contact.company && (
                                  <span className="flex items-center gap-1">
                                    <Building className="h-3 w-3" />
                                    {contact.company}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(contact.createdAt), "MMM d, yyyy 'at' h:mm a")}
                            </p>
                            {contact.service && (
                              <Badge variant="secondary" className="mt-1">
                                {contact.service}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {contact.message && (
                          <div className="mt-3 p-3 bg-background/50 rounded border border-border/30">
                            <p className="text-sm font-medium mb-1">Message:</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {contact.message}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
                            className="flex items-center gap-1"
                          >
                            <Mail className="h-3 w-3" />
                            Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`tel:+14372434197`, '_blank')}
                            className="flex items-center gap-1"
                          >
                            <Phone className="h-3 w-3" />
                            Call Back
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No contact submissions yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}