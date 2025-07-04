import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface ReadingGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: "articles" | "minutes" | "words";
  period: "daily" | "weekly" | "monthly";
  createdAt: string;
}

interface ReadingStreak {
  current: number;
  longest: number;
  lastReadDate: string;
}

interface ReadingStats {
  totalArticlesRead: number;
  totalTimeSpent: number; // in minutes
  totalWordsRead: number;
  averageReadTime: number;
  favoriteCategories: { name: string; count: number; percentage: number }[];
  readingStreak: ReadingStreak;
  thisWeek: {
    articles: number;
    minutes: number;
    words: number;
  };
  thisMonth: {
    articles: number;
    minutes: number;
    words: number;
  };
}

interface ReadingProgressProps {
  className?: string;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  className = "",
}) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ReadingStats>(mockStats);
  const [goals, setGoals] = useState<ReadingGoal[]>(mockGoals);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "all"
  >("week");

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-gray-400";
  };

  const getCurrentPeriodStats = () => {
    switch (selectedPeriod) {
      case "week":
        return stats.thisWeek;
      case "month":
        return stats.thisMonth;
      case "all":
      default:
        return {
          articles: stats.totalArticlesRead,
          minutes: stats.totalTimeSpent,
          words: stats.totalWordsRead,
        };
    }
  };

  const currentStats = getCurrentPeriodStats();

  if (!user) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">
          Sign in to track your reading
        </h3>
        <p className="text-muted-foreground">
          Monitor your reading progress and set goals.
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 bg-background ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reading Progress</h1>
        <p className="text-muted-foreground">
          Track your reading habits and achieve your goals
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 mb-6">
        {["week", "month", "all"].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod(period as any)}
            className="capitalize"
          >
            {period === "all" ? "All Time" : `This ${period}`}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Articles Read
                    </p>
                    <p className="text-2xl font-bold">
                      {currentStats.articles}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    +{Math.floor(currentStats.articles * 0.15)} from last{" "}
                    {selectedPeriod}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Time Spent
                    </p>
                    <p className="text-2xl font-bold">
                      {formatTime(currentStats.minutes)}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Avg{" "}
                    {Math.floor(
                      currentStats.minutes / Math.max(currentStats.articles, 1),
                    )}
                    m per article
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Words Read
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(currentStats.words)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {Math.floor(
                      currentStats.words / Math.max(currentStats.articles, 1),
                    )}{" "}
                    avg per article
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reading Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Reading Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal) => {
                const percentage = Math.min(
                  (goal.current / goal.target) * 100,
                  100,
                );
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {goal.period} goal
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {goal.current} / {goal.target} {goal.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {percentage.toFixed(0)}% complete
                        </p>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    {percentage >= 100 && (
                      <Badge className="bg-green-500 text-white">
                        🎉 Goal Achieved!
                      </Badge>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Favorite Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Favorite Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.favoriteCategories.map((category, index) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                                ? "bg-green-500"
                                : index === 2
                                  ? "bg-purple-500"
                                  : "bg-gray-400"
                          }`}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {category.count} articles
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Reading Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔥 Reading Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <p className="text-3xl font-bold text-orange-500">
                    {stats.readingStreak.current}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    days current streak
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-lg font-semibold">
                    {stats.readingStreak.longest}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    longest streak
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Last read:{" "}
                    {new Date(
                      stats.readingStreak.lastReadDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. read time</span>
                <span className="font-medium">
                  {formatTime(stats.averageReadTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total articles</span>
                <span className="font-medium">{stats.totalArticlesRead}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total time</span>
                <span className="font-medium">
                  {formatTime(stats.totalTimeSpent)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Words read</span>
                <span className="font-medium">
                  {formatNumber(stats.totalWordsRead)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl mb-1">📚</div>
                  <p className="text-xs font-medium">Bookworm</p>
                  <p className="text-xs text-muted-foreground">
                    Read 50 articles
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl mb-1">⚡</div>
                  <p className="text-xs font-medium">Speed Reader</p>
                  <p className="text-xs text-muted-foreground">
                    5 articles in 1 day
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl mb-1">🎯</div>
                  <p className="text-xs font-medium">Goal Crusher</p>
                  <p className="text-xs text-muted-foreground">
                    Met weekly goal
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl mb-1">🔥</div>
                  <p className="text-xs font-medium">Streak Master</p>
                  <p className="text-xs text-muted-foreground">7-day streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Mock data
const mockStats: ReadingStats = {
  totalArticlesRead: 127,
  totalTimeSpent: 2340, // minutes
  totalWordsRead: 285000,
  averageReadTime: 18,
  favoriteCategories: [
    { name: "Technology", count: 45, percentage: 35 },
    { name: "Travel", count: 32, percentage: 25 },
    { name: "Fitness", count: 25, percentage: 20 },
    { name: "Food", count: 15, percentage: 12 },
    { name: "Art", count: 10, percentage: 8 },
  ],
  readingStreak: {
    current: 12,
    longest: 28,
    lastReadDate: "2024-01-15T10:30:00Z",
  },
  thisWeek: {
    articles: 8,
    minutes: 144,
    words: 18000,
  },
  thisMonth: {
    articles: 32,
    minutes: 576,
    words: 72000,
  },
};

const mockGoals: ReadingGoal[] = [
  {
    id: "1",
    title: "Weekly Reading Goal",
    target: 5,
    current: 8,
    unit: "articles",
    period: "weekly",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Daily Reading Time",
    target: 30,
    current: 25,
    unit: "minutes",
    period: "daily",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Monthly Word Count",
    target: 100000,
    current: 72000,
    unit: "words",
    period: "monthly",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export default ReadingProgress;
