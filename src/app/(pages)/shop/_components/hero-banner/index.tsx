import React from "react";

const HeroBanner = () => {
  return (
    <section className="bg-muted/50 border-b">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comprar Todos los Productos
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubre nuestra colección completa de productos de belleza y
            cuidado de la piel premium. Encuentra tu combinación perfecta.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
