import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import WhatsappButton from "@/components/common/WhatsappButton";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <WhatsappButton />

      <Footer />
    </>
  );
}
