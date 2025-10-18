"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { ProductFormData } from "@/schemas/product.schema";

interface ColumnsProps {
  onDelete: (id: number) => void;
}

export const createColumns = ({
  onDelete,
}: ColumnsProps): ColumnDef<ProductFormData>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return <div className="capitalize">{category}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <div className="text-right font-medium">${price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return <div className="text-center">{rating.toFixed(1)} ⭐</div>;
    },
  },
  {
    accessorKey: "reviews",
    header: "Reviews",
    cell: ({ row }) => {
      const reviews = row.getValue("reviews") as number;
      return <div className="text-center">{reviews}</div>;
    },
  },
  {
    accessorKey: "inStock",
    header: "Stock",
    cell: ({ row }) => {
      const inStock = row.getValue("inStock") as boolean;
      return (
        <Badge variant={inStock ? "default" : "destructive"}>
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "badge",
    header: "Badge",
    cell: ({ row }) => {
      const badge = row.getValue("badge") as string | null;
      return badge ? (
        <Badge variant="secondary" className="capitalize">
          {badge}
        </Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(product.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
