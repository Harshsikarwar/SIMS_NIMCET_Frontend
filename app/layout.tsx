
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import ConditionalHeader from "@/components/ConditionalHeader/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";

export const metadata: Metadata = {
  title: "SIMS Raipur",
  description: "SIMS Raipur NIMCET Preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConditionalHeader />
        {children}
        <ConditionalFooter/>
      </body>
    </html>
  );
}
