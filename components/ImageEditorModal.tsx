
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';

interface ImageEditorModalProps {
  src: string;
  onSave: (croppedImageUrl: string) => void;
  onCancel: () => void;
  aspectRatio?: number; // width / height
  outputWidth?: number;
}

export function ImageEditorModal({
  src,
  onSave,
  onCancel,
  aspectRatio = 1,
  outputWidth = 300,
}: ImageEditorModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [minZoom, setMinZoom] = useState(1);

  const outputHeight = outputWidth / aspectRatio;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imageRef.current;
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imgWidth = img.width * zoom;
    const imgHeight = img.height * zoom;
    
    // Clamp offsets to keep image within canvas bounds
    const clampedX = Math.min(0, Math.max(offset.x, canvas.width - imgWidth));
    const clampedY = Math.min(0, Math.max(offset.y, canvas.height - imgHeight));

    ctx.drawImage(img, clampedX, clampedY, imgWidth, imgHeight);

  }, [zoom, offset]);
  
  useEffect(() => {
      if (imageRef.current) {
        draw();
      }
  }, [draw]);


  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      imageRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const imgAspectRatio = img.width / img.height;
      let initialZoom;
      if (imgAspectRatio > aspectRatio) {
        // Image is wider than canvas -> fit to height
        initialZoom = canvas.height / img.height;
      } else {
        // Image is taller or same aspect ratio -> fit to width
        initialZoom = canvas.width / img.width;
      }
      setMinZoom(initialZoom);
      setZoom(initialZoom);
      setOffset({
        x: (canvas.width - img.width * initialZoom) / 2,
        y: (canvas.height - img.height * initialZoom) / 2,
      });
    };
  }, [src, aspectRatio]);
  
  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e.nativeEvent) {
        return { x: e.nativeEvent.touches[0].clientX - rect.left, y: e.nativeEvent.touches[0].clientY - rect.top };
    }
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  }

  const handleDragStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const pos = getEventPosition(e);
    setIsDragging(true);
    setDragStart({ x: pos.x - offset.x, y: pos.y - offset.y });
  };

  const handleDragMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const pos = getEventPosition(e);
    setOffset({
      x: pos.x - dragStart.x,
      y: pos.y - dragStart.y,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const zoomFactor = 1 - e.deltaY * 0.001;
      setZoom(prevZoom => Math.max(minZoom, Math.min(prevZoom * zoomFactor, 5)));
  }

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL('image/jpeg', 0.9));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm flex flex-col max-h-[90vh]">
        <header className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Crop Image</h3>
            <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-300"/>
            </button>
        </header>
        <main className="p-4 flex-grow flex flex-col items-center">
            <canvas
                ref={canvasRef}
                width={outputWidth}
                height={outputHeight}
                className="cursor-move border border-gray-300 touch-none"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onWheel={handleWheel}
            />
             <div className="mt-4 w-full">
                <label htmlFor="zoom" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zoom</label>
                <input
                    id="zoom"
                    type="range"
                    min={minZoom}
                    max="5"
                    step="0.01"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
            </div>
        </main>
        <footer className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700">
            <button onClick={handleSave} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                Crop & Save
            </button>
        </footer>
      </div>
    </div>
  );
}
