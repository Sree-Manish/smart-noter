import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import NoteProvider from "@/providers/NoteProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Noter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NoteProvider>
              <SidebarProvider>
                <AppSidebar />
                <div className="flex min-h-screen w-full flex-col">
                  <Header />
                  <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                    
                    <SidebarTrigger />
                    {children}
                  </main>
                </div>
              </SidebarProvider>
            <Toaster richColors />
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
