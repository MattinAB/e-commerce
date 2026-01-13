import { createProduct } from "../app/api/product/product-api";
import { prisma } from "../lib/prisma";
import { Prisma } from "../lib/prisma/generated/prisma/client";

async function main() {
  const originalCreate = prisma.product.create.bind(prisma.product);
  let capturedArgs: any = null;

  // Mock prisma.product.create
  (prisma as any).product.create = async (args: any) => {
    capturedArgs = args;
    return { id: "mock-id", name: args.data.name, createdAt: new Date() };
  };

  try {
    const dto = {
      name: "mock product",
      slug: "mock-product",
      description: "a mock product",
      price: 19.99,
      stock: 3,
      images: ["https://example.com/a.jpg"],
      sku: "sku-mock",
      isActive: true,
      categorySlugs: ["cat-mock"],
      // genreSlugs intentionally present but should be ignored by createProduct
      genreSlugs: ["genre-mock"],
    } as any;

    const res = await createProduct(dto);
    console.log("createProduct returned:", res);

    if (!capturedArgs) throw new Error("prisma.product.create was not called");

    const data = capturedArgs.data;

    // Check fields
    if (data.name !== dto.name) throw new Error("name mismatch");
    if (data.slug !== dto.slug) throw new Error("slug mismatch");
    if (String((data.price as Prisma.Decimal).toString()) !== String(dto.price))
      throw new Error(
        `price mismatch: expected ${dto.price} got ${(
          data.price as Prisma.Decimal
        ).toString()}`,
      );
    if (data.stock !== dto.stock) throw new Error("stock mismatch");
    if (!Array.isArray(data.images) || data.images[0] !== dto.images[0])
      throw new Error("images mismatch");
    if (data.sku !== dto.sku) throw new Error("sku mismatch");
    if (data.isActive !== dto.isActive) throw new Error("isActive mismatch");
    if (!data.categories || !data.categories.connect)
      throw new Error("categories not connected");
    if (data.categories.connect[0].slug !== dto.categorySlugs[0])
      throw new Error("category slug connect mismatch");

    // Ensure genreSlugs were not forwarded (Prisma would have thrown if unknown), so they should be absent
    if ((data as any).genreSlugs)
      throw new Error("genreSlugs unexpectedly forwarded to Prisma");

    console.log("Mock test passed ✅");
  } finally {
    // restore
    (prisma as any).product.create = originalCreate;
  }
}

main().catch((e) => {
  console.error("Mock test failed:", e);
  process.exit(1);
});
