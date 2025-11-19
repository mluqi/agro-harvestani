import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agroharvestani.com";

export const metadata = {
  title: {
    template: "%s | AgroHarvestani",
    default: "AgroHarvestani - Indonesian Agricultural Exporter",
  },
  description:
    "Exporting premium quality agricultural products from Indonesia to the world. Specializing in spices, coffee, and coconut oil.",
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
      "Exporting premium quality agricultural products from Indonesia to the world. Specializing in spices, coffee, and coconut oil.",
    url: siteUrl,
    siteName: "AgroHarvestani",
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Pastikan Anda memiliki gambar ini di folder /public
        width: 1200,
        height: 630,
        alt: "AgroHarvestani - Exporting Indonesian Agriculture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgroHarvestani - Premium Indonesian Agricultural Exporter",
    description:
      "Exporting premium quality agricultural products from Indonesia to the world.",
    images: `${siteUrl}/og-image.png`, // Pastikan Anda memiliki gambar ini di folder /public
    site: "@agroharvestani", // Ganti dengan handle Twitter Anda jika ada
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
    // Bahasa default untuk crawler dan pengguna tanpa JavaScript
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
