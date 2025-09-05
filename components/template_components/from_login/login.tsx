"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import formFields from "@/public/form.json";
import { FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from "@mui/material";
import React from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { PiEyeClosedBold } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
                  <TextField
                    className="form"
                    key={`${form.name}-${index}`}
                    variant="outlined"
                    label={form.label}
                    name={form.name}
                    value={formData[form.name]}
                    onChange={handleChange}
                    required={form.required}
                    disabled={form.disabled}
                    fullWidth
                  />
                ) : form.type === 'password' ? (
                  <FormControl key={`${form.name}-${index}`} fullWidth variant="outlined">
                    <InputLabel htmlFor={`outlined-adornment-${form.name}-${index}`}>{form.label}</InputLabel>
                    <OutlinedInput
                      className="form"
                      name={form.name}
                      type={showPassword ? "text" : "password"}
                      value={formData[form.name]}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? "hide password" : "show password"}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <PiEyeClosedBold />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={form.label}
                      required={form.required}
                      disabled={form.disabled}
                    />
                  </FormControl>
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