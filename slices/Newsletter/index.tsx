"use client";

import { FC, FormEvent, useState } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

type Status = "idle" | "loading" | "success" | "error";

const Newsletter: FC<NewsletterProps> = ({ slice }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const isSubmitting = status === "loading";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit chiamato", email);
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          consent: true, // se aggiungi checkbox, metti qui il valore reale
        }),
      });

      if (!res.ok) {
        setStatus("error");
        setMessage("Ops, qualcosa è andato storto. Riprova tra poco.");
        return;
      }

      setStatus("success");
      setMessage(
        "Controlla la tua email: ti abbiamo inviato un link di conferma 🐾"
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Errore di rete. Controlla la connessione e riprova.");
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-azure py-12 px-6 lg:py-24 lg:px-40"
      id="newsletter"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl font-bold">{slice.primary.title}</h2>

          <p className="text-lg text-green max-w-2xl">
            {asText(slice.primary.description)}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
          >
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
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-bold whitespace-nowrap shadow-xl w-full sm:w-auto"
            >
              {isSubmitting ? "Invio..." : slice.primary.button_text}
            </Button>
          </form>

          {status !== "idle" && (
            <p
              className={`text-sm ${
                status === "success" ? "text-green-700" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
