import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

// QUI vanno i metadata dinamici!
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  try {
    const menu = await client.getSingle("menu_site");

    return {
      title: menu.data.site_title || "Snuggl",
      description: menu.data.meta_description || "Adopt, not shop.",
      openGraph: {
        images: menu.data.logo?.url ? [{ url: menu.data.logo.url }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Snuggl",
      description: "Adopt, not shop.",
    };
  }
}

export default async function HomePage() {
  const client = createClient();

  try {
    const page = await client.getSingle("homepage");
    return <SliceZone slices={page.data.slices} components={components} />;
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-heading font-semibold mb-4">
          Benvenuto su Snuggl 🐾
        </h1>
        <p className="text-black">
          Crea il Custom Type "homepage" in Prismic per iniziare.
        </p>
      </div>
    );
  }
}
