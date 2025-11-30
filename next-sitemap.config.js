/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Ganti dengan URL production website Anda.
  // Pastikan menggunakan https://
  siteUrl: process.env.SITE_URL || "https://www.agroharvestani.com",

  // Opsi untuk membuat file sitemap tambahan jika Anda memiliki banyak halaman.
  generateIndexSitemap: true, // Set `false` agar hanya membuat satu file sitemap.xml

  // Opsi untuk membuat file robots.txt secara otomatis.
  generateRobotsTxt: true,

  // (Opsional) Konfigurasi tambahan untuk robots.txt
  robotsTxtOptions: {
    // Kebijakan untuk semua crawler (user-agent: *)
    policies: [
      { userAgent: "*", allow: "/" },
      // Anda bisa memblokir direktori tertentu di sini jika perlu
      // { userAgent: "*", disallow: "/private/" },
    ],
    // Menambahkan URL sitemap ke dalam robots.txt
    additionalSitemaps: [`${process.env.SITE_URL || "https://www.agroharvestani.com"}/sitemap.xml`],
  },

  // (Opsional) Halaman yang ingin Anda kecualikan dari sitemap.
  // Gunakan pola glob untuk mencocokkan.
  // Halaman seperti profil, keranjang, login, dll. tidak perlu ada di sitemap.
  exclude: ["/admin", "/login", "/api/*"],
};
