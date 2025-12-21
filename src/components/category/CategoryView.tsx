import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import type {LanguageKey} from '@/lib/language'
import type {CategoryDocument, CategorySummary, ProductItem} from '@/types/content'
import styles from './CategoryView.module.css'
import { useSearchParams } from 'next/navigation'

interface CategoryViewProps {
  category: CategoryDocument
  language: LanguageKey
  langParam: string
  platform?: import('@/types/content').Platform
}

export default function CategoryView({category, language, langParam, platform}: CategoryViewProps) {
  const title = pickLocalizedText(category.title, language)
  const description = pickLocalizedRichText(category.leftColumnDescription, language)
  // 如果是二级分类，使用父分类的 tags；否则使用自己的 tags
  const tagsSource = category.level === 2 && category.parent?.tags ? category.parent.tags : category.tags
  const subTitle = pickLocalizedText(tagsSource, language)

  const isLevel1 = category.level === 1
  const children = category.children ?? []
  const products = category.products ?? []
  const parentIsEvent = category.parent?.isEvent ?? false

  // 筛选出活动商品（isEvent 为 true 且 isExpired 为 false）
  const eventProducts = products.filter((product) => product.isEvent === true && product.isExpired !== true)

  // 筛选出非活动商品（isEvent 不为 true 的商品）
  const regularProducts = products.filter((product) => product.isEvent !== true)

  let baseItems: Array<CategorySummary | (ProductItem & {thumbnail?: string})> = []

  if (isLevel1) {
    // 一级分类：显示子分类
    baseItems = children
  } else {
    // 二级分类：如果一级分类是活动分类，显示活动商品；否则显示普通商品
    if (parentIsEvent) {
      baseItems = eventProducts
    } else {
      baseItems = regularProducts
    }
  }

  // 确保至少有 9 项，不够的用占位符填充
  const MIN_ITEMS = 9
  const gridItems: Array<CategorySummary | (ProductItem & {thumbnail?: string}) | null> = [...baseItems]
  while (gridItems.length < MIN_ITEMS) {
    gridItems.push(null)
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.aside}>
            <div className={styles.coverImageSection}>
              {category.coverURL ? (
                <div className={styles.coverImageWrapper}>
                  <Image src={category.coverURL} alt={title || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                </div>
              ) : null}
              <div className={styles.titleSection}>
                {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
                {subTitle && <span className={styles.subTitle}>★</span>}
                <h1 className={styles.mainTitle}>{title}</h1>
              </div>
            </div>

            <div className={styles.descriptionSection}>
              <RichText value={description} className={styles.description} />
              {eventProducts.length > 0 ? (
                <div className={styles.eventsSection}>
                  <p className={styles.eventsTitle}>
                    {language === 'zhHans' && '店内相关活动'}
                    {language === 'zhHant' && '店內相關活動'}
                    {language === 'en' && 'Related In-Store Events'}
                  </p>
                  <div className={styles.eventsList}>
                    {eventProducts.map((product) => (
                      <EventProductCard key={product._id} product={product} language={language} langParam={langParam} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

          {
            platform?.platforms && platform.platforms.length > 0 && (
              <div className={styles.contactPlatforms}>
                {platform.platforms.map((platformItem) => (
                  <div key={platformItem._key} className={styles.platformItem}>
                    {platformItem.logoUrl && (
                      <div className={styles.platformLogoWrapper} onClick={() => {
                        window.open(platformItem.qrCodeUrl, '_blank')
                      }}>
                        <Image src={platformItem.logoUrl} alt={language === 'zhHans' ? '平台 Logo' : language === 'zhHant' ? '平台 Logo' : 'Platform Logo'} width={30} height={30} className={styles.platformLogo} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          }
          </div>
          <div className={styles.content}>
            <Breadcrumb category={category} langParam={langParam} language={language} />
            <div className={styles.mainContent}>
              <div className={styles.grid}>
                {gridItems.map((item, index) => {
                  if (item === null) {
                    return <PlaceholderCard key={`placeholder-${index}`} />
                  } else if (isCategoryItem(item)) {
                    return <CategoryCard key={item._id} item={item} langParam={langParam} language={language} parentId={isLevel1 ? category._id : undefined} />
                  } else {
                    return <ProductCard key={item._id} product={item} language={language} langParam={langParam} />
                  }
                })}
              </div>
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
        {language === 'zhHans' && '首页'}
        {language === 'zhHant' && '首頁'}
        {language === 'en' && 'Home'}
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
  const parentId = useSearchParams().get('parent')
  return (
    <Link href={parentId ? `/${langParam}/product/${product._id}?parent=${parentId}` : `/${langParam}/product/${product._id}`} className={styles.productCard}>
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
        {/* {product.summary && (
          <p className={styles.productSummary}>{pickLocalizedText(product.summary, language)}</p>
        )} */}
        {/* {product.price ? <p className={styles.productPrice}>{product.price}</p> : null} */}
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
  const tags = product.tags?.map((tag) => pickLocalizedText(tag, language)).filter(Boolean).slice(0, 3) || []
  console.log(product)

  // 确保有3个tags，不足的用空字符串填充
  const [tag1, tag2, tag3] = [
    tags[0] || '',
    tags[1] || '',
    tags[2] || '',
  ]
  const parentId = useSearchParams().get('parent')
  return (
    <Link href={parentId ? `/${langParam}/product/${product._id}?parent=${parentId}` : `/${langParam}/product/${product._id}`} className={styles.eventProductCard}>
      <div className={styles.eventProductInfo}>
        {tags.length > 0 && (
          <div className={styles.eventProductTags}>
            {tag1 && <p className={styles.eventProductTag}>{tag1}</p>}
            {tag1 && tag2 && <p className={styles.tagSeparator}>★</p>}
            {tag2 && (
              <p className={styles.eventProductTagCenter}>{tag2}</p>
            )}
            {tag2 && tag3 && <p className={styles.tagSeparator}>★</p>}
            {tag3 && <p className={styles.eventProductTag}>{tag3}</p>}
          </div>
        )}
      </div>
    </Link>
  )
}

function PlaceholderCard() {
  return (
    <div className={styles.placeholderCard}>
      <div className={styles.placeholderImageWrapper} />
      <div className={styles.placeholderTitle} />
    </div>
  )
}

