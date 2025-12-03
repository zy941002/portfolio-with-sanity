import type {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import CategoryView from '@/components/category/CategoryView'
import SiteLayout from '@/components/SiteLayout'
import {CATEGORY_BY_ID_QUERY, CATEGORY_IDS_QUERY} from '@/lib/queries'
import {ensureLanguageParam, LANGUAGE_PARAM_TO_KEY, resolveLanguageKey, type LanguageParam} from '@/lib/language'
import {sanityClient} from '@/lib/sanityClient'
import {applyCategoryInheritance} from '@/lib/categoryInheritance'
import {pickLocalizedText} from '@/lib/localize'
import type {CategoryDocument} from '@/types/content'

interface CategoryPageProps {
  langParam: LanguageParam
  languageKey: ReturnType<typeof resolveLanguageKey>
  category: CategoryDocument
  id: string
}

export default function CategoryPage({langParam, languageKey, category}: CategoryPageProps) {
  const categoryTitle = pickLocalizedText(category.title, languageKey)
  const pageTitle = categoryTitle ? `${categoryTitle} - gallery瓦聞` : 'gallery瓦聞'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <SiteLayout langParam={langParam} pathSegments={['category', category._id || '']}>
        <CategoryView category={category} language={languageKey} langParam={langParam} />
      </SiteLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (!sanityClient) {
    return {paths: [], fallback: 'blocking'}
  }
  const ids = await sanityClient.fetch<{_id: string}[]>(CATEGORY_IDS_QUERY).catch(() => [])

  const paths = ids.flatMap(({_id}) =>
    Object.keys(LANGUAGE_PARAM_TO_KEY).map((lang) => ({
      params: {lang, slug: _id},
    })),
  )

  return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({params}) => {
  const langParam = ensureLanguageParam(params?.lang as string | undefined)
  const id = params?.slug as string

  if (!sanityClient || !id) {
    return {notFound: true}
  }

  const category = await sanityClient.fetch<CategoryDocument>(CATEGORY_BY_ID_QUERY, {id})

  if (!category) {
    return {notFound: true}
  }

  // 应用继承逻辑
  const categoryWithInheritance = applyCategoryInheritance(category)

  const languageKey = resolveLanguageKey(langParam)

  return {
    props: {
      langParam,
      languageKey,
      category: categoryWithInheritance,
      id,
    },
    revalidate: 60,
  }
}


