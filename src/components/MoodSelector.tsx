
import { useState } from "react";

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
  onNoteUpdate: (mood: string) => void;
}

const moods = [
  { id: "calm", label: "Calm", emoji: "🌊", color: "bg-blue-100 text-blue-800" },
  { id: "energetic", label: "Energetic", emoji: "⚡", color: "bg-orange-100 text-orange-800" },
  { id: "contemplative", label: "Contemplative", emoji: "🌙", color: "bg-purple-100 text-purple-800" },
  { id: "melancholy", label: "Melancholy", emoji: "🌧️", color: "bg-gray-100 text-gray-800" },
  { id: "joyful", label: "Joyful", emoji: "☀️", color: "bg-rose-100 text-rose-800" }
];

export const MoodSelector = ({ selectedMood, onMoodChange, onNoteUpdate }: MoodSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMoodSelect = (mood: string) => {
    onMoodChange(mood);
    onNoteUpdate(mood);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-8 right-8 z-50">
      <div 
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Current mood indicator */}
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
          <span className="text-xl">
            {moods.find(m => m.id === selectedMood)?.emoji || "🌊"}
          </span>
        </div>

        {/* Mood options */}
        <div className={`
          absolute top-16 right-0 bg-white/80 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-4 space-y-2
          transition-all duration-300 transform
          ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
        `}>
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                hover:scale-105 hover:shadow-sm
                ${selectedMood === mood.id ? mood.color + ' scale-105' : 'hover:bg-white/50'}
              `}
            >
              <span className="text-lg">{mood.emoji}</span>
              <span className="text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
