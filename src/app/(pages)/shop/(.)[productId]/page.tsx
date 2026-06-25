import { ProductModalWrapper } from "../_components/product-modal";
import { db } from "@/db";

export default async function ProductInterceptPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const idNum = parseInt(productId || "", 10);

  const productData = !isNaN(idNum)
    ? await db.query.product.findFirst({
        where: (product, { eq }) => eq(product.id, idNum),
        with: {
          productCategory: {
            with: {
              category: true,
            },
          },
        },
      })
    : undefined;

  const product = productData
    ? {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        imageUrl: productData.imageUrl,
        inStock: productData.inStock,
        category:
          productData.productCategory[0]?.category.name || "Uncategorized",
      }
    : undefined;

  if (!product) {
    return null;
  }

  return <ProductModalWrapper product={product} />;
}
