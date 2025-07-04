import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./components/home";
import CreatePostPage from "./components/CreatePostPage";
import CommunityPage from "./components/CommunityPage";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import ExplorePage from "./components/ExplorePage";
import UserProfile from "./components/UserProfile";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {/* Tempo routes for storyboards */}
        {import.meta.env.VITE_TEMPO && routes.length > 0 && useRoutes(routes)}

        {/* Main application routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />

          {/* Allow tempo routes to be captured before any catch-all */}
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
