import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  to?: string;
  label?: string;
}

const BackLink = forwardRef<HTMLAnchorElement, BackLinkProps>(
  ({ to = "/", label = "Back" }, ref) => (
    <Link
      ref={ref}
      to={to}
      className="touch-target inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 py-1"
      aria-label={`Navigate back${label !== "Back" ? ` to ${label}` : ""}`}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  )
);

BackLink.displayName = "BackLink";

export default BackLink;
