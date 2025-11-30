export default function AdminLayout({ children }) {
  // Layout ini sekarang hanya meneruskan children tanpa menambahkan wrapper atau style.
  // Ini memungkinkan layout di level yang lebih dalam (seperti admin/layout.jsx)
  // untuk mengontrol sepenuhnya tata letaknya.
  return <>{children}</>;
}