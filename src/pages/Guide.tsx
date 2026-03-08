import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BackLink from "@/components/BackLink";
import { guideTopics } from "@/data/guideData";
import { Search, X, Bookmark } from "lucide-react";

const Guide = () => {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;

    const results: { topicSlug: string; topicTitle: string; topicEmoji: string; heading: string; point: string }[] = [];

    for (const topic of guideTopics) {
      for (const section of topic.sections) {
        for (const point of section.points) {
          if (
            point.toLowerCase().includes(q) ||
            section.heading.toLowerCase().includes(q) ||
            topic.title.toLowerCase().includes(q)
          ) {
            results.push({
              topicSlug: topic.slug,
              topicTitle: topic.title,
              topicEmoji: topic.emoji,
              heading: section.heading,
              point,
            });
          }
        }
      }
    }

    return results;
  }, [query]);

  return (
    <main className="min-h-screen px-4 py-8 max-w-lg mx-auto pb-24" aria-label="Survival Guide">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">📖 Survival Guide</h1>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{guideTopics.length} topics — India focused</p>
        <Link to="/guide/bookmarks" className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors" aria-label="View saved bookmarks">
          <Bookmark className="h-4 w-4" aria-hidden="true" /> Saved
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search topics... (e.g. snake bite, ORS, fire)"
          className="w-full bg-secondary border border-border rounded-md pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          aria-label="Search survival guide topics"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary" aria-label="Clear search">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {searchResults !== null ? (
        <div>
          <p className="text-xs text-muted-foreground mb-3 mono">{searchResults.length} results</p>
          {searchResults.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No results found for "{query}"</p>
          ) : (
            <div className="space-y-2">
              {searchResults.slice(0, 50).map((r, i) => (
                <Link
                  key={i}
                  to={`/guide/${r.topicSlug}`}
                  className="block border border-border rounded-lg px-4 py-3 hover:border-primary/60 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">{r.topicEmoji}</span>
                    <span className="text-xs text-muted-foreground">{r.topicTitle} › {r.heading}</span>
                  </div>
                  <p className="text-sm">{r.point}</p>
                </Link>
              ))}
              {searchResults.length > 50 && (
                <p className="text-xs text-muted-foreground text-center py-2">Showing first 50 results. Refine your search.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Topic List */
        <div className="space-y-2">
          {guideTopics.map((topic) => (
            <Link
              key={topic.slug}
              to={`/guide/${topic.slug}`}
              className="flex items-center gap-3 border border-border rounded-lg px-4 py-3 hover:border-primary/60 hover:bg-secondary/50 transition-colors"
            >
              <span className="text-2xl">{topic.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold">{topic.title}</p>
                <p className="text-xs text-muted-foreground">{topic.sections.length} subtopics</p>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Guide;
