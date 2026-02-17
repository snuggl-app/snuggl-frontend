import Header from "@/components/site/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <script
        type="text/javascript"
        src="https://embeds.iubenda.com/widgets/49b529b0-feb4-4165-8259-e7fa98fd317f.js"
      ></script>
    </>
  );
}
