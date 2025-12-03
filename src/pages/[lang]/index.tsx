import type {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import HomeSections from '@/components/home/HomeSections'
import SiteLayout from '@/components/SiteLayout'
import {HOME_PAGE_QUERY, LEVEL_1_CATEGORIES_QUERY} from '@/lib/queries'
import {ensureLanguageParam, LANGUAGE_PARAM_TO_KEY, resolveLanguageKey, type LanguageParam} from '@/lib/language'
import {sanityClient} from '@/lib/sanityClient'
import type {HomePageDocument} from '@/types/content'

interface HomePageProps {
  langParam: LanguageParam
  languageKey: ReturnType<typeof resolveLanguageKey>
  home: HomePageDocument
  categories?: Array<{
    _id: string
    label?: import('@/types/content').LocalizedText
    slug?: string
    coverURL?: string
  }>
}

export default function HomePage({langParam, languageKey, home, categories}: HomePageProps) {
  return (
    <>
      <Head>
        <title>gallery瓦聞wauramoon</title>
      </Head>
      <SiteLayout langParam={langParam} pathSegments={[]}>
        <HomeSections sections={home.sections || []} language={languageKey} langParam={langParam} categories={categories} />
      </SiteLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(LANGUAGE_PARAM_TO_KEY).map((param) => ({
    params: {lang: param},
  }))
  return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({params}) => {
  const langParam = ensureLanguageParam(params?.lang as string | undefined)
  if (!sanityClient) {
    return {notFound: true}
  }

  const [home, categories] = await Promise.all([
    sanityClient.fetch<HomePageDocument>(HOME_PAGE_QUERY),
    sanityClient.fetch<Array<{
      _id: string
      label?: import('@/types/content').LocalizedText
      slug?: string
      coverURL?: string
    }>>(LEVEL_1_CATEGORIES_QUERY).catch(() => []),
  ])

  if (!home) {
    return {notFound: true}
  }

  const languageKey = resolveLanguageKey(langParam)

  return {
    props: {
      langParam,
      languageKey,
      home,
      categories: categories || [],
    },
    revalidate: 60,
  }
}


