"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

/**
 * SafeImage wraps next/image and provides a graceful fallback when the image fails to load
 * (useful for case-sensitive path issues in production).
 */
export default function SafeImage(props: ImageProps) {
  const [errored, setErrored] = useState(false);
  const { alt, className, ...rest } = props;

  if (errored) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-400 ${className ?? ""}`}>
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      {...rest}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}


