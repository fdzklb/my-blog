import 'server-only'
 
const dictionaries = {
  en: () => import('../../constants/en.json').then((module) => module.default),
  zh: () => import('../../constants/zh.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string ) => dictionaries[locale]()