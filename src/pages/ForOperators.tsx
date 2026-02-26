import Navbar from "@/components/Navbar";
import {
  Building2,
  Users,
  DollarSign,
  ClipboardList,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const ForOperators = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero / intro */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-display mb-4 text-4xl font-bold text-foreground">
          Empower Your Real Estate Business
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          CrestCapital provides a turnkey platform for operators to raise capital,
          manage investor relations, and showcase projects to a vetted pool of
          accredited investors. Grow your pipeline and close deals faster.
        </p>
        <Link
          to="/signup"
          className="mt-8 inline-block rounded bg-green-600 px-8 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-green-700"
        >
          Become an Operator
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="font-display mb-8 text-3xl font-bold text-foreground text-center">
          Key Benefits
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <Users className="h-10 w-10 text-green mb-4" />
            <h3 className="font-semibold text-foreground mb-1">Investor Access</h3>
            <p className="text-sm text-muted-foreground">
              Reach a curated community of accredited investors ready to deploy
              capital.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <DollarSign className="h-10 w-10 text-green mb-4" />
            <h3 className="font-semibold text-foreground mb-1">Efficient Funding</h3>
            <p className="text-sm text-muted-foreground">
              Simplify your capital raise with integrated subscription and
authorized escrow.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ClipboardList className="h-10 w-10 text-green mb-4" />
            <h3 className="font-semibold text-foreground mb-1">Project Management</h3>
            <p className="text-sm text-muted-foreground">
              Upload deals, share documents, and track investor interest
              in one dashboard.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Building2 className="h-10 w-10 text-green mb-4" />
            <h3 className="font-semibold text-foreground mb-1">Professional Network</h3>
            <p className="text-sm text-muted-foreground">
              Collaborate with other operators and experts across markets.
            </p>
          </div>
        </div>
      </section>

      {/* Why CrestCapital */}
      <section className="container mx-auto px-6 py-16 bg-card">
        <h2 className="font-display mb-8 text-3xl font-bold text-foreground text-center">
          Why Partner with Us?
        </h2>
        <div className="max-w-3xl mx-auto space-y-6 text-center text-base text-muted-foreground">
          <p>
            We built CrestCapital from the ground up with operators in mind.
            Our tools reduce administrative burden and unlock a reliable source
            of capital so you can focus on acquiring and managing properties.
          </p>
          <p>
            Our platform handles investor compliance, document sharing, and
            communication, giving you a transparent and scalable way to
            collect equity for every project.
          </p>
          <p>
            From first‑time sponsors to seasoned firms, operators of all sizes
            benefit from lower fees, faster closes, and access to a growing
            network of committed investors.
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
                How do I list a project?
              </AccordionTrigger>
              <AccordionContent>
                After signing up as an operator, navigate to your dashboard and
                click "Create New Offering". Fill out the project details,
                upload your pitch deck, and submit for review.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>
                <HelpCircle className="mr-2 h-4 w-4" />
                Are there any fees?
              </AccordionTrigger>
              <AccordionContent>
                CrestCapital charges a small percentage of capital raised as a
                fee; there are no listing costs or subscription charges. Fees
                are clearly disclosed before you publish your deal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>
                <HelpCircle className="mr-2 h-4 w-4" />
                Can I communicate directly with investors?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Our platform includes messaging features and allows you to
                send updates to investors who have expressed interest in your
                deal.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="font-display mb-4 text-3xl font-bold text-foreground">
          Ready to Raise Capital?
        </h2>
        <p className="mb-8 text-lg text-muted-foreground mx-auto max-w-xl">
          Join CrestCapital today to connect with accredited investors and drive
          your next acquisition forward.
        </p>
        <Link
          to="/signup"
          className="rounded bg-green-600 px-8 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-green-700"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default ForOperators;
