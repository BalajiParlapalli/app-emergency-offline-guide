import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pb-24" role="main" aria-label="Page not found">
      <div className="text-center px-4">
        <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Page not found</p>
        <a href="/" className="touch-target inline-block text-primary underline hover:text-primary/90 py-2 px-4">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
