import React from "react";
import { cn } from "@/lib/utils";
import { Shield, Users, Rocket } from "lucide-react";
import { type FeatureItem, PricingTable, PricingTableBody, PricingTableHeader, PricingTableHead, PricingTableRow, PricingTableCell, PricingTablePlan } from "@/components/ui/21dev/pricing-table";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-20">
      <div
        className={cn("absolute inset-0 z-[-10] size-full max-h-102 opacity-50", "[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]")}
        style={{
          backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className={cn("text-3xl leading-tight font-bold text-balance sm:text-5xl")}>
          {"Capture Every Moment with "}
          <i className="bg-gradient-to-r from-violet-500 via-violet-400 to-fuchsia-400 bg-clip-text font-serif font-extrabold text-transparent drop-shadow-[0_0_18px_rgba(167,139,250,0.55)]">
            {"Timeless Photography"}
          </i>
          <br />
          {"Tailored Packages by "}
          <i className="bg-gradient-to-r from-violet-500 via-fuchsia-400 to-indigo-400 bg-clip-text font-serif font-extrabold text-transparent drop-shadow-[0_0_22px_rgba(167,139,250,0.75)]">
            {"Mukesh Studio"}
          </i>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-pretty">
          From intimate portraits to grand celebrations, choose a package that fits your story. High-quality edits, premium albums, and fast delivery — because every moment deserves to be remembered.
        </p>
      </div>
      <Default />
    </div>
  );
}

function Default() {
  return (
    <PricingTable className="mx-auto my-5 max-w-5xl">
      <PricingTableHeader>
        <PricingTableRow>
          <th />
          <th className="p-1">
            <PricingTablePlan name="Solo" badge="For Freelancers" price="₹29" compareAt="₹59" icon={Shield}>
              <Button variant="outline" className="w-full rounded-lg" size="lg">
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
          <th className="p-1">
            <PricingTablePlan
              name="teams"
              badge="For Growing Teams"
              price="₹99"
              compareAt="₹139"
              icon={Users}
              className="after:pointer-events-none after:absolute after:-inset-0.5 after:rounded-[inherit] after:bg-gradient-to-b after:from-violet-500/15 after:to-transparent after:blur-[2px]"
            >
              <Button className="w-full rounded-lg border-violet-700/60 bg-violet-600/80 text-white hover:bg-violet-600" size="lg">
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
          <th className="p-1">
            <PricingTablePlan name="scale" badge="For Large Teams" price="₹239" compareAt="₹299" icon={Rocket}>
              <Button variant="outline" className="w-full rounded-lg" size="lg">
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
        </PricingTableRow>
      </PricingTableHeader>
      <PricingTableBody>
        {FEATURES.map((feature, index) => (
          <PricingTableRow key={index}>
            <PricingTableHead>{feature.label}</PricingTableHead>
            {feature.values.map((value, index) => (
              <PricingTableCell key={index}>{value}</PricingTableCell>
            ))}
          </PricingTableRow>
        ))}
      </PricingTableBody>
    </PricingTable>
  );
}
export const FEATURES: FeatureItem[] = [
  {
    label: "Event Coverage",
    values: ["Up to 2 hours", "Up to 6 hours", "Full-day coverage"],
  },
  {
    label: "Edited Photos",
    values: ["30 photos", "150 photos", "Unlimited photos"],
  },
  {
    label: "Delivery Time",
    values: ["7 days", "3 days", "24 hours priority"],
  },
  {
    label: "Prints Included",
    values: [false, "10 premium prints", "30 premium prints + album"],
  },
  {
    label: "Drone Photography",
    values: [false, true, true],
  },
  {
    label: "Video Highlights",
    values: [false, "2–3 minutes", "Full cinematic edit"],
  },
  {
    label: "Online Gallery",
    values: [true, true, true],
  },
  {
    label: "Client App Access",
    values: [false, true, true],
  },
  {
    label: "RAW Files Delivery",
    values: [false, false, true],
  },
  {
    label: "Second Photographer",
    values: [false, "Optional Add-on", true],
  },
  {
    label: "Makeup & Styling Support",
    values: [false, true, true],
  },
  {
    label: "Location Shoots",
    values: ["1 location", "Up to 3 locations", "Unlimited locations"],
  },
  {
    label: "Photo Retouching",
    values: ["Basic edits", "Advanced retouching", "High-end retouching"],
  },
  {
    label: "Physical Album",
    values: [false, "Standard album", "Luxury custom album"],
  },
  {
    label: "Storage Duration",
    values: ["3 months", "12 months", "Lifetime archive"],
  },
  {
    label: "Priority Support",
    values: ["Standard response", "Business hours priority", "24/7 priority"],
  },
];
