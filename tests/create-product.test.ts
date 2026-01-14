import { beforeAll, describe, expect, it, vi } from "vitest";

// Mock prisma and sentry modules so we can spy on product.create without DB connection
vi.mock("@/lib/prisma", () => {
  return {
    prisma: {
      product: {
        create: vi.fn(),
      },
    },
  };
});

vi.mock("@/lib/sentry", () => ({
  initSentry: vi.fn(),
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

import { createProduct as createProductFn } from "../lib/product/product-api/product-api";
import { prisma } from "../lib/prisma";
import { Prisma } from "../lib/prisma/generated/prisma/client";

describe("createProduct mapping", () => {
  beforeAll(() => {
    (prisma.product.create as any).mockImplementation(async (args: any) => {
      return { id: "mock-id", name: args.data.name, createdAt: new Date() };
    });
  });

  it("maps DTO to Prisma input and ignores genreSlugs", async () => {
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
      genreSlugs: ["genre-mock"],
    } as any;

    const res = await createProductFn(dto);
    expect(res).toHaveProperty("id");

    const call = (prisma.product.create as any).mock.calls[0][0];
    const data = call.data;

    expect(data.name).toBe(dto.name);
    expect(data.slug).toBe(dto.slug);
    expect(String((data.price as Prisma.Decimal).toString())).toBe(
      String(dto.price),
    );
    expect(data.stock).toBe(dto.stock);
    expect(Array.isArray(data.images)).toBe(true);
    expect(data.images[0]).toBe(dto.images[0]);
    expect(data.sku).toBe(dto.sku);
    expect(data.isActive).toBe(dto.isActive);
    expect(data.categories.connect[0].slug).toBe(dto.categorySlugs[0]);
    expect((data as any).genreSlugs).toBeUndefined();
  });

  it("logs sanitized payload when Prisma throws", async () => {
    const dto = {
      name: "bad product",
      slug: "bad-product",
      price: 1.23,
      categorySlugs: ["cat-bad"],
      genreSlugs: ["genre-bad"],
    } as any;

    // make prisma.throw
    (prisma.product.create as any).mockImplementationOnce(async () => {
      throw new Error("prisma connection failed");
    });

    const sentry = await import("@/lib/sentry");

    await expect(createProductFn(dto)).rejects.toThrow(
      "prisma connection failed",
    );

    // Sentry.captureException should have been called with an Error and sanitized extras
    expect(sentry.captureException).toHaveBeenCalled();
    const callArgs = (sentry.captureException as any).mock.calls[0];
    expect(callArgs[0]).toBeInstanceOf(Error);
    const extras = callArgs[1];
    expect(extras).toBeDefined();
    expect(extras.categorySlugs).toEqual(dto.categorySlugs);
    expect(extras.genreSlugs).toEqual(dto.genreSlugs);
  });
});
