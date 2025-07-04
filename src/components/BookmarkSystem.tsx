import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Folder,
  Plus,
  X,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  Tag,
  Eye,
  Heart,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useAuth } from "@/contexts/AuthContext";

interface BookmarkedPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  image: string;
  bookmarkedAt: string;
  readTime: string;
  tags: string[];
  metrics: {
    views: number;
    likes: number;
    comments: number;
  };
  folder?: string;
  notes?: string;
}

interface BookmarkFolder {
  id: string;
  name: string;
  description?: string;
  color: string;
  postCount: number;
  createdAt: string;
}

interface BookmarkSystemProps {
  className?: string;
}

const BookmarkSystem: React.FC<BookmarkSystemProps> = ({ className = "" }) => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkedPost[]>(mockBookmarks);
  const [folders, setFolders] = useState<BookmarkFolder[]>(mockFolders);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "title" | "author">("recent");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3b82f6");

  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
  ];

  const filteredBookmarks = bookmarks
    .filter((bookmark) => {
      const matchesFolder =
        selectedFolder === "all" || bookmark.folder === selectedFolder;
      const matchesSearch =
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesFolder && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "recent":
        default:
          return (
            new Date(b.bookmarkedAt).getTime() -
            new Date(a.bookmarkedAt).getTime()
          );
      }
    });

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: BookmarkFolder = {
        id: Date.now().toString(),
        name: newFolderName,
        description: newFolderDescription,
        color: selectedColor,
        postCount: 0,
        createdAt: new Date().toISOString(),
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
      setNewFolderDescription("");
      setShowCreateFolder(false);
    }
  };

  const handleRemoveBookmark = (bookmarkId: string) => {
    setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const BookmarkCard: React.FC<{
    bookmark: BookmarkedPost;
    isListView?: boolean;
  }> = ({ bookmark, isListView = false }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-background border rounded-lg hover:shadow-md transition-all duration-200 group ${
        isListView ? "flex items-center p-4 space-x-4" : "overflow-hidden"
      }`}
    >
      {!isListView && (
        <div className="aspect-video overflow-hidden">
          <img
            src={bookmark.image}
            alt={bookmark.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {isListView && (
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={bookmark.image}
            alt={bookmark.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={isListView ? "flex-1 min-w-0" : "p-4"}>
        <div className="flex items-start justify-between mb-2">
          <Badge
            variant="secondary"
            className="text-xs mb-2"
            style={{
              backgroundColor: `${bookmark.category === "Technology" ? "#3b82f6" : bookmark.category === "Travel" ? "#10b981" : "#8b5cf6"}20`,
            }}
          >
            {bookmark.category}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
            onClick={() => handleRemoveBookmark(bookmark.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <h3
          className={`font-semibold mb-2 line-clamp-2 hover:text-primary cursor-pointer ${
            isListView ? "text-base" : "text-lg"
          }`}
        >
          {bookmark.title}
        </h3>

        {!isListView && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {bookmark.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>by {bookmark.author}</span>
          <span>{bookmark.readTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {bookmark.metrics.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {bookmark.metrics.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {bookmark.metrics.comments}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDate(bookmark.bookmarkedAt)}
          </span>
        </div>

        {bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {bookmark.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
            {bookmark.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{bookmark.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (!user) {
    return (
      <div className="text-center py-12">
        <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Sign in to view bookmarks</h3>
        <p className="text-muted-foreground">
          Save your favorite posts and organize them into collections.
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 bg-background ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bookmarks</h1>
          <p className="text-muted-foreground">
            {bookmarks.length} saved posts across {folders.length} folders
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>
                  Organize your bookmarks into custom folders
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="folder-name">Folder Name</Label>
                  <Input
                    id="folder-name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Enter folder name"
                  />
                </div>
                <div>
                  <Label htmlFor="folder-description">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="folder-description"
                    value={newFolderDescription}
                    onChange={(e) => setNewFolderDescription(e.target.value)}
                    placeholder="Describe this folder"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Color</Label>
                  <div className="flex gap-2 mt-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded-full border-2 ${
                          selectedColor === color
                            ? "border-foreground"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateFolder(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateFolder}>Create Folder</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Folder className="h-5 w-5" />
                Folders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedFolder === "all" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFolder("all")}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                All Bookmarks
                <Badge variant="secondary" className="ml-auto">
                  {bookmarks.length}
                </Badge>
              </Button>

              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant={selectedFolder === folder.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: folder.color }}
                  />
                  {folder.name}
                  <Badge variant="secondary" className="ml-auto">
                    {folder.postCount}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={sortBy}
              onValueChange={(value: any) => setSortBy(value)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="author">Author A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookmarks Grid/List */}
          <AnimatePresence mode="wait">
            {filteredBookmarks.length > 0 ? (
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredBookmarks.map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    isListView={viewMode === "list"}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No bookmarks found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Start bookmarking posts to see them here"}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Mock data
const mockFolders: BookmarkFolder[] = [
  {
    id: "tech",
    name: "Technology",
    description: "Latest tech trends and tutorials",
    color: "#3b82f6",
    postCount: 12,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "travel",
    name: "Travel Inspiration",
    description: "Places to visit and travel tips",
    color: "#10b981",
    postCount: 8,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "fitness",
    name: "Health & Fitness",
    description: "Workout routines and wellness tips",
    color: "#8b5cf6",
    postCount: 5,
    createdAt: "2024-01-03T00:00:00Z",
  },
];

const mockBookmarks: BookmarkedPost[] = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    excerpt:
      "Exploring how artificial intelligence is transforming the way we build and interact with websites.",
    author: "Sarah Chen",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    bookmarkedAt: "2024-01-15T10:30:00Z",
    readTime: "8 min read",
    tags: ["AI", "Web Development", "Future Tech"],
    metrics: { views: 2340, likes: 189, comments: 45 },
    folder: "tech",
  },
  {
    id: "2",
    title: "Hidden Gems of Southeast Asia",
    excerpt:
      "Discover breathtaking destinations off the beaten path in Southeast Asia.",
    author: "Marcus Rodriguez",
    category: "Travel",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
    bookmarkedAt: "2024-01-14T15:45:00Z",
    readTime: "12 min read",
    tags: ["Travel", "Southeast Asia", "Adventure"],
    metrics: { views: 1890, likes: 156, comments: 32 },
    folder: "travel",
  },
  {
    id: "3",
    title: "Mindful Movement: Beyond Traditional Exercise",
    excerpt:
      "How integrating mindfulness into your fitness routine can enhance both physical and mental well-being.",
    author: "Dr. Emily Watson",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    bookmarkedAt: "2024-01-13T09:15:00Z",
    readTime: "6 min read",
    tags: ["Fitness", "Mindfulness", "Wellness"],
    metrics: { views: 1456, likes: 123, comments: 28 },
    folder: "fitness",
  },
];

export default BookmarkSystem;
