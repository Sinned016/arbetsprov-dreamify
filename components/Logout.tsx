"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/auth/login");
  }

  return (
    <div className="text-center">
      <button
        onClick={logout}
        className="px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 duration-300"
      >
        Logout here!
      </button>
    </div>
  );
}
