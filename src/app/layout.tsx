import "shortiny/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "shortiny/trpc/react";
import NavHeader from "./_components/navigation/nav-header/NavHeader";
import { ubuntu_mono } from "./utils/fonts";
import Footer from "./_components/ui/footer/Footer";

import { auth } from "shortiny/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 // const session = await auth() //session={session}
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
