"use client";

import { useCallback } from "react";
import { Button } from "../components/button";
import { Camera } from "../components/camera";
import { XIcon } from "lucide-react";

export interface CameraPageProps {
  onPhotoCapture?: (file: File) => void;
  onClose?: () => void;
}

export function CameraPage({ onPhotoCapture, onClose }: CameraPageProps) {
  const handleCapture = useCallback(
    (file: File) => {
      onPhotoCapture?.(file);
    },
    [onPhotoCapture]
  );

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Camera Container */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Camera onCapture={handleCapture} />
        </div>
      </div>
    </div>
  );
}
