import { Inter } from "next/font/google";

import "./globals.css";

export const metadata = {
  title: "OmniMart",
  description:
    "An online store with everything in one place, from clothing to electronics to food.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
