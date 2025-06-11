
import { Menu, PenTool, BookOpen } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  view: "write" | "browse";
  onViewChange: (view: "write" | "browse") => void;
  onNewNote: () => void;
}

export const Navigation = ({ view, onViewChange, onNewNote }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-8 left-8 z-50">
      <div 
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Menu trigger */}
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
          <Menu className="w-5 h-5 text-current" />
        </div>

        {/* Navigation options */}
        <div className={`
          absolute top-16 left-0 bg-white/80 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-4 space-y-2
          transition-all duration-300 transform
          ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
        `}>
          <button
            onClick={() => {
              onNewNote();
              onViewChange("write");
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-white/50 hover:scale-105"
          >
            <PenTool className="w-4 h-4" />
            <span className="text-sm font-medium">New Note</span>
          </button>

          <button
            onClick={() => onViewChange(view === "write" ? "browse" : "write")}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-105
              ${view === "browse" ? 'bg-blue-100 text-blue-800' : 'hover:bg-white/50'}
            `}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">
              {view === "write" ? "Browse Notes" : "Back to Writing"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
