import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import type {LanguageKey} from '@/lib/language'
import type {ProductItem} from '@/types/content'

interface ProductViewProps {
  product: ProductItem & {
    gallery?: string[]
    level1Category?: {
      _id: string
      title?: import('@/types/content').LocalizedText
      level?: number
      coverURL?: string
    }
    level2Category?: {
      _id: string
      title?: import('@/types/content').LocalizedText
      level?: number
      coverURL?: string
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

  const level1Category = product.level1Category
  const level2Category = product.level2Category

  return (
    <section className="px-6 md:px-12">
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* 左侧：图片画廊和视频 */}
          <aside className="md:w-2/5 bg-waura-pink-light p-8">
            <div className="space-y-4">
              {/* 视频展示 */}
              {(product.videoUrl || product.videoLink) && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
                  {product.videoUrl ? (
                    <video
                      src={product.videoUrl}
                      controls
                      className="w-full h-full object-contain"
                      playsInline
                    >
                      您的浏览器不支持视频播放
                    </video>
                  ) : product.videoLink ? (
                    <iframe
                      src={getEmbedUrl(product.videoLink)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={title || 'Product video'}
                    />
                  ) : null}
                </div>
              )}

              {/* 图片画廊 */}
              {product.gallery && product.gallery.length > 0 ? (
                <>
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
                </>
              ) : !product.videoUrl && !product.videoLink ? (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-waura-deep-gray">
                    暂无图片
                  </div>
                </div>
              ) : null}
            </div>
          </aside>

          {/* 右侧：商品信息 */}
          <div className="md:w-3/5 p-8">
            <Breadcrumb
              product={product}
              level1Category={level1Category}
              level2Category={level2Category}
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

// 将 YouTube/Vimeo 等视频链接转换为嵌入 URL
function getEmbedUrl(url: string): string {
  if (!url) return ''

  // YouTube 链接处理
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo 链接处理
  const vimeoRegex = /(?:vimeo\.com\/)(?:.*\/)?(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  // 如果已经是嵌入 URL 或无法识别，直接返回
  return url
}

function Breadcrumb({
  product,
  level1Category,
  level2Category,
  langParam,
  language,
}: {
  product: ProductItem
  level1Category?: ProductViewProps['product']['level1Category']
  level2Category?: ProductViewProps['product']['level2Category']
  langParam: string
  language: LanguageKey
}) {
  const segments: Array<{label: string; id?: string}> = []

  if (level1Category) {
    segments.push({
      label: pickLocalizedText(level1Category.title, language),
      id: level1Category._id,
    })
  }
  if (level2Category) {
    segments.push({
      label: pickLocalizedText(level2Category.title, language),
      id: level2Category._id,
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

