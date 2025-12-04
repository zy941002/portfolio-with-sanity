import type {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import ProductView from '@/components/product/ProductView'
import SiteLayout from '@/components/SiteLayout'
import {PRODUCT_BY_ID_QUERY, PRODUCT_IDS_QUERY} from '@/lib/queries'
import {ensureLanguageParam, LANGUAGE_PARAM_TO_KEY, resolveLanguageKey, type LanguageParam} from '@/lib/language'
import {sanityClient} from '@/lib/sanityClient'
import {pickLocalizedText} from '@/lib/localize'
import type {ProductItem} from '@/types/content'

interface ProductPageProps {
  langParam: LanguageParam
  languageKey: ReturnType<typeof resolveLanguageKey>
  product: ProductItem & {
    gallery?: string[]
    videoUrl?: string
    videoLink?: string
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
  id: string
}

export default function ProductPage({langParam, languageKey, product}: ProductPageProps) {
  const productTitle = pickLocalizedText(product.title, languageKey)
  const pageTitle = productTitle ? `${productTitle} - gallery瓦聞` : 'gallery瓦聞'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <SiteLayout langParam={langParam} pathSegments={['product', product._id || '']}>
        <ProductView product={product} language={languageKey} langParam={langParam} />
      </SiteLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (!sanityClient) {
    return {paths: [], fallback: 'blocking'}
  }
  const ids = await sanityClient.fetch<{_id: string}[]>(PRODUCT_IDS_QUERY).catch(() => [])

  const paths = ids.flatMap(({_id}) =>
    Object.keys(LANGUAGE_PARAM_TO_KEY).map((lang) => ({
      params: {lang, id: _id},
    })),
  )

  return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({params}) => {
  const langParam = ensureLanguageParam(params?.lang as string | undefined)
  const id = params?.id as string

  if (!sanityClient || !id) {
    return {notFound: true}
  }

  const product = await sanityClient.fetch<ProductPageProps['product']>(PRODUCT_BY_ID_QUERY, {id})

  if (!product) {
    return {notFound: true}
  }

  const languageKey = resolveLanguageKey(langParam)

  return {
    props: {
      langParam,
      languageKey,
      product,
      id,
    },
    revalidate: 60,
  }
}

