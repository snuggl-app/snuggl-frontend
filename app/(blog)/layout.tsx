import BlogHeader from "@/components/blog/Header";
import Footer from "@/components/Footer";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BlogHeader />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
