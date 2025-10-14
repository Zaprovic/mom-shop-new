import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, TrendingUp } from "lucide-react";
import React from "react";

const BenefitsSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Premium Quality",
            description: "Only the finest natural ingredients in every product",
          },
          {
            icon: <Heart className="h-8 w-8" />,
            title: "Cruelty-Free",
            description: "All products are ethically sourced and tested",
          },
          {
            icon: <Sparkles className="h-8 w-8" />,
            title: "Visible Results",
            description: "See the difference in just 7 days or money back",
          },
        ].map((benefit, i) => (
          <Card key={i} className="text-center">
            <CardContent className="p-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted text-primary">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
