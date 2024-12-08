import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { TypeIntro } from "@/features/home";
import { cn } from "@/lib/utils";
import { SocialMediaList } from "./social-media";
import { getDictionary } from '@/app/(root)/dictionaries'


export const HeroSectionZH = async () => {
  const dict = await getDictionary('zh')
  
  let delay = 0;
  // 每次调用，增加延时
  const getDelay = () => (delay += 200);

  return (
    <div className="flex min-h-full max-w-screen-md flex-col justify-center gap-5 px-6 md:px-10 2xl:max-w-7xl">
      <p
        className="animate-fade-up text-2xl tracking-widest animate-ease-in-out lg:text-4xl"
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        你好，我是
      </p>
      <strong
        className={cn(
          `text-5xl md:text-6xl tracking-widest font-black  bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500`,
          "animate-fade-up animate-ease-in-out",
        )}
        style={{
          WebkitTextFillColor: "transparent",
          animationDelay: `${getDelay()}ms`,
        }}
      >
        {dict.info.nickname}
      </strong>
      <div
        className={cn("animate-fade-up animate-ease-in-out")}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        <TypeIntro lang="zh"/>
        </div>
      <p
        className={cn(
          "text-2xl md:text-5xl tracking-widest",
          "animate-fade-up animate-ease-in-out",
        )}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        喜欢
        <span className={`font-semibold text-[#00d8ff]`}>React</span>、
        <span className={`font-semibold text-[#007acc]`}>TypeScript</span>
        <span className="ml-4">\owo/ ~</span>
      </p>
      <p
        className={cn(
          "text-base md:text-2xl text-muted-foreground tracking-widest",
          "animate-fade-up animate-ease-in-out",
        )}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        我在这个网站记录我的成长，努力 💪 成为一个更好的程序员。
      </p>
      <div
        className={cn("flex space-x-4", "animate-fade-up animate-ease-in-out")}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        <Link
          href={dict.paths.site_blog.link}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          我的博客
        </Link>
        <Link
          href={dict.paths.site_about.link}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          关于我
        </Link>
      </div>
      <SocialMediaList lang="zh" delay={delay} />
    </div>
  );
};
