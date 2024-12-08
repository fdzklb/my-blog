import type { Metadata } from "next";
import * as React from "react";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/global.css";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params
  return (
    <html suppressHydrationWarning lang={lang}>
      <body className="debug-screens overflow-x-clip scroll-smooth">
        <TooltipProvider>
          <>
            <Navbar lang={lang} />
            <main className="min-h-[calc(100vh-190px)]">{children}</main>
            {/* <Footer lang={params.lang} /> */}
            <BackToTop />
          </>
        </TooltipProvider>
      </body>
    </html>
  );
}
