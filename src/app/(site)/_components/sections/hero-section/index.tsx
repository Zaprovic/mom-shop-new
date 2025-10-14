import { Button } from "@/components/ui/button";
import { ArrowRight, Badge, Sparkles, Star } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge>New Collection 2025</Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Your
            <span className="block text-primary">Natural Glow</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Premium beauty and skincare products crafted with natural
            ingredients. Transform your daily routine into a luxurious self-care
            ritual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Explore Collection
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground">Natural Products</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl bg-muted p-8 flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="h-24 w-24 mx-auto text-primary mb-4" />
              <p className="text-muted-foreground">Hero Image Placeholder</p>
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-lg border">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-chart-4 fill-chart-4" />
              <div>
                <p className="font-bold">4.9</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
