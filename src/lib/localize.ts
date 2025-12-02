import type {PortableTextBlock} from '@portabletext/types'
import type {LanguageKey, LocalizedRichText, LocalizedText} from '@/types/content'

const FALLBACK_ORDER: LanguageKey[] = ['zhHans', 'zhHant', 'en']

export function pickLocalizedText(value: LocalizedText | null | undefined, lang: LanguageKey): string {
  if (!value) return ''
  if (value[lang]) return value[lang] as string
  for (const key of FALLBACK_ORDER) {
    if (value[key]) return value[key] as string
  }
  return ''
}

export function pickLocalizedRichText(
  value: LocalizedRichText | null | undefined,
  lang: LanguageKey,
): PortableTextBlock[] {
  if (!value) return []
  if (value[lang]) return value[lang] as PortableTextBlock[]
  for (const key of FALLBACK_ORDER) {
    if (value[key]) return value[key] as PortableTextBlock[]
  }
  return []
}


