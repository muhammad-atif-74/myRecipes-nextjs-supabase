import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/common/Navbar";
import { poppins, lora } from "./ui/fonts";
import Footer from "./components/sections/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MyRecipe - AI Powered Recipes Finder",
  description: "Discover delicious recipes and meal plans tailored to your taste with MyRecipe, the AI-powered recipe finder.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${lora.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
