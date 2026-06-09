"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  initials: string;
  size?: number;
}

export default function FounderImage({ src, alt, initials, size = 80 }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-lg font-semibold text-[#888]">{initials}</span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-cover w-full h-full"
      onError={() => setFailed(true)}
    />
  );
}
