import type {Metadata} from "next";
import {Open_Sans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {QueryProvider} from "@/components/providers/query-provider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const font = Open_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Discord",
  description: "ShuVeriDe ZIene",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
    <ThemeProvider attribute="class"
                   defaultTheme="dark"
                   enableSystem={false}
                   storageKey="discord-tjeme"
    >
      <QueryProvider>
        {children}
        <ToastContainer />
      </QueryProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
