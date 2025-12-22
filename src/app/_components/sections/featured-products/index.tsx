"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Badge, Sparkles, Star } from "lucide-react";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

const FeaturedProducts = () => {
  const products = [
    { name: "Suero de Brillo Radiante", price: "$45", badge: "Más Vendido" },
    { name: "Crema Facial Hidratante", price: "$38", badge: "Nuevo" },
    { name: "Limpiador de Vitamina C", price: "$28", badge: "Tendencia" },
    {
      name: "Aceite Nocturno Antienvejecimiento",
      price: "$52",
      badge: "Popular",
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Más Vendidos</h2>
          <p className="text-muted-foreground">
            Los más amados por nuestros clientes
          </p>
        </div>
        <Button variant="ghost">
          Ver Todo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product, i) => (
            <CarouselItem
              key={i}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Card className="group cursor-pointer hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <Sparkles className="h-16 w-16 text-primary group-hover:scale-110 transition-transform" />
                    <Badge className="absolute top-3 right-3 bg-background">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-chart-4 fill-chart-4"
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        (124)
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold">{product.price}</span>
                      <Button size="sm">Añadir al Carrito</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default FeaturedProducts;
