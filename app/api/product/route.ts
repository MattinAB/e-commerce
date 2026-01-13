import { NextResponse } from "next/server";
import { createProduct } from "./product-api";
import type { Product } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const productData = (await request.json()) as Product;
    const newProduct = await createProduct(productData);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
