import { createClient } from "@/prismicio";
import Link from "next/link";
import Image from "next/image";

export default async function Header() {
  const client = createClient();

  const menu = await client.getSingle("menu_site").catch(() => null);

  return (
    <header className="border-b border-fog bg-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Blog Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              {menu?.data?.logo?.url && (
                <Image
                  src={menu.data.logo.url}
                  alt={menu.data.logo.alt || "Snuggl Logo"}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              )}
              <span className="text-xl font-heading font-semibold text-foreground">
                {menu?.data?.site_title || "Snuggl"}
              </span>
            </Link>
            <span className="text-silver">/</span>
            <Link
              href="/blog"
              className="text-lg font-heading font-medium text-primary"
            >
              Blog
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="font-body text-sm hover:text-primary transition-colors"
            >
              Tutti i post
            </Link>
            <Link
              href="/blog/categorie"
              className="font-body text-sm hover:text-primary transition-colors"
            >
              Categorie
            </Link>
            <Link
              href="/"
              className="font-body text-sm text-silver hover:text-foreground transition-colors"
            >
              ← Torna al sito
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
