import { Link } from "react-router-dom";
import BackLink from "@/components/BackLink";
import { guideTopics } from "@/data/guideData";

const Guide = () => {
  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">📖 Survival Guide</h1>
      <p className="text-sm text-muted-foreground mb-6">{guideTopics.length} topics — India focused</p>

      <div className="space-y-2">
        {guideTopics.map((topic, i) => (
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
    </div>
  );
};

export default Guide;
