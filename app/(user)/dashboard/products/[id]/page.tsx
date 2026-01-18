import { DetailsCard } from "@/components/DetailsCard";
import { prisma } from "@/lib/prisma";

async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        price: true,
        description: true,
        images: true,
      },
    });

    return product;
  } catch (error) {
    console.log("Error fetching product by ID", error);
  }
}

export default async function ProductDetailsPage(
  props: PageProps<"/dashboard/products/[id]">,
) {
  const { id } = await props.params;
  const product = await getProductById(id);

  return (
    <DetailsCard
      name={product?.name}
      price={Number(product?.price)}
      description={product?.description}
      images={product?.images}
    />
  );
}
