import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  return (
    <div className="min-h-screen bg-sbs-cream py-24 flex flex-col items-center justify-center text-center">
      <h1 className="font-playfair text-4xl md:text-5xl font-bold text-sbs-navy mb-4">Blog Post</h1>
      <p className="text-sbs-charcoal-light">
        Currently viewing article: <span className="font-semibold text-sbs-gold">{slug}</span>
      </p>
    </div>
  );
}
