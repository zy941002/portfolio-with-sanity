import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import type {LanguageKey} from '@/lib/language'
import type {ProductItem} from '@/types/content'
import styles from './ProductView.module.css'

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

  // 检查是否有视频
  const hasVideo = !!(product.videoUrl || product.videoLink)

  // 获取封面图：优先使用 thumbnail，否则使用 gallery 的第一张图
  const coverImage = product.thumbnail || (product.gallery && product.gallery.length > 0 ? product.gallery[0] : null)

  // 获取图集：
  // - 如果有视频：右侧优先显示视频，不显示图集
  // - 如果没有视频：右侧显示图集（如果封面图来自 gallery，从第二张开始；否则显示所有 gallery）
  const hasThumbnail = !!product.thumbnail
  const galleryImages = !hasVideo && product.gallery && product.gallery.length > 0
    ? (hasThumbnail ? product.gallery : product.gallery.slice(1))
    : []



  return (
    <section>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          {/* 左侧边栏：图片、标题、描述 */}
          <aside className={styles.aside}>
            {coverImage ? (
              <div className={styles.coverImageWrapper}>
                <Image src={coverImage} alt={title || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            ) : null}
            <div className={styles.titleSection}>
              <h1 className={styles.mainTitle}>{title}</h1>
              {summary && <p className={styles.summary}>{summary}</p>}
            </div>
            {description && (
              <RichText value={description} className={styles.description} />
            )}
            <div className={styles.productInfo}>
              {materials && (
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>材质</p>
                  <p className={styles.infoValue}>{materials}</p>
                </div>
              )}
              {size && (
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>尺寸</p>
                  <p className={styles.infoValue}>{size}</p>
                </div>
              )}
              {product.price && (
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>价格</p>
                  <p className={styles.price}>{product.price}</p>
                </div>
              )}
            </div>
          </aside>

          {/* 右侧内容区：有视频则优先展示视频，没有视频则展示图集 */}
          <div className={styles.content}>
            <div className={styles.contentInner}>
              <Breadcrumb
                product={product}
                level1Category={level1Category}
                level2Category={level2Category}
                langParam={langParam}
                language={language}
              />
              <div className={styles.gallery}>
              {/* 有视频则优先展示视频 */}
              {hasVideo ? (
                <div className={styles.galleryItemVideo}>
                  <div className={styles.videoWrapper}>
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
                </div>
              ) : (
                /* 没有视频则展示图集 */
                galleryImages.length > 0 ? (
                  galleryImages.map((imageUrl, index) => (
                    <div key={index} className={styles.galleryItem}>
                      <Image
                        src={imageUrl}
                        alt={title ? `${title} - ${index + 1}` : `Product image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 70vw"
                      />
                    </div>
                  ))
                ) : (
                  <div className={styles.galleryItem}>
                    <div className="absolute inset-0 flex items-center justify-center text-waura-deep-gray">
                      暂无图片
                    </div>
                  </div>
                )
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
    <nav className={styles.breadcrumb}>
      <Link href={`/${langParam}`} className={styles.breadcrumbLink}>
        Home
      </Link>
      {segments.map((segment, index) => (
        <span key={segment.id || index} className={styles.breadcrumbSegment}>
          <span className={styles.breadcrumbSeparator}>/</span>
          {segment.id ? (
            <Link
              href={`/${langParam}/category/${segment.id}`}
              className={index === segments.length - 1 ? styles.breadcrumbActive : styles.breadcrumbLink}
            >
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

