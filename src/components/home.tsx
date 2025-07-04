import React, { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import LazyImage from "./LazyImage";
import SearchBar from "./SearchBar";
import { preloadResource } from "../utils/seo";
import { useAuth } from "../contexts/AuthContext";
import UserMenu from "./UserMenu";
import AuthModal from "./auth/AuthModal";
import Notifications from "./Notifications";
import EmailNewsletter from "./EmailNewsletter";

// Lazy load heavy components with preloading
const HeroSection = lazy(() => {
  // Preload hero image
  preloadResource(
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
    "image",
  );
  return import("./HeroSection");
});
const CategoryNavigation = lazy(() => import("./CategoryNavigation"));
const TrendingPostsGrid = lazy(() => import("./TrendingPostsGrid"));

const HomePage = () => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleSignIn = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const handleHeroCTA = () => {
    if (user) {
      // User is already logged in, navigate to create content
      window.location.href = "/create";
    } else {
      // User is not logged in, show signup modal
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header with Search */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h1 className="text-lg sm:text-xl font-bold text-primary mr-4 sm:mr-6">
              BlogCommunity
            </h1>
            <nav className="hidden lg:flex space-x-2 xl:space-x-4">
              <a
                href="/"
                className="text-xs xl:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                Home
              </a>
              <a
                href="/explore"
                className="text-xs xl:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                Explore
              </a>
              <a
                href="/community"
                className="text-xs xl:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                Community
              </a>
              <a
                href="/about"
                className="text-xs xl:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                About
              </a>
            </nav>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 order-3 sm:order-2">
            <SearchBar />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 order-2 sm:order-3">
            {user ? (
              <>
                <Notifications />
                <UserMenu />
              </>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="text-xs sm:text-sm font-medium hover:text-primary transition-colors px-2 py-1"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mb-12">
          <Suspense
            fallback={
              <div className="h-96 bg-gradient-to-br from-primary/5 to-purple-500/5 animate-pulse rounded-lg" />
            }
          >
            <HeroSection
              ctaText={user ? "Start Writing" : "Join the Community"}
              onCtaClick={handleHeroCTA}
            />
          </Suspense>
        </section>

        {/* Category Navigation */}
        <section className="mb-8 sm:mb-12 container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="h-16 bg-muted animate-pulse rounded-lg" />
            }
          >
            <CategoryNavigation />
          </Suspense>
        </section>

        {/* Main Content */}
        <motion.section
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Featured Section */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Featured Stories
              </h2>
              <a
                href="/explore"
                className="text-primary text-sm font-medium hover:underline"
              >
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Featured Card 1 */}
              <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full overflow-hidden">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                    alt="The Future of AI in Everyday Life"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full mb-2">
                    Technology
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                    The Future of AI in Everyday Life
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base">
                    Exploring how artificial intelligence is transforming our
                    daily routines and what to expect in the coming years.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                          alt="John Doe"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        John Doe
                      </span>
                    </div>
                    <time className="text-xs text-muted-foreground">
                      5 min read
                    </time>
                  </div>
                </div>
              </article>

              {/* Featured Card 2 */}
              <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full overflow-hidden">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"
                    alt="Hidden Gems: Unexplored Destinations"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
                    Travel
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                    Hidden Gems: Unexplored Destinations
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base">
                    Discover breathtaking locations off the beaten path that
                    offer authentic experiences for adventurous travelers.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                          alt="Jane Smith"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        Jane Smith
                      </span>
                    </div>
                    <time className="text-xs text-muted-foreground">
                      8 min read
                    </time>
                  </div>
                </div>
              </article>

              {/* Featured Card 3 */}
              <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full overflow-hidden">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
                    alt="Mindful Movement: Beyond Exercise"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
                    Fitness
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                    Mindful Movement: Beyond Exercise
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base">
                    How integrating mindfulness into your fitness routine can
                    enhance both physical and mental well-being.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                          alt="Alex Johnson"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        Alex Johnson
                      </span>
                    </div>
                    <time className="text-xs text-muted-foreground">
                      6 min read
                    </time>
                  </div>
                </div>
              </article>
            </div>
          </motion.div>

          {/* Trending Posts - Lazy Loaded */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
            <Suspense
              fallback={
                <div className="h-64 bg-muted animate-pulse rounded-lg" />
              }
            >
              <TrendingPostsGrid />
            </Suspense>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
            <EmailNewsletter />
          </motion.div>

          {/* Community Highlights */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Community Highlights
              </h2>
              <a
                href="/community"
                className="text-primary text-sm font-medium hover:underline"
              >
                Join Discussions
              </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Community Card 1 */}
              <div className="bg-card rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  Weekly Writing Challenge
                </h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Join our weekly writing prompt challenge and get feedback from
                  fellow writers. This week's theme: "Unexpected Connections".
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-background overflow-hidden"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                          alt="Participant"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                      +12
                    </div>
                  </div>
                  <button
                    onClick={() => (window.location.href = "/community")}
                    className="bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Join Now
                  </button>
                </div>
              </div>

              {/* Community Card 2 */}
              <div className="bg-card rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  Photography Showcase
                </h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Share your best shots and techniques with our community of
                  photography enthusiasts. New theme every month.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex -space-x-2">
                    {[5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-background overflow-hidden"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                          alt="Participant"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                      +24
                    </div>
                  </div>
                  <button
                    onClick={() => (window.location.href = "/community")}
                    className="bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-12 sm:mt-16 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
                BlogCommunity
              </h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                A place to discover, share, and connect through stories that
                matter to you.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="https://facebook.com/blogcommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/blogcommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/blogcommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
                Categories
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a
                    href="/explore?category=technology"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="/explore?category=travel"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Travel
                  </a>
                </li>
                <li>
                  <a
                    href="/explore?category=fitness"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Fitness
                  </a>
                </li>
                <li>
                  <a
                    href="/explore?category=food"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Food
                  </a>
                </li>
                <li>
                  <a
                    href="/explore?category=art"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Art & Culture
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
                Resources
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Writing Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Community Rules
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
                Company
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            <p>© 2023 BlogCommunity. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default HomePage;
