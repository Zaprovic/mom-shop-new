import React from "react";

const HeroBanner = () => {
  return (
    <section className="bg-muted/50 border-b">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop All Products
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our complete collection of premium beauty and skincare
            products. Find your perfect match.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
