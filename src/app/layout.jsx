import "./globals.css";

import localFont from "next/font/local";

import Script from "next/script";

import NextTopLoader from "nextjs-toploader";

import QueryProvider from "@/providers/QueryProvider";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

import { auth } from "./auth";

import { Toaster } from "sonner";

export const metadata = {
  title: "پروداکت لوپ - پلتفرم های فارسی زبان - جایی برای بهترین ها",
  description:
    "پروداکت لوپ - پلتفرمی برای کسایی که محصول یا پلتفرمی که دارن رو به بقیه نشون بدن!",
  icons: {
    icon: "/assets/logo.png",
  },
  openGraph: {
    title: "پروداکت لوپ",
    description:
      "پروداکت لوپ - پلتفرمی برای کسایی که محصول یا پلتفرمی که دارن رو به بقیه نشون بدن!",
    url: "https://productloop.ir",
    type: "website",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Product Loop Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "پروداکت لوپ - پلتفرم های فارسی زبان",
    description:
      "پروداکت لوپ - پلتفرمی برای کسایی که محصول یا پلتفرمی که دارن رو به بقیه نشون بدن!",
    image: "/assets/logo.png",
  },
};

const font = localFont({
  src: [
    {
      path: "../../public/fonts/Anjoman-R.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Anjoman-B.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Anjoman-S.woff",
      weight: "600",
      style: "normal",
    },
  ],
});

const RootLayout = async ({ children }) => {
  const session = await auth();

  return (
    <html lang="fa" dir="rtl">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1ZNC1723V9"
        ></Script>
        <Script id="google-analytics">
          {`
   window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1ZNC1723V9');
  `}
        </Script>
      </head>
      <body className={font.className}>
        <QueryProvider>
          <NextTopLoader height={4} color="#5347F6" />
          <Toaster
            theme="light"
            position="bottom-right"
            closeButton
            richColors
            className={font.className}
          />
          <main className="space-y-10">
            <Header session={session} />
            {children}
            <Footer />
          </main>
          <div className="fixed inset-0 -z-50 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20" />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
