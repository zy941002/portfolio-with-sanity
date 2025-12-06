import type {GetServerSideProps} from 'next'
import Head from 'next/head'
import CategoryView from '@/components/category/CategoryView'
import SiteLayout from '@/components/SiteLayout'
import {CATEGORY_BY_ID_QUERY} from '@/lib/queries'
import {ensureLanguageParam, resolveLanguageKey, type LanguageParam} from '@/lib/language'
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

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async ({params, query}) => {
  const langParam = ensureLanguageParam(params?.lang as string | undefined)
  const id = params?.slug as string
  const parentIdFromQuery = query.parent as string | undefined



  if (!sanityClient || !id) {
    return {notFound: true}
  }

  const category = await sanityClient.fetch<CategoryDocument>(CATEGORY_BY_ID_QUERY, {id})

  if (!category) {
    return {notFound: true}
  }



  // 如果是二级分类，需要确定正确的 parent，然后重新查询商品和活动
  if (category.level === 2) {
    let correctParentId = category.parent?._id

    // 优先使用 URL 查询参数中的 parent ID（如果提供）
    if (parentIdFromQuery) {
      // 验证这个 parent ID 是否真的包含当前二级分类
      const parentWithChild = await sanityClient.fetch(
        `*[_type == "productCategory" && _id == $parentId && $level2Id in children[]._ref][0]{
          _id,
          "title": label,
          level,
          isEvent,
          "coverURL": coverURL.asset->url,
          leftColumnTitle,
          leftColumnDescription
        }`,
        {parentId: parentIdFromQuery, level2Id: id}
      )
      if (parentWithChild) {
        correctParentId = parentIdFromQuery
        category.parent = parentWithChild
      }
    }

    // 如果没有从查询参数获取到有效的 parent，则根据商品数据确定
    if (!correctParentId) {
      // 先查询该二级分类下的所有商品，获取它们的 level1Category
      const productsWithLevel1 = await sanityClient.fetch(
        `*[_type == "productItem" && level2Category._ref == $level2Id]{
          _id,
          "level1CategoryRef": level1Category._ref
        }`,
        {level2Id: id}
      )

      // 从商品数据中获取最常见的 level1Category（通常是正确的 parent）
      const level1CategoryCounts = new Map<string, number>()
      productsWithLevel1.forEach((p: {level1CategoryRef?: string}) => {
        if (p.level1CategoryRef) {
          level1CategoryCounts.set(p.level1CategoryRef, (level1CategoryCounts.get(p.level1CategoryRef) || 0) + 1)
        }
      })

      // 找到出现次数最多的 level1Category
      if (level1CategoryCounts.size > 0) {
        const sortedLevel1Categories = Array.from(level1CategoryCounts.entries()).sort((a, b) => b[1] - a[1])
        correctParentId = sortedLevel1Categories[0][0]

        // 如果查询到的 parent 不正确，重新查询正确的 parent
        if (correctParentId !== category.parent?._id) {
          const correctParent = await sanityClient.fetch(
            `*[_type == "productCategory" && _id == $parentId][0]{
              _id,
              "title": label,
              level,
              isEvent,
              "coverURL": coverURL.asset->url,
              leftColumnTitle,
              leftColumnDescription
            }`,
            {parentId: correctParentId}
          )
          if (correctParent) {
            category.parent = correctParent
          }
        }
      }
    }

    // 使用正确的 parent ID 重新查询商品和活动
    if (correctParentId) {
      // 获取父级分类信息，检查是否是活动分类
      const parentCategory = await sanityClient.fetch(
        `*[_type == "productCategory" && _id == $parentId][0]{
          isEvent
        }`,
        {parentId: correctParentId}
      )

      // 如果父级是活动分类，查询所有活动商品并筛选出属于该二级分类的；否则查询该二级分类下的商品
      if (parentCategory?.isEvent) {
        // 查询所有活动商品，然后筛选出属于该二级分类的
        const allEventProducts = await sanityClient.fetch(
          `*[_type == "productItem" && isEvent == true && (isExpired != true || !defined(isExpired))] | order(sortOrder asc){
            _id,
            "slug": slug.current,
            title,
            subTitle,
            summary,
            description,
            materials,
            size,
            price,
            isEvent,
            isExpired,
            "level2CategoryRef": level2Category._ref,
            "thumbnail": coalesce(gallery[0].asset->url, "")
          }`
        )
        // 筛选出属于该二级分类的活动商品
        const filteredEventProducts = allEventProducts.filter(
          (product: {level2CategoryRef?: string}) => product.level2CategoryRef === id
        )
        category.products = filteredEventProducts
      } else {
        // 重新查询商品，确保只显示匹配一级分类的商品
        const filteredProducts = await sanityClient.fetch(
          `*[_type == "productItem" && level2Category._ref == $level2Id && level1Category._ref == $level1Id] | order(sortOrder asc){
            _id,
            "slug": slug.current,
            title,
            subTitle,
            summary,
            description,
            materials,
            size,
            price,
            isEvent,
            isExpired,
            "thumbnail": coalesce(gallery[0].asset->url, "")
          }`,
          {level2Id: id, level1Id: correctParentId}
        )
        category.products = filteredProducts
      }

      // 重新查询活动，确保只显示匹配一级分类的活动
      const filteredEvents = await sanityClient.fetch(
        `*[_type == "event" && level2Category._ref == $level2Id && level1Category._ref == $level1Id] | order(startDate desc){
          _id,
          title,
          description,
          startDate,
          endDate,
          "cover": cover.asset->url
        }`,
        {level2Id: id, level1Id: correctParentId}
      )
      category.events = filteredEvents
    }
  }

  // 添加日志来排查问题
  console.log('=== Category Query Debug ===')
  console.log('Category ID:', id)
  console.log('Category Level:', category.level)
  console.log('Category Title:', category.title)
  if (category.level === 2) {
    console.log('Parent:', category.parent)
    console.log('Parent ID:', category.parent?._id)
    // 测试查询：查找所有该二级分类的商品（不限制一级分类）
    const allProductsForLevel2 = await sanityClient.fetch(
      `*[_type == "productItem" && level2Category._ref == $level2Id]{
        _id,
        title,
        "level1CategoryRef": level1Category._ref,
        "level2CategoryRef": level2Category._ref
      }`,
      {level2Id: id}
    )
    console.log('All products for level2 category (no level1 filter):', allProductsForLevel2.length)
    if (allProductsForLevel2.length > 0) {
      console.log('Sample product:', JSON.stringify(allProductsForLevel2[0], null, 2))
    }
    // 测试查询：查找匹配一级分类的商品
    if (category.parent?._id) {
      const productsWithLevel1Filter = await sanityClient.fetch(
        `*[_type == "productItem" && level2Category._ref == $level2Id && level1Category._ref == $level1Id]{
          _id,
          title,
          "level1CategoryRef": level1Category._ref,
          "level2CategoryRef": level2Category._ref
        }`,
        {level2Id: id, level1Id: category.parent._id}
      )
      console.log('Products with level1 filter:', productsWithLevel1Filter.length)
      if (productsWithLevel1Filter.length > 0) {
        console.log('Sample filtered product:', JSON.stringify(productsWithLevel1Filter[0], null, 2))
      }
    }
  }
  console.log('Products Count from query:', category.products?.length || 0)
  if (category.products && category.products.length > 0) {
    console.log('First Product from query:', JSON.stringify(category.products[0], null, 2))
  } else {
    console.log('No products found in query result')
  }
  console.log('===========================')

  // 应用继承逻辑
  const categoryWithInheritance = applyCategoryInheritance(category)

  // 如果当前分类是活动分类，查询所有没过期的活动商品并替换 category.products
  if (categoryWithInheritance.isEvent) {
    const allEventProducts = await sanityClient.fetch(
      `*[_type == "productItem" && isEvent == true && (isExpired != true || !defined(isExpired))] | order(sortOrder asc){
        _id,
        "slug": slug.current,
        title,
        subTitle,
        summary,
        description,
        price,
        isEvent,
        isExpired,
        "thumbnail": coalesce(gallery[0].asset->url, "")
      }`
    )
    // 将查询到的所有活动商品赋值给 category.products
    categoryWithInheritance.products = allEventProducts
  }

  const languageKey = resolveLanguageKey(langParam)

  return {
    props: {
      langParam,
      languageKey,
      category: categoryWithInheritance,
      id,
    },
  }
}


