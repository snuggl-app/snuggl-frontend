"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type MobileMenuProps = {
  links: { href: string; label: string }[];
  title?: string;
};

export default function MobileMenu({ links, title = "Menu" }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 hover:bg-gray rounded-lg transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="text-xl font-heading font-semibold">
            {title}
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col px-6 pb-6">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-body text-foreground hover:text-primary transition-colors py-3 border-b border-fog last:border-0 animate-[fadeSlideIn_0.3s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${i * 80 + 150}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
