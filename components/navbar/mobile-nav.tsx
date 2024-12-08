import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { MobileNavSheet } from "./mobile-nav-sheet";
import { getDictionary } from '@/app/(root)/dictionaries'
import { WEBSITE } from "@/constants";

export async function MobileNav({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)
  const header = (
    <SheetHeader>
      <SheetTitle>{WEBSITE}</SheetTitle>
      <SheetDescription>{dict.info.slogan}</SheetDescription>
    </SheetHeader>
  );

  return <MobileNavSheet items={Object.values(dict.paths)} header={header} />;
}
