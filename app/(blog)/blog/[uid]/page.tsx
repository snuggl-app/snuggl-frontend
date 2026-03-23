import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Props = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const article = await client.getByUID("article", uid).catch(() => notFound());

  return {
    title: article.data.meta_title,
    description: article.data.meta_description,
    openGraph: article.data.meta_image?.url
      ? { images: [{ url: article.data.meta_image.url }] }
      : undefined,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const articles = await client.getAllByType("article");
  return articles.map((article) => ({ uid: article.uid }));
}

export default async function ArticlePage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();
  const article = await client.getByUID("article", uid).catch(() => notFound());

  return (
    <main>
      <SliceZone slices={article.data.slices} components={components} />
    </main>
  );
}
