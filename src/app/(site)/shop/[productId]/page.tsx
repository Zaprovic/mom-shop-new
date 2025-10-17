export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return <div>Single product page {productId}</div>;
}
