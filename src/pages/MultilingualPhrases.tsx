import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, X, Star, Maximize2, ChevronLeft, Globe } from "lucide-react";
import BackLink from "@/components/BackLink";
import {
  phraseCategories,
  languages,
  type LangKey,
  type Phrase,
  type PhraseCategory,
} from "@/data/phrasesData";

const FAVORITES_KEY = "survival-phrase-favorites";

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveFavorites(fav: Set<string>) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...fav]));
}

const MultilingualPhrases = () => {
  const [lang, setLang] = useState<LangKey | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites);
  const [fullscreenPhrase, setFullscreenPhrase] = useState<{
    phrase: Phrase;
    lang: LangKey;
  } | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        saveFavorites(next);
        return next;
      });
    },
    []
  );

  // Search across all phrases and languages
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    const results: { phrase: Phrase; category: PhraseCategory }[] = [];
    for (const cat of phraseCategories) {
      for (const p of cat.phrases) {
        const haystack = [
          p.english,
          p.hindi.text, p.hindi.transliteration,
          p.tamil.text, p.tamil.transliteration,
          p.telugu.text, p.telugu.transliteration,
          p.kannada.text, p.kannada.transliteration,
        ].join(" ").toLowerCase();
        if (haystack.includes(q)) {
          results.push({ phrase: p, category: cat });
        }
      }
    }
    return results;
  }, [query]);

  // Get current category phrases
  const currentCategory = categoryId
    ? phraseCategories.find((c) => c.id === categoryId) || null
    : null;

  const displayPhrases = useMemo(() => {
    if (!currentCategory) return [];
    if (showFavoritesOnly)
      return currentCategory.phrases.filter((p) => favorites.has(p.id));
    return currentCategory.phrases;
  }, [currentCategory, showFavoritesOnly, favorites]);

  // Keyboard escape for fullscreen
  useEffect(() => {
    if (!fullscreenPhrase) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenPhrase(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreenPhrase]);

  // Fullscreen overlay
  if (fullscreenPhrase) {
    const { phrase, lang: fLang } = fullscreenPhrase;
    const data = phrase[fLang];
    return (
      <div
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-8 cursor-pointer"
        onClick={() => setFullscreenPhrase(null)}
        role="dialog"
        aria-label={`Fullscreen: ${phrase.english}`}
      >
        <p className="text-sm text-muted-foreground mb-4">{phrase.english}</p>
        <p className="text-5xl sm:text-7xl md:text-8xl font-bold text-center leading-tight mb-6">
          {data.text}
        </p>
        <p className="text-lg sm:text-2xl text-muted-foreground italic">
          {data.transliteration}
        </p>
        <p className="mt-8 text-xs text-muted-foreground">Tap anywhere to close</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-24">
      <div className="w-full max-w-lg">
        <BackLink />

        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-primary">Emergency Phrases</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Show phrases to victims or say them yourself · Hindi, Tamil, Telugu, Kannada
          </p>
        </header>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search phrases... (e.g. "bleeding", "snake")'
            className="w-full bg-secondary border border-border rounded-md pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Search emergency phrases"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchResults !== null ? (
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-mono">
              {searchResults.length} results
            </p>
            {searchResults.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No results for "{query}"
              </p>
            ) : (
              <div className="space-y-2">
                {searchResults.slice(0, 30).map(({ phrase, category }) => (
                  <PhraseCardMultiLang
                    key={phrase.id}
                    phrase={phrase}
                    categoryEmoji={category.emoji}
                    isFavorite={favorites.has(phrase.id)}
                    onToggleFavorite={() => toggleFavorite(phrase.id)}
                    onFullscreen={(l) =>
                      setFullscreenPhrase({ phrase, lang: l })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        ) : !lang ? (
          /* Step 1: Language Selection */
          <div>
            <h2 className="text-lg font-semibold mb-3">Select Language</h2>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setLang(l.key)}
                  className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card hover:border-primary/60 hover:bg-card/80 p-5 transition-all active:scale-[0.98]"
                >
                  <span className="text-2xl font-bold">{l.native}</span>
                  <span className="text-sm text-muted-foreground">{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : !categoryId ? (
          /* Step 2: Category Selection */
          <div>
            <button
              onClick={() => setLang(null)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ChevronLeft className="h-4 w-4" />
              Change Language
            </button>
            <h2 className="text-lg font-semibold mb-1">
              {languages.find((l) => l.key === lang)?.native} — Categories
            </h2>
            <p className="text-xs text-muted-foreground mb-3">
              Select a scenario to see phrases
            </p>
            <div className="space-y-2">
              {phraseCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(cat.id)}
                  className="w-full flex items-center gap-3 rounded-lg border border-border bg-card hover:border-primary/60 hover:bg-card/80 p-4 transition-all active:scale-[0.98] text-left"
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{cat.title}</p>
                    <p className="text-xs text-muted-foreground">{cat.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {cat.phrases.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Step 3: Phrase List */
          <div>
            <button
              onClick={() => {
                setCategoryId(null);
                setShowFavoritesOnly(false);
              }}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ChevronLeft className="h-4 w-4" />
              All Categories
            </button>

            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">
                {currentCategory?.emoji} {currentCategory?.title}
              </h2>
              <button
                onClick={() => setShowFavoritesOnly((p) => !p)}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  showFavoritesOnly
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                <Star className="h-3 w-3 inline mr-1" />
                {showFavoritesOnly ? "Starred" : "All"}
              </button>
            </div>

            {displayPhrases.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No starred phrases in this category
              </p>
            ) : (
              <div className="space-y-3">
                {displayPhrases.map((phrase) => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    lang={lang}
                    isFavorite={favorites.has(phrase.id)}
                    onToggleFavorite={() => toggleFavorite(phrase.id)}
                    onFullscreen={() =>
                      setFullscreenPhrase({ phrase, lang })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function PhraseCard({
  phrase,
  lang,
  isFavorite,
  onToggleFavorite,
  onFullscreen,
}: {
  phrase: Phrase;
  lang: LangKey;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onFullscreen: () => void;
}) {
  const data = phrase[lang];
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs text-muted-foreground">{phrase.english}</p>
        <div className="flex gap-1 shrink-0 ml-2">
          <button
            onClick={onToggleFavorite}
            className="p-1 rounded hover:bg-secondary"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          </button>
          <button
            onClick={onFullscreen}
            className="p-1 rounded hover:bg-secondary"
            aria-label="Show fullscreen"
          >
            <Maximize2 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <p className="text-2xl font-bold leading-snug mb-1">{data.text}</p>
      <p className="text-sm text-muted-foreground italic">{data.transliteration}</p>
    </div>
  );
}

function PhraseCardMultiLang({
  phrase,
  categoryEmoji,
  isFavorite,
  onToggleFavorite,
  onFullscreen,
}: {
  phrase: Phrase;
  categoryEmoji: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onFullscreen: (lang: LangKey) => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium">
          {categoryEmoji} {phrase.english}
        </p>
        <button
          onClick={onToggleFavorite}
          className="p-1 rounded hover:bg-secondary shrink-0"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {languages.map((l) => {
          const data = phrase[l.key];
          return (
            <button
              key={l.key}
              onClick={() => onFullscreen(l.key)}
              className="text-left rounded-md border border-border/50 bg-secondary/30 p-2 hover:border-primary/40 transition-colors"
            >
              <p className="text-xs text-muted-foreground mb-0.5">{l.label}</p>
              <p className="text-sm font-semibold leading-tight">{data.text}</p>
              <p className="text-xs text-muted-foreground italic">{data.transliteration}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MultilingualPhrases;
