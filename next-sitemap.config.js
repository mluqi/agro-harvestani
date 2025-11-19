/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.agroharvestani.com",
  generateRobotsTxt: true, // (optional)
  // Opsi ini akan memastikan bahwa URL alternatif untuk setiap bahasa (en/id)
  // disertakan untuk setiap halaman, yang sangat baik untuk SEO internasional.
  // next-sitemap akan secara otomatis mendeteksi rute dari next-intl.
  // Tidak perlu konfigurasi tambahan untuk alternateRefs.
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
