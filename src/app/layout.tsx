import type { Metadata } from "next";
import localFont from "next/font/local";

import { TicketProvider } from "@/contexts/TicketContext";
import { Header, Footer } from "@/components/global";

import "./globals.css";

const nunito = localFont({
  src: [
    {
      path: "../assets/fonts/Nunito/Nunito-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Nunito/Nunito-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Nunito/Nunito-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Nunito/Nunito-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O melhor delivery de tudo é no aiqfome",
  description:
    "Peça comida, bebidas, mercado, farmácia, padaria, pet shop e muito mais pelo maior aplicativo de delivery do interior. Baixe o app agora mesmo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable}`}>
        <TicketProvider>
          <Header />
          {children}
          <Footer />
        </TicketProvider>
      </body>
    </html>
  );
}
