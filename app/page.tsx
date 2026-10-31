import Image from "next/image";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import HeroBannerVideo from "@/components/HeroBannerVideo/HeroBannerVideo";
import NimcetOverview from "@/components/NimcetOverview/NimcetOverview";

export default function Home() {
  return (
    <>
    <HeroBanner/>
    <NimcetOverview/>
    </>
  );
}
