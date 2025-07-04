import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Mail,
  Check,
  X,
  Settings,
  Calendar,
  Tag,
  Users,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NewsletterSubscription } from "@/types/database";

interface EmailNewsletterProps {
  variant?: "inline" | "modal" | "sidebar";
  className?: string;
}

const EmailNewsletter: React.FC<EmailNewsletterProps> = ({
  variant = "inline",
  className = "",
}) => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { id: "technology", name: "Technology", icon: "💻" },
    { id: "travel", name: "Travel", icon: "✈️" },
    { id: "fitness", name: "Fitness", icon: "💪" },
    { id: "food", name: "Food", icon: "🍳" },
    { id: "art", name: "Art & Culture", icon: "🎨" },
    { id: "business", name: "Business", icon: "💼" },
    { id: "health", name: "Health", icon: "🏥" },
    { id: "music", name: "Music", icon: "🎵" },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || selectedCategories.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const subscription: NewsletterSubscription = {
        id: Date.now().toString(),
        email,
        user_id: user?.id,
        categories: selectedCategories,
        frequency,
        active: true,
        confirmed: false, // Would be confirmed via email
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setIsSubscribed(true);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(false);
      setSelectedCategories([]);
    } catch (error) {
      console.error("Unsubscribe failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const NewsletterForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
        >
          <Check className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">
              Successfully subscribed!
            </p>
            <p className="text-green-600 text-sm">
              Check your email to confirm your subscription.
            </p>
          </div>
        </motion.div>
      )}

      {isSubscribed ? (
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <Check className="h-5 w-5" />
            <span className="font-medium">You're subscribed!</span>
          </div>
          <p className="text-muted-foreground text-sm">
            You'll receive {frequency} updates about {selectedCategories.length}{" "}
            categories.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId);
              return category ? (
                <Badge key={categoryId} variant="secondary">
                  {category.icon} {category.name}
                </Badge>
              ) : null;
            })}
          </div>
          <div className="flex gap-2 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage Newsletter Subscription</DialogTitle>
                  <DialogDescription>
                    Update your newsletter preferences
                  </DialogDescription>
                </DialogHeader>
                <NewsletterSettings />
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              onClick={handleUnsubscribe}
              disabled={isLoading}
            >
              Unsubscribe
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Categories of Interest</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <Label
                    htmlFor={category.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.icon} {category.name}
                  </Label>
                </div>
              ))}
            </div>
            {selectedCategories.length === 0 && (
              <p className="text-sm text-red-500">
                Please select at least one category
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select
              value={frequency}
              onValueChange={(value: any) => setFrequency(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !email || selectedCategories.length === 0}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : (
              <Mail className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>
        </form>
      )}
    </motion.div>
  );

  const NewsletterSettings = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label>Update Categories</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`settings-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <Label
                htmlFor={`settings-${category.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.icon} {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Frequency</Label>
        <Select
          value={frequency}
          onValueChange={(value: any) => setFrequency(value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1">Save Changes</Button>
        <Button variant="outline" onClick={handleUnsubscribe}>
          Unsubscribe
        </Button>
      </div>
    </div>
  );

  if (variant === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Newsletter
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
            <DialogDescription>
              Get the latest posts and updates delivered to your inbox
            </DialogDescription>
          </DialogHeader>
          <NewsletterForm />
        </DialogContent>
      </Dialog>
    );
  }

  if (variant === "sidebar") {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NewsletterForm />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`max-w-2xl mx-auto ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Mail className="h-6 w-6" />
          Stay Updated
        </CardTitle>
        <p className="text-muted-foreground">
          Get the latest posts and insights delivered directly to your inbox
        </p>
      </CardHeader>
      <CardContent>
        <NewsletterForm />
      </CardContent>
    </Card>
  );
};

// Newsletter stats component for admin/analytics
export const NewsletterStats: React.FC = () => {
  const stats = {
    totalSubscribers: 12543,
    activeSubscribers: 11876,
    openRate: 68.5,
    clickRate: 12.3,
    growthRate: 8.2,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Total Subscribers</span>
          </div>
          <div className="text-2xl font-bold mt-2">
            {stats.totalSubscribers.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Active</span>
          </div>
          <div className="text-2xl font-bold mt-2">
            {stats.activeSubscribers.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Open Rate</span>
          </div>
          <div className="text-2xl font-bold mt-2">{stats.openRate}%</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Click Rate</span>
          </div>
          <div className="text-2xl font-bold mt-2">{stats.clickRate}%</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">Growth Rate</span>
          </div>
          <div className="text-2xl font-bold mt-2">+{stats.growthRate}%</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailNewsletter;
