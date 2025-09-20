'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import NavHeaderVII from '@/share/header_route/nav_headerVII';
import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation("translation");
  const [selectedFont, setSelectedFont] = useState('Arial, sans-serif');
  const [fontSize, setFontSize] = useState(16);
  const [showAnimation, setShowAnimation] = useState(false);

  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: '"Times New Roman", serif', label: 'Times New Roman' },
    { value: '"Courier New", monospace', label: 'Courier New' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: '"Comic Sans MS", cursive', label: 'Comic Sans MS' },
    { value: 'Impact, sans-serif', label: 'Impact' }
  ];

  // Load saved settings on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont');
    const savedSize = localStorage.getItem('fontSize');
    const savedTime = localStorage.getItem('settingsTime');
    const now = Date.now();

    if (savedTime && now - parseInt(savedTime) > 24 * 60 * 60 * 1000) {
      resetSettings();
      return;
    }

    if (savedFont) setSelectedFont(savedFont);
    if (savedSize) setFontSize(parseInt(savedSize));
  }, []);

  // Apply live preview without saving to localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--app-font-family', selectedFont);
    root.style.setProperty('--app-font-size', `${fontSize}px`);
  }, [selectedFont, fontSize]);

  const increaseSize = () => setFontSize(prev => Math.min(prev + 1, 32));
  const decreaseSize = () => setFontSize(prev => Math.max(prev - 1, 8));

  const handleInputSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) setFontSize(Math.min(Math.max(value, 8), 32));
  };

  const resetSettings = () => {
    setSelectedFont('Arial, sans-serif');
    setFontSize(16);
    triggerAnimation();
    localStorage.removeItem('selectedFont');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('settingsTime');
  };

  const triggerAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 600);
  };

  const saveSettings = () => {
    localStorage.setItem('selectedFont', selectedFont);
    localStorage.setItem('fontSize', fontSize.toString());
    localStorage.setItem('settingsTime', Date.now().toString());
    triggerAnimation();
    toast.success('Settings saved successfully!')
  };

  const previewStyle = {
    fontFamily: selectedFont,
    fontSize: `${fontSize}px`
  };

  return (
    <div className="">
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <NavHeaderVII
        title='font_family'
        home='settings'
        label='font_family'
        href="/setting/fontSetting"
      />

      <div className="mt-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6 dark:text-white">Font Controls</h2>
          <div className="mb-6">
            <Select value={selectedFont} onValueChange={(value) => setSelectedFont(value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select Font Family" />
              </SelectTrigger>
              <SelectContent className='w-full '>
                <SelectGroup>
                  <SelectLabel>Font Options</SelectLabel>
                  {fontOptions.map((font) => (
                    <SelectItem className='' key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-200">Font Size Controls:</label>
            <div className="flex items-center gap-4 flex-wrap">
              <button onClick={decreaseSize} disabled={fontSize <= 8} className="px-4 py-2 border-2  dark:border-gray-700 text-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white">-</button>

              <input
                type="number"
                value={fontSize}
                onChange={handleInputSizeChange}
                className="w-20 p-2 text-center border-2 dark:bg-gray-900 dark:text-white dark:border-gray-700 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button onClick={increaseSize} disabled={fontSize >= 32} className="px-4 py-2 border-2 dark:border-gray-700 text-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white">+</button>

              <button onClick={resetSettings} className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg ">Reset</button>

              <button onClick={saveSettings} className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg ">Save</button>
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 mt-5 dark:text-gray-200">Live Preview</h2>
          <div className="p-6 bg-gradient-to-r dark:bg-gray-900  bg-white rounded-2xl border border-dashed dark:border-gray-700 border-gray-200" style={previewStyle}>
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Sample Heading Text</h3>
            <p className="text-gray-600 mb-4 leading-relaxed dark:text-gray-200">This is a sample paragraph to demonstrate how the font settings affect different text elements.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
