"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type props = {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onResetFilters: () => void;
  showFilters: boolean;
};

export function SidebarFilters({
  priceRange,
  onPriceRangeChange,
  onResetFilters,
  showFilters,
}: props) {
  return (
    <aside
      className={`lg:w-64 space-y-6 ${
        showFilters ? "block" : "hidden lg:block"
      }`}
    >
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Price Range
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Min</span>
                <span className="font-medium">${priceRange[0]}</span>
              </div>
              <Slider
                min={0}
                max={100}
                value={priceRange}
                onValueChange={(vals) =>
                  onPriceRangeChange([Number(vals[0]), Number(vals[1])])
                }
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Max</span>
                <span className="font-medium">${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-semibold mb-4">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox className="rounded" defaultChecked />
                <span className="text-sm">In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox className="rounded" />
                <span className="text-sm">Out of Stock</span>
              </label>
            </div>
          </div>

          {/* Reset Filters */}
          <Button variant="outline" className="w-full" onClick={onResetFilters}>
            Reset Filters
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
