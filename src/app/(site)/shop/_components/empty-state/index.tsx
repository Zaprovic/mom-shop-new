import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <Sparkles className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-muted-foreground mb-6">
        Try adjusting your filters or search criteria
      </p>
      <Button onClick={onClearFilters}>Clear Filters</Button>
    </div>
  );
}
