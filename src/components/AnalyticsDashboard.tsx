import { useState, useEffect, lazy, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Lazy load chart components for better performance
const BarChart = lazy(() =>
  import("recharts").then((module) => ({ default: module.BarChart })),
);
const Bar = lazy(() =>
  import("recharts").then((module) => ({ default: module.Bar })),
);
const XAxis = lazy(() =>
  import("recharts").then((module) => ({ default: module.XAxis })),
);
const YAxis = lazy(() =>
  import("recharts").then((module) => ({ default: module.YAxis })),
);
const CartesianGrid = lazy(() =>
  import("recharts").then((module) => ({ default: module.CartesianGrid })),
);
const Tooltip = lazy(() =>
  import("recharts").then((module) => ({ default: module.Tooltip })),
);
const ResponsiveContainer = lazy(() =>
  import("recharts").then((module) => ({
    default: module.ResponsiveContainer,
  })),
);
const LineChart = lazy(() =>
  import("recharts").then((module) => ({ default: module.LineChart })),
);
const Line = lazy(() =>
  import("recharts").then((module) => ({ default: module.Line })),
);
const PieChart = lazy(() =>
  import("recharts").then((module) => ({ default: module.PieChart })),
);
const Pie = lazy(() =>
  import("recharts").then((module) => ({ default: module.Pie })),
);
const Cell = lazy(() =>
  import("recharts").then((module) => ({ default: module.Cell })),
);
import {
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Users,
  Calendar,
} from "lucide-react";

// Mock data for demonstration
const mockViewsData = [
  { date: "2024-01-01", views: 120, likes: 15, comments: 8 },
  { date: "2024-01-02", views: 180, likes: 22, comments: 12 },
  { date: "2024-01-03", views: 150, likes: 18, comments: 6 },
  { date: "2024-01-04", views: 220, likes: 28, comments: 15 },
  { date: "2024-01-05", views: 190, likes: 25, comments: 10 },
  { date: "2024-01-06", views: 280, likes: 35, comments: 18 },
  { date: "2024-01-07", views: 320, likes: 42, comments: 22 },
];

const mockCategoryData = [
  { name: "Technology", value: 35, color: "#3b82f6" },
  { name: "Lifestyle", value: 25, color: "#10b981" },
  { name: "Travel", value: 20, color: "#f59e0b" },
  { name: "Food", value: 15, color: "#ef4444" },
  { name: "Other", value: 5, color: "#8b5cf6" },
];

const mockTopPosts = [
  {
    title: "Getting Started with React Hooks",
    views: 1250,
    likes: 89,
    comments: 34,
    shares: 23,
    engagement_rate: 11.7,
    avg_read_time: "4:32",
    bounce_rate: 32,
    conversion_rate: 2.8,
  },
  {
    title: "The Future of Web Development",
    views: 980,
    likes: 67,
    comments: 28,
    shares: 18,
    engagement_rate: 11.5,
    avg_read_time: "6:15",
    bounce_rate: 28,
    conversion_rate: 3.2,
  },
  {
    title: "Building Responsive Layouts",
    views: 750,
    likes: 45,
    comments: 19,
    shares: 12,
    engagement_rate: 10.1,
    avg_read_time: "3:45",
    bounce_rate: 35,
    conversion_rate: 2.1,
  },
  {
    title: "JavaScript Best Practices",
    views: 650,
    likes: 38,
    comments: 15,
    shares: 8,
    engagement_rate: 9.4,
    avg_read_time: "5:20",
    bounce_rate: 40,
    conversion_rate: 1.9,
  },
];

const mockContentPerformance = [
  { date: "2024-01-01", posts: 3, avg_engagement: 8.5, total_reach: 2400 },
  { date: "2024-01-02", posts: 2, avg_engagement: 12.3, total_reach: 1800 },
  { date: "2024-01-03", posts: 4, avg_engagement: 9.7, total_reach: 3200 },
  { date: "2024-01-04", posts: 1, avg_engagement: 15.2, total_reach: 1200 },
  { date: "2024-01-05", posts: 3, avg_engagement: 11.8, total_reach: 2800 },
  { date: "2024-01-06", posts: 2, avg_engagement: 13.4, total_reach: 2100 },
  { date: "2024-01-07", posts: 5, avg_engagement: 10.9, total_reach: 4200 },
];

const mockAudienceData = [
  { age_group: "18-24", percentage: 15, growth: "+2.3%" },
  { age_group: "25-34", percentage: 35, growth: "+5.1%" },
  { age_group: "35-44", percentage: 28, growth: "+1.8%" },
  { age_group: "45-54", percentage: 15, growth: "-0.5%" },
  { age_group: "55+", percentage: 7, growth: "+0.8%" },
];

const mockTrafficSources = [
  { source: "Direct", visitors: 4200, percentage: 35 },
  { source: "Social Media", visitors: 3600, percentage: 30 },
  { source: "Search Engines", visitors: 2400, percentage: 20 },
  { source: "Referrals", visitors: 1200, percentage: 10 },
  { source: "Email", visitors: 600, percentage: 5 },
];

interface AnalyticsDashboardProps {
  authorName?: string;
}

export default function AnalyticsDashboard({
  authorName = "John Doe",
}: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState("7d");
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    // Calculate totals from mock data
    const views = mockViewsData.reduce((sum, day) => sum + day.views, 0);
    const likes = mockViewsData.reduce((sum, day) => sum + day.likes, 0);
    const comments = mockViewsData.reduce((sum, day) => sum + day.comments, 0);

    setTotalViews(views);
    setTotalLikes(likes);
    setTotalComments(comments);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {authorName}!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button
              variant={timeRange === "7d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("7d")}
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === "30d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("30d")}
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === "90d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("90d")}
            >
              90 Days
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalLikes.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Comments
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalComments.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15.3%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+0.8%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Views Over Time */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>Daily views for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="h-[300px] bg-muted animate-pulse rounded" />
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockViewsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    className="text-muted-foreground"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Suspense>
          </CardContent>
        </Card>

        {/* Engagement Metrics */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>Likes and comments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="h-[300px] bg-muted animate-pulse rounded" />
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockViewsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    className="text-muted-foreground"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="likes" fill="#ef4444" />
                  <Bar dataKey="comments" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Content Performance Over Time */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>
              Posts published and engagement rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="h-[300px] bg-muted animate-pulse rounded" />
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockContentPerformance}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    className="text-muted-foreground"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="posts" fill="#3b82f6" name="Posts Published" />
                  <Bar
                    dataKey="avg_engagement"
                    fill="#10b981"
                    name="Avg Engagement %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Suspense>
          </CardContent>
        </Card>

        {/* Audience Demographics */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Age distribution of your readers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAudienceData.map((demo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{demo.age_group}</div>
                    <div className="flex-1 bg-muted rounded-full h-2 min-w-[100px]">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${demo.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{demo.percentage}%</span>
                    <span
                      className={`text-xs ${
                        demo.growth.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {demo.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              Where your readers are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTrafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{source.source}</div>
                    <div className="flex-1 bg-muted rounded-full h-2 min-w-[80px]">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {source.visitors.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card className="lg:col-span-2 bg-card">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>
              Detailed performance metrics for your best content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopPosts.map((post, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-foreground flex-1 pr-4">
                      {post.title}
                    </h4>
                    <div className="text-2xl font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-muted-foreground">Views:</span>
                      <span className="font-medium">
                        {post.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-muted-foreground">Likes:</span>
                      <span className="font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">Comments:</span>
                      <span className="font-medium">{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <span className="text-muted-foreground">Engagement:</span>
                      <span className="font-medium">
                        {post.engagement_rate}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    <div>
                      <span>Avg. Read Time: </span>
                      <span className="font-medium">{post.avg_read_time}</span>
                    </div>
                    <div>
                      <span>Bounce Rate: </span>
                      <span className="font-medium">{post.bounce_rate}%</span>
                    </div>
                    <div>
                      <span>Conversion: </span>
                      <span className="font-medium">
                        {post.conversion_rate}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
