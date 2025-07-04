import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LazyImage from "./LazyImage";
import { updatePageSEO } from "../utils/seo";

import {
  MessageSquare,
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Clock,
  Heart,
  Reply,
  Pin,
  Languages,
  Globe,
  Trophy,
  Star,
  Award,
  Zap,
  Target,
  Crown,
  Medal,
  Flame,
  Share2,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import CommentSystem from "./CommentSystem";
import PostActions from "./PostActions";

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  dislikes?: number;
  views: number;
  shares?: number;
  createdAt: string;
  isPinned?: boolean;
  isTrending?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  isBookmarked?: boolean;
  showComments?: boolean;
}

interface CommunityGroup {
  id: number;
  name: string;
  description: string;
  members: number;
  category: string;
  image: string;
  isJoined?: boolean;
}

interface UserProfile {
  id: number;
  name: string;
  avatar: string;
  level: number;
  points: number;
  badges: Badge[];
  streak: number;
  rank: string;
  achievements: Achievement[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earnedAt?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: number;
  completed: boolean;
}

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("discussions");
  const [showTranslations, setShowTranslations] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [expandedDiscussion, setExpandedDiscussion] = useState<number | null>(
    null,
  );
  const [discussionStates, setDiscussionStates] = useState<
    Record<
      number,
      {
        isLiked: boolean;
        isDisliked: boolean;
        isBookmarked: boolean;
        likes: number;
        dislikes: number;
      }
    >
  >({});

  useEffect(() => {
    // Update SEO for Community page
    updatePageSEO({
      title: "Community Hub - BlogCommunity",
      description:
        "Connect with fellow writers, share ideas, ask questions, and grow together in our vibrant community.",
      keywords:
        "community, writers, discussions, groups, networking, collaboration",
      url: window.location.href,
      type: "website",
    });
  }, []);

  // Mock discussions data
  const discussions: Discussion[] = [
    {
      id: 1,
      title: "Best practices for writing engaging blog posts?",
      content:
        "I'm new to blogging and would love to hear your tips for creating content that really resonates with readers. What techniques have worked best for you?",
      author: "BloggerNewbie",
      category: "Writing Tips",
      replies: 23,
      likes: 45,
      dislikes: 2,
      views: 234,
      shares: 8,
      createdAt: "2024-01-15T10:30:00Z",
      isPinned: true,
    },
    {
      id: 2,
      title: "AI tools for content creation - your experiences?",
      content:
        "Has anyone tried using AI tools like ChatGPT or Claude for brainstorming blog ideas or drafting content? I'm curious about the pros and cons.",
      author: "TechWriter2024",
      category: "Technology",
      replies: 18,
      likes: 32,
      dislikes: 1,
      views: 189,
      shares: 12,
      createdAt: "2024-01-14T15:45:00Z",
      isTrending: true,
    },
    {
      id: 3,
      title: "Photography tips for travel bloggers",
      content:
        "Planning a trip to Southeast Asia and want to capture amazing photos for my travel blog. Any recommendations for equipment and techniques?",
      author: "WanderlustWriter",
      category: "Travel",
      replies: 31,
      likes: 67,
      dislikes: 3,
      views: 456,
      shares: 18,
      createdAt: "2024-01-13T09:15:00Z",
      isTrending: true,
    },
    {
      id: 4,
      title: "How to monetize your blog effectively?",
      content:
        "I've been blogging for 6 months and getting decent traffic. What are the best ways to start earning from my content without being too pushy?",
      author: "AspiringSolopreneur",
      category: "Business",
      replies: 42,
      likes: 89,
      dislikes: 4,
      views: 678,
      shares: 25,
      createdAt: "2024-01-12T14:20:00Z",
    },
    {
      id: 5,
      title: "Dealing with writer's block - your strategies?",
      content:
        "Sometimes I sit down to write and just can't get started. How do you overcome creative blocks and maintain consistent posting?",
      author: "CreativeStruggler",
      category: "Writing Tips",
      replies: 28,
      likes: 54,
      dislikes: 2,
      views: 321,
      shares: 9,
      createdAt: "2024-01-11T11:30:00Z",
    },
    {
      id: 6,
      title: "SEO for beginners - where to start?",
      content:
        "My blog posts aren't getting much organic traffic. Can someone explain SEO basics and what I should focus on first?",
      author: "SEONewbie",
      category: "Marketing",
      replies: 35,
      likes: 71,
      dislikes: 3,
      views: 543,
      shares: 16,
      createdAt: "2024-01-10T16:45:00Z",
    },
  ];

  // Mock community groups data
  const communityGroups: CommunityGroup[] = [
    {
      id: 1,
      name: "Tech Bloggers Unite",
      description:
        "A community for technology writers sharing insights, trends, and coding tutorials.",
      members: 1247,
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=80",
      isJoined: true,
    },
    {
      id: 2,
      name: "Travel Stories & Tips",
      description:
        "Share your adventures, travel guides, and photography from around the world.",
      members: 892,
      category: "Travel",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80",
    },
    {
      id: 3,
      name: "Fitness & Wellness Writers",
      description:
        "Connect with health and fitness content creators sharing workout tips and wellness advice.",
      members: 634,
      category: "Fitness",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    },
    {
      id: 4,
      name: "Food & Recipe Creators",
      description:
        "A delicious community for food bloggers, recipe developers, and culinary enthusiasts.",
      members: 756,
      category: "Food",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      isJoined: true,
    },
    {
      id: 5,
      name: "Creative Writing Circle",
      description:
        "For storytellers, poets, and creative writers looking to improve their craft.",
      members: 423,
      category: "Writing",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
    },
    {
      id: 6,
      name: "Business & Entrepreneurship",
      description:
        "Discuss business strategies, startup stories, and entrepreneurial insights.",
      members: 1089,
      category: "Business",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
  ];

  // Mock current user profile
  const mockCurrentUser: UserProfile = {
    id: 1,
    name: "John Doe",
    avatar: "John",
    level: 12,
    points: 2450,
    streak: 7,
    rank: "Content Creator",
    badges: [
      {
        id: "first-post",
        name: "First Post",
        description: "Published your first blog post",
        icon: "📝",
        rarity: "common",
        earnedAt: "2024-01-01",
      },
      {
        id: "trending-writer",
        name: "Trending Writer",
        description: "Had a post reach trending status",
        icon: "🔥",
        rarity: "rare",
        earnedAt: "2024-01-10",
      },
      {
        id: "community-helper",
        name: "Community Helper",
        description: "Helped 50+ community members",
        icon: "🤝",
        rarity: "epic",
        earnedAt: "2024-01-15",
      },
    ],
    achievements: [
      {
        id: "posts",
        title: "Prolific Writer",
        description: "Publish 100 blog posts",
        progress: 45,
        target: 100,
        reward: 500,
        completed: false,
      },
      {
        id: "likes",
        title: "Popular Content",
        description: "Receive 1000 likes",
        progress: 1234,
        target: 1000,
        reward: 300,
        completed: true,
      },
      {
        id: "streak",
        title: "Consistency Master",
        description: "Maintain a 30-day posting streak",
        progress: 7,
        target: 30,
        reward: 1000,
        completed: false,
      },
    ],
  };

  // Top contributors with gamification data
  const topContributors = [
    {
      name: "Sarah Chen",
      posts: 45,
      likes: 1234,
      avatar: "Sarah",
      level: 15,
      points: 3200,
      badges: 8,
    },
    {
      name: "Marcus Rodriguez",
      posts: 38,
      likes: 987,
      avatar: "Marcus",
      level: 13,
      points: 2800,
      badges: 6,
    },
    {
      name: "Dr. Emily Watson",
      posts: 32,
      likes: 876,
      avatar: "Emily",
      level: 12,
      points: 2450,
      badges: 7,
    },
    {
      name: "Chef Maria Santos",
      posts: 29,
      likes: 765,
      avatar: "Maria",
      level: 11,
      points: 2100,
      badges: 5,
    },
    {
      name: "Alex Kim",
      posts: 27,
      likes: 654,
      avatar: "Alex",
      level: 10,
      points: 1950,
      badges: 4,
    },
  ];

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: "Sarah Chen", points: 3200, change: "+2" },
    { rank: 2, name: "Marcus Rodriguez", points: 2800, change: "0" },
    { rank: 3, name: "Dr. Emily Watson", points: 2450, change: "+1" },
    { rank: 4, name: "Chef Maria Santos", points: 2100, change: "-1" },
    { rank: 5, name: "Alex Kim", points: 1950, change: "0" },
    { rank: 6, name: "John Doe", points: 1800, change: "+3" },
  ];

  // Available badges
  const availableBadges: Badge[] = [
    {
      id: "first-post",
      name: "First Post",
      description: "Published your first blog post",
      icon: "📝",
      rarity: "common",
    },
    {
      id: "trending-writer",
      name: "Trending Writer",
      description: "Had a post reach trending status",
      icon: "🔥",
      rarity: "rare",
    },
    {
      id: "community-helper",
      name: "Community Helper",
      description: "Helped 50+ community members",
      icon: "🤝",
      rarity: "epic",
    },
    {
      id: "master-writer",
      name: "Master Writer",
      description: "Published 100+ high-quality posts",
      icon: "👑",
      rarity: "legendary",
    },
    {
      id: "engagement-king",
      name: "Engagement King",
      description: "Received 10,000+ total likes",
      icon: "⭐",
      rarity: "epic",
    },
    {
      id: "mentor",
      name: "Mentor",
      description: "Guided 10+ new writers",
      icon: "🎓",
      rarity: "rare",
    },
  ];

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "epic":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Award className="h-4 w-4 text-amber-600" />;
      default:
        return <Trophy className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Language options for translation
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
  ];

  // Simulate translation function
  const translateContent = (text, targetLang) => {
    if (targetLang === "en") return text;
    // In a real app, this would call a translation API
    return `[${targetLang.toUpperCase()}] ${text}`;
  };

  const handleDiscussionLike = (discussionId: number) => {
    setDiscussionStates((prev) => ({
      ...prev,
      [discussionId]: {
        ...prev[discussionId],
        isLiked: !prev[discussionId]?.isLiked,
        isDisliked: false,
        likes:
          (prev[discussionId]?.likes ||
            discussions.find((d) => d.id === discussionId)?.likes ||
            0) + (prev[discussionId]?.isLiked ? -1 : 1),
        dislikes: prev[discussionId]?.isDisliked
          ? (prev[discussionId]?.dislikes || 0) - 1
          : prev[discussionId]?.dislikes ||
            discussions.find((d) => d.id === discussionId)?.dislikes ||
            0,
      },
    }));
  };

  const handleDiscussionDislike = (discussionId: number) => {
    setDiscussionStates((prev) => ({
      ...prev,
      [discussionId]: {
        ...prev[discussionId],
        isDisliked: !prev[discussionId]?.isDisliked,
        isLiked: false,
        dislikes:
          (prev[discussionId]?.dislikes ||
            discussions.find((d) => d.id === discussionId)?.dislikes ||
            0) + (prev[discussionId]?.isDisliked ? -1 : 1),
        likes: prev[discussionId]?.isLiked
          ? (prev[discussionId]?.likes || 0) - 1
          : prev[discussionId]?.likes ||
            discussions.find((d) => d.id === discussionId)?.likes ||
            0,
      },
    }));
  };

  const handleDiscussionBookmark = (discussionId: number) => {
    setDiscussionStates((prev) => ({
      ...prev,
      [discussionId]: {
        ...prev[discussionId],
        isBookmarked: !prev[discussionId]?.isBookmarked,
      },
    }));
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
              <a href="/community" className="text-sm font-medium text-primary">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow writers, share ideas, ask questions, and grow
            together in our vibrant community.
          </p>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              <Plus className="w-4 h-4 mr-2" />
              Start Discussion
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="w-[140px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowTranslations(!showTranslations)}
              className={showTranslations ? "bg-primary/10 text-primary" : ""}
            >
              <Languages className="h-4 w-4 mr-2" />
              Translate
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* User Profile Card */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockCurrentUser.avatar}`}
                        alt={mockCurrentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                      {mockCurrentUser.level}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {mockCurrentUser.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {mockCurrentUser.rank}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        {mockCurrentUser.points.toLocaleString()} points
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        {mockCurrentUser.streak} day streak
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-blue-500" />
                        {mockCurrentUser.badges.length} badges
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-2 mb-2">
                    {mockCurrentUser.badges.slice(0, 3).map((badge) => (
                      <div
                        key={badge.id}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${getBadgeColor(badge.rarity)}`}
                        title={badge.name}
                      >
                        {badge.icon}
                      </div>
                    ))}
                    {mockCurrentUser.badges.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        +{mockCurrentUser.badges.length - 3}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Discussions */}
              <div className="lg:col-span-3">
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredDiscussions.map((discussion) => {
                    const discussionState = discussionStates[discussion.id] || {
                      isLiked: false,
                      isDisliked: false,
                      isBookmarked: false,
                      likes: discussion.likes,
                      dislikes: discussion.dislikes || 0,
                    };
                    const isExpanded = expandedDiscussion === discussion.id;

                    return (
                      <motion.div key={discussion.id} variants={itemVariants}>
                        <Card className="hover:shadow-md transition-all duration-300 cursor-pointer bg-white">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {discussion.isPinned && (
                                  <Pin className="w-4 h-4 text-primary" />
                                )}
                                {discussion.isTrending && (
                                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                                <Badge variant="secondary" className="text-xs">
                                  {discussion.category}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-8 w-8 p-0 ${discussionState.isBookmarked ? "text-blue-500" : ""}`}
                                  onClick={() =>
                                    handleDiscussionBookmark(discussion.id)
                                  }
                                >
                                  <Bookmark
                                    className={`h-4 w-4 ${discussionState.isBookmarked ? "fill-current" : ""}`}
                                  />
                                </Button>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(discussion.createdAt)}
                                </span>
                              </div>
                            </div>

                            <h3
                              className="text-lg font-semibold mb-2 hover:text-primary transition-colors"
                              onClick={() =>
                                setExpandedDiscussion(
                                  isExpanded ? null : discussion.id,
                                )
                              }
                            >
                              {showTranslations && selectedLanguage !== "en"
                                ? translateContent(
                                    discussion.title,
                                    selectedLanguage,
                                  )
                                : discussion.title}
                            </h3>

                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {showTranslations && selectedLanguage !== "en"
                                ? translateContent(
                                    discussion.content,
                                    selectedLanguage,
                                  )
                                : discussion.content}
                            </p>

                            {showTranslations && selectedLanguage !== "en" && (
                              <div className="mb-3">
                                <Badge
                                  variant="outline"
                                  className="text-xs flex items-center gap-1 w-fit"
                                >
                                  <Languages className="h-3 w-3" />
                                  Auto-translated from English
                                </Badge>
                              </div>
                            )}

                            {/* Enhanced Discussion Actions */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-8 px-2 ${discussionState.isLiked ? "text-green-500" : ""}`}
                                  onClick={() =>
                                    handleDiscussionLike(discussion.id)
                                  }
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {discussionState.likes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-8 px-2 ${discussionState.isDisliked ? "text-red-500" : ""}`}
                                  onClick={() =>
                                    handleDiscussionDislike(discussion.id)
                                  }
                                >
                                  <ThumbsDown className="h-3 w-3 mr-1" />
                                  {discussionState.dislikes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() =>
                                    setExpandedDiscussion(
                                      isExpanded ? null : discussion.id,
                                    )
                                  }
                                >
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  {discussion.replies} replies
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                >
                                  <Share2 className="h-3 w-3 mr-1" />
                                  {discussion.shares || 0}
                                </Button>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {discussion.views} views
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${discussion.author}`}
                                    alt={discussion.author}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-sm font-medium">
                                  {discussion.author}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setExpandedDiscussion(
                                    isExpanded ? null : discussion.id,
                                  )
                                }
                                className="text-xs"
                              >
                                {isExpanded ? "Hide Comments" : "View Comments"}
                              </Button>
                            </div>
                          </CardContent>

                          {/* Expandable Comments Section */}
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t bg-muted/30 p-4"
                            >
                              <CommentSystem
                                postId={discussion.id.toString()}
                                onAddComment={(content, parentId) => {
                                  console.log(
                                    `Adding comment to discussion ${discussion.id}:`,
                                    content,
                                    parentId,
                                  );
                                }}
                              />
                            </motion.div>
                          )}
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Community Stats */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Members
                      </span>
                      <span className="font-semibold">12,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Active Today
                      </span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discussions</span>
                      <span className="font-semibold">3,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Groups</span>
                      <span className="font-semibold">89</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="flex items-center space-x-3 text-sm"
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${item}`}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">
                              User{item}
                            </span>{" "}
                            replied to a discussion
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item}h ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="groups" className="mt-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {communityGroups.map((group) => (
                <motion.div key={group.id} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white">
                    <div className="aspect-video overflow-hidden rounded-t-xl">
                      <LazyImage
                        src={group.image}
                        alt={group.name}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {group.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {group.members.toLocaleString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {group.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm mb-4">
                        {group.description}
                      </p>
                      <Button
                        className={`w-full ${
                          group.isJoined
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                        variant={group.isJoined ? "secondary" : "default"}
                      >
                        {group.isJoined ? "Joined" : "Join Group"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="contributors" className="mt-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {topContributors.map((contributor, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.avatar}`}
                            alt={contributor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {index < 3 && (
                          <Badge
                            className={`absolute -top-2 -right-2 ${
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                  ? "bg-gray-400"
                                  : "bg-amber-600"
                            } text-white`}
                          >
                            #{index + 1}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {contributor.name}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Level:</span>
                          <span className="font-medium text-primary">
                            {contributor.level}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Points:</span>
                          <span className="font-medium">
                            {contributor.points.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Posts:</span>
                          <span className="font-medium">
                            {contributor.posts}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Badges:</span>
                          <span className="font-medium text-yellow-600">
                            {contributor.badges}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-8">
            <motion.div
              className="max-w-2xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Community Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      variants={itemVariants}
                      className={`flex items-center justify-between p-4 border-b border-border last:border-b-0 ${
                        user.name === "John Doe" ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(user.rank)}
                          <span className="font-bold text-lg">{user.rank}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.points.toLocaleString()} points
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            user.change.startsWith("+")
                              ? "default"
                              : user.change.startsWith("-")
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {user.change !== "0" && user.change}
                          {user.change === "0" && "—"}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Achievements */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Your Progress
                </h3>
                <div className="space-y-4">
                  {mockCurrentUser.achievements.map((achievement) => (
                    <motion.div key={achievement.id} variants={itemVariants}>
                      <Card
                        className={`bg-white ${achievement.completed ? "border-green-200 bg-green-50" : ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">
                              {achievement.title}
                            </h4>
                            {achievement.completed && (
                              <Badge className="bg-green-500 text-white">
                                <Award className="h-3 w-3 mr-1" />
                                Complete
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {achievement.description}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>
                                {achievement.progress}/{achievement.target}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  achievement.completed
                                    ? "bg-green-500"
                                    : "bg-primary"
                                }`}
                                style={{
                                  width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`,
                                }}
                              />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">
                                Reward: {achievement.reward} points
                              </span>
                              {achievement.completed && (
                                <span className="text-green-600 font-medium">
                                  ✓ Claimed
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Badge Collection */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Badge Collection
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {availableBadges.map((badge) => {
                    const isEarned = mockCurrentUser.badges.some(
                      (b) => b.id === badge.id,
                    );
                    return (
                      <motion.div key={badge.id} variants={itemVariants}>
                        <Card
                          className={`bg-white transition-all duration-300 hover:shadow-md ${
                            isEarned ? "border-primary/50" : "opacity-60"
                          }`}
                        >
                          <CardContent className="p-4 text-center">
                            <div
                              className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl ${
                                isEarned
                                  ? getBadgeColor(badge.rarity)
                                  : "bg-muted"
                              }`}
                            >
                              {isEarned ? badge.icon : "🔒"}
                            </div>
                            <h4 className="font-semibold text-sm mb-1">
                              {badge.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              {badge.description}
                            </p>
                            <Badge
                              variant="outline"
                              className={`text-xs capitalize ${
                                isEarned ? "border-primary text-primary" : ""
                              }`}
                            >
                              {badge.rarity}
                            </Badge>
                            {isEarned && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Earned{" "}
                                {new Date(
                                  mockCurrentUser.badges.find(
                                    (b) => b.id === badge.id,
                                  )?.earnedAt || "",
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CommunityPage;
