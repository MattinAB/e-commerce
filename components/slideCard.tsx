import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";

export function SlideCard() {
  return (
    <Card className="flex relative min-h-full w-2xs max-w-3xs overflow-hidden">
      <CardContent>
        <Image fill src={"https://picsum.photos/id/237/800/800"} alt="" />
      </CardContent>
      <CardFooter className="absolute bottom-0 flex justify-center items-center text-center bg-slate-800 opacity-80 w-full z-20 text-white">
        Card details
      </CardFooter>
    </Card>
  );
}
