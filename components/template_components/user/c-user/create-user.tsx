"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import formFields from "@/public/form.json";
import Title from "@/share/header_route/title";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HiEye } from "react-icons/hi";
import { PiEyeClosedBold } from "react-icons/pi";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUser({ isOpen, onClose }: CreateUserModalProps) {
  const { t } = useTranslation("translation");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const fields = formFields.createUser;

  const initialState: Record<string, string> = {};
  fields.forEach((form: { name: string; value?: string }) => {
    initialState[form.name] = form.value || "";
  });

  const [formData, setFormData] = useState<Record<string, string>>(initialState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { createUser } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Create FormData to handle file upload
      const formPayload = new FormData();

      // Append all form fields (except confirmPassword)
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword') {
          formPayload.append(key, formData[key]);
        }
      });

      // Append image file if exists
      if (imageFile) {
        formPayload.append('image', imageFile);
      }

      // Debug: log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formPayload.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }

      await createUser(formPayload);

      // Reset form
      setFormData(initialState);
      setImageFile(null);
      setImagePreview(null);
      onClose();
      toast.success("User created successfully");
    } catch (err) {
      console.error("❌ Failed to create user:", err);
      toast.error("Failed to create user");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Set the file in state
    setImageFile(file);

    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);

    // Reset file input
    const fileInput = document.getElementById('picture') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[1111] flex items-center justify-center bg-black bg-opacity-50 p-4 md:p-52"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white w-full rounded-2xl max-h-[90vh] overflow-y-auto shadow-lg"
                encType="multipart/form-data"
              >
                {/* Sticky Header */}
                <div className="flex justify-between items-center sticky top-0 bg-white px-6 py-4 border-b z-10">
                  <Title title="create_user" />
                  <div
                    onClick={onClose}
                    className="bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
                  >
                    <IoClose className="text-[18px]" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-6">
                  {fields.map((form, index) =>
                    form.type === "input" ? (
                      <div key={`${form.name}-${index}`}>
                        <Label htmlFor={form.name}>{t(form.label)}</Label>
                        <Input
                          className="mt-2"
                          type="text"
                          id={form.name}
                          placeholder={t(form.placeholder || form.label)}
                          name={form.name}
                          value={formData[form.name] ?? ""}
                          required={form.required}
                          disabled={form.disabled}
                          onChange={handleChange}
                        />
                      </div>
                    ) : form.type === 'password' ? (
                      <div key={`${form.name}-${index}`} className="relative">
                        <Label htmlFor={form.name}>{t(form.label)}</Label>
                        <div className="relative">
                          <Input
                            name={form.name}
                            type={showPassword ? "text" : "password"}
                            value={formData[form.name] ?? ""}
                            onChange={handleChange}
                            id="password"
                            placeholder={t(form.placeholder || form.label)}
                            className="pr-10 mt-2"
                            required={form.required}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <HiEye size={20} /> : <PiEyeClosedBold size={20} />}
                          </button>
                        </div>
                      </div>
                    ) : form.type === 'confirmpassword' ? (
                      <div key={`${form.name}-${index}`} className="relative">
                        <Label htmlFor={form.name}>{t(form.label)}</Label>
                        <div className="relative">
                          <Input
                            name={form.name}
                            type={confirmPassword ? "text" : "password"}
                            value={formData[form.name] ?? ""}
                            onChange={handleChange}
                            id="confirmPassword"
                            placeholder={t(form.placeholder || form.label)}
                            className="pr-10 mt-2"
                            required={form.required}
                          />
                          <button
                            type="button"
                            onClick={() => setConfirmPassword(!confirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {confirmPassword ? <HiEye size={20} /> : <PiEyeClosedBold size={20} />}
                          </button>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>

                {/* Image Upload Section */}
                <div className="w-full px-6 pb-6">
                  <Label htmlFor="picture">{t('image')}</Label>
                  <label
                    htmlFor="picture"
                    className="mt-2 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition relative"
                  >
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-[200px] h-[200px] p-4 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeImage();
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        >
                          <IoClose size={18} />
                        </button>
                        <span className="absolute bottom-2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                          {imageFile?.name}
                        </span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <span className="text-sm mb-2">{t('click_to_upload_image')}</span>
                        <span className="text-xs">PNG, JPG, JPEG (Max 5MB)</span>
                      </div>
                    )}
                  </label>
                  <input
                    id="picture"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex justify-end gap-3 mt-2 px-6 pb-6 border-t pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {t('save')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}