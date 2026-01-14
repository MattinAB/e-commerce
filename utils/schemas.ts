import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Category slug is required"),
});

const genreSchema = z.object({
  name: z.string().min(1, "Genre name is required"),
  slug: z.string().min(1, "Genre slug is required"),
});

export const productCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().default(""),
  price: z.preprocess(
    (v) => {
      if (typeof v === "string") return parseFloat(v);
      if (typeof v === "number") return v;
      return NaN;
    },
    z.number().positive("Price must be greater than 0"),
  ),
  stock: z.preprocess(
    (v) => {
      if (typeof v === "string") return parseInt(v, 10);
      if (typeof v === "number") return v;
      return 0;
    },
    z.number().int().nonnegative().default(0),
  ),
  images: z.preprocess(
    (v) => {
      if (typeof v === "string")
        return v === ""
          ? []
          : v
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
      if (Array.isArray(v)) return v;
      return [];
    },
    z.array(z.string()).default([]),
  ),
  sku: z.string().optional(),
  isActive: z.boolean().default(true),
  categories: z.array(categorySchema).default([]),
  genres: z.array(genreSchema).default([]),
});

export type ProductCreateSchema = z.infer<typeof productCreateSchema>;
