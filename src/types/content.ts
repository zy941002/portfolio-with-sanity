import type {PortableTextBlock} from '@portabletext/types'

export type LanguageKey = 'zhHans' | 'zhHant' | 'en'

export type LocalizedText = Partial<Record<LanguageKey, string>>
export type LocalizedRichText = Partial<Record<LanguageKey, PortableTextBlock[]>>

export interface HeroModule {
  _key: string
  eyebrow?: LocalizedText
  title?: LocalizedText
  backgroundImage?: string
  languageLinks?: Array<{
    label?: LocalizedText
    href?: string
  }>
}

export interface QuoteModule {
  _key: string
  quote?: LocalizedText
  author?: LocalizedText
  source?: LocalizedText
}

export interface AboutModule {
  _key: string
  title?: LocalizedText
  body?: LocalizedRichText
  signature?: LocalizedText
}

export interface ChannelItem {
  _key: string
  label?: LocalizedText
  slug?: string
  iconUrl?: string
  description?: LocalizedText
  link?: string
}

export interface ChannelGridModule {
  _key: string
  items?: ChannelItem[]
}

export interface ContactModule {
  _key: string
  studioName?: LocalizedText
  address?: LocalizedText
  phone?: string
  mobile?: string
  email?: string
  businessHours?: LocalizedText
  notes?: LocalizedText
}

export type HomePageSection =
  | (HeroModule & {_type: 'heroModule'})
  | (QuoteModule & {_type: 'quoteModule'})
  | (AboutModule & {_type: 'aboutModule'})
  | (ChannelGridModule & {_type: 'channelGridModule'})
  | (ContactModule & {_type: 'contactModule'})

export interface HomePageDocument {
  sections: HomePageSection[]
}

export interface CategorySummary {
  _id: string
  title?: LocalizedText
  slug?: string
  coverURL?: string
  leftColumnTitle?: LocalizedText
  leftColumnDescription?: LocalizedRichText
  level?: number
  inheritFromParent?: boolean
}

export interface CategoryDocument extends CategorySummary {
  level: number
  inheritFromParent?: boolean
  relatedEvents?: EventDocument[]
  featuredProducts?: ProductItem[]
  parent?: CategorySummary & {
    level: number
    coverURL?: string
    leftColumnTitle?: LocalizedText
    leftColumnDescription?: LocalizedRichText
    relatedEvents?: EventDocument[]
    featuredProducts?: ProductItem[]
  }
  children?: (CategorySummary & {
    parent?: CategorySummary & {
      level: number
      coverURL?: string
      leftColumnTitle?: LocalizedText
      leftColumnDescription?: LocalizedRichText
    }
  })[]
  products?: ProductItem[]
  events?: EventDocument[]
}

export interface EventDocument {
  _id: string
  title?: LocalizedText
  description?: LocalizedRichText
  startDate?: string
  endDate?: string
  cover?: string
}

export interface ProductItem {
  _id: string
  title?: LocalizedText
  summary?: LocalizedText
  description?: LocalizedRichText
  gallery?: string[]
  thumbnail?: string
  materials?: LocalizedText
  size?: LocalizedText
  price?: string
  slug?: string
}


