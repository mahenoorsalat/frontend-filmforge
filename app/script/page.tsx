"use client"

import React, { useState } from 'react';
import { Bell, Calendar, FileText, Home, Upload, Users, ChevronDown } from 'lucide-react';

export default function ScriptBreakdownApp() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="overflow-hidden flex h-screen w-full bg-[#09090B]">
   

      {/* Main Content */}
      <div className="overflow-auto flex-1 p-[10px]">
        <div className="h-full bg-gradient-to-b from-[#18181B] via-[#031938] to-[#394553] rounded-xl relative overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-2 bg-[#18181B] border-b border-[#27272A]">
            <button className="h-9 px-3 rounded-[10px] flex items-center gap-2 hover:bg-[#27272A] transition-colors">
              <span className="text-[#9F9FA9] text-sm font-semibold">Untitled Project</span>
              <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
            </button>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-20">
            <h1 className="text-white text-[42px] font-semibold leading-[54.6px] text-center mb-8 max-w-[599px]">
              Turn your scripts into a production-ready breakdown
            </h1>
            <p className="text-[#D4D4D8] text-base text-center mb-20 max-w-[513px]">
              Upload your Final Draft (.fdx) file to extract scenes, characters, locations, and other key details. Everything is organized and ready for you to manage.
            </p>

            {/* Upload Area */}
            <div
              className="w-[330px] p-12 bg-[#040404]/45 rounded-2xl border-2 border-[#00A6F4] flex flex-col items-center gap-10"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-8 w-[196px]">
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-6 h-6 text-[#9F9FA9]" />
                  <h3 className="text-white text-base font-semibold text-center">
                    Choose a file or drag and drop it here.
                  </h3>
                  <p className="text-[#71717B] text-[13px] text-center">.fdx, .pdf</p>
                </div>
                <label className="h-9 px-3 bg-[#00BCFF] shadow-lg rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-[#00A8E6] transition-colors">
                  <span className="text-black text-sm font-semibold">Select File</span>
                  <input
                    type="file"
                    accept=".fdx,.pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-4 text-[#00BCFF] text-sm">
                Selected: {selectedFile.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}