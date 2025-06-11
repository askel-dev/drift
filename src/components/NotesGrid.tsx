
import { Note } from "@/pages/Index";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

interface NotesGridProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
  onNoteDelete: (id: string) => void;
}

const moodEmojis = {
  calm: "🌊",
  energetic: "⚡", 
  contemplative: "🌙",
  melancholy: "🌧️",
  joyful: "☀️"
};

const moodColors = {
  calm: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  energetic: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  contemplative: "bg-purple-50 border-purple-200 hover:bg-purple-100", 
  melancholy: "bg-gray-50 border-gray-200 hover:bg-gray-100",
  joyful: "bg-rose-50 border-rose-200 hover:bg-rose-100"
};

export const NotesGrid = ({ notes, onNoteSelect, onNoteDelete }: NotesGridProps) => {
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.mood]) {
      acc[note.mood] = [];
    }
    acc[note.mood].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  if (notes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-50">📝</div>
          <p className="text-lg opacity-60">No notes yet. Start writing to capture your thoughts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light mb-8 opacity-80">Your Thoughts</h1>
        
        {Object.entries(groupedNotes).map(([mood, moodNotes]) => (
          <div key={mood} className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-2xl">{moodEmojis[mood as keyof typeof moodEmojis]}</span>
              <h2 className="text-xl font-medium capitalize opacity-70">{mood}</h2>
              <span className="text-sm opacity-50">({moodNotes.length})</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moodNotes.map((note) => (
                <div
                  key={note.id}
                  className={`
                    relative group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                    transform hover:scale-105 hover:shadow-lg
                    ${moodColors[mood as keyof typeof moodColors]}
                  `}
                  onClick={() => onNoteSelect(note)}
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNoteDelete(note.id);
                      }}
                      className="p-2 rounded-full bg-white/50 hover:bg-red-100 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h3 className="font-medium mb-3 line-clamp-2">
                    {note.title || "Untitled"}
                  </h3>
                  
                  <p className="text-sm opacity-70 line-clamp-4 mb-4">
                    {note.content.slice(0, 150)}...
                  </p>
                  
                  <div className="text-xs opacity-50">
                    {formatDistanceToNow(note.timestamp, { addSuffix: true })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
