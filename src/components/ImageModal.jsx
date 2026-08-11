import React, { useEffect } from 'react';
import { X, ZoomIn, Download } from 'lucide-react';

export default function ImageModal({ isOpen, imageSrc, title, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative max-w-6xl w-full bg-white rounded-3xl border border-slate-300 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <ZoomIn className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                {title || 'HISPAN Interface Zoom'}
              </h4>
              <p className="text-[11px] font-mono text-slate-400">
                Pixel-perfect enterprise UI view
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Image Body */}
        <div className="p-4 md:p-6 overflow-auto flex items-center justify-center bg-slate-100/50">
          <img 
            src={imageSrc} 
            alt={title || 'HISPAN Screenshot'} 
            className="max-w-full h-auto rounded-xl object-contain"
          />
        </div>

      </div>

    </div>
  );
}
