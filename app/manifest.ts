import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spice Delight - Indian Food Delivery",
    short_name: "Spice Delight",
    description: "Order authentic Indian cuisine delivered to your doorstep. Fast, reliable food delivery service.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f97316",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["food", "shopping", "lifestyle"],
    lang: "en",
    dir: "ltr",
  }
}
