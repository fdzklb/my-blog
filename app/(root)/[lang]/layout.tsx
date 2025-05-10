import * as React from "react";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/global.css";
import RouteTracker from "@/components/RouteTracker";
import { isProdction } from "@/lib/utils";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
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
          <div className="max-w-[1920px] mx-auto">
            <Navbar lang={lang} />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
            {/* <Footer lang={params.lang} /> */}
            <div className="hidden sm:block">
              <BackToTop />
            </div>
          </div>
        </TooltipProvider>
          {/* 生产环境下记录访问者ip和浏览页面以及停留时间 */}
         {isProdction() && <RouteTracker />}
      </body>
    </html>
  );
}
