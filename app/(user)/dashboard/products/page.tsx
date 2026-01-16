import "./product.css";

import SideBar from "./_components/sideBar";
import SearchBar from "./_components/searchField";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

async function getProduct() {
  try {
    const result = await prisma.product.findMany();
    return [...result];
  } catch (error) {
    console.log("Error to get products", error);
  }
}

export default async function Product() {
  const products = await getProduct();
  console.log("products from prisma", products);
  return (
    <div className="product-body">
      <aside className="aside">
        <SearchBar />
        <SideBar />
      </aside>
      <main className="main-product">
        <div className="products p-1.5">
          {products?.map((product) => {
            return (
              <ProductCard
                images={product.images}
                name={product.name}
                price={Number(product.price)}
                key={product.id}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
