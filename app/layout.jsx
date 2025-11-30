import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";
import { AuthProvider } from "@/components/context/AuthProvider";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agroharvestani.com";

export const metadata = {
  title: {
    template: "%s | AgroHarvestani",
    default: "AgroHarvestani - The Finest Harvest, Globally Delivered.",
  },
  description:
    "The Finest Harvest, Globally Delivered. AgroHarvestani exports premium quality agricultural products from Indonesia to the world.",
  keywords: [
    "Indonesian agricultural products",
    "spice exporter",
    "coffee exporter Indonesia",
    "coconut oil",
    "cloves",
    "cinnamon",
    "sustainable farming",
    "global trade",
    "produk pertanian Indonesia",
    "eksportir rempah",
  ],
  openGraph: {
    title: "AgroHarvestani - Premium Indonesian Agricultural Exporter",
    description:
      "The Finest Harvest, Globally Delivered. AgroHarvestani exports premium quality agricultural products from Indonesia to the world.",
    url: siteUrl,
    siteName: "AgroHarvestani",
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Pastikan Anda memiliki gambar ini di folder /public
        width: 1200,
        height: 630,
        alt: "AgroHarvestani - The Finest Harvest, Globally Delivered.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}/en`,
      "id-ID": `${siteUrl}/id`,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics />
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
