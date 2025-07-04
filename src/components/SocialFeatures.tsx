import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  UserMinus,
  MessageCircle,
  Heart,
  Share2,
  Bell,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  Crown,
  Star,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location?: string;
  website?: string;
  joinedAt: string;
  isFollowing: boolean;
  isFollower: boolean;
  stats: {
    followers: number;
    following: number;
    posts: number;
    likes: number;
  };
  badges: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  recentActivity: Activity[];
}

interface Activity {
  id: string;
  type: "post" | "like" | "comment" | "follow";
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    postTitle?: string;
    targetUser?: string;
    likesCount?: number;
  };
}

interface SocialFeaturesProps {
  className?: string;
}

const SocialFeatures: React.FC<SocialFeaturesProps> = ({ className = "" }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);

  const handleFollow = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              isFollowing: !user.isFollowing,
              stats: {
                ...user.stats,
                followers: user.isFollowing
                  ? user.stats.followers - 1
                  : user.stats.followers + 1,
              },
            }
          : user,
      ),
    );
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      // In a real app, this would send the message
      console.log(`Sending message to ${selectedUser.name}: ${messageText}`);
      setMessageText("");
      setShowMessageDialog(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
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

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Top Contributor":
        return <Crown className="h-3 w-3" />;
      case "Rising Star":
        return <Star className="h-3 w-3" />;
      case "Community Champion":
        return <Award className="h-3 w-3" />;
      case "Trending Writer":
        return <TrendingUp className="h-3 w-3" />;
      default:
        return <Badge className="h-3 w-3" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Top Contributor":
        return "bg-yellow-500 text-white";
      case "Rising Star":
        return "bg-blue-500 text-white";
      case "Community Champion":
        return "bg-purple-500 text-white";
      case "Trending Writer":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const UserCard: React.FC<{
    user: UserProfile;
    showFullProfile?: boolean;
  }> = ({ user, showFullProfile = false }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{user.name}</h3>
                {user.badges.length > 0 && (
                  <Badge
                    className={`text-xs px-1 py-0 ${getBadgeColor(user.badges[0])}`}
                  >
                    {getBadgeIcon(user.badges[0])}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              {user.location && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {user.location}
                  </span>
                </div>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(user);
                  setShowMessageDialog(true);
                }}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-muted-foreground">
                <Bell className="h-4 w-4 mr-2" />
                Mute Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {user.bio}
        </p>

        {/* Social Links */}
        {Object.keys(user.socialLinks).length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            {user.socialLinks.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4 text-muted-foreground hover:text-blue-500 transition-colors" />
              </a>
            )}
            {user.socialLinks.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
              </a>
            )}
            {user.socialLinks.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 text-muted-foreground hover:text-gray-900 transition-colors" />
              </a>
            )}
            {user.website && (
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                <LinkIcon className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center space-x-4">
            <span>
              <strong>{user.stats.followers}</strong> followers
            </span>
            <span>
              <strong>{user.stats.following}</strong> following
            </span>
            <span>
              <strong>{user.stats.posts}</strong> posts
            </span>
          </div>
        </div>

        {/* Badges */}
        {user.badges.length > 1 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {user.badges.slice(1, 4).map((badge) => (
              <Badge
                key={badge}
                variant="outline"
                className="text-xs px-2 py-0"
              >
                {badge}
              </Badge>
            ))}
            {user.badges.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-0">
                +{user.badges.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Recent Activity (if showing full profile) */}
        {showFullProfile && user.recentActivity.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Recent Activity</h4>
            <div className="space-y-2">
              {user.recentActivity.slice(0, 3).map((activity) => (
                <div key={activity.id} className="text-sm">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {activity.description} • {formatDate(activity.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant={user.isFollowing ? "outline" : "default"}
            size="sm"
            onClick={() => handleFollow(user.id)}
            className="flex-1"
          >
            {user.isFollowing ? (
              <>
                <UserMinus className="h-4 w-4 mr-2" />
                Unfollow
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedUser(user);
              setShowMessageDialog(true);
            }}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (!user) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">
          Sign in to connect with others
        </h3>
        <p className="text-muted-foreground">
          Discover writers, follow your favorites, and build your network.
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 bg-background ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">
            Connect with {users.length}+ writers and readers in our community
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers
              .filter((u) => u.isFollowing)
              .map((user) => (
                <UserCard key={user.id} user={user} showFullProfile />
              ))}
          </div>
          {filteredUsers.filter((u) => u.isFollowing).length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No one followed yet</h3>
              <p className="text-muted-foreground">
                Start following writers to see their updates here.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="followers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers
              .filter((u) => u.isFollower)
              .map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </div>
          {filteredUsers.filter((u) => u.isFollower).length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No followers yet</h3>
              <p className="text-muted-foreground">
                Share great content to attract followers.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggested" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers
              .filter((u) => !u.isFollowing && u.stats.followers > 50)
              .map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a private message to {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowMessageDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Mock data
const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Tech writer and AI enthusiast. Sharing insights about the future of technology and its impact on society.",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    joinedAt: "2023-01-15T00:00:00Z",
    isFollowing: true,
    isFollower: false,
    stats: { followers: 1247, following: 89, posts: 45, likes: 2340 },
    badges: ["Top Contributor", "Tech Expert", "Rising Star"],
    socialLinks: {
      twitter: "https://twitter.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
    },
    recentActivity: [
      {
        id: "1",
        type: "post",
        title: "Published a new article",
        description: "The Future of AI in Web Development",
        timestamp: "2024-01-15T10:30:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    username: "marcusr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    bio: "Travel photographer and storyteller. Documenting adventures from around the world.",
    location: "Barcelona, Spain",
    joinedAt: "2023-03-20T00:00:00Z",
    isFollowing: false,
    isFollower: true,
    stats: { followers: 892, following: 156, posts: 38, likes: 1890 },
    badges: ["Community Champion", "Travel Expert"],
    socialLinks: {
      twitter: "https://twitter.com/marcusr",
      linkedin: "https://linkedin.com/in/marcusr",
    },
    recentActivity: [],
  },
  {
    id: "3",
    name: "Dr. Emily Watson",
    username: "drwatson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    bio: "Wellness coach and mindfulness expert. Helping people find balance in their daily lives.",
    location: "London, UK",
    website: "https://emilywatson.health",
    joinedAt: "2023-02-10T00:00:00Z",
    isFollowing: true,
    isFollower: true,
    stats: { followers: 634, following: 78, posts: 32, likes: 1456 },
    badges: ["Trending Writer", "Health Expert"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/emilywatson",
    },
    recentActivity: [],
  },
  {
    id: "4",
    name: "Chef Maria Santos",
    username: "chefmaria",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    bio: "Professional chef sharing recipes and culinary techniques. Passionate about sustainable cooking.",
    location: "Mexico City, Mexico",
    joinedAt: "2023-04-05T00:00:00Z",
    isFollowing: false,
    isFollower: false,
    stats: { followers: 756, following: 123, posts: 29, likes: 987 },
    badges: ["Rising Star", "Food Expert"],
    socialLinks: {
      twitter: "https://twitter.com/chefmaria",
    },
    recentActivity: [],
  },
  {
    id: "5",
    name: "Alex Kim",
    username: "alexkim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "Fitness trainer and nutrition specialist. Helping people achieve their health goals.",
    location: "Seoul, South Korea",
    joinedAt: "2023-05-12T00:00:00Z",
    isFollowing: false,
    isFollower: false,
    stats: { followers: 423, following: 67, posts: 27, likes: 654 },
    badges: ["Fitness Expert"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexkim",
      github: "https://github.com/alexkim",
    },
    recentActivity: [],
  },
];

export default SocialFeatures;
