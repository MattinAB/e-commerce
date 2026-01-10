"use Client";
import Image from "next/image";

const products = [
  { id: 1, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 2, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 3, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 4, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 5, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 6, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 7, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 8, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 9, image: "https://picsum.photos/200", name: "", price: "" },
  { id: 10, image: "https://picsum.photos/200", name: "", price: "" },
];

export default function ProductsContainer() {
  return (
    <>
      {products.map((product) => {
        return (
          <div key={product.id} className="flex flex-col ">
            <Image
              className="aspect-3/2 object-cover"
              width={300}
              height={300}
              src={product.image}
              alt="Product image Not Found!"
            />
            <p>Product Name</p>
            <p>Price</p>
            <button>Add to Cart</button>
          </div>
        );
      })}
    </>
  );
}
