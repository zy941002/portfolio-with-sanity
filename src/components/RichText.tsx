import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

interface RichTextProps {
  value?: PortableTextBlock[]
  className?: string
}

type TextAlign = 'left' | 'center' | 'right' | 'justify'

function getAlignClass(textAlign: string | undefined): string {
  const alignMap: Record<TextAlign, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }
  const align = (textAlign as TextAlign) || 'left'
  return alignMap[align] || 'text-left'
}

function getTextAlign(value: PortableTextBlock | undefined): string | undefined {
  if (!value || typeof value !== 'object') return undefined

  // First, check markDefs for old textAlign annotation
  if (value.markDefs && Array.isArray(value.markDefs)) {
    const alignMark = value.markDefs.find(
      (mark: {_type?: string; align?: string}) => mark._type === 'textAlign'
    )
    if (alignMark && 'align' in alignMark) {
      return alignMark.align as string
    }
  }

  // Then check children for new textAlign decorator marks
  if (value.children && Array.isArray(value.children)) {
    for (const child of value.children) {
      if (child.marks && Array.isArray(child.marks)) {
        // Check for textAlign marks in the first child
        if (child.marks.includes('textAlignLeft')) return 'left'
        if (child.marks.includes('textAlignCenter')) return 'center'
        if (child.marks.includes('textAlignRight')) return 'right'
        if (child.marks.includes('textAlignJustify')) return 'justify'
        // Also check for old textAlign mark
        if (child.marks.includes('textAlign')) {
          // If it's an annotation, we need to check markDefs
          if (value.markDefs && Array.isArray(value.markDefs)) {
            const alignMark = value.markDefs.find(
              (mark: {_type?: string; align?: string}) => mark._type === 'textAlign'
            )
            if (alignMark && 'align' in alignMark) {
              return alignMark.align as string
            }
          }
        }
      }
    }
  }

  return undefined
}

const components: Partial<PortableTextComponents> = {
  block: {
    normal: ({children, value}) => {
      const textAlign = getTextAlign(value)
      const alignClass = getAlignClass(textAlign)

      return (
        <p className={`leading-relaxed tracking-wide mb-4 ${alignClass}`}>
          {children}
        </p>
      )
    },
    h1: ({children, value}) => {
      const textAlign = getTextAlign(value)
      const alignClass = getAlignClass(textAlign)
      return <h1 className={`text-3xl font-bold mb-4 ${alignClass}`}>{children}</h1>
    },
    h2: ({children, value}) => {
      const textAlign = getTextAlign(value)
      const alignClass = getAlignClass(textAlign)
      return <h2 className={`text-2xl font-bold mb-4 ${alignClass}`}>{children}</h2>
    },
    h3: ({children, value}) => {
      const textAlign = getTextAlign(value)
      const alignClass = getAlignClass(textAlign)
      return <h3 className={`text-xl font-bold mb-4 ${alignClass}`}>{children}</h3>
    },
    blockquote: ({children, value}) => {
      const textAlign = getTextAlign(value)
      const alignClass = getAlignClass(textAlign)
      return (
        <blockquote className={`border-l-4 border-gray-300 pl-4 italic mb-4 ${alignClass}`}>
          {children}
        </blockquote>
      )
    },
  },
  marks: {
    // Handle old textAlign mark (if it exists in data as annotation)
    textAlign: ({children}) => <>{children}</>,
    // Handle new textAlign decorators
    textAlignLeft: ({children}) => <>{children}</>,
    textAlignCenter: ({children}) => <>{children}</>,
    textAlignRight: ({children}) => <>{children}</>,
    textAlignJustify: ({children}) => <>{children}</>,
  },
}

export default function RichText({value, className}: RichTextProps) {
  if (!value || value.length === 0) return null
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}


