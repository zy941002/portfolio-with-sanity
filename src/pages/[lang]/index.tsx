import type {GetStaticPaths, GetStaticProps} from 'next'
import HomeSections from '@/components/home/HomeSections'
import SiteLayout from '@/components/SiteLayout'
import {HOME_PAGE_QUERY} from '@/lib/queries'
import {ensureLanguageParam, LANGUAGE_PARAM_TO_KEY, resolveLanguageKey, type LanguageParam} from '@/lib/language'
import {sanityClient} from '@/lib/sanityClient'
import type {HomePageDocument} from '@/types/content'

interface HomePageProps {
  langParam: LanguageParam
  languageKey: ReturnType<typeof resolveLanguageKey>
  home: HomePageDocument
}

export default function HomePage({langParam, languageKey, home}: HomePageProps) {
  return (
    <SiteLayout langParam={langParam} pathSegments={[]}>
      <HomeSections sections={home.sections || []} language={languageKey} langParam={langParam} />
    </SiteLayout>
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

  const home = await sanityClient.fetch<HomePageDocument>(HOME_PAGE_QUERY)

  if (!home) {
    return {notFound: true}
  }

  const languageKey = resolveLanguageKey(langParam)

  return {
    props: {
      langParam,
      languageKey,
      home,
    },
    revalidate: 60,
  }
}


