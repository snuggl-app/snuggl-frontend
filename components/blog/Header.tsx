import { createClient } from "@/prismicio";
import Link from "next/link";
import MobileMenu from "@/components/ui/MobileMenu";

const blogLinks = [
  { href: "/blog", label: "Tutti i post" },
  { href: "/", label: "← Torna al sito" },
];

export default async function Header() {
  const client = createClient();
  const menu = await client.getSingle("menu_site").catch(() => null);

  return (
    <header className="border-b border-fog bg-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Blog Title */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xl font-heading font-semibold text-foreground"
            >
              {menu?.data?.site_title || "Snuggl"}
            </Link>
            <span className="hidden sm:block text-silver">/</span>
            <Link
              href="/blog"
              className="hidden sm:block text-lg font-heading font-medium text-primary"
            >
              Blog
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {blogLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile */}
          <MobileMenu links={blogLinks} title="Blog" />
        </div>
      </nav>
    </header>
  );
}
