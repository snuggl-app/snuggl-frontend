import Image from "next/image";
import type { Metadata } from "next";

type Props = {
  params: { uid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetch(`https://api.vercel.app/blog/${params.uid}`).then(
    (r) => r.json()
  );

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  // fetch + render del post
  return <div>Post: {params.uid}</div>;
}
