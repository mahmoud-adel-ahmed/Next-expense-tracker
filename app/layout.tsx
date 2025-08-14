import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import Footer from "@/components/Footer";
import ClerkThemeProvider from "@/components/ClerkThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Expense Tracker",
  description: "Track your expenses effortlessly with our AI-powered insights.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <ThemeProvider>
      <ClerkThemeProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <html
            dir={locale === "ar" ? "rtl" : "ltr"}
            lang={locale}
            suppressHydrationWarning={true}
          >
            <head>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
                }}
              />
            </head>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <Navbar />
              {children}
              <Footer />
            </body>
          </html>
        </NextIntlClientProvider>
      </ClerkThemeProvider>
    </ThemeProvider>
  );
}
