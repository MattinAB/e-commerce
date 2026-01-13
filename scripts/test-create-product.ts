import { prisma } from "../lib/prisma";
import { Prisma } from "../lib/prisma/generated/prisma/client";

async function main() {
  const ts = Date.now().toString();
  console.log("Starting test with ts=", ts);

  const category = await prisma.category.create({
    data: { name: `test-cat-${ts}`, slug: `test-cat-${ts}` },
  });
  console.log("Created category", category.id);

  const genre = await prisma.genre.create({
    data: {
      name: `test-genre-${ts}`,
      slug: `test-genre-${ts}`,
      categoryId: category.id,
    },
  });
  console.log("Created genre", genre.id);

  const product = await prisma.product.create({
    data: {
      name: `test-product-${ts}`,
      slug: `test-product-${ts}`,
      description: `test description ${ts}`,
      price: new Prisma.Decimal("9.99"),
      stock: 5,
      images: [],
      sku: `sku-${ts}`,
      isActive: true,
      categories: { connect: [{ id: category.id }] },
      genres: { connect: [{ id: genre.id }] },
    },
  });
  console.log("Created product", product.id);

  // cleanup
  await prisma.product.delete({ where: { id: product.id } });
  console.log("Deleted product", product.id);
  await prisma.genre.delete({ where: { id: genre.id } });
  console.log("Deleted genre", genre.id);
  await prisma.category.delete({ where: { id: category.id } });
  console.log("Deleted category", category.id);

  console.log("Test completed successfully");
}

main()
  .catch((e) => {
    console.error("Test failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
