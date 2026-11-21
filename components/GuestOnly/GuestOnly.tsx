
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/auth";

interface GuestOnlyProps {
  children: ReactNode;
}

export default function GuestOnly({ children }: GuestOnlyProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    const verifyUser = async () => {
      const result = await checkAuth();

      if (!active) return;

      if (result.authenticated === true) {
        router.replace("/");
        return;
      }

      // Not logged in, or authentication server unavailable.
      setChecking(false);
    };

    verifyUser();

    return () => {
      active = false;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="guest-checking">
        <span className="guest-spinner" />
        <p>Checking your session...</p>

        <style jsx>{`
          .guest-checking {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 14px;
            color: #1a1d24;
          }

          .guest-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid #e8ddd5;
            border-top-color: #1a1d24;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
          }

          .guest-checking p {
            font-size: 14px;
            margin: 0;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
