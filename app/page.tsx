import Image from "next/image";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import HeroBannerVideo from "@/components/HeroBannerVideo/HeroBannerVideo";
import NimcetOverview from "@/components/NimcetOverview/NimcetOverview";
import NimcetOfferings from "@/components/NimcetGuideComponents/NimcetOfferings/NimcetOfferings";
import TestSeriesCatalog from "@/components/TestSeriesCatalog/TestSeriesCatalog";

export default function Home() {
  return (
    <>
    <HeroBanner/>
    <NimcetOverview/>
    <NimcetOfferings/>
    <TestSeriesCatalog/>
    </>
  );
}
