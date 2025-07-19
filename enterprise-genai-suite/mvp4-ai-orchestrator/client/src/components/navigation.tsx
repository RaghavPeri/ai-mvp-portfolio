import { useState } from "react";
import { Bell, User } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-playfair font-bold text-ws-forest">Williams-Sonoma</h1>
              <p className="text-xs text-ws-gray -mt-1">AI Content Studio</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onSectionChange("image-gen")}
              className={`transition-colors duration-200 font-medium border-b-2 ${
                activeSection === "image-gen" 
                  ? "text-ws-forest border-ws-forest" 
                  : "text-ws-gray border-transparent hover:text-ws-forest"
              }`}
            >
              Image Generator
            </button>
            <button 
              onClick={() => onSectionChange("content-studio")}
              className={`transition-colors duration-200 font-medium border-b-2 ${
                activeSection === "content-studio" 
                  ? "text-ws-forest border-ws-forest" 
                  : "text-ws-gray border-transparent hover:text-ws-forest"
              }`}
            >
              Content Studio
            </button>
            <button 
              onClick={() => onSectionChange("code-assistant")}
              className={`transition-colors duration-200 font-medium border-b-2 ${
                activeSection === "code-assistant" 
                  ? "text-ws-forest border-ws-forest" 
                  : "text-ws-gray border-transparent hover:text-ws-forest"
              }`}
            >
              Code Assistant
            </button>
            <button 
              onClick={() => onSectionChange("ai-orchestrator")}
              className={`transition-colors duration-200 font-medium border-b-2 ${
                activeSection === "ai-orchestrator" 
                  ? "text-ws-forest border-ws-forest" 
                  : "text-ws-gray border-transparent hover:text-ws-forest"
              }`}
            >
              AI Orchestrator
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Bell className="h-5 w-5 text-ws-gray" />
            </button>
            <div className="h-8 w-8 bg-ws-forest rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
