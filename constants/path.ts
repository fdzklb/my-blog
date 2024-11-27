import { NICKNAME } from ".";

export const PATHS = {
  /** ************* SITE ****************** */
  SITE_HOME: "/",
  SITE_PORTFOLIO: "/PORTFOLIO",
  SITE_BLOG: "/blog",
  SITE_SNIPPET: "/snippet",
  SITE_ABOUT: "/about",
};

export const PATHS_MAP: Record<string, string> = {
  /** ************* SITE ****************** */
  [PATHS.SITE_HOME]: "首页",
  [PATHS.SITE_PORTFOLIO]: "作品集",
  [PATHS.SITE_BLOG]: "博客",
  [PATHS.SITE_SNIPPET]: "片段",
  [PATHS.SITE_ABOUT]: "关于"
};

export const PATH_DESCRIPTION_MAP: Record<string, string> = {
  /** ************* SITE ****************** */
  [PATHS.SITE_HOME]: "首页",
  [PATHS.SITE_PORTFOLIO]: "记录我了我这些年工作中开发(使用到)的一些小东西～",
  [PATHS.SITE_BLOG]: "这里记录了我的想法、文章，希望和大家一起交流～",
  [PATHS.SITE_SNIPPET]: "多是一些零零碎碎的片段，通常是代码片段",
  [PATHS.SITE_ABOUT]: `叮～ 你有一份关于${NICKNAME}的简介，请查收～`
};
