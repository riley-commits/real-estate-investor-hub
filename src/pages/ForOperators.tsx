import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const ForOperators = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <h1 className="font-display mb-4 text-3xl font-bold text-foreground">
          For Operators
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Learn how CrestCapital helps real estate operators connect with accredited
          investors, streamline deal listings, and manage funding rounds. You can
          post projects, monitor investor interest, and collaborate with a
          growing network of industry professionals.
        </p>
        {/* Call to action */}
        <div className="mt-12 text-center">
          <Link
            to="/signup"
            className="inline-block rounded bg-green-600 px-8 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-green-700"
          >
            Get Started as an Operator
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForOperators;
