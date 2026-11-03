import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Німецька A1 — тренажер слів і граматики",
  description:
    "Тренажер німецької мови для початківців: 140 слів у 14 темах із прикладами та озвучкою, двосторонні картки, вікторина перекладів, тренажер артиклів der/die/das, відмінювання дієслів у Präsens і шпаргалка з граматики A1. Українською та російською. Прогрес зберігається в браузері.",
  keywords: [
    "німецька мова",
    "німецька для початківців",
    "A1",
    "тренажер",
    "слова",
    "картки",
    "граматика",
    "артиклі",
    "дієслова",
    "deutsch",
    "deutsch lernen",
    "немецкий язык",
    "тренажёр",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
