import { DM_Sans, DM_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { notFound } from "next/navigation";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default async function LocaleLayout({ children, params }) {
  let messages;
  let locale;
  
  try {
    // Await params and extract locale
    const awaitedParams = await params;
    locale = awaitedParams.locale;
    
    // Load messages for the locale
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    // Jika locale tidak valid (misal: /fr), tampilkan halaman 404
    notFound();
  }

  return (
    <div className={`${dmSans.variable} ${dmMono.variable} antialiased`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider
          messages={messages}
          initialLocale={locale}
          timeZone="Asia/Jakarta"
        >
          <Header />
          <div>{children}</div>
          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}