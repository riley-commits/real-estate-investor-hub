import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

export type ProjectStatus = "Active" | "Fully Funded" | "Coming Soon";
export type ProjectType = "Multifamily" | "Office" | "Industrial" | "Hospitality" | "Mixed-Use" | "Senior Living";
export type DealType = "Equity" | "Preferred Equity" | "Debt";

export interface Project {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  type: ProjectType;
  dealType: DealType;
  status: ProjectStatus;
  image: string;
  targetIRR: number;
  equityMultiple: number;
  holdPeriod: string;
  minInvestment: number;
  targetRaise: number;
  raisedAmount: number;
  description: string;
  longDescription: string;
  highlights: string[];
  financials: {
    purchasePrice: number;
    totalCapitalization: number;
    loanToValue: number;
    projectedNOI: number;
    capRate: number;
  };
  operator: {
    name: string;
    founded: number;
    aum: string;
    dealsCompleted: number;
    bio: string;
  };
  timeline: { label: string; date: string }[];
}

export const projects: Project[] = [
  {
    id: "meridian-apartments",
    name: "Meridian Luxury Apartments",
    location: "Austin, TX",
    city: "Austin",
    state: "TX",
    type: "Multifamily",
    dealType: "Equity",
    status: "Active",
    image: project1,
    targetIRR: 18.5,
    equityMultiple: 1.92,
    holdPeriod: "5 Years",
    minInvestment: 25000,
    targetRaise: 12000000,
    raisedAmount: 8400000,
    description: "288-unit Class A multifamily development in the heart of South Austin's booming tech corridor.",
    longDescription:
      "Meridian Luxury Apartments is a ground-up development of 288 luxury apartment units strategically positioned in Austin's high-growth South Congress corridor. The project targets young professionals employed by nearby tech companies including Apple, Tesla, and Google, all within a 5-mile radius. The development features best-in-class amenities including a resort-style pool, co-working spaces, and a rooftop terrace with panoramic city views.",
    highlights: [
      "Located in Austin's #1 ranked submarket for rent growth",
      "Pre-leasing commenced with 42 letters of intent received",
      "Shovel-ready with all entitlements and permits secured",
      "Experienced GC with fixed-price construction contract",
      "Strong sponsorship with 12 completed multifamily projects",
    ],
    financials: {
      purchasePrice: 28500000,
      totalCapitalization: 38200000,
      loanToValue: 65,
      projectedNOI: 2100000,
      capRate: 5.5,
    },
    operator: {
      name: "Vantage Capital Group",
      founded: 2009,
      aum: "$1.4B",
      dealsCompleted: 34,
      bio: "Vantage Capital Group is a vertically integrated real estate firm specializing in ground-up multifamily development across the Sun Belt. With over $1.4B in assets under management, Vantage has delivered consistent risk-adjusted returns to institutional and individual investors.",
    },
    timeline: [
      { label: "Offering Close", date: "Mar 2026" },
      { label: "Construction Start", date: "May 2026" },
      { label: "Stabilization", date: "Aug 2027" },
      { label: "Projected Exit", date: "Dec 2030" },
    ],
  },
  {
    id: "pinnacle-office-tower",
    name: "Pinnacle Office Tower",
    location: "Nashville, TN",
    city: "Nashville",
    state: "TN",
    type: "Office",
    dealType: "Preferred Equity",
    status: "Active",
    image: project2,
    targetIRR: 14.2,
    equityMultiple: 1.68,
    holdPeriod: "4 Years",
    minInvestment: 50000,
    targetRaise: 22000000,
    raisedAmount: 22000000,
    description: "Class A office repositioning in Nashville's CBD, 78% leased to investment-grade tenants.",
    longDescription:
      "Pinnacle Office Tower is a value-add repositioning of a 185,000 SF Class A office building in Nashville's rapidly growing central business district. The current occupancy stands at 78% with a weighted average lease term of 4.2 years. The business plan involves modernizing common areas, upgrading building systems, and leasing vacant suites to the significant demand driven by Nashville's 60+ corporate relocations over the past 3 years.",
    highlights: [
      "Anchor tenant (Fortune 500) signed 10-year lease extension",
      "Nashville CBD office vacancy at 15-year low of 6.8%",
      "Renovation budget of $8.2M approved and committed",
      "Seller financing at below-market rate of 4.25%",
      "Projected 12-month occupancy increase to 95%+",
    ],
    financials: {
      purchasePrice: 52000000,
      totalCapitalization: 68000000,
      loanToValue: 58,
      projectedNOI: 4800000,
      capRate: 6.8,
    },
    operator: {
      name: "Stonegate Properties",
      founded: 2004,
      aum: "$2.8B",
      dealsCompleted: 61,
      bio: "Stonegate Properties is an institutional-quality commercial real estate firm with a 20-year track record of value-add office acquisitions. The firm manages over $2.8B in assets across 15 major U.S. markets, with a specialized focus on Class A suburban and CBD office repositioning.",
    },
    timeline: [
      { label: "Acquisition Close", date: "Jan 2026" },
      { label: "Renovation Start", date: "Feb 2026" },
      { label: "Stabilization Target", date: "Jun 2026" },
      { label: "Projected Exit", date: "Mar 2030" },
    ],
  },
  {
    id: "clearwater-logistics",
    name: "Clearwater Logistics Center",
    location: "Phoenix, AZ",
    city: "Phoenix",
    state: "AZ",
    type: "Industrial",
    dealType: "Debt",
    status: "Active",
    image: project3,
    targetIRR: 11.8,
    equityMultiple: 1.54,
    holdPeriod: "3 Years",
    minInvestment: 10000,
    targetRaise: 8500000,
    raisedAmount: 5100000,
    description: "842,000 SF Class A last-mile distribution center with 2 long-term NNN leases to national retailers.",
    longDescription:
      "Clearwater Logistics Center is an 842,000 SF, state-of-the-art last-mile distribution facility located in Phoenix's I-10 industrial corridor. The property is 100% leased to two investment-grade national retailers on 7-year NNN leases with 2.5% annual rent escalations. The industrial sector continues to benefit from sustained e-commerce tailwinds, and Phoenix has emerged as one of the nation's most active industrial markets.",
    highlights: [
      "100% occupied with 6.8 years of weighted average lease term",
      "NNN leases require zero landlord expense obligations",
      "36-foot clear heights with ESFR sprinkler system",
      "Adjacent to I-10 with exceptional last-mile access",
      "Phoenix industrial vacancy at record low of 3.2%",
    ],
    financials: {
      purchasePrice: 96000000,
      totalCapitalization: 112000000,
      loanToValue: 55,
      projectedNOI: 7200000,
      capRate: 5.8,
    },
    operator: {
      name: "Apex Industrial REIT",
      founded: 2011,
      aum: "$4.1B",
      dealsCompleted: 82,
      bio: "Apex Industrial REIT is one of the Southwest's leading industrial real estate operators, managing over $4.1B in industrial assets across the Sun Belt. The firm's focus on last-mile logistics and e-commerce fulfillment has driven exceptional returns through multiple real estate cycles.",
    },
    timeline: [
      { label: "Offering Close", date: "Feb 2026" },
      { label: "Acquisition Close", date: "Apr 2026" },
      { label: "Lease Expiration", date: "Apr 2032" },
      { label: "Projected Exit", date: "Mar 2029" },
    ],
  },
  {
    id: "paloma-resort",
    name: "Paloma Beach Resort",
    location: "Scottsdale, AZ",
    city: "Scottsdale",
    state: "AZ",
    type: "Hospitality",
    dealType: "Equity",
    status: "Active",
    image: project4,
    targetIRR: 22.1,
    equityMultiple: 2.14,
    holdPeriod: "5 Years",
    minInvestment: 100000,
    targetRaise: 18000000,
    raisedAmount: 11700000,
    description: "Boutique luxury resort conversion with 84 keys targeting the high-growth Scottsdale leisure market.",
    longDescription:
      "Paloma Beach Resort is a conversion of an underperforming extended-stay hotel into a 84-key boutique luxury resort in Old Town Scottsdale. The property will undergo a $14M renovation to reposition as a destination resort featuring a signature restaurant, full-service spa, and private event venue. Scottsdale's luxury hotel market has demonstrated exceptional resilience, with RevPAR 34% above pre-pandemic levels.",
    highlights: [
      "Below-replacement-cost acquisition at $180K/key",
      "Scottsdale ADR grew 28% over past 3 years",
      "Brand partnership with luxury lifestyle hotel group",
      "Strong group sales pipeline from nearby convention center",
      "Tax abatement program for 5 years approved",
    ],
    financials: {
      purchasePrice: 15120000,
      totalCapitalization: 32000000,
      loanToValue: 50,
      projectedNOI: 3800000,
      capRate: 7.2,
    },
    operator: {
      name: "Meridian Hospitality",
      founded: 2006,
      aum: "$890M",
      dealsCompleted: 28,
      bio: "Meridian Hospitality specializes in the acquisition and repositioning of boutique luxury hotels across the Western United States. With nearly two decades of hospitality expertise, the team has successfully repositioned 28 properties generating an average gross IRR of 21.4% to investors.",
    },
    timeline: [
      { label: "Offering Close", date: "Apr 2026" },
      { label: "Renovation Start", date: "Jun 2026" },
      { label: "Soft Opening", date: "Feb 2027" },
      { label: "Projected Exit", date: "Dec 2030" },
    ],
  },
  {
    id: "haven-district",
    name: "Haven Mixed-Use District",
    location: "Denver, CO",
    city: "Denver",
    state: "CO",
    type: "Mixed-Use",
    dealType: "Equity",
    status: "Coming Soon",
    image: project5,
    targetIRR: 16.8,
    equityMultiple: 1.85,
    holdPeriod: "6 Years",
    minInvestment: 25000,
    targetRaise: 31000000,
    raisedAmount: 0,
    description: "400-unit mixed-use development with ground-floor retail in Denver's River North Art District.",
    longDescription:
      "Haven Mixed-Use District is a transformative 400-unit mixed-use development spanning an entire city block in Denver's River North Art District (RiNo), one of the nation's fastest-growing urban neighborhoods. The project includes 42,000 SF of curated ground-floor retail space anchored by a grocery concept and local dining. RiNo has experienced 180% population growth over the past decade and commands 30% rent premiums over surrounding submarkets.",
    highlights: [
      "Prime RiNo location near the 38th & Blake light rail station",
      "LOI from grocery anchor for 18,000 SF ground-floor space",
      "Denver's urban multifamily vacancy below 4% for 5 consecutive years",
      "City of Denver sustainability grant of $2.4M secured",
      "LEED Gold certification planned reducing operating costs by 22%",
    ],
    financials: {
      purchasePrice: 18500000,
      totalCapitalization: 112000000,
      loanToValue: 62,
      projectedNOI: 9200000,
      capRate: 5.2,
    },
    operator: {
      name: "Arbor Development Partners",
      founded: 2013,
      aum: "$1.8B",
      dealsCompleted: 22,
      bio: "Arbor Development Partners is a Denver-based urban mixed-use developer with a proven track record of transformative community-oriented projects. Having delivered 22 ground-up developments since inception, Arbor is recognized for creating vibrant, sustainable urban environments that generate strong risk-adjusted returns.",
    },
    timeline: [
      { label: "Offering Launch", date: "May 2026" },
      { label: "Offering Close", date: "Jul 2026" },
      { label: "Construction Start", date: "Sep 2026" },
      { label: "Projected Exit", date: "Aug 2032" },
    ],
  },
  {
    id: "sunrise-senior",
    name: "Sunrise Senior Living",
    location: "Charlotte, NC",
    city: "Charlotte",
    state: "NC",
    type: "Senior Living",
    dealType: "Preferred Equity",
    status: "Fully Funded",
    image: project6,
    targetIRR: 13.5,
    equityMultiple: 1.62,
    holdPeriod: "5 Years",
    minInvestment: 50000,
    targetRaise: 14000000,
    raisedAmount: 14000000,
    description: "152-unit assisted living and memory care facility serving Charlotte's growing 65+ population.",
    longDescription:
      "Sunrise Senior Living is a 152-unit, purpose-built assisted living and memory care campus in Charlotte's high-growth South Park neighborhood. The facility targets the rapidly expanding Baby Boomer demographic — Charlotte's 65+ population is projected to grow 42% by 2030. The community features a full wellness center, restaurant-style dining, and specialized memory care programming, competing directly with national senior living brands at a premium product quality.",
    highlights: [
      "Charlotte 65+ population growing at 3.2x the national average",
      "Signed management agreement with top-10 national operator",
      "Certificate of occupancy received; operations commenced Jan 2025",
      "92% occupancy achieved within 14 months of opening",
      "Multiple acquisition offers received at 15% above cost basis",
    ],
    financials: {
      purchasePrice: 0,
      totalCapitalization: 42000000,
      loanToValue: 60,
      projectedNOI: 3200000,
      capRate: 6.4,
    },
    operator: {
      name: "Harborview Health Properties",
      founded: 2007,
      aum: "$620M",
      dealsCompleted: 18,
      bio: "Harborview Health Properties is a specialized real estate developer and operator focused exclusively on seniors housing and healthcare real estate. The firm's deep operational expertise and vertically integrated platform enable superior outcomes across the full development and investment lifecycle.",
    },
    timeline: [
      { label: "Construction Complete", date: "Nov 2024" },
      { label: "Certificate of Occupancy", date: "Jan 2025" },
      { label: "Stabilization", date: "Mar 2026" },
      { label: "Projected Exit", date: "Dec 2029" },
    ],
  },
];
