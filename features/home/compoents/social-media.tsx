import {
  IconBrandBilibili,
  IconBrandGithub,
  IconLogoJuejin,
  IconSkillGmailDark,
  IconSkillGmailLight,
} from "@/components/icons";

import { EMAIL, GITHUB_PAGE } from "@/constants";

export const socialMediaList: Array<{
  icon: React.ReactNode;
  label: string;
  link: string;
}> = [
  {
    icon: <IconBrandGithub className="text-base" />,
    label: "Github",
    link: GITHUB_PAGE,
  },
  {
    icon: (
      <>
        <IconSkillGmailDark className="text-base dark:hidden" />
        {/* <IconSkillGmailLight className="hidden text-base dark:inline-block" /> */}
      </>
    ),
    label: "Gmail",
    link: `mailto:${EMAIL}`,
  },
];
