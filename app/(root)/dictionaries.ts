import 'server-only';

// 定义支持的语言类型
type SupportedLocales = 'en'|'zh';

// 定义字典对象，确保键类型为 SupportedLocales
const dictionaries: Record<SupportedLocales, () => Promise<Record<string, any>>> = {
  en: () => import('../../lib/constants/en.json').then((module) => module.default),
  zh: () => import('../../lib/constants/zh.json').then((module) => module.default),
};

// 获取字典函数，限制 locale 类型为 SupportedLocales
export const getDictionary = async (locale: SupportedLocales): Promise<Record<string, any>> => {
  if (!(locale in dictionaries)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return dictionaries[locale]();
};