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
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { ProductFormData } from "@/schemas/product.schema";
import Image from "next/image";
import { formatToCOP } from "@/lib/utils";

interface ColumnsProps {
  onDelete: (id: number) => void;
  onEdit: (product: ProductFormData) => void;
}

export const createColumns = ({
  onDelete,
  onEdit,
}: ColumnsProps): ColumnDef<ProductFormData>[] => [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="font-medium">{name}</div>;
    },
    size: 250,
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return <div className="capitalize">{category}</div>;
    },
    size: 150,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Precio</div>,
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <div className="text-right font-medium tabular-nums">
          {formatToCOP(price)}
        </div>
      );
    },
    size: 180,
  },
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string;
      return (
        <div className="h-10 w-10 overflow-hidden rounded-md">
          <Image src={imageUrl} alt="Product" width={40} height={40} />
        </div>
      );
    },
    size: 80,
  },
  {
    accessorKey: "inStock",
    header: "Inventario",
    cell: ({ row }) => {
      const inStock = row.getValue("inStock") as boolean;
      return (
        <Badge variant={inStock ? "default" : "destructive"}>
          {inStock ? "En Stock" : "Agotado"}
        </Badge>
      );
    },
    size: 140,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(product)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
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
    size: 70,
  },
];
