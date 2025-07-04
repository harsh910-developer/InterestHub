import React, { useEffect } from "react";
import { motion } from "framer-motion";
import LazyImage from "./LazyImage";
import { updatePageSEO } from "../utils/seo";

import {
  Heart,
  Users,
  Target,
  Award,
  Quote,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const AboutPage = () => {
  useEffect(() => {
    // Update SEO for About page
    updatePageSEO({
      title: "About BlogCommunity - Our Mission & Team",
      description:
        "Learn about BlogCommunity's mission to democratize storytelling and create meaningful connections between writers and readers worldwide.",
      keywords:
        "about, mission, team, storytelling, community, writers, readers",
      url: window.location.href,
      type: "website",
    });
  }, []);
  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former tech journalist with 10+ years of experience. Passionate about building communities that empower writers and creators.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@blogcommunity.com",
      },
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Community",
      bio: "Community builder and content strategist. Helps foster meaningful connections between writers and readers worldwide.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "marcus@blogcommunity.com",
      },
    },
    {
      name: "Dr. Emily Watson",
      role: "Content Director",
      bio: "PhD in Digital Media Studies. Ensures our platform maintains high-quality content standards and editorial excellence.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@blogcommunity.com",
      },
    },
    {
      name: "Alex Kim",
      role: "Lead Developer",
      bio: "Full-stack developer passionate about creating intuitive user experiences. Builds the technology that powers our community.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "alex@blogcommunity.com",
      },
    },
    {
      name: "Maria Santos",
      role: "UX Designer",
      bio: "Design thinking enthusiast focused on creating accessible and beautiful interfaces that enhance the writing experience.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "maria@blogcommunity.com",
      },
    },
    {
      name: "James Wilson",
      role: "Growth Manager",
      bio: "Data-driven marketer helping writers reach their target audiences and grow their personal brands through strategic content.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james@blogcommunity.com",
      },
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Jennifer Park",
      role: "Travel Blogger",
      content:
        "BlogCommunity has transformed how I connect with my audience. The platform's features and supportive community have helped me grow my readership by 300% in just six months.",
      avatar: "Jennifer",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Tech Writer",
      content:
        "The AI-powered recommendations are incredible. I've discovered so many talented writers and my own content reaches exactly the right audience. It's like having a personal content strategist.",
      avatar: "David",
      rating: 5,
    },
    {
      name: "Lisa Chang",
      role: "Food Blogger",
      content:
        "I love how easy it is to engage with other creators here. The community features have helped me collaborate with amazing chefs and food photographers from around the world.",
      avatar: "Lisa",
      rating: 5,
    },
    {
      name: "Michael Brown",
      role: "Business Writer",
      content:
        "The analytics and insights provided by BlogCommunity have been game-changing for my content strategy. I can see exactly what resonates with my audience and optimize accordingly.",
      avatar: "Michael",
      rating: 5,
    },
  ];

  const stats = [
    { label: "Active Writers", value: "50K+", icon: Users },
    { label: "Published Articles", value: "500K+", icon: Target },
    { label: "Community Groups", value: "1,200+", icon: Heart },
    { label: "Countries Reached", value: "150+", icon: Award },
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
              <a href="/about" className="text-sm font-medium text-primary">
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
                About BlogCommunity
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We're on a mission to democratize storytelling and create
                meaningful connections between writers and readers worldwide.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Join Our Mission
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To empower writers of all backgrounds to share their stories,
                  connect with like-minded individuals, and build thriving
                  communities around shared interests and passions.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  We believe that everyone has a story worth telling, and our
                  platform provides the tools, audience, and support system to
                  help those stories reach the people who need to hear them
                  most.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Community First</h3>
                    <p className="text-muted-foreground">
                      Building genuine connections between creators
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    To become the world's most trusted platform for authentic
                    storytelling, where diverse voices are celebrated and
                    meaningful conversations flourish.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Foster inclusive and supportive communities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Amplify underrepresented voices</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Promote authentic, high-quality content</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Enable creators to monetize their passion</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Numbers that reflect our growing community and the stories being
                shared every day.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                      <CardContent className="p-6">
                        <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-3xl font-bold text-primary mb-2">
                          {stat.value}
                        </h3>
                        <p className="text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Passionate individuals dedicated to building the future of
                online storytelling and community building.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300 group bg-white">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                        <LazyImage
                          src={member.image}
                          alt={member.name}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-1">
                        {member.name}
                      </h3>
                      <Badge variant="secondary" className="mb-3">
                        {member.role}
                      </Badge>
                      <p className="text-muted-foreground text-sm mb-4">
                        {member.bio}
                      </p>
                      <div className="flex justify-center space-x-3">
                        {member.social.linkedin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        )}
                        {member.social.twitter && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Twitter className="h-4 w-4" />
                          </Button>
                        )}
                        {member.social.email && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
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
                What Our Community Says
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from writers who have found their voice and
                audience through BlogCommunity.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Quote className="w-8 h-8 text-primary/30 mr-3" />
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            >
                              ⭐
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 italic">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.avatar}`}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Share Your Story?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of writers who have found their voice and built
                their audience with BlogCommunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Start Writing Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  <a href="/contact">Get in Touch</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
