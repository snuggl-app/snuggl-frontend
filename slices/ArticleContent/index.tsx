import { FC } from "react";
import { asLink, Content, isFilled } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ArticleContent`.
 */
export type ArticleContentProps =
  SliceComponentProps<Content.ArticleContentSlice>;

/**
 * Component for "ArticleContent" Slices.
 */
const contentComponents: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-base leading-8 text-foreground mb-5">{children}</p>
  ),
  heading2: ({ children }) => (
    <h2 className="font-heading font-semibold text-2xl text-foreground mt-10 mb-4">
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3 className="font-heading font-semibold text-xl text-foreground mt-8 mb-3">
      {children}
    </h3>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),

  hyperlink: ({ children, node }) => {
    const href = asLink(node.data) || "#";

    const target =
      typeof node.data === "object" &&
      node.data !== null &&
      "target" in node.data &&
      typeof node.data.target === "string"
        ? node.data.target
        : undefined;

    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    );
  },
  list: ({ children }) => <ul className="mb-5 space-y-2 pl-1">{children}</ul>,
  listItem: ({ children }) => (
    <li className="flex items-start gap-3 text-base leading-7 text-foreground">
      <span className="mt-2 shrink-0 w-2 h-2 rounded-full bg-primary" />
      <span>{children}</span>
    </li>
  ),
  oList: ({ children }) => (
    <ol className="mb-5 space-y-2 pl-1 list-decimal list-inside">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="text-base leading-7 text-foreground">{children}</li>
  ),
  preformatted: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-primary pl-6 py-1">
      <p className="text-lg italic text-muted-foreground leading-8">
        {children}
      </p>
    </blockquote>
  ),
  image: ({ node }) => (
    <figure className="my-8">
      <PrismicNextImage
        field={node}
        className="w-full rounded-2xl object-cover"
      />
      {node.alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {node.alt}
        </figcaption>
      )}
    </figure>
  ),
};

const noteComponents: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <span className="text-sm text-muted-foreground leading-6">{children}</span>
  ),
};

const ArticleContent: FC<ArticleContentProps> = ({ slice }) => {
  const { content, notes } = slice.primary;
  const hasNotes = isFilled.group(notes);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-3xl mx-auto px-6 pb-8"
    >
      {/* Corpo articolo */}
      {isFilled.richText(content) && (
        <PrismicRichText field={content} components={contentComponents} />
      )}

      {/* Note a piè di sezione */}
      {hasNotes && (
        <div className="mt-10 pt-6 border-t border-fog space-y-2">
          {notes.map((item, index) => (
            <div key={index} className="flex items-baseline gap-2">
              <span className="shrink-0 text-xs font-semibold text-primary">
                {item.marker ?? `*`}
              </span>
              {isFilled.richText(item.note) && (
                <PrismicRichText
                  field={item.note}
                  components={noteComponents}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ArticleContent;
