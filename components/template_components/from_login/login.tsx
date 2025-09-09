"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import formFields from "@/public/form.json";
import React from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { PiEyeClosedBold } from "react-icons/pi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const fields = formFields.login;
  const initialState: { [key: string]: string } = {};
  fields.forEach((form) => {
    initialState[form.name] = form.value || "";
  });

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email === "1@gmail.com" && password === "1") {
      Cookies.set("auth", "true", { expires: 1 });
      toast.success("Login Successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <div>
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((form, index) =>
              form.type === 'input' ? (
                <div className="">
                  <Label htmlFor={form.label}>Email</Label>
                  <Input
                    key={`${form.name}-${index}`}
                    type="input"
                    id="email"
                    placeholder={form.placeholder || form.label}
                    name={form.name}
                    value={formData[form.name]}
                    required={form.required}
                    disabled={form.disabled}
                    onChange={handleChange}
                  />
                </div>
              ) : form.type === 'password' ? (
                <div className=" relative">
                  <Label htmlFor={`outlined-adornment-${form.name}-${index}`}>Password</Label>
                  <div className="relative">
                    <Input
                      name={form.name}
                      type={showPassword ? "text" : "password"}
                      value={formData[form.name]}
                      onChange={handleChange}
                      id="password"
                      placeholder={form.placeholder || form.label}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <HiEye size={20} /> : <PiEyeClosedBold size={20} />}
                    </button>
                  </div>
                </div>
              ) : null)}

            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
