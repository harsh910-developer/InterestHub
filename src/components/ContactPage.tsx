import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { updatePageSEO } from "../utils/seo";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Users,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Update SEO for Contact page
    updatePageSEO({
      title: "Contact Us - BlogCommunity",
      description:
        "Get in touch with BlogCommunity. Have questions, suggestions, or want to say hello? Our team is here to help!",
      keywords:
        "contact, support, help, questions, feedback, business partnership",
      url: window.location.href,
      type: "website",
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@blogcommunity.com",
      action: "mailto:hello@blogcommunity.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      value: "123 Innovation Drive, San Francisco, CA 94105",
      action: "#",
    },
  ];

  const supportCategories = [
    {
      icon: MessageSquare,
      title: "General Inquiry",
      description: "Questions about our platform",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Help with community features",
    },
    {
      icon: HelpCircle,
      title: "Technical Support",
      description: "Technical issues and bugs",
    },
    {
      icon: Briefcase,
      title: "Business Partnership",
      description: "Collaboration opportunities",
    },
  ];

  const socialLinks = [
    { name: "Twitter", url: "#", color: "bg-blue-500" },
    { name: "LinkedIn", url: "#", color: "bg-blue-700" },
    { name: "Facebook", url: "#", color: "bg-blue-600" },
    { name: "Instagram", url: "#", color: "bg-pink-500" },
    { name: "YouTube", url: "#", color: "bg-red-500" },
    { name: "Discord", url: "#", color: "bg-indigo-500" },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h1 className="text-lg sm:text-xl font-bold text-primary mr-4 sm:mr-6">
              <a href="/">BlogCommunity</a>
            </h1>
            <nav className="hidden lg:flex space-x-2 xl:space-x-4">
              <a
                href="/"
                className="text-xs xl:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                Home
              </a>
              <a
                href="/explore"
                className="text-xs xl:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                Explore
              </a>
              <a
                href="/community"
                className="text-xs xl:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                Community
              </a>
              <a
                href="/about"
                className="text-xs xl:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="text-xs sm:text-sm font-medium hover:text-primary transition-colors px-2 py-1">
              Sign In
            </button>
            <button className="bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-teal-500/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8">
                Have questions, suggestions, or just want to say hello? We'd
                love to hear from you. Our team is here to help!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="text-center hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white">
                      <CardContent className="p-4 sm:p-6">
                        <div className="bg-primary/10 p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">
                          {info.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 text-sm sm:text-base">
                          {info.description}
                        </p>
                        <a
                          href={info.action}
                          className="text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base break-all"
                        >
                          {info.value}
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Send us a Message
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <motion.div
                        className="text-center py-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                          <Send className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-600 mb-2">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-muted-foreground">
                          Thank you for reaching out. We'll get back to you
                          within 24 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Name *
                            </label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Your full name"
                              required
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Email *
                            </label>
                            <Input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your.email@example.com"
                              required
                              className="text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Category
                          </label>
                          <Select
                            value={formData.category}
                            onValueChange={handleSelectChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">
                                General Inquiry
                              </SelectItem>
                              <SelectItem value="community">
                                Community Support
                              </SelectItem>
                              <SelectItem value="technical">
                                Technical Support
                              </SelectItem>
                              <SelectItem value="business">
                                Business Partnership
                              </SelectItem>
                              <SelectItem value="feedback">
                                Feedback & Suggestions
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Subject *
                          </label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Brief description of your inquiry"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Message *
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us more about your inquiry..."
                            rows={6}
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Support Categories & Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Support Categories */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl">How Can We Help?</CardTitle>
                    <p className="text-muted-foreground">
                      Choose the category that best describes your inquiry.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {supportCategories.map((category, index) => {
                      const IconComponent = category.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{category.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl">Connect With Us</CardTitle>
                    <p className="text-muted-foreground">
                      Follow us on social media for updates and community
                      highlights.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          className={`${social.color} text-white p-2 sm:p-3 rounded-lg text-center font-medium hover:opacity-90 transition-opacity text-xs sm:text-sm`}
                        >
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Link */}
                <Card className="bg-gradient-to-br from-primary/10 to-teal-500/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Need Quick Answers?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Check out our FAQ section for common questions and
                      solutions.
                    </p>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Visit FAQ
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Office Hours & Response Time */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <div className="bg-primary/10 p-2 rounded-lg mr-3">
                        <HelpCircle className="w-5 h-5 text-primary" />
                      </div>
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monday - Friday
                      </span>
                      <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">
                        10:00 AM - 4:00 PM PST
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Emergency support available 24/7 for critical issues.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <div className="bg-primary/10 p-2 rounded-lg mr-3">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      Response Times
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        General Inquiries
                      </span>
                      <span className="font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Technical Support
                      </span>
                      <span className="font-medium">Within 4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Business Partnerships
                      </span>
                      <span className="font-medium">Within 48 hours</span>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        We aim to respond faster during business hours.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary to-teal-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Join Our Community?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-8">
                Don't wait to start sharing your stories and connecting with
                fellow writers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 text-sm sm:text-base"
                >
                  <a href="/">Explore Platform</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary text-sm sm:text-base"
                >
                  Sign Up Free
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
