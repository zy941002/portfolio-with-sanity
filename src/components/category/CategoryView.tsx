import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import type {LanguageKey} from '@/lib/language'
import type {CategoryDocument, CategorySummary, ProductItem, EventDocument} from '@/types/content'

interface CategoryViewProps {
  category: CategoryDocument
  language: LanguageKey
  langParam: string
}

export default function CategoryView({category, language, langParam}: CategoryViewProps) {
  const title = pickLocalizedText(category.title, language)
  const description = pickLocalizedRichText(category.leftColumnDescription, language)
  const columnTitle = pickLocalizedText(category.leftColumnTitle, language)

  const isLevel1 = category.level === 1
  const children = category.children ?? []
  const products = category.products ?? []
  // 获取活动：一级分类使用 relatedEvents（用于左侧边栏），二级分类使用 events（用于主网格）
  const categoryEvents = category.events ?? []
  const relatedEvents = category.relatedEvents ?? []
  const events = isLevel1 ? relatedEvents : categoryEvents

  // 一级分类显示子分类，二级分类根据一级分类的 isEvent 来决定展示活动和商品的顺序
  const parentIsEvent = category.parent?.isEvent ?? false
  let gridItems: Array<CategorySummary | (ProductItem & {thumbnail?: string}) | EventDocument> = []

  if (isLevel1) {
    // 一级分类：显示子分类
    gridItems = children
  } else {
    // 二级分类：同时显示活动和商品，根据一级分类的 isEvent 决定顺序
    if (parentIsEvent) {
      // 如果一级分类是活动分类，优先显示活动，然后显示商品
      gridItems = [...categoryEvents, ...products]
    } else {
      // 如果一级分类不是活动分类，优先显示商品，然后显示活动
      gridItems = [...products, ...categoryEvents]
    }
  }

  return (
    <section className="px-6 md:px-12">
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-2/5 bg-waura-pink-light p-8 flex flex-col gap-6">
            {category.coverURL ? (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image src={category.coverURL} alt={title || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            ) : null}
            <div>
              <p className="text-waura-deep-gray tracking-[0.4em] uppercase text-sm">{columnTitle}</p>
              <h1 className="text-3xl font-semibold mt-2">{title}</h1>
            </div>
            <RichText value={description} className="text-waura-deep-gray text-sm" />
            {events.length > 0 ? (
              <div>
                <p className="text-waura-deep-gray tracking-[0.4em] uppercase text-sm mb-3">店内活动</p>
                <div className="space-y-3">
                  {events.map((event) => (
                    <EventCard key={event._id} event={event} language={language} />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <div className="md:w-3/5 p-8">
            <Breadcrumb category={category} langParam={langParam} language={language} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {gridItems.map((item) => {
                if (isCategoryItem(item)) {
                  return <CategoryCard key={item._id} item={item} langParam={langParam} language={language} />
                } else if (isEventItem(item)) {
                  return <EventCard key={item._id} event={item} language={language} isGrid={true} />
                } else {
                  return <ProductCard key={item._id} product={item} language={language} langParam={langParam} />
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Breadcrumb({
  category,
  langParam,
  language,
}: {
  category: CategoryDocument
  langParam: string
  language: LanguageKey
}) {
  const segments: Array<{label: string; id?: string}> = []
  if (category.parent) {
    segments.push({
      label: pickLocalizedText(category.parent.title, language),
      id: category.parent._id,
    })
  }
  segments.push({
    label: pickLocalizedText(category.title, language),
    id: category._id,
  })

  return (
    <nav className="text-sm text-waura-deep-gray flex flex-wrap gap-2">
      <Link href={`/${langParam}`} className="hover:text-waura-brown">
        Home
      </Link>
      {segments.map((segment, index) => (
        <span key={segment.id || index} className="flex items-center gap-2">
          <span className="text-waura-border">/</span>
          {segment.id ? (
            <Link href={`/${langParam}/category/${segment.id}`} className={index === segments.length - 1 ? 'text-waura-brown' : 'hover:text-waura-brown'}>
              {segment.label}
            </Link>
          ) : (
            <span>{segment.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

function isCategoryItem(item: CategorySummary | (ProductItem & {thumbnail?: string}) | EventDocument): item is CategorySummary {
  return 'level' in item || 'leftColumnTitle' in item
}

function isEventItem(item: CategorySummary | (ProductItem & {thumbnail?: string}) | EventDocument): item is EventDocument {
  return 'startDate' in item || 'endDate' in item
}

function CategoryCard({
  item,
  langParam,
  language,
}: {
  item: CategorySummary
  langParam: string
  language: LanguageKey
}) {

  return (
    <Link
      href={`/${langParam}/category/${item._id}`}
      className="bg-waura-pink-light rounded-2xl p-4 flex flex-col gap-3 hover:-translate-y-1 transition"
    >
      {item.coverURL ? (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image src={item.coverURL} alt={pickLocalizedText(item.title, language) || ''} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
        </div>
      ) : null}
      <p className="text-center text-lg">{pickLocalizedText(item.title, language)}</p>
    </Link>
  )
}

function ProductCard({
  product,
  language,
  langParam,
}: {
  product: ProductItem & {thumbnail?: string}
  language: LanguageKey
  langParam: string
}) {
  return (
    <Link
      href={`/${langParam}/product/${product._id}`}
      className="bg-waura-pink-light rounded-2xl p-4 flex flex-col gap-3 hover:-translate-y-1 transition"
    >
      {product.thumbnail ? (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={pickLocalizedText(product.title, language) || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      ) : null}
      <div>
        <p className="text-base font-medium">{pickLocalizedText(product.title, language)}</p>
        {product.price ? <p className="text-sm text-waura-deep-gray mt-1">{product.price}</p> : null}
      </div>
    </Link>
  )
}

function EventCard({
  event,
  language,
  isGrid = false,
}: {
  event: EventDocument
  language: LanguageKey
  isGrid?: boolean
}) {
  const eventTitle = pickLocalizedText(event.title, language)
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'zhHans' ? 'zh-CN' : language === 'zhHant' ? 'zh-TW' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const content = (
    <>
      {event.cover ? (
        <div className={`relative w-full ${isGrid ? 'aspect-square' : 'aspect-video'} rounded-lg overflow-hidden`}>
          <Image src={event.cover} alt={eventTitle || ''} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
        </div>
      ) : null}
      <div>
        <h3 className={`${isGrid ? 'text-base font-medium' : 'text-base font-semibold text-waura-brown'}`}>{eventTitle}</h3>
        {(event.startDate || event.endDate) && (
          <p className="text-xs text-waura-deep-gray mt-1">
            {event.startDate && formatDate(event.startDate)}
            {event.startDate && event.endDate && ' - '}
            {event.endDate && formatDate(event.endDate)}
          </p>
        )}
      </div>
    </>
  )

  if (isGrid) {
    return (
      <div className="bg-waura-pink-light rounded-2xl p-4 flex flex-col gap-3 hover:-translate-y-1 transition">
        {content}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
      {content}
    </div>
  )
}


