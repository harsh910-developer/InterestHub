import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Users,
  FileText,
  Heart,
  MessageSquare,
  Eye,
  Edit,
  Settings,
  Share,
} from "lucide-react";
import { User, Post } from "@/types/database";

interface UserProfileProps {
  userId?: string;
  user?: User;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userId = "1",
  user = mockUser,
}) => {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState("posts");
  const [isLoading, setIsLoading] = useState(false);

  const isOwnProfile = currentUser?.id === user.id;

  useEffect(() => {
    // Simulate loading user data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [userId]);

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);
    // TODO: Implement follow/unfollow API call
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.name}'s Profile`,
        text: `Check out ${user.name}'s profile on BlogCommunity`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-48 bg-muted rounded-lg mb-6" />
            <div className="h-32 bg-muted rounded-lg mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-muted rounded-lg" />
              <div className="h-64 bg-muted rounded-lg" />
              <div className="h-64 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Photo */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-r from-primary/20 to-purple-500/20">
        <div className="absolute inset-0 bg-black/20" />
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 sm:-mt-20">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {user.name}
                    </h1>
                    {user.username && (
                      <p className="text-muted-foreground">@{user.username}</p>
                    )}
                    {user.bio && (
                      <p className="mt-2 text-sm sm:text-base">{user.bio}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!isOwnProfile && (
                      <Button
                        onClick={handleFollow}
                        variant={isFollowing ? "outline" : "default"}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    )}
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share className="h-4 w-4" />
                    </Button>
                    {isOwnProfile && (
                      <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        {user.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mt-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">{user.posts_count}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">
                      {user.followers_count}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Followers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">
                      {user.following_count}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Following
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="grid gap-6">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="liked" className="mt-6">
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No liked posts yet
                </h3>
                <p className="text-muted-foreground">
                  Posts that {isOwnProfile ? "you" : user.name} liked will
                  appear here
                </p>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {user.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.bio && (
                    <div>
                      <h4 className="font-semibold mb-2">Bio</h4>
                      <p className="text-muted-foreground">{user.bio}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-2">Joined</h4>
                    <p className="text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {user.social_links && (
                    <div>
                      <h4 className="font-semibold mb-2">Social Links</h4>
                      <div className="flex gap-2">
                        {user.social_links.twitter && (
                          <Badge variant="outline">
                            <a
                              href={user.social_links.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Twitter
                            </a>
                          </Badge>
                        )}
                        {user.social_links.linkedin && (
                          <Badge variant="outline">
                            <a
                              href={user.social_links.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              LinkedIn
                            </a>
                          </Badge>
                        )}
                        {user.social_links.github && (
                          <Badge variant="outline">
                            <a
                              href={user.social_links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              GitHub
                            </a>
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-4">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments_count}</span>
                    </div>
                    <span>{post.read_time} min read</span>
                  </div>
                </div>
                <Badge variant="secondary">{post.category}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Mock data
const mockUser: User = {
  id: "1",
  email: "john.doe@example.com",
  name: "John Doe",
  username: "johndoe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  bio: "Passionate writer and technology enthusiast. I love sharing insights about web development, AI, and the future of digital experiences.",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  social_links: {
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
  followers_count: 1234,
  following_count: 567,
  posts_count: 42,
  created_at: "2023-01-15T00:00:00Z",
  updated_at: "2024-01-15T00:00:00Z",
};

const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    content: "",
    excerpt:
      "Exploring the latest trends and technologies shaping the future of web development, from AI integration to new frameworks.",
    slug: "future-web-development-2024",
    featured_image:
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=400&q=80",
    category: "Technology",
    tags: ["web development", "AI", "trends"],
    author_id: "1",
    status: "published",
    views_count: 1543,
    likes_count: 89,
    comments_count: 23,
    read_time: 8,
    published_at: "2024-01-10T00:00:00Z",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "2",
    title: "Building Scalable React Applications: Best Practices",
    content: "",
    excerpt:
      "A comprehensive guide to building maintainable and scalable React applications with modern best practices.",
    slug: "scalable-react-applications",
    featured_image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    category: "Development",
    tags: ["React", "JavaScript", "best practices"],
    author_id: "1",
    status: "published",
    views_count: 2156,
    likes_count: 134,
    comments_count: 45,
    read_time: 12,
    published_at: "2024-01-05T00:00:00Z",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
];

export default UserProfile;
