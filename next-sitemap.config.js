const siteUrl = process.env.SITE_URL || "https://fangdada.vercel.app";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  // 以下路由不生成sitemap
  exclude: ["/english/*", "/fonts/*", "/api/*", "/server-sitemap.xml"],
  generateRobotsTxt: true, // (optional)
  disableIndexSitemap: false,
  // ...other options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
