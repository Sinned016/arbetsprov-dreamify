"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      setPasswordError("");
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Checking if password is atleast 8 characters long
    if (account.password.length < 8) {
      setPasswordError(
        "Password must be atleast 8 characters long and include a number"
      );
      return;
    }

    // Checking if password has a number in it
    if (!account.password.match(/\d/)) {
      setPasswordError(
        "Password must be atleast 8 characters long and include a number"
      );
      return;
    }

    // Login and set the JWT with my API route
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    });

    const data = await response.json();
    console.log("response: ", response);
    console.log("data: ", data);

    if (!response.ok) {
      setLoginError(data.message);
    } else {
      // Set JWT token in localStorage, from data.token
      console.log(data.message);
      localStorage.setItem("token", data.token);
      router.push("/");
    }
  }

  return (
    <div className="w-full border rounded-xl border-neutral-600 p-6 mt-24 bg-white drop-shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-2">Welcome back!</h1>
      <form
        className="flex flex-col gap-4 mb-6"
        onSubmit={(e) => handleLogin(e)}
      >
        <div className="flex flex-col">
          <p className="text-sm font-bold mb-2">Email</p>
          <input
            className="border rounded-xl px-3 py-2 w-full"
            name="email"
            value={account.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email..."
            required
            type="email"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-bold mb-2">Password</p>
          <input
            className="border rounded-xl px-3 py-2 w-full"
            name="password"
            value={account.password}
            onChange={(e) => handleChange(e)}
            type="password"
            required
            placeholder="********"
          />
        </div>

        {passwordError && (
          <p className="text-red-600 text-sm font-bold text-center">
            {passwordError}
          </p>
        )}

        {loginError && (
          <p className="text-red-600 text-sm font-bold text-center">
            {loginError}
          </p>
        )}

        <button className=" bg-red-500 px-3 py-2 rounded-full text-white hover:bg-red-600 duration-300 cursor-pointer">
          Log in
        </button>
      </form>

      <div className="text-center">
        <Link
          href="/auth/register"
          className="font-bold text-purple-900 hover:underline text-sm"
        >
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}
