import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookOpen,
  Code,
  Globe,
  Dumbbell,
  Music,
  Utensils,
  Camera,
  Briefcase,
  Heart,
  Palette,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface CategoryNavigationProps {
  onCategorySelect?: (categoryId: string) => void;
  categories?: Category[];
}

const CategoryNavigation = ({
  onCategorySelect = () => {},
  categories = [
    {
      id: "technology",
      name: "Technology",
      icon: <Code size={18} />,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "travel",
      name: "Travel",
      icon: <Globe size={18} />,
      color: "bg-green-100 hover:bg-green-200 text-green-700",
    },
    {
      id: "fitness",
      name: "Fitness",
      icon: <Dumbbell size={18} />,
      color: "bg-red-100 hover:bg-red-200 text-red-700",
    },
    {
      id: "music",
      name: "Music",
      icon: <Music size={18} />,
      color: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    },
    {
      id: "food",
      name: "Food",
      icon: <Utensils size={18} />,
      color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
    },
    {
      id: "photography",
      name: "Photography",
      icon: <Camera size={18} />,
      color: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
    },
    {
      id: "business",
      name: "Business",
      icon: <Briefcase size={18} />,
      color: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    },
    {
      id: "health",
      name: "Health",
      icon: <Heart size={18} />,
      color: "bg-pink-100 hover:bg-pink-200 text-pink-700",
    },
    {
      id: "art",
      name: "Art",
      icon: <Palette size={18} />,
      color: "bg-amber-100 hover:bg-amber-200 text-amber-700",
    },
    {
      id: "literature",
      name: "Literature",
      icon: <BookOpen size={18} />,
      color: "bg-teal-100 hover:bg-teal-200 text-teal-700",
    },
  ],
}: CategoryNavigationProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <div className="w-full bg-background border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollArea className="w-full py-2 sm:py-3">
          <div className="flex space-x-1 sm:space-x-2 pb-0.5">
            <TooltipProvider>
              {categories.map((category) => (
                <Tooltip key={category.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`flex items-center space-x-1 sm:space-x-2 rounded-full px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 transition-all duration-200 text-xs sm:text-sm ${category.color} ${selectedCategory === category.id ? "ring-2 ring-offset-1 ring-offset-white" : ""} whitespace-nowrap`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <span className="flex-shrink-0 text-sm sm:text-base">
                        {category.icon}
                      </span>
                      <span className="font-medium hidden sm:inline">
                        {category.name}
                      </span>
                      <span className="font-medium sm:hidden text-xs">
                        {category.name.slice(0, 3)}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Explore {category.name} content</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryNavigation;
