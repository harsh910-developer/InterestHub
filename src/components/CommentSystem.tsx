import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageSquare,
  Reply,
  MoreHorizontal,
  Flag,
  Edit,
  Trash2,
  Send,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    verified?: boolean;
  };
  createdAt: string;
  updatedAt?: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
  isLiked?: boolean;
  isDisliked?: boolean;
  isEdited?: boolean;
  parentId?: string;
}

interface CommentSystemProps {
  postId: string;
  comments?: Comment[];
  currentUserId?: string;
  onAddComment?: (content: string, parentId?: string) => void;
  onEditComment?: (commentId: string, content: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onLikeComment?: (commentId: string) => void;
  onDislikeComment?: (commentId: string) => void;
  onReportComment?: (commentId: string, reason: string) => void;
}

const CommentSystem: React.FC<CommentSystemProps> = ({
  postId,
  comments = defaultComments,
  currentUserId = "current-user",
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onDislikeComment,
  onReportComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest",
  );

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment, replyingTo || undefined);
      setNewComment("");
      setReplyingTo(null);
    }
  };

  const handleEditComment = (commentId: string) => {
    if (editContent.trim()) {
      onEditComment?.(commentId, editContent);
      setEditingComment(null);
      setEditContent("");
    }
  };

  const startEdit = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
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
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const sortComments = (comments: Comment[]) => {
    return [...comments].sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.likes - a.likes;
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
  };

  const CommentItem: React.FC<{ comment: Comment; depth?: number }> = ({
    comment,
    depth = 0,
  }) => {
    const [showReplies, setShowReplies] = useState(true);
    const isCurrentUser = comment.author.id === currentUserId;
    const maxDepth = 3;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${depth > 0 ? "ml-8 border-l-2 border-muted pl-4" : ""} mb-4`}
      >
        <div className="bg-background rounded-lg p-4 border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={comment.author.avatar}
                  alt={comment.author.name}
                />
                <AvatarFallback>
                  {comment.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">
                    {comment.author.name}
                  </span>
                  {comment.author.verified && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      ✓
                    </Badge>
                  )}
                  {isCurrentUser && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      You
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{formatTimeAgo(comment.createdAt)}</span>
                  {comment.isEdited && <span>• edited</span>}
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isCurrentUser ? (
                  <>
                    <DropdownMenuItem onClick={() => startEdit(comment)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteComment?.(comment.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem
                    onClick={() =>
                      onReportComment?.(comment.id, "inappropriate")
                    }
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {editingComment === comment.id ? (
            <div className="space-y-3">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Edit your comment..."
                className="min-h-[80px]"
              />
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleEditComment(comment.id)}
                  disabled={!editContent.trim()}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingComment(null);
                    setEditContent("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm mb-3 leading-relaxed">{comment.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-2 ${comment.isLiked ? "text-red-500" : ""}`}
                    onClick={() => onLikeComment?.(comment.id)}
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-2 ${comment.isDisliked ? "text-blue-500" : ""}`}
                    onClick={() => onDislikeComment?.(comment.id)}
                  >
                    <ThumbsDown className="h-3 w-3 mr-1" />
                    {comment.dislikes}
                  </Button>
                  {depth < maxDepth && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  )}
                </div>
                {comment.replies.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-xs"
                  >
                    {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
                    replies
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Reply Form */}
        <AnimatePresence>
          {replyingTo === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 ml-8"
            >
              <div className="bg-muted/50 rounded-lg p-3 border">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`Reply to ${comment.author.name}...`}
                  className="mb-3 min-h-[60px] bg-background"
                />
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setReplyingTo(null);
                      setNewComment("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replies */}
        <AnimatePresence>
          {showReplies && comment.replies.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3"
            >
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const sortedComments = sortComments(comments);

  return (
    <div className="w-full max-w-4xl mx-auto bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Comments ({comments.length})
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === "newest" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortBy("newest")}
          >
            Newest
          </Button>
          <Button
            variant={sortBy === "popular" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortBy("popular")}
          >
            Popular
          </Button>
          <Button
            variant={sortBy === "oldest" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortBy("oldest")}
          >
            Oldest
          </Button>
        </div>
      </div>

      {/* New Comment Form */}
      {!replyingTo && (
        <div className="bg-muted/30 rounded-lg p-4 border mb-6">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=current-user`}
                alt="You"
              />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="mb-3 min-h-[80px] bg-background"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Be respectful and constructive in your comments
                </span>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="ml-auto"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Separator className="mb-6" />

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {sortedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </AnimatePresence>
        {comments.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium mb-2">No comments yet</h4>
            <p className="text-muted-foreground">
              Be the first to share your thoughts on this post!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Default comments data for demonstration
const defaultComments: Comment[] = [
  {
    id: "1",
    content:
      "This is a fantastic article! I really appreciate the detailed analysis and practical examples. The insights about AI in web development are particularly valuable.",
    author: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      verified: true,
    },
    createdAt: "2024-01-15T10:30:00Z",
    likes: 12,
    dislikes: 0,
    isLiked: false,
    replies: [
      {
        id: "2",
        content:
          "I completely agree! The section on automated code generation was eye-opening.",
        author: {
          id: "user-2",
          name: "Mike Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
        },
        createdAt: "2024-01-15T11:15:00Z",
        likes: 5,
        dislikes: 0,
        replies: [],
        parentId: "1",
      },
    ],
  },
  {
    id: "3",
    content:
      "Great read! I've been experimenting with some of these AI tools myself. Would love to see a follow-up article with more specific implementation examples.",
    author: {
      id: "user-3",
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    createdAt: "2024-01-15T14:20:00Z",
    likes: 8,
    dislikes: 1,
    replies: [],
  },
  {
    id: "4",
    content:
      "While I appreciate the optimism about AI, I think we should also discuss the potential challenges and limitations. What about code quality and maintainability?",
    author: {
      id: "user-4",
      name: "Dr. Emily Watson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      verified: true,
    },
    createdAt: "2024-01-15T16:45:00Z",
    likes: 15,
    dislikes: 2,
    replies: [
      {
        id: "5",
        content:
          "That's a valid point, Dr. Watson. I think the key is using AI as a tool to augment human creativity rather than replace it entirely.",
        author: {
          id: "current-user",
          name: "You",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=current-user",
        },
        createdAt: "2024-01-15T17:30:00Z",
        likes: 3,
        dislikes: 0,
        replies: [],
        parentId: "4",
      },
    ],
  },
];

export default CommentSystem;
