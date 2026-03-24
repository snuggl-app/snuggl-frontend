import { FC } from "react";
import { asLink, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

/**
 * Props for `BlogInstagramCta`.
 */
export type BlogInstagramCtaProps =
  SliceComponentProps<Content.BlogInstagramCtaSlice>;

/**
 * Component for "BlogInstagramCta" Slices.
 */
const BlogInstagramCta: FC<BlogInstagramCtaProps> = ({ slice }) => {
  const images = slice.items || [];

  return (
    <section className="py-12">
      <div className="container max-w-6xl mx-auto bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-4xl p-8 lg:p-14">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto ">
            <Instagram className="w-7 h-7 text-white" />
          </div>

          {slice.primary.title && (
            <h2 className="text-3xl font-heading font-semibold text-foreground text-center">
              {slice.primary.title}
            </h2>
          )}

          {slice.primary.description && (
            <div className="text-muted-foreground max-w-xl mx-auto">
              <PrismicRichText field={slice.primary.description} />
            </div>
          )}
        </div>

        {/* Griglia immagini Instagram */}
        {images.map((item: any, i: number) => (
          <a
            key={i}
            href={item.post_link?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square rounded-xl overflow-hidden group"
          >
            <Image
              src={item.image.url}
              width={item.image.dimensions?.width || 300}
              height={item.image.dimensions?.height || 300}
              alt={item.image.alt || ""}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </a>
        ))}

        {/* CTA button */}
        {slice.primary.button_text && (
          <div className="text-center mt-4">
            <Link
              href={asLink(slice.primary.button_link) || "#"}
              className="inline-flex items-center gap-2 bg-black hover:bg-primary/90 text-white rounded-full px-8 py-3 font-bold transition-colors"
            >
              <Instagram className="w-5 h-5" />
              {slice.primary.button_text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogInstagramCta;
