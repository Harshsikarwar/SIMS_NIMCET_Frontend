

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/auth";
import NimcetAbout from "@/components/NimcetGuideComponents/NimcetAbout/NimcetAbout";
import NimcetSyllabus from "@/components/NimcetGuideComponents/NimcetSyllabus/NimcetSyllabus";
import NimcetOfferings from "@/components/NimcetGuideComponents/NimcetOfferings/NimcetOfferings";

export default function NimcetGuidePage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function verify() {
      const result = await checkAuth();

      if (!active) return;

      if (result.authenticated === true) {
        setAuthenticated(true);
      } else if (result.authenticated === false) {
        router.replace("/auth/login");
      } else {
        setError(result.error);
      }

      setChecking(false);
    }

    verify();

    return () => {
      active = false;
    };
  }, [router]);

  if (checking) {
    return <p>Verifying your login...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <>
    <NimcetAbout/>
    <NimcetSyllabus/>
    <NimcetOfferings/>
    </>
  );
}
