"use client";

import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image
        src="/ingressSoftwareLogo.jpg"
        alt="Ingress Software"
        width={180}
        height={60}
        className="h-auto"
        priority
      />
    </Link>
  );
}

