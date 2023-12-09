import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import Head from "next/head";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/shared/navbar/Navbar";
import { Providers } from "./providers/Providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Derent",
  description: "Blockchain ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Set the title and description in the <Head> section */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Add the favicon using a <link> tag */}
        <link
          rel="icon"
          href="/favicon.ico" // Replace with the actual path to your favicon
        />
      </Head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
