import { Content } from "@prismicio/client";
import { PrismicLink, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      className="relative w-full bg-white py-16 md:py-24"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Heading */}
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

            {/* Description */}
            {slice.primary.paragraph && (
              <p className="text-base md:text-lg text-muted-foreground max-w-lg">
                {slice.primary.paragraph}
              </p>
            )}

            {/* CTA Buttons from Items (Repeatable) */}

            <div className="flex flex-col sm:flex-row gap-4">
              {buttons?.map((item, index) => (
                <Button
                  key={index}
                  asChild
                  size="lg"
                  variant={index === 0 ? "default" : "ghost"}
                  className={
                    index === 0
                      ? "bg-primary hover:bg-primary/90 text-white rounded-full"
                      : "rounded-full border border-foreground/20"
                  }
                >
                  <PrismicLink field={item.button_link}>
                    {item.button_text}
                  </PrismicLink>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-[500px] aspect-square rotate-2">
            <PrismicNextImage
              field={slice.primary.hero_image}
              className="w-full h-full object-cover rounded-[48px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>

      {/* Optional indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-1 h-8 bg-primary/20 rounded-full" />
      </div>
    </section>
  );
}
