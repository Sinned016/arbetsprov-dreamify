"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function CheckAuth({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Just checking if the token exists isn't enough since anyone can just write a token.
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }

    async function checkToken() {
      try {
        const response = await fetch("/api/checkToken", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          router.push("/auth/login");
        } else {
          setLoading(false);
        }
      } catch (err) {
        router.push("/auth/login");
        console.log(err);
      }
    }

    checkToken();
  }, []);

  if (loading) {
    return (
      <div className="text-3xl font-bold text-center mt-24">Loading...</div>
    );
  }

  return <>{children}</>;
}
