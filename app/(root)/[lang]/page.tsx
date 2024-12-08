import { IntroScrollMouse } from "@/components/intro-scroll-mouse";
import { HeroSectionZH, HeroSectionEN } from "@/features/home";

export const revalidate = 60;

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = await params
  return (
    <div className="relative grid md:h-[calc(100vh-64px)] place-content-center">
      {
        lang === "zh" ? <HeroSectionZH /> : <HeroSectionEN />
      }
      <div className="absolute inset-x-0 bottom-8 grid place-content-center md:bottom-12">
        <IntroScrollMouse />
      </div>
    </div>
  );
}
