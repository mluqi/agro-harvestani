import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // Memuat file terjemahan yang sesuai dengan locale yang diminta
  // Jika locale tidak valid, akan fallback ke 'en' atau bahasa default Anda.
  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
