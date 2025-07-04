import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  Bookmark,
  RefreshCw,
  Filter,
  Star,
  Zap,
  Target,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

interface RecommendedPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  category: string;
  image: string;
  publishedAt: string;
  readTime: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
  };
  tags: string[];
  recommendationReason: string;
  matchScore: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

interface ContentRecommendationsProps {
  className?: string;
}

const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({
  className = "",
}) => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] =
    useState<RecommendedPost[]>(mockRecommendations);
  const [activeTab, setActiveTab] = useState("for-you");
  const [sortBy, setSortBy] = useState("relevance");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [postStates, setPostStates] = useState<
    Record<string, { isLiked: boolean; isBookmarked: boolean; likes: number }>
  >({});

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, this would fetch new recommendations
    setRecommendations(
      [...mockRecommendations].sort(() => Math.random() - 0.5),
    );
    setIsRefreshing(false);
  };

  const handleLike = (postId: string) => {
    setPostStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        isLiked: !prev[postId]?.isLiked,
        likes:
          (prev[postId]?.likes ||
            recommendations.find((p) => p.id === postId)?.metrics.likes ||
            0) + (prev[postId]?.isLiked ? -1 : 1),
      },
    }));
  };

  const handleBookmark = (postId: string) => {
    setPostStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        isBookmarked: !prev[postId]?.isBookmarked,
      },
    }));
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      case "popular":
        return b.metrics.views - a.metrics.views;
      case "match-score":
        return b.matchScore - a.matchScore;
      case "relevance":
      default:
        return b.matchScore - a.matchScore;
    }
  });

  const getFilteredRecommendations = () => {
    switch (activeTab) {
      case "trending":
        return sortedRecommendations.filter(
          (post) => post.metrics.views > 1000,
        );
      case "following":
        return sortedRecommendations.filter((post) =>
          post.recommendationReason.includes("following"),
        );
      case "bookmarked":
        return sortedRecommendations.filter(
          (post) => postStates[post.id]?.isBookmarked || post.isBookmarked,
        );
      case "for-you":
      default:
        return sortedRecommendations;
    }
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
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const getRecommendationIcon = (reason: string) => {
    if (reason.includes("trending")) return <TrendingUp className="h-3 w-3" />;
    if (reason.includes("following")) return <Star className="h-3 w-3" />;
    if (reason.includes("similar")) return <Target className="h-3 w-3" />;
    return <Sparkles className="h-3 w-3" />;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 75) return "text-blue-600 bg-blue-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  const RecommendationCard: React.FC<{ post: RecommendedPost }> = ({
    post,
  }) => {
    const postState = postStates[post.id] || {
      isLiked: post.isLiked || false,
      isBookmarked: post.isBookmarked || false,
      likes: post.metrics.likes,
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <Card className="h-full hover:shadow-lg transition-all duration-200 overflow-hidden">
          <div className="relative">
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute top-3 left-3">
              <Badge className="bg-black/70 text-white text-xs">
                {post.category}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge
                className={`text-xs ${getMatchScoreColor(post.matchScore)}`}
                variant="secondary"
              >
                {post.matchScore}% match
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {getRecommendationIcon(post.recommendationReason)}
              <span className="text-xs text-muted-foreground">
                {post.recommendationReason}
              </span>
            </div>

            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
              {post.title}
            </h3>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  <AvatarFallback className="text-xs">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    {post.author.name}
                  </span>
                  {post.author.verified && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      ✓
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {post.metrics.views}
                </span>
                <button
                  className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                    postState.isLiked ? "text-red-500" : ""
                  }`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart
                    className={`h-3 w-3 ${postState.isLiked ? "fill-current" : ""}`}
                  />
                  {postState.likes}
                </button>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {post.metrics.comments}
                </span>
              </div>
              <button
                className={`p-1 rounded hover:bg-muted transition-colors ${
                  postState.isBookmarked
                    ? "text-blue-500"
                    : "text-muted-foreground"
                }`}
                onClick={() => handleBookmark(post.id)}
              >
                <Bookmark
                  className={`h-4 w-4 ${postState.isBookmarked ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs px-2 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">
          Sign in for personalized recommendations
        </h3>
        <p className="text-muted-foreground">
          Get content tailored to your interests and reading history.
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 bg-background ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Recommended for You
          </h1>
          <p className="text-muted-foreground">
            Discover content tailored to your interests and reading habits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="match-score">Best Match</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="bookmarked">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="for-you" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredRecommendations().map((post) => (
              <RecommendationCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredRecommendations().map((post) => (
              <RecommendationCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredRecommendations().map((post) => (
              <RecommendationCard key={post.id} post={post} />
            ))}
          </div>
          {getFilteredRecommendations().length === 0 && (
            <div className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No recommendations from people you follow
              </h3>
              <p className="text-muted-foreground">
                Follow more writers to see personalized content here.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookmarked" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredRecommendations().map((post) => (
              <RecommendationCard key={post.id} post={post} />
            ))}
          </div>
          {getFilteredRecommendations().length === 0 && (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No bookmarked recommendations
              </h3>
              <p className="text-muted-foreground">
                Bookmark articles to save them for later reading.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {getFilteredRecommendations().length === 0 && activeTab === "for-you" && (
        <div className="text-center py-12">
          <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Building your recommendations
          </h3>
          <p className="text-muted-foreground mb-4">
            Read a few articles and follow some writers to get personalized
            recommendations.
          </p>
          <Button onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Recommendations
          </Button>
        </div>
      )}
    </div>
  );
};

// Mock data
const mockRecommendations: RecommendedPost[] = [
  {
    id: "1",
    title: "Advanced React Patterns for Scalable Applications",
    excerpt:
      "Learn how to structure large React applications using advanced patterns like compound components, render props, and custom hooks.",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      verified: true,
    },
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: "12 min read",
    metrics: { views: 2340, likes: 189, comments: 45 },
    tags: ["React", "JavaScript", "Frontend", "Architecture"],
    recommendationReason: "Based on your interest in React development",
    matchScore: 95,
  },
  {
    id: "2",
    title: "Hidden Photography Spots in Southeast Asia",
    excerpt:
      "Discover breathtaking locations off the beaten path that offer incredible photo opportunities for travel photographers.",
    author: {
      name: "Marcus Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    },
    category: "Travel",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
    publishedAt: "2024-01-14T15:45:00Z",
    readTime: "8 min read",
    metrics: { views: 1890, likes: 156, comments: 32 },
    tags: ["Photography", "Travel", "Southeast Asia", "Adventure"],
    recommendationReason: "Trending in Travel category",
    matchScore: 78,
  },
  {
    id: "3",
    title: "The Science of Habit Formation",
    excerpt:
      "Understanding the neurological basis of habits and practical strategies for building positive routines that stick.",
    author: {
      name: "Dr. Emily Watson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      verified: true,
    },
    category: "Wellness",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
    publishedAt: "2024-01-13T09:15:00Z",
    readTime: "10 min read",
    metrics: { views: 1456, likes: 123, comments: 28 },
    tags: ["Psychology", "Habits", "Self-Improvement", "Science"],
    recommendationReason: "Similar to articles you've liked",
    matchScore: 87,
  },
  {
    id: "4",
    title: "Plant-Based Meal Prep for Busy Professionals",
    excerpt:
      "Time-saving strategies and delicious recipes for maintaining a healthy plant-based diet with a hectic schedule.",
    author: {
      name: "Chef Maria Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    },
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    publishedAt: "2024-01-12T14:20:00Z",
    readTime: "6 min read",
    metrics: { views: 987, likes: 87, comments: 19 },
    tags: ["Plant-Based", "Meal Prep", "Nutrition", "Cooking"],
    recommendationReason: "Popular among users you follow",
    matchScore: 72,
  },
  {
    id: "5",
    title: "Building Resilience Through Mindful Movement",
    excerpt:
      "How combining physical exercise with mindfulness practices can enhance mental resilience and overall well-being.",
    author: {
      name: "Alex Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    publishedAt: "2024-01-11T11:30:00Z",
    readTime: "7 min read",
    metrics: { views: 1234, likes: 98, comments: 24 },
    tags: ["Fitness", "Mindfulness", "Mental Health", "Resilience"],
    recommendationReason: "Based on your reading history",
    matchScore: 83,
  },
  {
    id: "6",
    title: "The Future of Remote Work Culture",
    excerpt:
      "Exploring how distributed teams are reshaping workplace culture and what it means for the future of work.",
    author: {
      name: "Jordan Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    },
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=400&q=80",
    publishedAt: "2024-01-10T16:45:00Z",
    readTime: "9 min read",
    metrics: { views: 1567, likes: 134, comments: 37 },
    tags: ["Remote Work", "Culture", "Future of Work", "Management"],
    recommendationReason: "Trending in Business category",
    matchScore: 69,
  },
];

export default ContentRecommendations;
