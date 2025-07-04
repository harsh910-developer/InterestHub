import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { updatePageSEO } from "../utils/seo";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const TermsPage = () => {
  useEffect(() => {
    updatePageSEO({
      title: "Terms & Conditions - BlogCommunity",
      description:
        "Read our terms of service, privacy policy, and user guidelines for BlogCommunity platform.",
      keywords: "terms, conditions, privacy, policy, guidelines, legal",
      url: window.location.href,
      type: "website",
    });
  }, []);

  const sections = [
    {
      icon: FileText,
      title: "Terms of Service",
      content: [
        "By using BlogCommunity, you agree to these terms and conditions.",
        "You must be at least 13 years old to use our platform.",
        "You are responsible for maintaining the confidentiality of your account.",
        "Content you publish must be original or properly attributed.",
        "We reserve the right to remove content that violates our guidelines.",
      ],
    },
    {
      icon: Shield,
      title: "Data Security",
      content: [
        "All data transmission is encrypted using SSL/TLS protocols.",
        "User passwords are hashed using bcrypt with salt rounds.",
        "Session management uses secure JWT tokens with expiration.",
        "Regular security audits and penetration testing are conducted.",
        "Data backups are encrypted and stored in secure cloud storage.",
      ],
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      content: [
        "We collect only necessary information for platform functionality.",
        "Personal data is never sold to third parties.",
        "You can request data deletion at any time.",
        "Cookies are used only for essential platform features.",
        "Analytics data is anonymized and aggregated.",
      ],
    },
    {
      icon: Eye,
      title: "Content Guidelines",
      content: [
        "No hate speech, harassment, or discriminatory content.",
        "Respect intellectual property rights and fair use.",
        "No spam, misleading information, or malicious content.",
        "Adult content must be properly marked and age-restricted.",
        "Commercial content should be clearly disclosed.",
      ],
    },
    {
      icon: UserCheck,
      title: "User Rights",
      content: [
        "You retain ownership of your original content.",
        "You can export your data at any time.",
        "Account deletion removes all personal information.",
        "You can opt out of marketing communications.",
        "Access to platform features is provided fairly and equally.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Liability & Disclaimers",
      content: [
        "Platform is provided 'as is' without warranties.",
        "Users are responsible for backing up their content.",
        "We are not liable for user-generated content.",
        "Service availability is not guaranteed 100% of the time.",
        "Terms may be updated with reasonable notice to users.",
      ],
    },
  ];

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
        duration: 0.5,
      },
    },
  };

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
        <section className="py-20 bg-gradient-to-br from-primary/5 to-purple-500/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Terms & Conditions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
                Your privacy and security are our top priorities. Read our
                comprehensive policies below.
              </p>
              <div className="flex justify-center gap-2 mb-8">
                <Badge className="bg-green-100 text-green-700">
                  <Shield className="w-3 h-3 mr-1" />
                  SSL Secured
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Lock className="w-3 h-3 mr-1" />
                  Data Encrypted
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <UserCheck className="w-3 h-3 mr-1" />
                  GDPR Compliant
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
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
            </motion.div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Security & Reliability Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We implement industry-standard security measures to protect your
                data and ensure platform reliability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">SSL Certificate</h3>
                <p className="text-muted-foreground">
                  All data transmission is encrypted using industry-standard
                  SSL/TLS protocols.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Data Backup</h3>
                <p className="text-muted-foreground">
                  Automated daily backups stored securely in encrypted cloud
                  storage.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Privacy Protection
                </h3>
                <p className="text-muted-foreground">
                  JWT session management and bcrypt password hashing for maximum
                  security.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Questions About Our Terms?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                If you have any questions about our terms, privacy policy, or
                security measures, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="/privacy"
                  className="border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-primary/10 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TermsPage;
