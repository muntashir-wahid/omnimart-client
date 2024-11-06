import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import GlobalProvider from "@/components/global/Providers/GlobalProvider";

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
      <body>
        <GlobalProvider allChildren={children} />
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              error: "text-red-400",
              success: "text-green-400",
              warning: "text-yellow-400",
              info: "text-blue-400",
            },
          }}
        />
      </body>
    </html>
  );
}
