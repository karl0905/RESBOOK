import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import {
  Navbar
} from "@/global/components";

import {
  Logo
} from "@/features/dashboard";


import "./globals.css";
import { Monda } from "next/font/google";

const monda = Monda({
  subsets: ["latin"],
  weights: [100, 200, 300, 400, 500, 600, 700],
});

export const metadata = {
  title: "RESBOOK",
  description: "Reserver dit bord nemt & hurtigt.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${monda.className} antialiased`}
      >
        <Toaster />
        <Logo />
        {children}
        <Navbar />
      </body>
    </html>
  );
}
