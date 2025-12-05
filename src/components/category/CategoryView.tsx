import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import type {LanguageKey} from '@/lib/language'
import type {CategoryDocument, CategorySummary, ProductItem} from '@/types/content'
import styles from './CategoryView.module.css'

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

  // 筛选出活动商品（isEvent 为 true 且 isExpired 为 false）
  const eventProducts = products.filter((product) => product.isEvent === true && product.isExpired !== true)

  // 筛选出非活动商品（isEvent 不为 true 的商品）
  const regularProducts = products.filter((product) => product.isEvent !== true)

  let gridItems: Array<CategorySummary | (ProductItem & {thumbnail?: string})> = []
  //

  if (isLevel1) {
    gridItems = children
  } else {
    gridItems = regularProducts
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <aside className={styles.aside}>
            {category.coverURL ? (
              <div className={styles.coverImageWrapper}>
                <Image src={category.coverURL} alt={title || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            ) : null}
            <div className={styles.titleSection}>
              <p className={styles.columnTitle}>{columnTitle}</p>
              <h1 className={styles.mainTitle}>{title}</h1>
            </div>
            <RichText value={description} className={styles.description} />
            {eventProducts.length > 0 ? (
              <div className={styles.eventsSection}>
                <p className={styles.eventsTitle}>店内活动</p>
                <div className={styles.eventsList}>
                  {eventProducts.map((product) => (
                    <EventProductCard key={product._id} product={product} language={language} langParam={langParam} />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <div className={styles.content}>
            <Breadcrumb category={category} langParam={langParam} language={language} />
            <div className={styles.grid}>
              {gridItems.map((item) => {
                if (isCategoryItem(item)) {
                  return <CategoryCard key={item._id} item={item} langParam={langParam} language={language} parentId={isLevel1 ? category._id : undefined} />
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
    <nav className={styles.breadcrumb}>
      <Link href={`/${langParam}`} className={styles.breadcrumbLink}>
        Home
      </Link>
      {segments.map((segment, index) => (
        <span key={segment.id || index} className={styles.breadcrumbSegment}>
          <span className={styles.breadcrumbSeparator}>/</span>
          {segment.id ? (
            <Link href={`/${langParam}/category/${segment.id}`} className={index === segments.length - 1 ? styles.breadcrumbActive : styles.breadcrumbLink}>
              {segment.label}
            </Link>
          ) : (
            <span className={styles.breadcrumbActive}>{segment.label}</span>
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
  parentId,
}: {
  item: CategorySummary
  langParam: string
  language: LanguageKey
  parentId?: string
}) {
  // 如果是从一级分类页面点击子分类，在 URL 中包含一级分类的 ID
  const href = parentId
    ? `/${langParam}/category/${item._id}?parent=${parentId}`
    : `/${langParam}/category/${item._id}`

  return (
    <Link href={href} className={styles.categoryCard}>
      {item.coverURL ? (
        <div className={styles.categoryImageWrapper}>
          <Image src={item.coverURL} alt={pickLocalizedText(item.title, language) || ''} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
        </div>
      ) : null}
      <p className={styles.categoryTitle}>{pickLocalizedText(item.title, language)}</p>
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
    <Link href={`/${langParam}/product/${product._id}`} className={styles.productCard}>
      {product.thumbnail ? (
        <div className={styles.productImageWrapper}>
          <Image
            src={product.thumbnail}
            alt={pickLocalizedText(product.title, language) || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      ) : null}
      <div className={styles.productInfo}>
        <p className={styles.productTitle}>{pickLocalizedText(product.title, language)}</p>
        {product.price ? <p className={styles.productPrice}>{product.price}</p> : null}
      </div>
    </Link>
  )
}

function EventProductCard({
  product,
  language,
  langParam,
}: {
  product: ProductItem & {thumbnail?: string}
  language: LanguageKey
  langParam: string
}) {
  return (
    <Link href={`/${langParam}/product/${product._id}`} className={styles.eventProductCard}>
      {product.thumbnail ? (
        <div className={styles.eventProductImageWrapper}>
          <Image
            src={product.thumbnail}
            alt={pickLocalizedText(product.title, language) || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      ) : null}
      <div className={styles.eventProductInfo}>
        <p className={styles.eventProductTitle}>{pickLocalizedText(product.title, language)}</p>
        {product.price ? <p className={styles.eventProductPrice}>{product.price}</p> : null}
      </div>
    </Link>
  )
}

