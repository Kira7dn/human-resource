import Footer from "./_components/Footer";
import { Header } from "./_components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#070815] text-white">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
