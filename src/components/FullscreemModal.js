'use client';

import { useEffect } from "react";

export default function FullscreenModal({ isOpen, setIsOpen, title, children }) {
  useEffect(() => {
      if (isOpen) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = 'auto';
    }, [isOpen]);
  
    if (!isOpen) return null;
    
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white flex justify-center items-center ">
          <div className="bg-white rounded-lg border border-slate-300 w-full z-50 max-w-5xl h-[100vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-300">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}