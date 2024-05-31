import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals/globals.css";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codify",
  description: "Wilkommen zu Codify!"
};

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
