import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Heart,
  MessageSquare,
  UserPlus,
  AtSign,
  Mail,
  Check,
  X,
  Settings,
} from "lucide-react";
import { Notification } from "@/types/database";

interface NotificationsProps {
  className?: string;
}

const Notifications: React.FC<NotificationsProps> = ({ className = "" }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "mention":
        return <AtSign className="h-4 w-4 text-purple-500" />;
      case "newsletter":
        return <Mail className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  if (!user) return null;

  return (
    <div className={className}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </motion.span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 max-h-96 overflow-y-auto"
        >
          <div className="flex items-center justify-between p-2">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <div className="flex gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <DropdownMenuSeparator />

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuItem
                      className={`p-3 cursor-pointer hover:bg-accent ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium line-clamp-1">
                                {notification.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                {notification.actor && (
                                  <Avatar className="h-4 w-4">
                                    <AvatarImage
                                      src={notification.actor.avatar}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {notification.actor.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(notification.created_at)}
                                </span>
                                {!notification.read && (
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                )}
                              </div>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {notifications.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-primary cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Real-time notification hook
export const useRealTimeNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;

    // Simulate real-time notifications
    const interval = setInterval(() => {
      // In a real app, this would be a WebSocket connection or Server-Sent Events
      const randomNotification: Notification = {
        id: Date.now().toString(),
        type: ["like", "comment", "follow"][
          Math.floor(Math.random() * 3)
        ] as any,
        title: "New notification",
        message: "You have a new interaction",
        user_id: user.id,
        read: false,
        created_at: new Date().toISOString(),
      };

      if (Math.random() > 0.8) {
        // 20% chance every 30 seconds
        setNotifications((prev) => [randomNotification, ...prev].slice(0, 50));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [user]);

  return notifications;
};

// Mock data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "New like on your post",
    message: 'Sarah Chen liked your post "The Future of Web Development"',
    user_id: "1",
    actor_id: "2",
    actor: {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    post_id: "1",
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: "2",
    type: "comment",
    title: "New comment on your post",
    message:
      'Marcus Rodriguez commented on "Building Scalable React Applications"',
    user_id: "1",
    actor_id: "3",
    actor: {
      id: "3",
      name: "Marcus Rodriguez",
      email: "marcus@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    post_id: "2",
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "3",
    type: "follow",
    title: "New follower",
    message: "Emily Watson started following you",
    user_id: "1",
    actor_id: "4",
    actor: {
      id: "4",
      name: "Emily Watson",
      email: "emily@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "4",
    type: "newsletter",
    title: "Weekly Newsletter",
    message: "Your weekly digest of top posts is ready",
    user_id: "1",
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

export default Notifications;
