"use client";

import { useCallback } from "react";
import { useCamera } from "../hooks/use-camera";

export interface CameraProps {
  onCapture?: (file: File) => void;
}

export function Camera({ onCapture }: CameraProps) {
  const {
    state,
    videoRef,
    startCamera,
    stopCamera,
    toggleFacingMode,
    capturePhoto,
    resetPhoto,
  } = useCamera();

  const handleCaptureClick = useCallback(async () => {
    const file = await capturePhoto();
    if (file) {
      onCapture?.(file);
    }
  }, [capturePhoto, onCapture]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Camera Preview */}
      <div className="relative aspect-[3/4] bg-gray-900 rounded-lg overflow-hidden">
        {state.status === "ready" && !state.photoData && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${
              state.facingMode === "user" ? "scale-x-[-1]" : ""
            }`}
          />
        )}
        {state.photoData && (
          <img
            src={state.photoData}
            alt="Captured photo"
            className="w-full h-full object-cover"
          />
        )}
        {state.status === "requesting" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white">카메라 권한을 요청중입니다...</p>
          </div>
        )}
        {(state.status === "denied" || state.status === "error") && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-white text-center">{state.error}</p>
          </div>
        )}
      </div>

      {/* Camera Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        {state.status === "idle" && (
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            카메라 시작
          </button>
        )}
        {state.status === "ready" && !state.photoData && (
          <>
            <button
              onClick={stopCamera}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              중지
            </button>
            <button
              onClick={handleCaptureClick}
              className="p-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
            >
              촬영
            </button>
            <button
              onClick={toggleFacingMode}
              className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            >
              전환
            </button>
          </>
        )}
        {state.photoData && (
          <>
            <button
              onClick={resetPhoto}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              다시 촬영
            </button>
            <button
              onClick={() => {
                resetPhoto();
                stopCamera();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              완료
            </button>
          </>
        )}
      </div>
    </div>
  );
}
