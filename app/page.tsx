import Hero from "@/components/hero";
import DestinationPreview from "@/components/destination-preview";
import Navigation from "@/components/navigation";
import { Journey } from "@/components/journey";
import MasonryGridDemo from "@/components/testimonial";
import { Gallery4 } from "@/components/gallery4";

export default function Home() {
  return (
    <>
      <Navigation />
<main className="min-h-screen flex flex-col gap-[2px] font-light">
  <Hero />
  <DestinationPreview />
  <Journey />
  <Gallery4 />
  <MasonryGridDemo />
</main>


    </>
  );
}
