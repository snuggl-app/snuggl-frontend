"use client";

import { FC, useState, FormEvent } from "react";
import { Content, asText } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

const Newsletter: FC<NewsletterProps> = ({ slice }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Subscribing:", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-azure py-24 px-40"
      id="#newsletter"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl font-bold">{slice.primary.title}</h2>

          {/* Opzione con asText per testo semplice */}
          <p className="text-lg text-green max-w-2xl">
            {asText(slice.primary.description)}
          </p>

          <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-2xl">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={slice.primary.email_placeholder || "La tua email"}
              className="flex-1 bg-white border-0 rounded-full px-6 py-6 text-base shadow-xl"
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-bold whitespace-nowrap shadow-xl"
            >
              {isSubmitting ? "..." : slice.primary.button_text}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
