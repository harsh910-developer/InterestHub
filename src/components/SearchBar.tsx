import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Filter,
  Loader2,
  TrendingUp,
  Clock,
  User,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface SearchBarProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  className?: string;
  enableAdvancedSearch?: boolean;
}

interface SearchFilters {
  categories: string[];
  date: string;
  popularity: string;
  authors: string[];
  tags: string[];
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: "query" | "post" | "author" | "tag";
  category?: string;
  metadata?: {
    views?: number;
    trending?: boolean;
    author?: string;
  };
}

const SearchBar = ({
  onSearch = () => {},
  className = "",
  enableAdvancedSearch = true,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    date: "any",
    popularity: "any",
    authors: [],
    tags: [],
  });

  // Mock categories for the filter
  const categories = [
    { label: "Technology", value: "technology" },
    { label: "Travel", value: "travel" },
    { label: "Fitness", value: "fitness" },
    { label: "Food", value: "food" },
    { label: "Art", value: "art" },
    { label: "Music", value: "music" },
  ];

  // Mock date filters
  const dateFilters = [
    { label: "Any time", value: "any" },
    { label: "Today", value: "today" },
    { label: "This week", value: "week" },
    { label: "This month", value: "month" },
    { label: "This year", value: "year" },
  ];

  // Mock popularity filters
  const popularityFilters = [
    { label: "Any", value: "any" },
    { label: "Most viewed", value: "views" },
    { label: "Most liked", value: "likes" },
    { label: "Most commented", value: "comments" },
  ];

  // Enhanced mock suggestions with metadata
  const mockSuggestions: SearchSuggestion[] = [
    {
      id: "1",
      text: "community blog tips",
      type: "query",
      metadata: { trending: true },
    },
    {
      id: "2",
      text: "The Future of AI in Web Development",
      type: "post",
      category: "Technology",
      metadata: { views: 2340, author: "Sarah Chen" },
    },
    { id: "3", text: "how to write engaging content", type: "query" },
    {
      id: "4",
      text: "Sarah Chen",
      type: "author",
      metadata: { trending: true },
    },
    { id: "5", text: "best blogging platforms", type: "query" },
    { id: "6", text: "content creation strategies", type: "query" },
    { id: "7", text: "Marcus Rodriguez", type: "author" },
    {
      id: "8",
      text: "Hidden Gems: Southeast Asia Travel",
      type: "post",
      category: "Travel",
      metadata: { views: 1890, author: "Marcus Rodriguez" },
    },
    { id: "9", text: "growing your blog audience", type: "query" },
    { id: "10", text: "blog monetization", type: "query" },
    { id: "11", text: "SEO", type: "tag", metadata: { trending: true } },
    { id: "12", text: "photography for blog posts", type: "query" },
    { id: "13", text: "Dr. Emily Watson", type: "author" },
    { id: "14", text: "mindfulness", type: "tag" },
    {
      id: "15",
      text: "Plant-Based Cooking for Beginners",
      type: "post",
      category: "Food",
      metadata: { views: 987, author: "Chef Maria Santos" },
    },
  ];

  // Simulate API search with debouncing
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const filtered = mockSuggestions.filter((suggestion) =>
      suggestion.text.toLowerCase().includes(query.toLowerCase()),
    );

    // Add recent searches if query matches
    const recentMatches = recentSearches
      .filter((recent) => recent.toLowerCase().includes(query.toLowerCase()))
      .map((recent, index) => ({
        id: `recent-${index}`,
        text: recent,
        type: "query" as const,
      }));

    const combinedSuggestions = [...recentMatches, ...filtered].slice(0, 8);
    setSuggestions(combinedSuggestions);
    setIsOpen(combinedSuggestions.length > 0);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.text);
    setIsOpen(false);

    // Add to recent searches
    const updatedRecent = [
      suggestion.text,
      ...recentSearches.filter((s) => s !== suggestion.text),
    ].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

    onSearch(suggestion.text, filters);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Add to recent searches
      const updatedRecent = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

      onSearch(searchQuery, filters);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setIsOpen(false);
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const toggleAuthor = (author: string) => {
    setFilters((prev) => {
      const authors = prev.authors.includes(author)
        ? prev.authors.filter((a) => a !== author)
        : [...prev.authors, author];
      return { ...prev, authors };
    });
  };

  const toggleTag = (tag: string) => {
    setFilters((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const setDateFilter = (date: string) => {
    setFilters((prev) => ({ ...prev, date }));
  };

  const setPopularityFilter = (popularity: string) => {
    setFilters((prev) => ({ ...prev, popularity }));
  };

  const getActiveFilterCount = () => {
    return (
      filters.categories.length +
      filters.authors.length +
      filters.tags.length +
      (filters.date !== "any" ? 1 : 0) +
      (filters.popularity !== "any" ? 1 : 0)
    );
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "post":
        return <Search className="h-3 w-3" />;
      case "author":
        return <User className="h-3 w-3" />;
      case "tag":
        return <TrendingUp className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full rounded-lg border border-input bg-background shadow-sm transition-all focus-within:shadow-md">
        <div className="flex-1 flex items-center relative">
          <Search className="absolute left-2 sm:left-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search topics, posts, authors..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="pl-8 sm:pl-10 pr-16 sm:pr-20 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base h-8 sm:h-10"
          />
          <div className="absolute right-1 sm:right-2 flex items-center gap-1">
            {isLoading && (
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-muted-foreground" />
            )}
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 sm:h-6 sm:w-6 p-0"
                onClick={clearSearch}
              >
                <X className="h-2 w-2 sm:h-3 sm:w-3" />
              </Button>
            )}
          </div>
        </div>

        {enableAdvancedSearch && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mr-0.5 sm:mr-1 relative h-8 w-8 sm:h-10 sm:w-10"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-primary text-[8px] sm:text-[10px] text-primary-foreground flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.value}
                  checked={filters.categories.includes(category.value)}
                  onCheckedChange={() => toggleCategory(category.value)}
                >
                  {category.label}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Authors</DropdownMenuLabel>
              {[
                "Sarah Chen",
                "Marcus Rodriguez",
                "Dr. Emily Watson",
                "Chef Maria Santos",
              ].map((author) => (
                <DropdownMenuCheckboxItem
                  key={author}
                  checked={filters.authors.includes(author)}
                  onCheckedChange={() => toggleAuthor(author)}
                >
                  {author}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Tags</DropdownMenuLabel>
              {["SEO", "AI", "Photography", "Monetization", "Mindfulness"].map(
                (tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={filters.tags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ),
              )}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Date</DropdownMenuLabel>
              {dateFilters.map((date) => (
                <DropdownMenuCheckboxItem
                  key={date.value}
                  checked={filters.date === date.value}
                  onCheckedChange={() => setDateFilter(date.value)}
                >
                  {date.label}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Popularity</DropdownMenuLabel>
              {popularityFilters.map((pop) => (
                <DropdownMenuCheckboxItem
                  key={pop.value}
                  checked={filters.popularity === pop.value}
                  onCheckedChange={() => setPopularityFilter(pop.value)}
                >
                  {pop.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button
          onClick={handleSearch}
          className="rounded-l-none text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10"
        >
          <span className="hidden sm:inline">Search</span>
          <Search className="h-3 w-3 sm:hidden" />
        </Button>
      </div>

      {isOpen && (suggestions.length > 0 || isLoading) && (
        <div className="absolute w-full mt-1 z-50">
          <Command className="rounded-lg border shadow-md bg-background">
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Searching...
                  </span>
                </div>
              ) : (
                <>
                  {recentSearches.length > 0 && searchQuery.length === 0 && (
                    <CommandGroup heading="Recent Searches">
                      {recentSearches.slice(0, 3).map((recent, index) => (
                        <CommandItem
                          key={`recent-${index}`}
                          onSelect={() =>
                            handleSelectSuggestion({
                              id: `recent-${index}`,
                              text: recent,
                              type: "query",
                            })
                          }
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{recent}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {suggestions.length > 0 && (
                    <CommandGroup heading="Suggestions">
                      {suggestions.map((suggestion) => (
                        <CommandItem
                          key={suggestion.id}
                          onSelect={() => handleSelectSuggestion(suggestion)}
                          className="cursor-pointer flex items-center gap-2 py-2"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            {getSuggestionIcon(suggestion.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span>{suggestion.text}</span>
                                {suggestion.metadata?.trending && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs px-1 py-0"
                                  >
                                    <TrendingUp className="h-2 w-2 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                              </div>
                              {suggestion.type === "post" &&
                                suggestion.metadata && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {suggestion.category} •{" "}
                                    {suggestion.metadata.views} views • by{" "}
                                    {suggestion.metadata.author}
                                  </div>
                                )}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {suggestion.type}
                          </Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </>
              )}
              {!isLoading &&
                suggestions.length === 0 &&
                searchQuery.length > 0 && (
                  <CommandEmpty>
                    No results found for &quot;{searchQuery}&quot;
                  </CommandEmpty>
                )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
