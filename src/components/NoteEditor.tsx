
import { useState, useRef, useEffect } from "react";
import { Note } from "@/pages/Index";

interface NoteEditorProps {
  note: Note | null;
  mood: string;
  onNoteChange: (note: Note) => void;
}

export const NoteEditor = ({ note, mood, onNoteChange }: NoteEditorProps) => {
  const [content, setContent] = useState(note?.content || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (note) {
      const title = newContent.split('\n')[0].slice(0, 50) || "Untitled";
      onNoteChange({
        ...note,
        content: newContent,
        title,
        mood
      });
    }

    // Create particle effect on typing
    if (newContent.length > content.length) {
      const newParticle = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      };
      setParticles(prev => [...prev, newParticle]);
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 2000);
    }
  };

  const getMoodTextColor = (mood: string) => {
    const colorMap = {
      calm: "text-slate-700",
      energetic: "text-orange-800",
      contemplative: "text-purple-800", 
      melancholy: "text-gray-700",
      joyful: "text-rose-800"
    };
    return colorMap[mood as keyof typeof colorMap] || colorMap.calm;
  };

  const getPlaceholder = (mood: string) => {
    const placeholders = {
      calm: "Let your thoughts flow like gentle waves...",
      energetic: "Capture the spark of inspiration...",
      contemplative: "Dive deep into reflection...",
      melancholy: "Pour out what weighs on your heart...",
      joyful: "Celebrate this moment in words..."
    };
    return placeholders[mood as keyof typeof placeholders] || placeholders.calm;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8">
      {/* Typing particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-current opacity-20 rounded-full animate-pulse pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            animation: "fade-out 2s ease-out forwards"
          }}
        />
      ))}

      <div className="w-full max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={getPlaceholder(mood)}
          className={`
            w-full min-h-[70vh] resize-none border-none outline-none bg-transparent
            text-lg leading-relaxed font-light tracking-wide
            placeholder:opacity-40 placeholder:italic
            ${getMoodTextColor(mood)}
            transition-all duration-300
          `}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            lineHeight: "1.8"
          }}
        />
      </div>

      {/* Subtle breathing animation overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-gradient-radial from-current via-transparent to-transparent animate-pulse" />
      </div>
    </div>
  );
};
