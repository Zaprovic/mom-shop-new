import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/global/header";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GlowBeauty - Premium Beauty & Skincare Products",
  description:
    "Discover premium beauty and skincare products crafted with natural ingredients. Transform your daily routine into a luxurious self-care ritual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
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
