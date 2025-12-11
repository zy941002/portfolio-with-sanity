import Image from 'next/image'
import Link from 'next/link'
import {pickLocalizedImage, pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import {LANGUAGE_OPTIONS, buildLanguageHref, type LanguageKey} from '@/lib/language'
import type {
  AboutModule,
  ChannelGridModule,
  ContactModule,
  HeroModule,
  HomePageSection,
  ImageModule,
  QuoteModule,
} from '@/types/content'
import styles from './HomeSections.module.css'
import RichText from '../RichText'

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
  platform?: import('@/types/content').Platform
}

export default function HomeSections({sections, language, langParam, categories, platform}: HomeSectionsProps) {
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
            return <Contact key={section._key} section={section} language={language} platform={platform} />
          case 'imageModule':
            return <ImageSection key={section._key} section={section} language={language} />
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

  const quoteTexts: Record<LanguageKey, string> = {
    zhHans: '<p>“美是永生揽镜自照，但你就是永生，你也是镜子”</p>',
    zhHant: '<p>“美是永生攬鏡自照，但你就是永生，你也是鏡子”</p>',
    en: `<p>"Beauty is eternity gazing at itself in a mirror. <br/>
      &nbsp;But you are eternity and you are the mirror."</p>`,
  }

  const quoteAuthors: Record<LanguageKey, string> = {
    zhHans: '纪伯伦，《先知·论美》',
    zhHant: '紀伯倫，《先知·論美》',
    en: 'Kahlil Gibran, 《The Prophet · On Beauty》',
  }

  const quoteText = quoteTexts[language] || quoteTexts.zhHans
  const quoteAuthor = quoteAuthors[language] || quoteAuthors.zhHans

  if (!quote || quote.length === 0) return null
  return (
    <section className={styles.quoteSection}>
      <div className={styles.quoteContainer}>
        <div className={styles.quoteText} dangerouslySetInnerHTML={{__html: quoteText}} />
        <span className={styles.quoteAuthor}>
          {quoteAuthor}
        </span>
      </div>
    </section>
  )
}

function About({language}: {section: AboutModule; language: LanguageKey}) {
  const aboutTexts: Record<LanguageKey, string[]> = {
    zhHans: [
      '瓦闻的伊始，源于我对中古手作器物的热爱，对"无心之美"的好奇探寻与粗浅实践。我喜欢器物在实用之外偶尔流露出的本真&#58;当它们融入生活，会呈现出一种沉浸于日常又超然其上的美，它朦胧、生动、耐读。这种不刻意、不完美的特质，如自然般坦然，不带批判地审视着我们也被我们审视。',
      '如今，瓦闻不只汇集国内外手作器物，也逐渐成长为一个美学发生的角落。我们以陶艺为原点，联结相近气息的创作者，通过茶、花、音乐、书画、空间等方式，将这份美感编织进当下生活。我们也希望通过设计与服务，将这种观看日常的视角，轻盈地传递给更多追求多元美感的个体。',
    ],
    zhHant: [
      '瓦聞的伊始，源於我對中古手作器物的熱愛，對"無心之美"的好奇探尋與粗淺實踐。我喜歡器物在實用之外偶爾流露出的本真&#58;當它們融入生活，會呈現出一種沉浸於日常又超然其上的美，它朦朧、生動、耐讀。這種不刻意、不完美的特質，如自然般坦然，不帶批判地審視著我們也被我們審視。',
      '如今，瓦聞不只匯集國內外手作器物，也逐漸成長為一個美學發生的角落。我們以陶藝為原點，聯結相近氣息的創作者，通過茶、花、音樂、書畫、空間等方式，將這份美感編織進當下生活。我們也希望通過設計與服務，將這種觀看日常的視角，輕盈地傳遞給更多追求多元美感的個體。',
    ],
    en: [
      'The beginning of Wauramoon stems from my love for antique handmade objects and my curious exploration and humble practice of "unintentional beauty." I appreciate the authenticity that objects occasionally reveal beyond their utility—when they integrate into life, they present a beauty that is immersed in the everyday yet transcendent, hazy, vivid, and enduring. This unforced, imperfect quality, as natural as nature itself, observes us without judgment, just as we observe it.',
      'Today, Wauramoon not only gathers handmade objects from home and abroad but has also gradually grown into a corner where aesthetics emerge. We take ceramics as our starting point, connecting creators with similar sensibilities, weaving this sense of beauty into contemporary life through tea, flowers, music, calligraphy, painting, and space. We also hope to gently pass on this perspective of viewing daily life to more individuals seeking diverse aesthetics through design and service.',
    ],
  }

  const signatures: Record<LanguageKey, string> = {
    zhHans: '(主理人)张蕾',
    zhHant: '(主理人)張蕾',
    en: '(Curator) Zhang Lei',
  }

  const aboutText = aboutTexts[language] || aboutTexts.zhHans
  const signature = signatures[language] || signatures.zhHans

  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          {aboutText.map((text, index) => (
            <p key={index} dangerouslySetInnerHTML={{__html: text}} />
          ))}
        </div>
        <div className={styles.aboutSignature}>
          <p className={styles.aboutSignatureText} dangerouslySetInnerHTML={{__html: signature}} />
        </div>
      </div>
    </section>
  );
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
                    <>
                      <p className={styles.channelTag}>{pickLocalizedText(category.tags, language)}</p>
                      <span className={styles.channelStar}>★</span>
                    </>
                  )}

                  <p className={styles.channelLabel}>{pickLocalizedText(category.label, language)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.channelGridDescription}>
          {language === 'zhHans' && '*图标设计截取自劳伦·科里的插画'}
          {language === 'zhHant' && '*圖標設計截取自勞倫·科里的插畫'}
          {language === 'en' && '*Icon design excerpted from Lauren Corey\'s illustration'}
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

function Contact({section, language, platform}: {section: ContactModule; language: LanguageKey; platform?: import('@/types/content').Platform}) {
  const studioName = pickLocalizedText(section.studioName, language)
  const address = pickLocalizedText(section.address, language)
  const businessHours = pickLocalizedText(section.businessHours, language)
  const notes = pickLocalizedText(section.notes, language)

  // 使用独立的 platform document 数据
  const platforms = platform?.platforms || []

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
              <p className={styles.contactLabel}>
                {language === 'zhHans' && '地址:'}
                {language === 'zhHant' && '地址:'}
                {language === 'en' && 'Address:'}
              </p>
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
              <p className={styles.contactLabel}>
                {language === 'zhHans' && '营业时间:'}
                {language === 'zhHant' && '營業時間:'}
                {language === 'en' && 'Business Hours:'}
              </p>
              <p>{businessHours}</p>
            </div>
          )}
          {notes && (
            <div className={styles.contactItem}>
            <p className={styles.contactLabel}></p>
              <p>{notes}</p>
            </div>
          )}
          {platforms.length > 0 && (
            <div className={styles.contactPlatforms}>
              {platforms.map((platformItem) => (
                <div key={platformItem._key} className={styles.platformItem}>
                  {platformItem.logoUrl && (
                    <div className={styles.platformLogoWrapper}>
                      <Image
                        src={platformItem.logoUrl}
                        alt={language === 'zhHans' ? '平台 Logo' : language === 'zhHant' ? '平台 Logo' : 'Platform Logo'}
                        width={30}
                        height={30}
                        className={styles.platformLogo}
                      />
                      {platformItem.qrCodeUrl && (
                        <div className={styles.platformQrCode}>
                          <Image
                            src={platformItem.qrCodeUrl}
                            alt={language === 'zhHans' ? '二维码' : language === 'zhHant' ? '二維碼' : 'QR Code'}
                            width={200}
                            height={200}
                            className={styles.qrCodeImage}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ImageSection({section, language}: {section: ImageModule; language: LanguageKey}) {
  const imageUrl = pickLocalizedImage(section.image, language)
  const altText = pickLocalizedText(section.alt, language)

  if (!imageUrl) return null

  return (
    <section className={styles.imageSection}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={altText || ''}
          width={0}
          height={0}
          sizes="100vw"
          style={{width: '100%', height: 'auto'}}
          className={styles.imageModuleImage}
        />
      </div>
    </section>
  )
}


