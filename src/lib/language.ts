import type {LanguageKey} from '@/types/content'
export type {LanguageKey} from '@/types/content'

export const LANGUAGE_PARAM_TO_KEY = {
  'zh-hans': 'zhHans',
  'zh-hant': 'zhHant',
  en: 'en',
} as const

export type LanguageParam = keyof typeof LANGUAGE_PARAM_TO_KEY

export const LANGUAGE_KEY_TO_PARAM: Record<LanguageKey, LanguageParam> = {
  zhHans: 'zh-hans',
  zhHant: 'zh-hant',
  en: 'en',
}

export const LANGUAGE_OPTIONS: Array<{param: LanguageParam; label: string}> = [
  {param: 'en', label: 'En'},
  {param: 'zh-hans', label: '中文简体'},
  {param: 'zh-hant', label: '中文繁體'},
]

export const DEFAULT_LANGUAGE_PARAM: LanguageParam = 'zh-hans'

export function resolveLanguageKey(param?: string | string[]): LanguageKey {
  const normalized = Array.isArray(param) ? param[0] : param
  if (normalized && normalized in LANGUAGE_PARAM_TO_KEY) {
    return LANGUAGE_PARAM_TO_KEY[normalized as LanguageParam]
  }
  return LANGUAGE_PARAM_TO_KEY[DEFAULT_LANGUAGE_PARAM]
}

export function ensureLanguageParam(value?: string | string[]): LanguageParam {
  const normalized = Array.isArray(value) ? value[0] : value
  if (normalized && normalized in LANGUAGE_PARAM_TO_KEY) {
    return normalized as LanguageParam
  }
  return DEFAULT_LANGUAGE_PARAM
}

export function buildLanguageHref(target: LanguageParam, segments: string[]): string {
  const cleaned = segments.filter(Boolean).join('/')
  return `/${target}${cleaned ? `/${cleaned}` : ''}`
}


