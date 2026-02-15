import { createClient } from "@/prismicio";
import Link from "next/link";

export default async function Footer() {
  const client = createClient();
  const menu = await client.getSingle("menu_site").catch(() => null);

  return (
    <footer className="bg-gray border-t border-fog mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl font-heading font-semibold mb-4">
              {menu?.data?.site_title || "Snuggl"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {menu?.data?.meta_description || "Adopt, don't shop."}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-medium mb-4">Esplora</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/adozioni"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Adozioni
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-medium mb-4">Supporto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contatti"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contatti
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-medium mb-4">Seguici</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-fog text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {menu?.data?.site_title || "Snuggl"}.
            Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
