"use client";

import { FC, useMemo, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ArticleCard } from "@/components/blog";

const CATEGORIES = [
  "Tutti",
  "Adozioni",
  "Consigli",
  "Storie",
  "Alimentazione",
  "Attività",
];

type BlogContext = {
  featuredArticle: any | null;
  articles: any[];
  totalPages: number;
};

/**
 * Props for `BlogArticleGrid`.
 */
export type BlogArticleGridProps =
  SliceComponentProps<Content.BlogArticleGridSlice>;

/**
 * Component for "BlogArticleGrid" Slices.
 */
const BlogArticleGrid: FC<SliceComponentProps<any, BlogContext>> = ({
  slice,
  context,
}) => {
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [visibleCount, setVisibleCount] = useState<number>(
    slice.primary.max_articles || 6
  );

  const showFilters = slice.primary.show_filters ?? true;
  const showLoadMore = slice.primary.show_load_more ?? true;

  // IDs da escludere (featured + pinned già mostrati)
  const pinnedIds = (slice.items || [])
    .map((item: any) => item.pinned_article?.id)
    .filter(Boolean);

  const featuredId = context.featuredArticle?.id;
  const excludeIds = [...pinnedIds, featuredId].filter(Boolean);

  // Articoli pinnati (dall'ordine scelto in CMS)
  const pinnedArticles = pinnedIds
    .map((id: string) => context.articles.find((a) => a.id === id))
    .filter(Boolean);

  // Articoli rimanenti (esclusi featured + pinnati)
  const remainingArticles = context.articles.filter(
    (a) => !excludeIds.includes(a.id)
  );

  // Combina: pinnati prima, poi il resto
  const allArticles = [...pinnedArticles, ...remainingArticles];

  // Filtra per categoria
  const filteredArticles = useMemo(() => {
    if (activeCategory === "Tutti") return allArticles;

    return allArticles.filter((article) => {
      const headerSlice = article.data?.slices?.find(
        (s: any) => s.slice_type === "article_header"
      );
      return headerSlice?.primary?.category === activeCategory;
    });
  }, [allArticles, activeCategory]);

  // Articoli visibili (paginazione)
  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12"
    >
      <div className="container max-w-6xl mx-auto">
        {/* Titolo sezione */}
        {slice.primary.section_title && (
          <h2 className="text-3xl font-heading font-semibold text-foreground mb-8">
            {slice.primary.section_title}
          </h2>
        )}

        {/* Tabs filtro categorie */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(slice.primary.max_articles || 6);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-white text-muted-foreground hover:text-foreground border border-fog"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Griglia articoli */}
        {visibleArticles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleArticles.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            Nessun articolo in questa categoria.
          </p>
        )}

        {/* Load more */}
        {showLoadMore && hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() =>
                setVisibleCount(
                  (prev) => prev + (slice.primary.max_articles || 6)
                )
              }
              className="bg-white border border-fog text-foreground hover:border-primary hover:text-primary px-8 py-3 rounded-full font-medium transition-colors"
            >
              Carica altri articoli
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogArticleGrid;
