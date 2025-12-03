import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import type {LanguageKey} from '@/lib/language'
import type {ProductItem} from '@/types/content'

interface ProductViewProps {
  product: ProductItem & {
    gallery?: string[]
    primaryCategory?: {
      _id: string
      title?: import('@/types/content').LocalizedText
      level?: number
      coverURL?: string
      parent?: {
        _id: string
        title?: import('@/types/content').LocalizedText
        level?: number
        coverURL?: string
      }
    }
  }
  language: LanguageKey
  langParam: string
}

export default function ProductView({product, language, langParam}: ProductViewProps) {
  const title = pickLocalizedText(product.title, language)
  const summary = pickLocalizedText(product.summary, language)
  const description = pickLocalizedRichText(product.description, language)
  const materials = pickLocalizedText(product.materials, language)
  const size = pickLocalizedText(product.size, language)

  const category = product.primaryCategory
  const parentCategory = category?.parent

  return (
    <section className="px-6 md:px-12">
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* 左侧：图片画廊 */}
          <aside className="md:w-2/5 bg-waura-pink-light p-8">
            {product.gallery && product.gallery.length > 0 ? (
              <div className="space-y-4">
                {product.gallery.map((imageUrl, index) => (
                  <div key={index} className="relative w-full aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={title ? `${title} - ${index + 1}` : `Product image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-waura-deep-gray">
                  暂无图片
                </div>
              </div>
            )}
          </aside>

          {/* 右侧：商品信息 */}
          <div className="md:w-3/5 p-8">
            <Breadcrumb
              product={product}
              category={category}
              parentCategory={parentCategory}
              langParam={langParam}
              language={language}
            />

            <div className="mt-6 space-y-6">
              <div>
                <h1 className="text-3xl font-semibold mb-2">{title}</h1>
                {summary && <p className="text-waura-deep-gray text-lg">{summary}</p>}
              </div>

              {description && (
                <div className="text-waura-deep-gray">
                  <RichText value={description} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-waura-border">
                {materials && (
                  <div>
                    <p className="text-sm text-waura-deep-gray mb-1">材质</p>
                    <p className="text-base">{materials}</p>
                  </div>
                )}
                {size && (
                  <div>
                    <p className="text-sm text-waura-deep-gray mb-1">尺寸</p>
                    <p className="text-base">{size}</p>
                  </div>
                )}
                {product.price && (
                  <div className="col-span-2">
                    <p className="text-sm text-waura-deep-gray mb-1">价格</p>
                    <p className="text-2xl font-semibold text-waura-brown">{product.price}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Breadcrumb({
  product,
  category,
  parentCategory,
  langParam,
  language,
}: {
  product: ProductItem
  category?: ProductViewProps['product']['primaryCategory']
  parentCategory?: ProductViewProps['product']['primaryCategory']['parent']
  langParam: string
  language: LanguageKey
}) {
  const segments: Array<{label: string; id?: string}> = []

  if (parentCategory) {
    segments.push({
      label: pickLocalizedText(parentCategory.title, language),
      id: parentCategory._id,
    })
  }
  if (category) {
    segments.push({
      label: pickLocalizedText(category.title, language),
      id: category._id,
    })
  }
  segments.push({
    label: pickLocalizedText(product.title, language),
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
            <Link
              href={`/${langParam}/category/${segment.id}`}
              className={index === segments.length - 1 ? 'text-waura-brown' : 'hover:text-waura-brown'}
            >
              {segment.label}
            </Link>
          ) : (
            <span className="text-waura-brown">{segment.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

