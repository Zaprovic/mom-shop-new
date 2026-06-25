import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const CTASection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="bg-primary text-primary-foreground border-none">
        <CardContent className="p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Únete a Nuestra Comunidad de Belleza
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Obtén acceso exclusivo a nuevos productos, ofertas especiales y
            consejos de belleza enviados a tu bandeja de entrada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="lg" variant="secondary">
              Suscribirse
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CTASection;
