import { products } from "@/mock/products";
import { Product } from "@/types/product";
import { ProductModalWrapper } from "../_components/product-modal";

export default async function ProductInterceptPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const idNum = parseInt(productId || "", 10);
  const product = products.find((p) => p.id === idNum) as Product | undefined;

  if (!product) {
    return null;
  }

  return <ProductModalWrapper product={product} />;
}
