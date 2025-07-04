import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  Bookmark,
  MessageSquare,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Link,
  Download,
  Flag,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

interface PostActionsProps {
  postId: string;
  title: string;
  url?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isShared?: boolean;
  onLike?: () => void;
  onBookmark?: () => void;
  onShare?: (platform: string) => void;
  onReport?: (reason: string) => void;
  className?: string;
  variant?: "default" | "compact" | "floating";
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  title,
  url = window.location.href,
  likes = 0,
  comments = 0,
  shares = 0,
  isLiked = false,
  isBookmarked = false,
  isShared = false,
  onLike,
  onBookmark,
  onShare,
  onReport,
  className = "",
  variant = "default",
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleShare = (platform: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(
        shareUrls[platform as keyof typeof shareUrls],
        "_blank",
        "width=600,height=400",
      );
      onShare?.(platform);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        onShare?.("native");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setShowShareDialog(true);
    }
  };

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${isLiked ? "text-red-500" : ""}`}
          onClick={onLike}
        >
          <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <MessageSquare className="h-4 w-4 mr-1" />
          {comments}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={handleNativeShare}
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${isBookmarked ? "text-blue-500" : ""}`}
          onClick={onBookmark}
        >
          <Bookmark
            className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
          />
        </Button>
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 bg-background border rounded-lg shadow-lg p-2 space-y-2 z-50 ${className}`}
      >
        <Button
          variant="ghost"
          size="sm"
          className={`w-full justify-start ${isLiked ? "text-red-500" : ""}`}
          onClick={onLike}
        >
          <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
          {likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={handleNativeShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`w-full justify-start ${isBookmarked ? "text-blue-500" : ""}`}
          onClick={onBookmark}
        >
          <Bookmark
            className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
          />
          Save
        </Button>
      </motion.div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between p-4 border-t bg-background ${className}`}
    >
      <div className="flex items-center space-x-4">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : ""}`}
            onClick={onLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span>{likes}</span>
            <span className="hidden sm:inline">Likes</span>
          </Button>
        </motion.div>

        <Button variant="ghost" className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>{comments}</span>
          <span className="hidden sm:inline">Comments</span>
        </Button>

        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogTrigger asChild>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
                onClick={() => setShowShareDialog(true)}
              >
                <Share2 className="h-5 w-5" />
                <span>{shares}</span>
                <span className="hidden sm:inline">Share</span>
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share this post</DialogTitle>
              <DialogDescription>
                Share this article with your network
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input value={url} readOnly className="flex-1" />
                <Button
                  size="sm"
                  onClick={handleCopyLink}
                  className={copied ? "bg-green-500" : ""}
                >
                  {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleShare("twitter")}
                  className="flex items-center space-x-2"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("facebook")}
                  className="flex items-center space-x-2"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center space-x-2"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("email")}
                  className="flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="sm"
            className={isBookmarked ? "text-blue-500" : ""}
            onClick={onBookmark}
          >
            <Bookmark
              className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
            />
            <span className="hidden sm:inline ml-2">
              {isBookmarked ? "Saved" : "Save"}
            </span>
          </Button>
        </motion.div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleCopyLink()}>
              <Link className="h-4 w-4 mr-2" />
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onReport?.("inappropriate")}
              className="text-destructive"
            >
              <Flag className="h-4 w-4 mr-2" />
              Report Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PostActions;
