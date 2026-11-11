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
  title: "Німецька A1–B1 — тренажер професора Орлова О.В.",
  authors: [{ name: "професор Орлов О.В." }],
  description:
    "Тренажер німецької мови для рівнів A1–B1: 1502 слова у 75 темах із прикладами та озвучкою, двосторонні картки, вікторина перекладів, тренажер артиклів der/die/das, відмінювання дієслів, таблиці займенників, прийменники, читанка та симулятор екзамену з таймером. Українською та російською. Прогрес зберігається в браузері. Автор — професор Орлов О.В.",
  keywords: [
    "німецька мова",
    "німецька для початківців",
    "A1",
    "A2",
    "B1",
    "A1–B1",
    "екзамен",
    "тренажер",
    "Орлов",
    "професор Орлов",
    "Орлов О.В.",
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
