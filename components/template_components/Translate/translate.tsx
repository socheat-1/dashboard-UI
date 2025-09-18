"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alert from "@/share/alert/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Cambodia from "@/public/img/flag/cambodia.png"; 
import english from "@/public/img/flag/english.png"; 

export default function Translate() {
  const { i18n } = useTranslation("translation");
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const languages = [
    { code: "en", label: "English", img: english },
    { code: "km", label: "ភាសាខ្មែរ", img: Cambodia },
  ];

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem("lang", value);
    setSelectedLang(value);
    toast.success(`Language changed to: ${languages.find(l => l.code === value)?.label}`);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setSelectedLang(savedLang);
    }
  }, []);

  return (
    <div className="font-siemreap">
      <Alert />

      <Select value={selectedLang} onValueChange={changeLanguage}>
        <SelectTrigger className="w-[140px] !border-none">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languages.map((lng) => (
              <SelectItem key={lng.code} value={lng.code} className="font-siemreap">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-7">
                    <Image src={lng.img} alt={lng.label} className="w-full h-full object-contain" />
                  </span>
                  <span>{lng.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
