import { z } from "zod";

export const CategoryConnectBy = z.union([z.string().uuid(), z.string()]);

export const productCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  price: z.preprocess((v) => {
    if (typeof v === "string") return parseFloat(v);
    if (typeof v === "number") return v;
    return NaN;
  }, z.number().nonnegative()),
  stock: z.preprocess((v) => {
    if (typeof v === "string") return parseInt(v, 10);
    if (typeof v === "number") return v;
    return 0;
  }, z.number().int().nonnegative().default(0)),
  images: z.preprocess((v) => {
    if (typeof v === "string")
      return v === ""
        ? []
        : v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    if (Array.isArray(v)) return v;
    return [];
  }, z.array(z.string())),
  sku: z.string().optional(),
  isActive: z.preprocess(
    (v) => v === "on" || v === "true" || v === true,
    z.boolean().default(true),
  ),
  categoryIds: z.array(z.string()).optional(),
  categorySlugs: z.array(z.string()).optional(),
  genreIds: z.array(z.string()).optional(),
  genreSlugs: z.array(z.string()).optional(),
});

export type ProductCreateSchema = z.infer<typeof productCreateSchema>;
