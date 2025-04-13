import 'server-only'
 
const dictionaries = {
  en: () => import('../../lib/constants/en.json').then((module) => module.default),
  zh: () => import('../../lib/constants/zh.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string ) => dictionaries[locale]()