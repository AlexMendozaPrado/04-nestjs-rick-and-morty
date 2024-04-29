import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-1.5 px-6 bg-gray-800 mt-6">
      <Image
        src="/rick_and_morty_logo2.jpg"
        alt="Rick and Morty"
        width={230}
        height={94}
      />
      <p className="mb-6 text-center">Alejandro Mendoza</p>
    </footer>
  );
}
