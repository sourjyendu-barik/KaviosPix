import { useState, useEffect } from "react";

interface UseImageFallbackResult {
  src: string | undefined;
  isError: boolean;
  onError: () => void;
}

/**
 * Returns a safe image src — falls back to `fallbackSrc` (or undefined)
 * if the original src is empty or fails to load.
 */
export function useImageFallback(
  originalSrc: string | null | undefined,
  fallbackSrc?: string,
): UseImageFallbackResult {
  const [isError, setIsError] = useState(false);

  // Reset error state if the source prop changes (e.g. new album data)
  useEffect(() => {
    setIsError(false);
  }, [originalSrc]);

  const hasValidSrc = !!originalSrc && !isError;

  return {
    src: hasValidSrc ? originalSrc! : fallbackSrc,
    isError: !hasValidSrc,
    onError: () => setIsError(true),
  };
}
