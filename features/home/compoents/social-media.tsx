import {
  IconBrandBilibili,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandZhihu,
  IconLogoJuejin,
  IconSkillGmailDark,
  IconBrandGitee,
  IconSkillGmailLight,
} from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getDictionary } from "@/app/(root)/dictionaries";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SocialMediaList = async ({
  lang,
  delay,
}: {
  lang: string;
  delay: number;
}) => {
  // 每次调用，增加延时
  const getDelay = () => (delay += 200);
  const dict = await getDictionary(lang);
  const socialMediaList = [
    {
      icon: <IconBrandGithub className="text-base" />,
      label: "Github",
      link: dict.info.github_page,
    },
    {
      icon: <IconSkillGmailDark className="text-base dark:hidden" />,
      label: "Gmail",
      link: `mailto:${dict.info.email}`,
    },
    {
      icon: <IconBrandTwitter className={`text-base text-[#00AEEC]`} />,
      label: "twitter",
      link: dict.info.twitter,
    },
    {
      icon: <IconBrandGitee className={`text-base text-[#00AEEC]`} />,
      label: "gitee",
      link: dict.info.gitee,
    },
    {
      icon: <IconBrandBilibili className={`text-base text-[#00AEEC]`} />,
      label: "Bilibili",
      link: dict.info.bilibili,
    },
    {
      icon: <IconBrandZhihu className={`text-base text-[#0173FF]`} />,
      label: "zhihu",
      link: dict.info.zhihu,
    },
    {
      icon: <IconLogoJuejin className={`text-base text-[#2985fc]`} />,
      label: "juejin",
      link: dict.info.juejin,
    },
  ];

  return (
    <div>
      <ul
        className={cn("flex space-x-4", "animate-fade-up animate-ease-in-out")}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        {socialMediaList.map((el) => (
          <li key={el.link}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="outline" size="icon">
                  <Link href={el.link} target="_blank">
                    {el.icon}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{el.label}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};
