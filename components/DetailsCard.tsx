"use client";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { LuArrowLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface Props {
  name: string | undefined | null;
  price: number | undefined | null;
  description: string | undefined | null;
  images: string[] | undefined | null;
}

export function DetailsCard(product: Props) {
  const { name, price, description, images } = product;
  const router = useRouter();

  return (
    <div className="flex  fixed w-full h-full justify-center content-center ">
      <Button className="mt-3" variant="ghost" onClick={() => router.back()}>
        <LuArrowLeft /> Back
      </Button>
      <Carousel className=" mt-3   max-w-2/5  max-h-3/4 ">
        <CarouselContent className="">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="relative bg-white overflow-hidden">
                  <CardContent className="flex items-center w-96 h-96  justify-center ">
                    <Image
                      src={"https://picsum.photos/id/237/800/800"}
                      alt={name || "Product Image"}
                      fill
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
              <CardFooter className="flex justify-center gap-4">
                <div className="font-bold text-xl">{name}</div>
                <div>${price}</div>
                <Button variant="secondary">Add to Cart</Button>
                <Button variant="destructive">Add to Wishlist</Button>
              </CardFooter>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
