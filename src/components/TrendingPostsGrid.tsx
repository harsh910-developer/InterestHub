import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PostActions from "./PostActions";
import CommentSystem from "./CommentSystem";
import {
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Share2,
  Bookmark,
} from "lucide-react";

interface Author {
  name: string;
  avatar: string;
  initials: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares?: number;
  };
  isLiked?: boolean;
  isBookmarked?: boolean;
  showComments?: boolean;
}

interface TrendingPostsGridProps {
  posts?: Post[];
}

const TrendingPostsGrid: React.FC<TrendingPostsGridProps> = ({
  posts = defaultPosts,
}) => {
  const [expandedPost, setExpandedPost] = React.useState<string | null>(null);
  const [postStates, setPostStates] = React.useState<
    Record<string, { isLiked: boolean; isBookmarked: boolean; likes: number }>
  >({});

  const handleLike = (postId: string) => {
    setPostStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        isLiked: !prev[postId]?.isLiked,
        likes:
          (prev[postId]?.likes ||
            posts.find((p) => p.id === postId)?.metrics.likes ||
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

  const handleShare = (postId: string, platform: string) => {
    console.log(`Shared post ${postId} on ${platform}`);
  };
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-background">
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
          Trending Posts
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Discover what's capturing our community's attention right now
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            postStates={postStates}
            expandedPost={expandedPost}
            setExpandedPost={setExpandedPost}
            handleLike={handleLike}
            handleBookmark={handleBookmark}
            handleShare={handleShare}
          />
        ))}
      </div>
    </section>
  );
};

interface PostCardProps {
  post: Post;
  postStates: Record<
    string,
    { isLiked: boolean; isBookmarked: boolean; likes: number }
  >;
  expandedPost: string | null;
  setExpandedPost: (postId: string | null) => void;
  handleLike: (postId: string) => void;
  handleBookmark: (postId: string) => void;
  handleShare: (postId: string, platform: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  postStates,
  expandedPost,
  setExpandedPost,
  handleLike,
  handleBookmark,
  handleShare,
}) => {
  const postState = postStates[post.id] || {
    isLiked: false,
    isBookmarked: false,
    likes: post.metrics.likes,
  };
  const isExpanded = expandedPost === post.id;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge
            className="absolute top-2 sm:top-3 left-2 sm:left-3 text-xs"
            style={{ backgroundColor: post.categoryColor }}
          >
            {post.category}
          </Badge>
          <div className="absolute top-2 right-2 flex space-x-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleBookmark(post.id)}
              className={`p-1.5 rounded-full backdrop-blur-sm transition-colors ${
                postState.isBookmarked
                  ? "bg-blue-500 text-white"
                  : "bg-black/20 text-white hover:bg-black/40"
              }`}
            >
              <Bookmark
                className={`h-3 w-3 ${postState.isBookmarked ? "fill-current" : ""}`}
              />
            </motion.button>
          </div>
        </div>

        <CardHeader className="pb-2 p-3 sm:p-4">
          <h3
            className="text-base sm:text-lg lg:text-xl font-semibold line-clamp-2 hover:text-primary cursor-pointer"
            onClick={() => setExpandedPost(isExpanded ? null : post.id)}
          >
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-grow p-3 sm:p-4 pt-0">
          <p className="text-muted-foreground line-clamp-3 mb-4 text-sm sm:text-base">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 sm:space-y-4 pt-0 p-3 sm:p-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="text-xs">
                  {post.author.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs sm:text-sm font-medium">
                {post.author.name}
              </span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Enhanced Post Actions */}
          <PostActions
            postId={post.id}
            title={post.title}
            likes={postState.likes}
            comments={post.metrics.comments}
            shares={post.metrics.shares || 0}
            isLiked={postState.isLiked}
            isBookmarked={postState.isBookmarked}
            onLike={() => handleLike(post.id)}
            onBookmark={() => handleBookmark(post.id)}
            onShare={(platform) => handleShare(post.id, platform)}
            variant="compact"
            className="w-full"
          />

          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="text-xs">{post.metrics.views}</span>
              </div>
            </div>
            <span className="text-xs">{post.publishedAt}</span>
          </div>
        </CardFooter>

        {/* Expandable Comments Section */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t bg-muted/30 p-4"
          >
            <CommentSystem
              postId={post.id}
              onAddComment={(content, parentId) => {
                console.log(
                  `Adding comment to post ${post.id}:`,
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
};

// Default posts data for when no props are provided
const defaultPosts: Post[] = [
  {
    id: "1",
    title:
      "The Future of Remote Work: How Technology is Reshaping Our Workplaces",
    excerpt:
      "As remote work becomes the new normal, discover how emerging technologies are transforming collaboration and productivity across distributed teams.",
    image:
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=800&q=80",
    category: "Technology",
    categoryColor: "#3b82f6",
    author: {
      name: "Alex Morgan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      initials: "AM",
    },
    publishedAt: "2 days ago",
    readTime: "5 min read",
    metrics: {
      views: 1243,
      likes: 84,
      comments: 32,
      shares: 15,
    },
  },
  {
    id: "2",
    title:
      "Sustainable Travel: Exploring the World While Minimizing Your Carbon Footprint",
    excerpt:
      "Learn practical tips for eco-friendly travel that allows you to experience amazing destinations while preserving them for future generations.",
    image:
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&q=80",
    category: "Travel",
    categoryColor: "#10b981",
    author: {
      name: "Sophia Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
      initials: "SC",
    },
    publishedAt: "5 days ago",
    readTime: "7 min read",
    metrics: {
      views: 2156,
      likes: 192,
      comments: 45,
    },
  },
  {
    id: "3",
    title:
      "Mindfulness in the Digital Age: Finding Balance in a Connected World",
    excerpt:
      "Discover strategies for maintaining mental wellness and focus in an era of constant notifications and digital distractions.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    category: "Wellness",
    categoryColor: "#8b5cf6",
    author: {
      name: "Marcus Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
      initials: "MJ",
    },
    publishedAt: "1 week ago",
    readTime: "6 min read",
    metrics: {
      views: 1879,
      likes: 145,
      comments: 38,
    },
  },
  {
    id: "4",
    title: "Plant-Based Cooking: Simple Recipes for Beginners",
    excerpt:
      "Start your plant-based journey with these easy, nutritious recipes that don't sacrifice flavor or satisfaction.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    category: "Food",
    categoryColor: "#ef4444",
    author: {
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      initials: "PP",
    },
    publishedAt: "3 days ago",
    readTime: "4 min read",
    metrics: {
      views: 1562,
      likes: 127,
      comments: 29,
    },
  },
  {
    id: "5",
    title: "Home Fitness: Creating an Effective Workout Space in Any Size Home",
    excerpt:
      "Transform any corner of your home into a functional fitness area with these space-saving ideas and equipment recommendations.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    category: "Fitness",
    categoryColor: "#f59e0b",
    author: {
      name: "David Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      initials: "DW",
    },
    publishedAt: "4 days ago",
    readTime: "8 min read",
    metrics: {
      views: 1843,
      likes: 156,
      comments: 42,
    },
  },
  {
    id: "6",
    title:
      "The Art of Storytelling: Crafting Narratives That Captivate Readers",
    excerpt:
      "Learn the fundamental elements of compelling storytelling that will engage your audience and leave them wanting more.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    category: "Writing",
    categoryColor: "#ec4899",
    author: {
      name: "James Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      initials: "JR",
    },
    publishedAt: "6 days ago",
    readTime: "9 min read",
    metrics: {
      views: 1356,
      likes: 98,
      comments: 27,
    },
  },
];

export default TrendingPostsGrid;
