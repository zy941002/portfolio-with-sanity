import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import type {LanguageKey} from '@/lib/language'
import type {CategoryDocument, CategorySummary, ProductItem} from '@/types/content'

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
  const isLevel2 = category.level === 2
  const children = category.children ?? []
  const products = category.products ?? []

  const gridItems: Array<CategorySummary | (ProductItem & {thumbnail?: string})> =
    isLevel1 || (isLevel2 && children.length) ? children : products

  return (
    <section className="px-6 md:px-12">
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-2/5 bg-waura-pink-light p-8 flex flex-col gap-6">
            {category.coverUrl ? (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image src={category.coverUrl} alt={title || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            ) : null}
            <div>
              <p className="text-waura-deep-gray tracking-[0.4em] uppercase text-sm">{columnTitle}</p>
              <h1 className="text-3xl font-semibold mt-2">{title}</h1>
            </div>
            <RichText value={description} className="text-waura-deep-gray text-sm" />
            {category.relatedEvents?.length ? (
              <div>
                <p className="text-waura-deep-gray tracking-[0.4em] uppercase text-sm mb-2">相关店内活动</p>
                <ul className="space-y-3">
                  {category.relatedEvents.map((event) => (
                    <li key={event._id} className="text-waura-brown text-sm">
                      {pickLocalizedText(event.title, language)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>

          <div className="md:w-3/5 p-8">
            <Breadcrumb category={category} langParam={langParam} language={language} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {gridItems.map((item) =>
                isCategoryItem(item) ? (
                  <CategoryCard key={item._id} item={item} langParam={langParam} language={language} />
                ) : (
                  <ProductCard key={item._id} product={item} language={language} />
                ),
              )}
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
  const segments: Array<{label: string; slug?: string}> = []
  if (category.parent) {
    segments.push({
      label: pickLocalizedText(category.parent.title, language),
      slug: category.parent.slug,
    })
  }
  segments.push({
    label: pickLocalizedText(category.title, language),
    slug: category.slug,
  })

  return (
    <nav className="text-sm text-waura-deep-gray flex flex-wrap gap-2">
      <Link href={`/${langParam}`} className="hover:text-waura-brown">
        Home
      </Link>
      {segments.map((segment, index) => (
        <span key={segment.slug || index} className="flex items-center gap-2">
          <span className="text-waura-border">/</span>
          {segment.slug ? (
            <Link href={`/${langParam}/category/${segment.slug}`} className={index === segments.length - 1 ? 'text-waura-brown' : 'hover:text-waura-brown'}>
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

function isCategoryItem(item: CategorySummary | (ProductItem & {thumbnail?: string})): item is CategorySummary {
  return 'level' in item || 'leftColumnTitle' in item
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
      href={`/${langParam}/category/${item.slug}`}
      className="bg-waura-pink-light rounded-2xl p-4 flex flex-col gap-3 hover:-translate-y-1 transition"
    >
      {item.coverUrl ? (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image src={item.coverUrl} alt={pickLocalizedText(item.title, language) || ''} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
        </div>
      ) : null}
      <p className="text-center text-lg">{pickLocalizedText(item.title, language)}</p>
    </Link>
  )
}

function ProductCard({product, language}: {product: ProductItem & {thumbnail?: string}; language: LanguageKey}) {
  return (
    <div className="bg-waura-pink-light rounded-2xl p-4 flex flex-col gap-3">
      {product.thumbnail ? (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image src={product.thumbnail} alt={pickLocalizedText(product.title, language) || ''} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
        </div>
      ) : null}
      <div>
        <p className="text-base font-medium">{pickLocalizedText(product.title, language)}</p>
        {product.price ? <p className="text-sm text-waura-deep-gray mt-1">{product.price}</p> : null}
      </div>
    </div>
  )
}


