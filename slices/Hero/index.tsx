import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
export default function Hero({ slice }: HeroProps) {
  const buttons = slice.primary.button;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-gray px-6 py-12 lg:px-40 lg:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold leading-tight">
              {slice.primary.title_1 && (
                <span className="text-foreground block">
                  {slice.primary.title_1}
                </span>
              )}
              {slice.primary.title_2 && (
                <span className="text-primary block">
                  {slice.primary.title_2}
                </span>
              )}
            </h1>

            {slice.primary.paragraph && (
              <p className="text-base md:text-lg text-muted-foreground max-w-lg">
                {slice.primary.paragraph}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {buttons?.map((item, index) => {
                const href = item.button_href || "#";
                const isAnchor = href.startsWith("#");

                return (
                  <Button
                    key={index}
                    asChild
                    size="lg"
                    variant={index === 0 ? "default" : "ghost"}
                    className={cn(
                      "font-bold bg-primary hover:bg-primary/90 text-black rounded-full",
                      index && "bg-white border border-black/20"
                    )}
                  >
                    {isAnchor ? (
                      <a href={href}>{item.button_text}</a>
                    ) : (
                      <Link href={href}>{item.button_text}</Link>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="relative w-full max-w-[500px] aspect-square rotate-2 mx-auto hidden sm:block">
            <PrismicNextImage
              alt=""
              field={slice.primary.hero_image}
              className="w-full h-full object-cover rounded-[48px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
