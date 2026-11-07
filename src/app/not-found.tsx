import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Image src="/brand/loader.gif" alt="" width={439} height={389} unoptimized className="mb-4 w-[260px] [mask-image:radial-gradient(circle,#000_40%,transparent_72%)]" />
      <h1 className="font-display text-silver text-[clamp(1.8rem,5vw,3rem)] font-semibold">Page not found</h1>
      <p className="text-dim mt-4 max-w-[40ch]">This page does not exist or has moved. Head back to the VYNORA home page.</p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </main>
  );
}
