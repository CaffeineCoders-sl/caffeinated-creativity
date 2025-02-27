
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Coffee } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <div className="mb-6 inline-flex p-4 bg-secondary/20 rounded-full">
          <Coffee className="h-12 w-12 text-secondary" />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-black">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! We couldn't find the page you're looking for. Maybe we need more coffee to debug this one.
        </p>
        <Link
          to="/"
          className="btn-secondary button-shine inline-flex items-center justify-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
