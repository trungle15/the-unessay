import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"], // You can include the weights you need
  variable: "--font-jetbrains-mono", // For custom CSS variable usage
});

export const metadata: Metadata = {
  title: "The Un-Essays",
  description: "The Un-Essays",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  );
}
