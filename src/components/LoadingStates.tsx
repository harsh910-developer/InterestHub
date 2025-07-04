import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Post Card Skeleton
export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="bg-card rounded-lg border p-4 space-y-4 animate-pulse">
      <div className="aspect-video bg-muted rounded-lg" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded" />
        <div className="h-3 bg-muted rounded w-5/6" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-muted rounded-full" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
        <div className="h-3 bg-muted rounded w-12" />
      </div>
    </div>
  );
};

// Hero Section Skeleton
export const HeroSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg p-8 space-y-6 animate-pulse">
      <div className="text-center space-y-4">
        <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
        <div className="h-6 bg-muted rounded w-1/2 mx-auto" />
        <div className="h-4 bg-muted rounded w-2/3 mx-auto" />
        <div className="h-10 bg-muted rounded w-32 mx-auto" />
      </div>
    </div>
  );
};

// Loading Spinner
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
};

// Pulse Loader
export const PulseLoader: React.FC = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Content Loading Skeleton
export const ContentSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-muted rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
    </div>
  );
};

// Grid Skeleton
export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};
