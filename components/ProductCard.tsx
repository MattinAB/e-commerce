"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
  price: number;
  images?: string[];
  id: string;
}

export function ProductCard(product: Props) {
  const { name, price, images, id } = product;
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/dashboard/products/${id}`)}
      className=" pt-0 overflow-hidden "
    >
      <CardContent className="flex relative  h-11/12   ">
        <Image
          fill
          src={"https://picsum.photos/id/237/800/800"}
          alt={name}
          className="object-cover"
        />
      </CardContent>
      <CardTitle className="text-shadow-muted-foreground pl-2.5 ">
        {name} - ${price}
      </CardTitle>
      <CardFooter className="flex justify-between items-center w-full ">
        <Button variant="secondary">Add to Cart</Button>
        <Button variant="destructive">Add to Wishlist</Button>
      </CardFooter>
    </Card>
  );
}
