import "./globals.css";

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
    "پروداکت لوپ - پلتفرمی برای کسایی که محصول یا پلتفرمی که دارن رو به بقیه نشون بدن !",
  icons: {
    icon: "/assets/logo.png",
  },
};

const RootLayout = async ({ children }) => {
  const session = await auth();

  return (
    <html lang="en" dir="ltr">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1ZNC1723V9"
        ></Script>
        <Script id="google-analytics" >
          {`
   window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1ZNC1723V9');
  `}
        </Script>
      </head>
      <body>
        <QueryProvider>
          <NextTopLoader height={4} color="#5347F6" />
          <Toaster
            theme="light"
            position="bottom-right"
            closeButton
            richColors
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
