import Image from "next/image";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import NimcetOverview from "@/components/NimcetOverview/NimcetOverview";
import NimcetOfferings from "@/components/NimcetGuideComponents/NimcetOfferings/NimcetOfferings";
import TestSeriesCatalog from "@/components/TestSeriesCatalog/TestSeriesCatalog";
import ExploreSubjects from "@/components/ExploreSubjects/ExploreSubjects";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
    <HeroBanner/>
    <NimcetOverview/>
    <NimcetOfferings/>
    <TestSeriesCatalog/>
    <ExploreSubjects/>
    </>
  );
}
