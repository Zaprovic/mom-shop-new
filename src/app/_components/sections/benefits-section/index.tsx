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
            title: "Calidad Premium",
            description:
              "Solo los mejores ingredientes naturales en cada producto",
          },
          {
            icon: <Heart className="h-8 w-8" />,
            title: "Libre de Crueldad",
            description: "Todos los productos son de origen ético y probados",
          },
          {
            icon: <Sparkles className="h-8 w-8" />,
            title: "Resultados Visibles",
            description:
              "Ve la diferencia en solo 7 días o te devolvemos tu dinero",
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
