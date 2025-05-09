import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunitoFont = Nunito({
  subsets: ["latin"],
  weight: '700'
});

export const metadata: Metadata = {
  title: "O melhor delivery de tudo é no aiqfome",
  description: "Peça comida, bebidas, mercado, farmácia, padaria, pet shop e muito mais pelo maior aplicativo de delivery do interior. Baixe o app agora mesmo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoFont.className}`}>
        {children}
      </body>
    </html>
  );
}
