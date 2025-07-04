import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import LazyImage from "./LazyImage";
import { updatePageSEO, generateBlogPostStructuredData } from "../utils/seo";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Heart,
  Eye,
  Lightbulb,
  BookOpen,
  Mic,
  Languages,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CategoryNavigation from "./CategoryNavigation";
import SearchBar from "./SearchBar";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  views: number;
  likes: number;
  publishedAt: string;
  image: string;
  trending?: boolean;
}

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [personalizedPosts, setPersonalizedPosts] = useState([]);
  const [contentSuggestions, setContentSuggestions] = useState([]);

  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Web Development",
      excerpt:
        "Exploring how AI is revolutionizing the way we build and interact with web applications, from automated code generation to intelligent user experiences.",
      author: "Sarah Chen",
      category: "Technology",
      readTime: "8 min read",
      views: 2340,
      likes: 156,
      publishedAt: "2024-01-15",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      trending: true,
    },
    {
      id: 2,
      title: "Hidden Gems: 10 Unexplored Destinations in Southeast Asia",
      excerpt:
        "Discover breathtaking locations off the beaten path that offer authentic cultural experiences and stunning natural beauty.",
      author: "Marcus Rodriguez",
      category: "Travel",
      readTime: "12 min read",
      views: 1890,
      likes: 203,
      publishedAt: "2024-01-14",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      trending: true,
    },
    {
      id: 3,
      title:
        "Mindful Fitness: Integrating Mental Health with Physical Wellness",
      excerpt:
        "How combining mindfulness practices with your fitness routine can enhance both physical performance and mental well-being.",
      author: "Dr. Emily Watson",
      category: "Fitness",
      readTime: "6 min read",
      views: 1456,
      likes: 89,
      publishedAt: "2024-01-13",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    },
    {
      id: 4,
      title: "Plant-Based Cooking: Delicious Recipes for Beginners",
      excerpt:
        "Start your plant-based journey with these easy, nutritious recipes that do not sacrifice flavor or satisfaction.",
      author: "Chef Maria Santos",
      category: "Food",
      readTime: "10 min read",
      views: 987,
      likes: 67,
      publishedAt: "2024-01-12",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    },
    {
      id: 5,
      title: "Digital Art Revolution: NFTs and Creative Expression",
      excerpt:
        "Exploring how blockchain technology is transforming the art world and creating new opportunities for digital artists.",
      author: "Alex Kim",
      category: "Art",
      readTime: "7 min read",
      views: 1234,
      likes: 98,
      publishedAt: "2024-01-11",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
    },
    {
      id: 6,
      title: "The Science of Sleep: Optimizing Your Rest for Better Health",
      excerpt:
        "Understanding the latest research on sleep patterns and how to improve your sleep quality for enhanced physical and mental performance.",
      author: "Dr. James Wilson",
      category: "Health",
      readTime: "9 min read",
      views: 1678,
      likes: 134,
      publishedAt: "2024-01-10",
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    },
  ];

  // Content suggestions for authors
  const authorSuggestions = [
    {
      topic: "The Rise of Remote Work Culture",
      keywords: ["remote work", "productivity", "work-life balance"],
      trendScore: 95,
      category: "Business",
    },
    {
      topic: "Sustainable Living in Urban Areas",
      keywords: ["sustainability", "urban living", "eco-friendly"],
      trendScore: 88,
      category: "Lifestyle",
    },
    {
      topic: "AI Tools for Creative Writing",
      keywords: ["artificial intelligence", "writing", "creativity"],
      trendScore: 92,
      category: "Technology",
    },
    {
      topic: "Mental Health in the Digital Age",
      keywords: ["mental health", "digital wellness", "mindfulness"],
      trendScore: 90,
      category: "Health",
    },
  ];

  // Personalized reading lists
  const readingLists = [
    {
      title: "Your Weekly Tech Digest",
      posts: blogPosts.filter((post) => post.category === "Technology"),
      reason: "Based on your interest in technology articles",
    },
    {
      title: "Trending in Your Network",
      posts: blogPosts.filter((post) => post.trending),
      reason: "Popular among writers you follow",
    },
    {
      title: "Quick Reads for Busy Days",
      posts: blogPosts.filter((post) => parseInt(post.readTime) <= 6),
      reason: "Articles under 6 minutes",
    },
  ];

  // AI-powered recommendations (mock)
  const aiRecommendations = [
    {
      title: "Based on your reading history",
      posts: blogPosts.slice(0, 3),
    },
    {
      title: "Trending in your interests",
      posts: blogPosts.filter((post) => post.trending),
    },
  ];

  // Language options for translation
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "pt", name: "Português" },
  ];

  // Voice-to-text functionality
  const startVoiceRecording = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSearchQuery(transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition not supported in this browser");
    }
  };

  // Simulate translation function
  const translateContent = (text, targetLang) => {
    // In a real app, this would call a translation API
    return `[${targetLang.toUpperCase()}] ${text}`;
  };

  useEffect(() => {
    // Update SEO for Explore page
    updatePageSEO({
      title: "Explore Stories - BlogCommunity",
      description:
        "Discover amazing content across various topics and interests. Find your next favorite read with our AI-powered recommendations.",
      keywords:
        "explore, stories, blog posts, AI recommendations, trending content",
      url: window.location.href,
      type: "website",
    });

    // Generate structured data for featured posts
    blogPosts.slice(0, 3).forEach((post) => {
      generateBlogPostStructuredData({
        title: post.title,
        description: post.excerpt,
        author: post.author,
        publishedDate: post.publishedAt,
        url: `${window.location.origin}/post/${post.id}`,
        image: post.image,
        category: post.category,
        readTime: post.readTime,
      });
    });

    // Simulate loading personalized content
    setPersonalizedPosts(blogPosts.slice(0, 4));
    setContentSuggestions(authorSuggestions);
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views;
      case "liked":
        return b.likes - a.likes;
      case "recent":
      default:
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }
  });

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
              <a href="/explore" className="text-sm font-medium text-primary">
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

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
            Explore Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing content across various topics and interests. Find
            your next favorite read with our AI-powered recommendations.
          </p>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchBar
            onSearch={(query, filters) => {
              setSearchQuery(query);
              // Handle advanced filters here
              console.log("Search:", query, "Filters:", filters);
            }}
            enableAdvancedSearch={true}
            className="max-w-4xl mx-auto"
          />

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className={`${
                isRecording
                  ? "text-red-500 animate-pulse"
                  : "text-muted-foreground"
              }`}
              onClick={startVoiceRecording}
              disabled={isRecording}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="w-[120px]">
                  <Languages className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="liked">Most Liked</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="flex items-center gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                Suggestions
              </Button>
            </div>
          </div>

          {/* Content Suggestions Panel */}
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-primary/5 to-teal-500/5 rounded-lg p-6 border border-primary/20"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                Trending Content Ideas for Authors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.category}
                      </Badge>
                      <div className="flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {suggestion.trendScore}% trending
                      </div>
                    </div>
                    <h4 className="font-medium mb-2">{suggestion.topic}</h4>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CategoryNavigation onCategorySelect={setSelectedCategory} />
        </motion.div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recommended">For You</TabsTrigger>
            <TabsTrigger value="personalized">My Lists</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white">
                    <div className="aspect-video overflow-hidden rounded-t-xl">
                      <LazyImage
                        src={post.image}
                        alt={post.title}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        {post.trending && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {selectedLanguage !== "en"
                          ? translateContent(post.title, selectedLanguage)
                          : post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {selectedLanguage !== "en"
                          ? translateContent(post.excerpt, selectedLanguage)
                          : post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mt-3 pt-3 border-t border-border">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {post.author}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="trending" className="mt-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {blogPosts
                .filter((post) => post.trending)
                .map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white">
                      <div className="aspect-video overflow-hidden rounded-t-xl">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readTime}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {post.likes}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center mt-3 pt-3 border-t border-border">
                          <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
                              alt={post.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {post.author}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="recommended" className="mt-8">
            <div className="space-y-12">
              {aiRecommendations.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-primary to-teal-600 p-2 rounded-lg mr-3">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{section.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.posts.map((post) => (
                      <Card
                        key={post.id}
                        className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white"
                      >
                        <div className="aspect-video overflow-hidden rounded-t-xl">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            {post.trending && (
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}
                              </span>
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {post.views}
                              </span>
                              <span className="flex items-center">
                                <Heart className="w-3 h-3 mr-1" />
                                {post.likes}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center mt-3 pt-3 border-t border-border">
                            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                              <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
                                alt={post.author}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {post.author}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personalized" className="mt-8">
            <div className="space-y-12">
              {readingLists.map((list, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-primary to-teal-600 p-2 rounded-lg mr-3">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{list.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {list.reason}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {list.posts.length} articles
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.posts.slice(0, 3).map((post) => (
                      <Card
                        key={post.id}
                        className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white"
                      >
                        <div className="aspect-video overflow-hidden rounded-t-xl">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            {post.trending && (
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                            {selectedLanguage !== "en"
                              ? translateContent(post.title, selectedLanguage)
                              : post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {selectedLanguage !== "en"
                              ? translateContent(post.excerpt, selectedLanguage)
                              : post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}
                              </span>
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {post.views}
                              </span>
                              <span className="flex items-center">
                                <Heart className="w-3 h-3 mr-1" />
                                {post.likes}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center mt-3 pt-3 border-t border-border">
                            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                              <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
                                alt={post.author}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {post.author}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {list.posts.length > 3 && (
                    <div className="text-center mt-6">
                      <Button variant="outline">
                        View All {list.posts.length} Articles
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ExplorePage;
