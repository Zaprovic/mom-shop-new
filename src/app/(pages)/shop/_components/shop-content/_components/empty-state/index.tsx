import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Sparkles } from "lucide-react";

type props = {
  onClearFilters: () => void;
};

export function EmptyState({ onClearFilters }: props) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No se encontraron productos</EmptyTitle>
        <EmptyDescription>
          Intenta ajustar tus filtros o criterios de búsqueda
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button onClick={onClearFilters}>Limpiar Filtros</Button>
      </EmptyContent>
    </Empty>
  );
}
