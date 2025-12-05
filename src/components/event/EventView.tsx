import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {pickLocalizedRichText, pickLocalizedText} from '@/lib/localize'
import {formatDate} from '@/lib/dateFormat'
import type {LanguageKey} from '@/lib/language'
import type {EventDocument} from '@/types/content'

interface EventViewProps {
  event: EventDocument
  language: LanguageKey
  langParam: string
}

export default function EventView({event, language, langParam}: EventViewProps) {
  const title = pickLocalizedText(event.title, language)
  const description = pickLocalizedRichText(event.description, language)

  return (
    <section className="px-6 md:px-12">
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* 左侧：封面图 */}
          <aside className="md:w-2/5 bg-waura-pink-light p-8">
            {event.cover ? (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={event.cover}
                  alt={title || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-waura-deep-gray">
                  暂无图片
                </div>
              </div>
            )}
          </aside>

          {/* 右侧：活动信息 */}
          <div className="md:w-3/5 p-8">
            <Breadcrumb event={event} langParam={langParam} language={language} />

            <div className="mt-6 space-y-6">
              <div>
                <h1 className="text-3xl font-semibold mb-2 text-waura-brown">{title}</h1>
                {(event.startDate || event.endDate) && (
                  <p className="text-waura-deep-gray text-lg">
                    {event.startDate && formatDate(event.startDate, language)}
                    {event.startDate && event.endDate && ' - '}
                    {event.endDate && formatDate(event.endDate, language)}
                  </p>
                )}
              </div>

              {description && (
                <div className="text-waura-deep-gray">
                  <RichText value={description} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Breadcrumb({
  event,
  langParam,
  language,
}: {
  event: EventDocument
  langParam: string
  language: LanguageKey
}) {
  return (
    <nav className="text-sm text-waura-deep-gray flex flex-wrap gap-2">
      <Link href={`/${langParam}`} className="hover:text-waura-brown">
        Home
      </Link>
      <span className="flex items-center gap-2">
        <span className="text-waura-border">/</span>
        <span className="text-waura-brown">{pickLocalizedText(event.title, language)}</span>
      </span>
    </nav>
  )
}

