"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import formFields from "@/public/form.json";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);


  const fields = formFields.login;
  const initialState: { [key: string]: string } = {};
  fields.forEach((form) => {
    initialState[form.name] = form.value || "";
  });

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email === "1@gmail.com" && password === "1") {
      Cookies.set("auth", "true", { expires: 1 });
      toast.success('Login Successfully!')
      setError("");
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } else {
      toast.error('Invalid email or password')
      setSuccess("");
    }
  };

  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 px-4">
        <div className="flex justify-center items-center gap-3 bg-white border border-gray-200 rounded-2xl">
          <div className="w-full max-w-[500px] dark:bg-gray-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-[500px] mx-auto">
              <h1 className="text-center text-[20px] font-medium">Sign in to your account</h1>
              {fields.map((form, index) =>
                form.type === 'input' ? (
                  <div className="">
                    <Label htmlFor={form.label}>Email</Label>
                    <Input
                      key={`${form.name}-${index}`}
                      type="input"
                      id="email"
                      placeholder="Email"
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
                        placeholder="Enter your password"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                      </button>
                    </div>
                  </div>
                ) : null)}

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button type="submit" className="rounded-[10px] bg-[#5f74fe] hover:bg-[#4b61f1] py-3 w-full text-white font-medium uppercase">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


