import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Daftar semua bahasa yang didukung
  locales: ["en", "id"],

  // Bahasa default yang digunakan jika tidak ada preferensi
  defaultLocale: "id",
});

export const config = {
  // Cocokkan hanya dengan path yang diinternasionalkan
  // Hindari path seperti /_next, /api, /favicon.ico, dll.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
