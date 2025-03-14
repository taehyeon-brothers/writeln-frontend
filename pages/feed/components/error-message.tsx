"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/pages/base/components/alert";
import { Button } from "@/pages/base/components/button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="mt-3 border-[#ac243b] text-[#ac243b] hover:bg-[#ac243b]/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
