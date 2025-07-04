import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, PenTool } from "lucide-react";

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={
              user.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
            }
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-sm font-medium hidden sm:block">{user.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-20">
            <div className="p-3 border-b border-border">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            <div className="p-1">
              <button
                onClick={() => {
                  window.location.href = "/profile";
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full p-2 text-sm hover:bg-accent rounded-md transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => {
                  window.location.href = "/create";
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full p-2 text-sm hover:bg-accent rounded-md transition-colors"
              >
                <PenTool className="w-4 h-4" />
                <span>Write Story</span>
              </button>

              <button
                onClick={() => {
                  window.location.href = "/analytics";
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full p-2 text-sm hover:bg-accent rounded-md transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Analytics</span>
              </button>

              <hr className="my-1" />

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
