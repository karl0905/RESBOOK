"use client";
import React, { useState } from "react";
import { Button, Input } from "@/global/components";
import { login } from "@/actions";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result.error) {
      console.error("Error:", result.error);
    } else {
      console.log("Succes", result.data);
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <div className="mx-auto w-[70%] max-w-[70.5rem]">
        <div className="flex items-center h-20">
          <Image
            src="/resbooklogo.png"
            alt="Logo"
            width={60}
            height={48}
            style={{ width: "auto", height: "auto" }}
          />
          <h2 className="font-bold ml-2">RESBOOK</h2>
        </div>
      </div>
      <div className="bg-gray-700 h-1 w-full"></div>
      <div className="flex flex-col justify-center items-center  ">
        <h2
          className="text-xl font-semibold text-center  mt-10 mb-5"
          variant="primary"
        >
          Welcome back
        </h2>
        <div className="max-w-xs px-4 py-4 bg-white border border-gray-200 shadow-sm rounded-md">
          <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block  font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder=""
                required
                value={email}
                onChange={(value) => setEmail(value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder=""
                required
                value={password}
                onChange={(value) => setPassword(value)}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" title="Login"></Button>
            </div>
            <div className="text-center mt-4">
              <p className="text-xs text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/create-user"
                  className="text-blue-600 hover:underline"
                >
                  Create one
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
