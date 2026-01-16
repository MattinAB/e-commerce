import { SlideCard } from "@/components/slideCard";

export default function Home() {
  return (
    <div className=" h-screen max-w-11/12 mx-auto ">
      <div className="relative -z-10  my-4 flex min-w-full  min-h-3/12 max-h-2/6  bg-slate-50">
        <SlideCard />
      </div>
      <div className="flex w-full bg-amber-100  h-full ">
        <div className="flex order-1 flex-col w-full bg-black min-h-full min-w-fit max-w-2xs"></div>
        <div className="flex order-2 overflow-auto  gap-1 flex-wrap justify-center  w-full  bg-slate-50"></div>
      </div>
    </div>
  );
}
