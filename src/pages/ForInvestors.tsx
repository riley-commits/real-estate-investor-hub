import Navbar from "@/components/Navbar";
import {
  Building2,
  ChartPie,
  Users,
  Shield,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const ForInvestors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero / intro */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-display mb-4 text-4xl font-bold text-foreground">
          Invest with Confidence
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          CrestCapital empowers accredited investors to access institutional‑grade
          real estate deals with transparency, analytics, and community support.
          Start building a diversified portfolio with minimums from $10,000.
        </p>
        <Link
          to="/signup"
          className="mt-8 inline-block rounded bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-blue-700"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="font-display mb-8 text-3xl font-bold text-foreground text-center">
          Features
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <Building2 className="h-10 w-10 text-blue mb-4" />
            <h3 className="font-semibold text-foreground mb-1">Curated Deals</h3>
            <p className="text-sm text-muted-foreground">
              Hand‑picked opportunities vetted by experienced operators.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ChartPie className="h-10 w-10 text-blue mb-4" />
            <h3 className="font-semibold text-foreground mb-1">Advanced Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Detailed performance metrics, IRR targets, and risk profiles.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="h-10 w-10 text-blue mb-4" />
            <h3 className="font-semibold text-foreground mb-1">Investor Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with like‑minded investors and share insights.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="h-10 w-10 text-blue mb-4" />
            <h3 className="font-semibold text-foreground mb-1">Secure Platform</h3>
            <p className="text-sm text-muted-foreground">
              State‑of‑the‑art security keeps your data and investments safe.
            </p>
          </div>
        </div>
      </section>

      {/* Why CrestCapital */}
      <section className="container mx-auto px-6 py-16 bg-card">
        <h2 className="font-display mb-8 text-3xl font-bold text-foreground text-center">
          Why CrestCapital?
        </h2>
        <div className="max-w-3xl mx-auto space-y-6 text-center text-base text-muted-foreground">
          <p>
            We bridge the gap between accredited investors and institutional‑grade
            commercial real estate. Our platform is built by operators for
            investors, giving you direct access to deals that were previously
            reserved for institutions.
          </p>
          <p>
            Enjoy low minimums, transparent fee structures, and an easy‑to‑use
            dashboard that keeps you informed every step of the way.
          </p>
          <p>
            Whether you're diversifying a portfolio or seeking steady passive
            income, CrestCapital makes real estate investing more accessible than
            ever.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="font-display mb-8 text-3xl font-bold text-foreground text-center">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>
                <HelpCircle className="mr-2 h-4 w-4" />
                What is the minimum investment?
              </AccordionTrigger>
              <AccordionContent>
                The minimum varies by deal but most offerings start at $10,000.
                You can view specifics on each project page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>
                <HelpCircle className="mr-2 h-4 w-4" />
                How do I know the deals are legitimate?
              </AccordionTrigger>
              <AccordionContent>
                All operators go through a vetting process and provide detailed
                documentation. Our team reviews financials, track record, and
                market analyses before a project is listed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>
                <HelpCircle className="mr-2 h-4 w-4" />
                Can I track my portfolio performance?
              </AccordionTrigger>
              <AccordionContent>
                Yes – your investor dashboard gives you up‑to‑date metrics on
                your active investments, total capital deployed, and projected
                returns.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="font-display mb-4 text-3xl font-bold text-foreground">
          Ready to Start Investing?
        </h2>
        <p className="mb-8 text-lg text-muted-foreground mx-auto max-w-xl">
          Join CrestCapital today to unlock exclusive real estate opportunities
          and grow your portfolio with confidence.
        </p>
        <Link
          to="/signup"
          className="rounded bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-blue-700"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default ForInvestors;
