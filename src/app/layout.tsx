import "shortiny/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "shortiny/trpc/react";
import NavHeader from "./_components/navigation/nav-header/NavHeader";
import Footer from "./_components/ui/footer/Footer";
import { ubuntu_mono } from "./utils/fonts";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Shortiny",
  description: "Shortiny your urls!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className={`font-ubuntu_mono ${inter.variable} ${ubuntu_mono}`}>
        <TRPCReactProvider>
            <NavHeader />
              <main>
                {children}
              </main>
            <Footer/>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
