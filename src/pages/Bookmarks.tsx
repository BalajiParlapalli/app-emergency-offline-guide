import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackLink from "@/components/BackLink";
import { getBookmarks, toggleBookmark, BookmarkItem } from "@/pages/GuideTopic";
import { BookmarkCheck, Trash2 } from "lucide-react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(getBookmarks());

  const handleRemove = (item: BookmarkItem) => {
    toggleBookmark(item);
    setBookmarks(getBookmarks());
  };

  const clearAll = () => {
    localStorage.removeItem("survival-guide-bookmarks");
    setBookmarks([]);
  };

  // Group by topic
  const grouped = bookmarks.reduce<Record<string, BookmarkItem[]>>((acc, b) => {
    const key = b.topicSlug;
    if (!acc[key]) acc[key] = [];
    acc[key].push(b);
    return acc;
  }, {});

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      <BackLink to="/guide" label="← Guide" />
      <h1 className="text-3xl font-bold text-primary mb-2">🔖 Bookmarks</h1>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground mono">{bookmarks.length} saved</p>
        {bookmarks.length > 0 && (
          <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
            Clear all
          </button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <BookmarkCheck className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
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
              >
                {items[0].topicEmoji} {items[0].topicTitle}
              </Link>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 border border-border rounded-lg px-3 py-2.5 group">
                    <span className="flex-1 text-sm text-muted-foreground pl-2 border-l-2 border-primary/40">
                      <span className="text-xs text-muted-foreground/60 block mb-0.5">{item.heading}</span>
                      {item.point}
                    </span>
                    <button
                      onClick={() => handleRemove(item)}
                      className="shrink-0 mt-0.5 text-muted-foreground/30 hover:text-destructive transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
