import type {GetStaticPaths, GetStaticProps} from 'next'
import CategoryView from '@/components/category/CategoryView'
import SiteLayout from '@/components/SiteLayout'
import {CATEGORY_BY_SLUG_QUERY, CATEGORY_SLUGS_QUERY} from '@/lib/queries'
import {ensureLanguageParam, LANGUAGE_PARAM_TO_KEY, resolveLanguageKey, type LanguageParam} from '@/lib/language'
import {sanityClient} from '@/lib/sanityClient'
import type {CategoryDocument} from '@/types/content'

interface CategoryPageProps {
  langParam: LanguageParam
  languageKey: ReturnType<typeof resolveLanguageKey>
  category: CategoryDocument
  slug: string
}

export default function CategoryPage({langParam, languageKey, category}: CategoryPageProps) {
  return (
    <SiteLayout langParam={langParam} pathSegments={['category', category.slug || '']}>
      <CategoryView category={category} language={languageKey} langParam={langParam} />
    </SiteLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (!sanityClient) {
    return {paths: [], fallback: 'blocking'}
  }
  const slugs = await sanityClient.fetch<{slug: string}[]>(CATEGORY_SLUGS_QUERY)
  const paths = slugs.flatMap(({slug}) =>
    Object.keys(LANGUAGE_PARAM_TO_KEY).map((lang) => ({
      params: {lang, slug},
    })),
  )
  return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({params}) => {
  const langParam = ensureLanguageParam(params?.lang as string | undefined)
  const slug = params?.slug as string

  if (!sanityClient || !slug) {
    return {notFound: true}
  }

  const category = await sanityClient.fetch<CategoryDocument>(CATEGORY_BY_SLUG_QUERY, {slug})

  if (!category) {
    return {notFound: true}
  }

  const languageKey = resolveLanguageKey(langParam)

  return {
    props: {
      langParam,
      languageKey,
      category,
      slug,
    },
    revalidate: 60,
  }
}


