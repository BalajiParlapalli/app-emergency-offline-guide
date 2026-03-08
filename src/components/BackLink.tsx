import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  to?: string;
  label?: string;
}

const BackLink = ({ to = "/", label = "← Back" }: BackLinkProps) => (
  <Link to={to} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
    <ArrowLeft className="h-4 w-4" /> {label.replace("← ", "")}
  </Link>
);

export default BackLink;
