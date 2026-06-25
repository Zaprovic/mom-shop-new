import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const CategoriesSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Comprar por Categoría
        </h2>
        <p className="text-muted-foreground">
          Explora nuestras colecciones seleccionadas
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            name: "Cuidado de la Piel",
            icon: "✨",
          },
          {
            name: "Maquillaje",
            icon: "💄",
          },
          {
            name: "Cuidado del Cabello",
            icon: "💆‍♀️",
          },
          {
            name: "Fragancias",
            icon: "🌸",
          },
        ].map((category) => (
          <Card
            key={category.name}
            className="group cursor-pointer hover:shadow-lg transition-all"
          >
            <CardContent className="p-6">
              <div className="aspect-square rounded-2xl bg-muted mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                {category.icon}
              </div>
              <h3 className="font-semibold text-center">{category.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
