
import { useState, useEffect } from "react";
import { NoteEditor } from "@/components/NoteEditor";
import { MoodSelector } from "@/components/MoodSelector";
import { NotesGrid } from "@/components/NotesGrid";
import { Navigation } from "@/components/Navigation";

export interface Note {
  id: string;
  content: string;
  mood: string;
  timestamp: Date;
  title?: string;
}

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [selectedMood, setSelectedMood] = useState("calm");
  const [view, setView] = useState<"write" | "browse">("write");

  // Create new note
  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: "",
      mood: selectedMood,
      timestamp: new Date(),
    };
    setCurrentNote(newNote);
    setView("write");
  };

  // Save note
  const saveNote = (note: Note) => {
    if (note.content.trim()) {
      setNotes(prev => {
        const existingIndex = prev.findIndex(n => n.id === note.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = note;
          return updated;
        }
        return [...prev, note];
      });
    }
  };

  // Auto-save current note
  useEffect(() => {
    if (currentNote) {
      const timer = setTimeout(() => saveNote(currentNote), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentNote]);

  // Initialize with a sample note if empty
  useEffect(() => {
    if (notes.length === 0) {
      createNote();
    }
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getMoodClasses(selectedMood)}`}>
      <div className="atmospheric-bg" />
      
      <Navigation 
        view={view} 
        onViewChange={setView}
        onNewNote={createNote}
      />

      {view === "write" && (
        <>
          <MoodSelector 
            selectedMood={selectedMood} 
            onMoodChange={setSelectedMood}
            onNoteUpdate={(mood) => {
              if (currentNote) {
                setCurrentNote({...currentNote, mood});
              }
            }}
          />
          
          <NoteEditor 
            note={currentNote}
            mood={selectedMood}
            onNoteChange={setCurrentNote}
          />
        </>
      )}

      {view === "browse" && (
        <NotesGrid 
          notes={notes}
          onNoteSelect={(note) => {
            setCurrentNote(note);
            setSelectedMood(note.mood);
            setView("write");
          }}
          onNoteDelete={(id) => {
            setNotes(prev => prev.filter(n => n.id !== id));
          }}
        />
      )}
    </div>
  );
};

const getMoodClasses = (mood: string) => {
  const moodMap = {
    calm: "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",
    energetic: "bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100", 
    contemplative: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100",
    melancholy: "bg-gradient-to-br from-gray-50 via-slate-100 to-blue-100",
    joyful: "bg-gradient-to-br from-pink-50 via-rose-50 to-orange-100"
  };
  return moodMap[mood as keyof typeof moodMap] || moodMap.calm;
};

export default Index;
