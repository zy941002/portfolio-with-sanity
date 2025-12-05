import type {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import EventView from '@/components/event/EventView'
import SiteLayout from '@/components/SiteLayout'
import {EVENT_BY_ID_QUERY, EVENT_IDS_QUERY} from '@/lib/queries'
import {ensureLanguageParam, LANGUAGE_PARAM_TO_KEY, resolveLanguageKey, type LanguageParam} from '@/lib/language'
import {sanityClient} from '@/lib/sanityClient'
import {pickLocalizedText} from '@/lib/localize'
import type {EventDocument} from '@/types/content'

interface EventPageProps {
  langParam: LanguageParam
  languageKey: ReturnType<typeof resolveLanguageKey>
  event: EventDocument
  id: string
}

export default function EventPage({langParam, languageKey, event}: EventPageProps) {
  const eventTitle = pickLocalizedText(event.title, languageKey)
  const pageTitle = eventTitle ? `${eventTitle} - gallery瓦聞` : 'gallery瓦聞'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <SiteLayout langParam={langParam} pathSegments={['event', event._id || '']}>
        <EventView event={event} language={languageKey} langParam={langParam} />
      </SiteLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (!sanityClient) {
    return {paths: [], fallback: 'blocking'}
  }
  const events = await sanityClient.fetch<{_id: string}[]>(EVENT_IDS_QUERY).catch(() => [])

  const paths = events.flatMap(({_id}) =>
    Object.keys(LANGUAGE_PARAM_TO_KEY).map((lang) => ({
      params: {lang, id: _id},
    })),
  )

  return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps<EventPageProps> = async ({params}) => {
  const langParam = ensureLanguageParam(params?.lang as string | undefined)
  const id = params?.id as string

  if (!sanityClient || !id) {
    return {notFound: true}
  }

  const event = await sanityClient.fetch<EventPageProps['event']>(EVENT_BY_ID_QUERY, {id})

  if (!event) {
    return {notFound: true}
  }

  const languageKey = resolveLanguageKey(langParam)

  return {
    props: {
      langParam,
      languageKey,
      event,
      id,
    },
    revalidate: 60,
  }
}

