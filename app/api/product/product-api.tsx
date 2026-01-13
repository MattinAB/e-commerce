"use server";

import { prisma } from "@/lib/prisma";

import { Prisma } from "@/lib/prisma/generated/prisma/client";
import { logger } from "@/lib/logger";
import { Product } from "@/utils/types";

export const createProduct = async (product: Product) => {
  try {
    const { name, slug, description, price, stock, images, sku, isActive } =
      product;

    // Check which genres actually exist in the database
    let existingGenres: { slug: string }[] = [];
    if (product.genres && product.genres.length > 0) {
      const genreSlugs = product.genres.map((g) => g.slug);
      const foundGenres = await prisma.genre.findMany({
        where: {
          slug: { in: genreSlugs },
        },
        select: { slug: true },
      });
      existingGenres = foundGenres.map((g) => ({ slug: g.slug }));
    }

    const data: Prisma.ProductCreateInput = {
      name,
      slug,
      description: description ?? "",
      // Prisma expects Decimal for Decimal fields
      price: new Prisma.Decimal(String(price)),
      stock: stock ?? 0,
      images: images ?? [],
      ...(sku ? { sku } : {}),
      isActive: isActive ?? true,
      ...(product.categories && product.categories.length > 0
        ? {
            categories: {
              connectOrCreate: product.categories.map((c) => ({
                where: { slug: c.slug },
                create: { name: c.name, slug: c.slug },
              })),
            },
          }
        : {}),
      ...(existingGenres.length > 0
        ? {
            genres: {
              connect: existingGenres,
            },
          }
        : {}),
    };

    const res = await prisma.product.create({
      data,
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    try {
      logger.info("Product created", { id: res.id, name: res.name });
    } catch (logErr) {
      // non-critical if logging fails
      console.warn(
        "Failed to log product creation",
        (logErr as Error)?.message ?? logErr,
      );
    }

    return res;
  } catch (error) {
    // Sanitize product DTO to avoid logging secrets and large payloads
    try {
      const sanitizedData = {
        name: product.name,
        slug: product.slug,
        price: product.price != null ? String(product.price) : undefined,
        stock: product.stock,
        images: Array.isArray(product.images)
          ? product.images.slice(0, 5)
          : undefined,
        isActive: product.isActive,
      };
      logger.error(
        "Failed to create product. Sanitized payload:",
        sanitizedData,
      );
      logger.error("Error:", {
        message: (error as Error)?.message ?? String(error),
        stack: (error as Error)?.stack,
      });
      console.error("Full error:", error);
    } catch (logErr) {
      // If logging sanitization fails, still log the original error minimally
      console.error(
        "Failed to create product. Error while sanitizing payload:",
        (logErr as Error)?.message ?? logErr,
      );
    }

    // Re-throw a generic error for upstream handling
    throw new Error((error as Error)?.message ?? "Failed to create product.");
  }
};
