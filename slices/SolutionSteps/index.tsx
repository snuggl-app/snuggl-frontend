import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrismicNextImage } from "@prismicio/next";

export type SolutionStepsProps =
  SliceComponentProps<Content.SolutionStepsSlice>;

const SolutionSteps: FC<SolutionStepsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-gray px-6 py-12 lg:px-40 lg:py-24"
      id="solution"
    >
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">{slice.primary.title}</h1>
          <p className="text-lg text-green">{slice.primary.subtitle}</p>
        </div>

        {/* Grid Container */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-pl-6 -mx-6 px-6 sm:mx-6 sm:px-0">
          {slice.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 min-w-[80vw] sm:min-w-0 snap-start"
            >
              {/* Card con immagine */}
              <Card className="relative overflow-hidden aspect-[4/3] border-0 shadow-card">
                <PrismicNextImage
                  field={item.image}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <Badge className="absolute top-4 left-4 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold shadow-xl">
                  {item.step_number}
                </Badge>
              </Card>

              {/* Testo */}
              <div>
                <h3 className="text-2xl font-bold mb-2">{item.step_title}</h3>
                <div className="text-gray-600">
                  <PrismicRichText field={item.step_description} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSteps;
