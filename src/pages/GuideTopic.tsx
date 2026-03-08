import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BackLink from "@/components/BackLink";
import { guideTopics } from "@/data/guideData";
import { Bookmark, BookmarkCheck } from "lucide-react";

const BOOKMARKS_KEY = "survival-guide-bookmarks";

export interface BookmarkItem {
  topicSlug: string;
  topicTitle: string;
  topicEmoji: string;
  heading: string;
  point: string;
}

export const getBookmarks = (): BookmarkItem[] => {
  const stored = localStorage.getItem(BOOKMARKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const toggleBookmark = (item: BookmarkItem): boolean => {
  const bookmarks = getBookmarks();
  const key = `${item.topicSlug}|${item.heading}|${item.point}`;
  const exists = bookmarks.findIndex(b => `${b.topicSlug}|${b.heading}|${b.point}` === key);

  if (exists >= 0) {
    bookmarks.splice(exists, 1);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return false;
  } else {
    bookmarks.push(item);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return true;
  }
};

export const isBookmarked = (topicSlug: string, heading: string, point: string): boolean => {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.topicSlug === topicSlug && b.heading === heading && b.point === point);
};

const GuideTopic = () => {
  const { topicSlug } = useParams();
  const topic = guideTopics.find(t => t.slug === topicSlug);
  const [, forceUpdate] = useState(0);

  if (!topic) return <Navigate to="/guide" replace />;

  const handleToggle = (heading: string, point: string) => {
    toggleBookmark({
      topicSlug: topic.slug,
      topicTitle: topic.title,
      topicEmoji: topic.emoji,
      heading,
      point,
    });
    forceUpdate(n => n + 1);
  };

  // Find next/prev topics
  const currentIdx = guideTopics.findIndex(t => t.slug === topicSlug);
  const prevTopic = currentIdx > 0 ? guideTopics[currentIdx - 1] : null;
  const nextTopic = currentIdx < guideTopics.length - 1 ? guideTopics[currentIdx + 1] : null;

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto pb-24" role="main" aria-label={`${topic.title} guide topic`}>
      <BackLink to="/guide" label="← Guide" />
      <h1 className="text-3xl font-bold text-primary mb-6">
        {topic.emoji} {topic.title}
      </h1>

      <div className="space-y-4">
        {topic.sections.map((section, i) => (
          <details key={i} className="border border-border rounded-lg group" open={i === 0}>
            <summary className="px-4 py-3 font-semibold text-lg cursor-pointer hover:bg-secondary/50 transition-colors list-none flex justify-between items-center">
              <span>{section.heading}</span>
              <span className="text-muted-foreground text-xs group-open:rotate-90 transition-transform">▶</span>
            </summary>
            <ul className="px-4 pb-4 space-y-2">
              {section.points.map((point, j) => {
                const saved = isBookmarked(topic.slug, section.heading, point);
                return (
                  <li key={j} className="flex items-start gap-2 group/item">
                    <span className="flex-1 text-sm text-muted-foreground pl-2 border-l-2 border-primary/40">
                      {point}
                    </span>
                    <button
                      onClick={() => handleToggle(section.heading, point)}
                      className={`touch-target shrink-0 mt-0.5 transition-colors p-1 ${saved ? "text-primary" : "text-muted-foreground/30 hover:text-muted-foreground"}`}
                      aria-label={saved ? `Remove bookmark: ${point.slice(0, 30)}` : `Bookmark: ${point.slice(0, 30)}`}
                      aria-pressed={saved}
                    >
                      {saved ? <BookmarkCheck className="h-4 w-4" aria-hidden="true" /> : <Bookmark className="h-4 w-4" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-4 border-t border-border">
        {prevTopic ? (
          <Link to={`/guide/${prevTopic.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← {prevTopic.emoji} {prevTopic.title}
          </Link>
        ) : <span />}
        {nextTopic ? (
          <Link to={`/guide/${nextTopic.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {nextTopic.emoji} {nextTopic.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
};

export default GuideTopic;
