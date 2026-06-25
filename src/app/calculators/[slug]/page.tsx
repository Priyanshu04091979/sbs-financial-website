import CalculatorInterface from "@/components/sections/calculators/CalculatorInterface";
import { CALCULATORS } from "@/lib/calculator-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface RouteParams {
  slug: string;
}

type Props = {
  params: Promise<RouteParams>;
};

// Generate Static Params for build-time optimization
export function generateStaticParams() {
  return Object.keys(CALCULATORS).map((slug) => ({
    slug,
  }));
}

// Generate SEO Metadata dynamically for each calculator page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = CALCULATORS[slug];
  
  if (!config) {
    return {
      title: "Calculator - SBS Financial Services",
      description: "Financial planning calculators from SBS Financial Services.",
    };
  }

  return {
    title: `${config.name} | SBS Financial Services`,
    description: `${config.description} Plan your goals and investments with SBS Financial Services.`,
  };
}

export default async function CalculatorDetailPage({ params }: Props) {
  const { slug } = await params;

  // Validate slug exists in our calculator configuration
  if (!CALCULATORS[slug]) {
    notFound();
  }

  return (
    <main className="bg-sbs-cream min-h-screen">
      <CalculatorInterface initialSlug={slug} />
    </main>
  );
}
