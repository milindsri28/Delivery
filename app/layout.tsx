import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationProvider } from "@/context/animation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spice Delight - Indian Food Delivery PWA",
  description:
    "Order authentic Indian cuisine delivered to your doorstep. Fast, reliable Progressive Web App experience.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["food delivery", "indian cuisine", "pwa", "spice delight", "restaurant"],
  authors: [{ name: "Spice Delight" }],
  icons: [
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "icon", url: "/icon-192x192.png" },
  ],
}

export const viewport: Viewport = {
  themeColor: "#f97316",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  shrinkToFit: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Spice Delight" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <CartProvider>
            <AnimationProvider>{children}</AnimationProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
