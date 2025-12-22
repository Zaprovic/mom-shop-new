import { Sparkles } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">GlowBeauty</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Productos de belleza y cuidado de la piel premium para tu brillo
              natural.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cuidado de la Piel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Maquillaje
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cuidado del Cabello
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Fragancias
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contáctanos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Información de Envío
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 GlowBeauty. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
