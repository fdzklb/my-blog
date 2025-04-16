import type { Metadata } from "next";
import * as React from "react";
import "@/styles/global.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { isProdction } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className="debug-screens overflow-x-clip scroll-smooth">
         <TooltipProvider>
            {children}
          </TooltipProvider>
      </body>
      {isProdction() && <GoogleAnalytics gaId="G-V23LE3L362" />}
      
    </html>
  );
}
