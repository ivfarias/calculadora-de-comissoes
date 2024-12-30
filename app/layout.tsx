import { graphik } from './fonts'

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculadora de comissões de venda - Kyte",
  description: "Calcule a comissão de seus vendedores grátis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${graphik.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

