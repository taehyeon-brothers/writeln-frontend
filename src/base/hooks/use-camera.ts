"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FacingMode = "user" | "environment";
type CameraStatus =
  | "idle"
  | "requesting"
  | "ready"
  | "denied"
  | "unsupported"
  | "error";

interface CameraState {
  status: CameraStatus;
  stream: MediaStream | null;
  error: string | null;
  facingMode: FacingMode;
  photoData: string | null;
}

const ERROR_MESSAGES = {
  PERMISSION_DENIED:
    "카메라 사용을 위해 권한이 필요합니다. 설정에서 카메라 접근을 허용해주세요.",
  NOT_SUPPORTED:
    "죄송합니다. 현재 기기에서는 카메라 기능을 사용할 수 없습니다.",
  UNKNOWN: "카메라 접근 중 문제가 발생했습니다. 다시 시도해주세요.",
} as const;

const initialState: CameraState = {
  status: "idle",
  stream: null,
  error: null,
  facingMode: "environment",
  photoData: null,
};

export function useCamera() {
  const [state, setState] = useState<CameraState>(initialState);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, status: "requesting" }));

      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setState((prev) => ({
          ...prev,
          status: "unsupported",
          error: ERROR_MESSAGES.NOT_SUPPORTED,
        }));
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: state.facingMode },
      });

      setState((prev) => ({
        ...prev,
        status: "ready",
        stream,
        error: null,
      }));
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          setState((prev) => ({
            ...prev,
            status: "denied",
            error: ERROR_MESSAGES.PERMISSION_DENIED,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            status: "error",
            error: ERROR_MESSAGES.UNKNOWN,
          }));
        }
      }
    }
  }, [state.facingMode]);

  const stopCamera = useCallback(() => {
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
    }
    setState((prev) => ({
      ...prev,
      status: "idle",
      stream: null,
      photoData: null,
    }));
  }, [state.stream]);

  const toggleFacingMode = useCallback(async () => {
    const newFacingMode = state.facingMode === "user" ? "environment" : "user";
    setState((prev) => ({ ...prev, facingMode: newFacingMode }));

    if (state.status === "ready") {
      stopCamera();
      await startCamera();
    }
  }, [state.facingMode, state.status, stopCamera, startCamera]);

  const capturePhoto = useCallback(async (): Promise<File | null> => {
    if (!videoRef.current || state.status !== "ready") return null;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return null;

    // Flip horizontally if using front camera
    if (state.facingMode === "user") {
      context.scale(-1, 1);
      context.translate(-canvas.width, 0);
    }

    context.drawImage(video, 0, 0);

    const photoData = canvas.toDataURL("image/jpeg");
    setState((prev) => ({ ...prev, photoData }));

    // Convert to File
    const res = await fetch(photoData);
    const blob = await res.blob();
    return new File([blob], "photo.jpg", { type: "image/jpeg" });
  }, [state.status, state.facingMode]);

  const resetPhoto = useCallback(() => {
    setState((prev) => ({ ...prev, photoData: null }));
  }, []);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (state.stream) {
        state.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [state.stream]);

  // Stream connection effect
  useEffect(() => {
    if (videoRef.current && state.stream && state.status === "ready") {
      videoRef.current.srcObject = state.stream;
    }
  }, [state.stream, state.status]);

  return {
    state,
    videoRef,
    startCamera,
    stopCamera,
    toggleFacingMode,
    capturePhoto,
    resetPhoto,
  };
}
