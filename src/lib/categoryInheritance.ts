import type {CategoryDocument} from '@/types/content'

/**
 * 处理分类的继承逻辑
 * 如果二级分类启用了 inheritFromParent 且字段为空，则使用父分类的值
 */
export function applyCategoryInheritance(category: CategoryDocument): CategoryDocument {
  // 如果不是二级分类或没有父分类，直接返回
  if (category.level !== 2 || !category.parent) {
    return category
  }

  // 如果未启用继承，直接返回
  if (!category.inheritFromParent) {
    return category
  }

  const parent = category.parent

  // 应用继承逻辑：如果当前字段为空，使用父分类的值
  const inheritedCategory: CategoryDocument = {
    ...category,
    coverURL: category.coverURL || parent.coverURL,
    leftColumnTitle: category.leftColumnTitle || parent.leftColumnTitle,
    leftColumnDescription: category.leftColumnDescription || parent.leftColumnDescription,
    relatedEvents: (category.relatedEvents && category.relatedEvents.length > 0)
      ? category.relatedEvents
      : (parent.relatedEvents || category.relatedEvents),
    featuredProducts: (category.featuredProducts && category.featuredProducts.length > 0)
      ? category.featuredProducts
      : (parent.featuredProducts || category.featuredProducts),
  }

  // 处理子分类的继承（如果存在）
  if (inheritedCategory.children) {
    inheritedCategory.children = inheritedCategory.children.map((child) => {
      if (child.level === 2 && child.inheritFromParent && child.parent) {
        return {
          ...child,
          coverURL: child.coverURL || child.parent.coverURL,
          leftColumnTitle: child.leftColumnTitle || child.parent.leftColumnTitle,
          leftColumnDescription: child.leftColumnDescription || child.parent.leftColumnDescription,
        }
      }
      return child
    })
  }

  return inheritedCategory
}

