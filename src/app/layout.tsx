import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/global/header";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { getUser } from "@/server/auth";
import "./globals.css";

// this is just a test comment

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GlowBeauty - Productos de Belleza y Cuidado de la Piel Premium",
  description:
    "Descubre productos de belleza y cuidado de la piel premium elaborados con ingredientes naturales. Transforma tu rutina diaria en un lujoso ritual de autocuidado.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getUser();

  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <body className={`${poppins.variable} antialiased`}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
