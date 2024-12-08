"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface MobileNavSheetProps {
  items: { link: string; label: string }[];
  header: React.ReactNode;
}

export function MobileNavSheet({ items, header }: MobileNavSheetProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="menu"
          className={cn("sm:hidden")}
        >
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        {header}
        <div className="grid gap-4 pt-8">
          {items.map((el) => (
            <Link
              key={el.link}
              href={el.link}
              className={cn(
                buttonVariants({
                  variant: pathname === el.link ? "default" : "ghost",
                }),
                "text-md px-4 py-2 flex gap-2 items-center !justify-start w-full",
              )}
              onClick={() => setOpen(false)}
            >
              {el.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
} 