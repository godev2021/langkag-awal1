// components/CenteredModal.js
'use client';

import { useEffect } from 'react';

export default function CenteredModal({ isOpen, setIsOpen, children, title }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center   backdrop-blur-sm"
      
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent close on inside click
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={()=>setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
