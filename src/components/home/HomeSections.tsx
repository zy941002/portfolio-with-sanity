import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import {LANGUAGE_OPTIONS, buildLanguageHref, type LanguageKey} from '@/lib/language'
import type {
  AboutModule,
  ChannelGridModule,
  ContactModule,
  HeroModule,
  HomePageSection,
  QuoteModule,
} from '@/types/content'
import styles from './HomeSections.module.css'

interface HomeSectionsProps {
  sections: HomePageSection[]
  language: LanguageKey
  langParam?: string
  categories?: Array<{
    _id: string
    label?: import('@/types/content').LocalizedText
    tags?: import('@/types/content').LocalizedText
    slug?: string
    coverURL?: string
  }>
}

export default function HomeSections({sections, language, langParam, categories}: HomeSectionsProps) {
  return (
    <div className={styles.container}>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroModule':
            return <Hero key={section._key} section={section} language={language} langParam={langParam} />
          case 'quoteModule':
            return <Quote key={section._key} section={section} language={language} />
          case 'aboutModule':
            return <About key={section._key} section={section} language={language} />
          case 'channelGridModule':
            return <ChannelGrid key={section._key} section={section} language={language} langParam={langParam} categories={categories} />
          case 'contactModule':
            return <Contact key={section._key} section={section} language={language} />
          default:
            return null
        }
      })}
    </div>
  )
}

function Hero({section, language, langParam}: {section: HeroModule; language: LanguageKey; langParam?: string}) {
  const title = pickLocalizedText(section.title, language)
  // const eyebrow = pickLocalizedText(section.eyebrow, language)
  const currentLangParam = langParam || 'zh-hans'

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {section.backgroundImage ? (
          <div className={styles.heroImageWrapper}>
            <Image
              src={section.backgroundImage}
              alt={title || 'hero'}
              width={0}
              height={0}
              sizes="100vw"
              style={{width: '100%', height: 'auto'}}
            />
          </div>
        ) : null}
        <div className={styles.heroContent}>
          {/* 语言选择 - 右上角 */}
          <div className={styles.languageSwitcher}>
            {LANGUAGE_OPTIONS.map((option, index) => (
              <span key={option.param}>
                <Link
                  href={buildLanguageHref(option.param, [])}
                  className={`${styles.languageLink} ${
                    currentLangParam === option.param ? styles.languageLinkActive : ''
                  }`}
                >
                  {option.label}
                </Link>
                {index < LANGUAGE_OPTIONS.length - 1 && <span className={styles.languageSeparator}>★</span>}
              </span>
            ))}
          </div>

          {/* 品牌名称 */}
          {title && (
            <div className={styles.brandContainer}>
              <h1 className={styles.brandTitle}>{title}</h1>
              <div className={styles.brandSubtitle}>
                <span className={styles.brandStar}>★</span>
                <span className={styles.brandName}>wauramoon</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Quote({section, language}: {section: QuoteModule; language: LanguageKey}) {
  const quote = pickLocalizedRichText(section.quote, language)
  const author = pickLocalizedText(section.author, language)
  const source = pickLocalizedText(section.source, language)


  if (!quote || quote.length === 0) return null
  return (
    <section className={styles.quoteSection}>
      <div className={styles.quoteContainer}>
        <div className={styles.quoteText}>
          <RichText value={quote} />
        </div>
        {(author || source) && (
          <p className={styles.quoteAuthor}>
            {author}
            {source ? `，《${source}》` : ''}
          </p>
        )}
      </div>
    </section>
  )
}

function About({section, language}: {section: AboutModule; language: LanguageKey}) {
  const body = pickLocalizedRichText(section.body, language)
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        {/* {title ? <h2 className={styles.aboutTitle}>{title}</h2> : null} */}
        <div className={styles.aboutContent}>
          <RichText value={body} />
        </div>
        {/* {signature ? (
          <div className={styles.aboutSignature}>
            <hr className={styles.aboutSignatureLine} />
            <p className={styles.aboutSignatureText}>{signature}</p>
          </div>
        ) : null} */}
      </div>
    </section>
  )
}

function ChannelGrid({
  section,
  language,
  langParam,
  categories,
}: {
  section: ChannelGridModule
  language: LanguageKey
  langParam?: string
  categories?: Array<{
    _id: string
    label?: import('@/types/content').LocalizedText
    tags?: import('@/types/content').LocalizedText
    slug?: string
    coverURL?: string
  }>
}) {
  // 如果有一级分类数据，优先展示分类
  if (categories && categories.length > 0) {
    const currentLangParam = langParam || 'zh-hans'

    return (
      <section className={styles.channelGridSection}>
        <div className={styles.channelGridContainer}>
          <div className={styles.channelGrid}>
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/${currentLangParam}/category/${category._id}`}
                className={styles.channelItem}
              >
                {category.coverURL ? (
                  <div className={styles.channelIcon}>
                    <Image
                      src={category.coverURL}
                      alt={pickLocalizedText(category.label, language) || ''}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ) : null}
                <div className={styles.channelLabelContainer}>
                  {category.tags && (
                    <p className={styles.channelTag}>{pickLocalizedText(category.tags, language)}</p>
                  )}
                  <span className={styles.channelStar}>★</span>
                  <p className={styles.channelLabel}>{pickLocalizedText(category.label, language)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // 如果没有分类数据，使用原来的 channel items
  if (!section.items?.length) return null

  // 假设前三个是上排，后两个是下排
  // 如果只有5个，前3个在上排，后2个在下排（第4个较大）
  const topItems = section.items.slice(0, 3)
  const bottomItems = section.items.slice(3, 5)

  return (
    <section className={styles.channelGridSection}>
      <div className={styles.channelGridContainer}>
        {/* 上排：三个图标 */}
        {topItems.length > 0 && (
          <div className={styles.channelGridTop}>
            {topItems.map((item) => (
              <div key={item._key} className={styles.channelItem}>
                {item.iconUrl ? (
                  <div className={styles.channelIcon}>
                    <Image src={item.iconUrl} alt={pickLocalizedText(item.label, language) || ''} fill className="object-contain" sizes="80px" />
                  </div>
                ) : null}
                <p className={styles.channelLabel}>{pickLocalizedText(item.label, language)}</p>
                {item.description && (
                  <p className={styles.channelDescription}>{pickLocalizedText(item.description, language)}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 下排：两个图标，第一个较大 */}
        {bottomItems.length > 0 && (
          <div className={styles.channelGridBottom}>
            {bottomItems.map((item, index) => (
              <div
                key={item._key}
                className={`${styles.channelItem} ${index === 0 ? styles.channelItemLarge : ''}`}
              >
                {item.iconUrl ? (
                  <div className={index === 0 ? styles.channelIconLarge : styles.channelIcon}>
                    <Image src={item.iconUrl} alt={pickLocalizedText(item.label, language) || ''} fill className="object-contain" sizes={index === 0 ? '96px' : '80px'} />
                  </div>
                ) : null}
                <p className={styles.channelLabel}>{pickLocalizedText(item.label, language)}</p>
                {item.description && (
                  <p className={styles.channelDescription}>{pickLocalizedText(item.description, language)}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Contact({section, language}: {section: ContactModule; language: LanguageKey}) {
  const studioName = pickLocalizedText(section.studioName, language)
  const address = pickLocalizedText(section.address, language)
  const businessHours = pickLocalizedText(section.businessHours, language)
  const notes = pickLocalizedText(section.notes, language)

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <div className={styles.contactList}>
          {studioName && (
            <div className={styles.contactItem}>
              <p className={styles.contactStudioName}>{studioName}</p>
            </div>
          )}
          {address && (
            <div className={styles.contactItem}>
              <p className={styles.contactLabel}>地址:</p>
              <p>{address}</p>
            </div>
          )}
          {section.phone && (
            <div className={styles.contactItem}>
              <p className={styles.contactLabel}>TEL:</p>
              <p>{section.phone}{section.mobile ? ` / ${section.mobile}` : ''}</p>
            </div>
          )}
          {section.email && (
            <div className={styles.contactItem}>
              <p className={styles.contactLabel}>EMAIL:</p>
              <p>{section.email}</p>
            </div>
          )}
          {businessHours && (
            <div className={styles.contactItem}>
              <p className={styles.contactLabel}>营业时间:</p>
              <p>{businessHours}</p>
            </div>
          )}
          {notes && (
            <div className={styles.contactItem}>
            <p className={styles.contactLabel}></p>
              <p>{notes}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


