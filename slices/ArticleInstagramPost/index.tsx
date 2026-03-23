import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Instagram } from "lucide-react";

/**
 * Props for `ArticleInstagramPost`.
 */
export type ArticleInstagramPostProps =
  SliceComponentProps<Content.ArticleInstagramPostSlice>;

/**
 * Component for "ArticleInstagramPost" Slices.
 */
const ArticleInstagramPost: FC<ArticleInstagramPostProps> = ({ slice }) => {
  const { instagram_url, instagram_text } = slice.primary;

  if (!isFilled.link(instagram_url)) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-3xl mx-auto px-6 py-6"
    >
      <div className="flex items-center justify-between gap-4 bg-azure rounded-2xl px-6 py-5">
        {/* Left: icon + testi */}
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Instagram className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
              Dalla nostra community
            </p>
            {instagram_text && (
              <p className="text-sm text-muted-foreground leading-snug">
                {instagram_text}
              </p>
            )}
          </div>
        </div>

        {/* Right: bottone */}
        <a
          href={instagram_url.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-primary text-white text-sm font-semibold rounded-full px-5 py-2 hover:bg-primary/90 transition-colors"
        >
          Vedi il post
        </a>
      </div>
    </section>
  );
};

export default ArticleInstagramPost;
