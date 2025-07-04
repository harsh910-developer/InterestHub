import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { updatePageSEO } from "../utils/seo";
import { Shield, Eye, Database, Cookie, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const PrivacyPage = () => {
  useEffect(() => {
    updatePageSEO({
      title: "Privacy Policy - BlogCommunity",
      description:
        "Learn how BlogCommunity protects your privacy and handles your personal data.",
      keywords: "privacy, policy, data, protection, GDPR, security",
      url: window.location.href,
      type: "website",
    });
  }, []);

  const privacySections = [
    {
      icon: Database,
      title: "Data We Collect",
      content: [
        "Account information (email, username, profile details)",
        "Content you create (blog posts, comments, interactions)",
        "Usage analytics (page views, time spent, feature usage)",
        "Technical data (IP address, browser type, device information)",
        "Communication records (support tickets, feedback)",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Data",
      content: [
        "Provide and improve our platform services",
        "Personalize your content and recommendations",
        "Communicate important updates and notifications",
        "Analyze usage patterns to enhance user experience",
        "Ensure platform security and prevent abuse",
      ],
    },
    {
      icon: Shield,
      title: "Data Protection",
      content: [
        "All data is encrypted in transit and at rest",
        "Regular security audits and vulnerability assessments",
        "Access controls and authentication for all systems",
        "Automated backups with encryption and secure storage",
        "Incident response procedures for data breaches",
      ],
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to understand user behavior",
        "Preference cookies to remember your settings",
        "No third-party advertising or tracking cookies",
        "You can manage cookie preferences in your browser",
      ],
    },
  ];

  const userRights = [
    {
      icon: Eye,
      title: "Access Your Data",
      description: "Request a copy of all personal data we have about you",
      action: "Request Data Export",
    },
    {
      icon: Download,
      title: "Data Portability",
      description: "Export your content and data in a machine-readable format",
      action: "Export Content",
    },
    {
      icon: Trash2,
      title: "Delete Your Data",
      description:
        "Request complete deletion of your account and all associated data",
      action: "Delete Account",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary mr-6">
              <a href="/">BlogCommunity</a>
            </h1>
            <nav className="hidden md:flex space-x-4">
              <a
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="/explore"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Explore
              </a>
              <a
                href="/community"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Community
              </a>
              <a
                href="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium hover:text-primary transition-colors">
              Sign In
            </button>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We are committed to protecting your privacy and being
                transparent about how we collect, use, and protect your personal
                information.
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Privacy Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {privacySections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {section.content.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Your Rights Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Your Privacy Rights</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You have full control over your personal data. Exercise your
                rights with just a few clicks.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {userRights.map((right, index) => {
                const IconComponent = right.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                      <CardContent className="p-6">
                        <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {right.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {right.description}
                        </p>
                        <Button variant="outline" className="w-full">
                          {right.action}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Data Retention & Deletion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">
                        How Long We Keep Your Data
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Account data: Until account deletion</li>
                        <li>
                          • Content: Until you delete it or close your account
                        </li>
                        <li>• Analytics: Anonymized after 24 months</li>
                        <li>
                          • Support tickets: 3 years for quality assurance
                        </li>
                        <li>• Backup data: 30 days after deletion</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        When We Delete Your Data
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Immediately upon account deletion request</li>
                        <li>• After 2 years of account inactivity</li>
                        <li>• When legally required to do so</li>
                        <li>• Upon withdrawal of consent</li>
                        <li>• When data is no longer necessary</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Questions About Your Privacy?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Our privacy team is here to help you understand and exercise
                your rights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <a href="/contact">Contact Privacy Team</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  <a href="/terms">View Terms & Conditions</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPage;
