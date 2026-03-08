import { useParams, Navigate } from "react-router-dom";
import BackLink from "@/components/BackLink";
import { guideTopics } from "@/data/guideData";

const GuideTopic = () => {
  const { topicSlug } = useParams();
  const topic = guideTopics.find(t => t.slug === topicSlug);

  if (!topic) return <Navigate to="/guide" replace />;

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
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
              {section.points.map((point, j) => (
                <li key={j} className="text-sm text-muted-foreground pl-2 border-l-2 border-primary/40">
                  {point}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
};

export default GuideTopic;
