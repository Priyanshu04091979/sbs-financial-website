import type { Metadata } from "next";
import BlogHero from "@/components/sections/blog/BlogHero";
import BlogGrid from "@/components/sections/blog/BlogGrid";
import BlogNewsletter from "@/components/sections/blog/BlogNewsletter";

export const metadata: Metadata = {
  title: "Blog & Insights | SBS Financial Services – Financial Planning Tips & Market Updates",
  description:
    "Explore financial planning tips, market insights, tax strategies, and investment guides from SBS Financial Services – your trusted SEBI-registered advisors.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <BlogGrid />
      <BlogNewsletter />
    </main>
  );
}
