import type {LanguageKey} from './language'

const MONTH_NAMES: Record<LanguageKey, string[]> = {
  zhHans: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  zhHant: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

/**
 * 格式化日期，确保服务器和客户端输出一致
 * @param dateStr ISO 日期字符串
 * @param language 语言
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateStr: string | undefined, language: LanguageKey): string {
  if (!dateStr) return ''

  try {
    const date = new Date(dateStr)

    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return ''
    }

    const year = date.getFullYear()
    const month = date.getMonth() // 0-11
    const day = date.getDate()

    const monthName = MONTH_NAMES[language][month]

    if (language === 'zhHans' || language === 'zhHant') {
      return `${year}年${monthName}${day}日`
    } else {
      return `${monthName} ${day}, ${year}`
    }
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

