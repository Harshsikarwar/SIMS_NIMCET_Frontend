import NimcetAbout from "@/components/NimcetGuideComponents/NimcetAbout/NimcetAbout";
import NimcetOfferings from "@/components/NimcetGuideComponents/NimcetOfferings/NimcetOfferings";
import NimcetSyllabus from "@/components/NimcetGuideComponents/NimcetSyllabus/NimcetSyllabus";
import TestSeriesDisplay from "@/components/TestSeries/TestSeriesDisplay/TestSeriesDisplay";
import Image from "next/image";

export default function NimcetGuide() {
  return (
    <div>
        <NimcetAbout/>
        <NimcetSyllabus/>
        <NimcetOfferings/>
        <TestSeriesDisplay/>
    </div>
  );
}
