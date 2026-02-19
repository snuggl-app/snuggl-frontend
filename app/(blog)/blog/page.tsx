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

export default function BlogPostPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray px-6">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <span className="text-6xl">🐾</span>
        <h1 className="text-4xl font-bold font-fredoka">
          Il blog sta arrivando!
        </h1>
        <p className="text-lg text-green">
          Stiamo preparando storie di adozioni, consigli e novità dalla
          community Snuggl. Torna presto!
        </p>
        <a
          href="/"
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-4 font-bold shadow-xl transition-colors"
        >
          Torna alla home
        </a>
      </div>
    </main>
  );
}
