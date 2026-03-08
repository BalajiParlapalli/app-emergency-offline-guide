import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackLink from "@/components/BackLink";
import { getBookmarks, toggleBookmark, BookmarkItem } from "@/pages/GuideTopic";
import { BookmarkCheck, Trash2, Plus, StickyNote, X } from "lucide-react";

const NOTES_KEY = "survival-notebook-notes";
const USER_ID_KEY = "survival-user-id";

// Generate or retrieve a unique user ID for this browser
const getUserId = (): string => {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
};

const getNotesKey = () => `${NOTES_KEY}-${getUserId()}`;

interface Note {
  id: string;
  text: string;
  createdAt: string;
}

const getNotes = (): Note[] => {
  const stored = localStorage.getItem(getNotesKey());
  return stored ? JSON.parse(stored) : [];
};

const saveNotes = (notes: Note[]) => {
  localStorage.setItem(getNotesKey(), JSON.stringify(notes));
};

const Notebook = () => {
  const [tab, setTab] = useState<"notes" | "bookmarks">("notes");
  const [notes, setNotes] = useState<Note[]>(getNotes());
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(getBookmarks());
  const [newNote, setNewNote] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      createdAt: new Date().toLocaleDateString("en-IN"),
    };
    setNotes(prev => [note, ...prev]);
    setNewNote("");
    setEditing(false);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleRemoveBookmark = (item: BookmarkItem) => {
    toggleBookmark(item);
    setBookmarks(getBookmarks());
  };

  const clearAllBookmarks = () => {
    localStorage.removeItem("survival-guide-bookmarks");
    setBookmarks([]);
  };

  // Group bookmarks by topic
  const grouped = bookmarks.reduce<Record<string, BookmarkItem[]>>((acc, b) => {
    if (!acc[b.topicSlug]) acc[b.topicSlug] = [];
    acc[b.topicSlug].push(b);
    return acc;
  }, {});

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto pb-24">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">📓 Notebook</h1>
      <p className="text-sm text-muted-foreground mb-4">Your personal notes & saved survival tips</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border border-border rounded-lg p-1" role="tablist" aria-label="Notebook sections">
        <button
          onClick={() => setTab("notes")}
          className={`flex-1 touch-target flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-colors ${
            tab === "notes" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          role="tab"
          aria-selected={tab === "notes"}
          aria-controls="notes-panel"
        >
          <StickyNote className="h-4 w-4" aria-hidden="true" />
          Notes ({notes.length})
        </button>
        <button
          onClick={() => setTab("bookmarks")}
          className={`flex-1 touch-target flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-colors ${
            tab === "bookmarks" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          role="tab"
          aria-selected={tab === "bookmarks"}
          aria-controls="bookmarks-panel"
        >
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          Bookmarks ({bookmarks.length})
        </button>
      </div>

      {/* Notes Tab */}
      {tab === "notes" && (
        <div id="notes-panel" role="tabpanel" aria-label="Notes">
          {editing ? (
            <div className="mb-4">
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Write important info, coordinates, contacts, plans..."
                className="w-full bg-secondary border border-border rounded-lg px-3 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px] resize-y"
                aria-label="New note text"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={addNote}
                  className="touch-target flex-1 bg-primary text-primary-foreground py-2 rounded-md text-sm font-semibold"
                  aria-label="Save note"
                >
                  Save Note
                </button>
                <button
                  onClick={() => { setEditing(false); setNewNote(""); }}
                  className="touch-target px-4 py-2 border border-border rounded-md text-sm text-muted-foreground"
                  aria-label="Cancel note"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="touch-target w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg py-4 mb-4 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              aria-label="Add a new note"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-semibold">Add Note</span>
            </button>
          )}

          {notes.length === 0 ? (
            <div className="text-center py-12">
              <StickyNote className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" aria-hidden="true" />
              <p className="text-muted-foreground">No notes yet</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Save coordinates, contacts, plans — anything important</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notes.map(note => (
                <div key={note.id} className="border border-border rounded-lg px-4 py-3 group">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm whitespace-pre-wrap flex-1">{note.text}</p>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="touch-target shrink-0 text-muted-foreground/30 hover:text-destructive transition-colors p-1"
                      aria-label={`Delete note: ${note.text.slice(0, 30)}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground/50 mt-1 mono">{note.createdAt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookmarks Tab */}
      {tab === "bookmarks" && (
        <div id="bookmarks-panel" role="tabpanel" aria-label="Bookmarks">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground mono">{bookmarks.length} saved</p>
            {bookmarks.length > 0 && (
              <button
                onClick={clearAllBookmarks}
                className="touch-target text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1"
                aria-label="Clear all bookmarks"
              >
                Clear all
              </button>
            )}
          </div>

          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <BookmarkCheck className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" aria-hidden="true" />
              <p className="text-muted-foreground">No bookmarks yet</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Tap the bookmark icon on any guide point to save it here</p>
            </div>
          ) : (
            <div className="space-y-5">
              {Object.entries(grouped).map(([slug, items]) => (
                <div key={slug}>
                  <Link
                    to={`/guide/${slug}`}
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-2 block"
                    aria-label={`Go to ${items[0].topicTitle}`}
                  >
                    {items[0].topicEmoji} {items[0].topicTitle}
                  </Link>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 border border-border rounded-lg px-3 py-2.5">
                        <span className="flex-1 text-sm text-muted-foreground pl-2 border-l-2 border-primary/40">
                          <span className="text-xs text-muted-foreground/60 block mb-0.5">{item.heading}</span>
                          {item.point}
                        </span>
                        <button
                          onClick={() => handleRemoveBookmark(item)}
                          className="touch-target shrink-0 mt-0.5 text-muted-foreground/30 hover:text-destructive transition-colors p-1"
                          aria-label={`Remove bookmark: ${item.point.slice(0, 30)}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notebook;
