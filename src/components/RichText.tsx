import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

interface RichTextProps {
  value?: PortableTextBlock[]
  className?: string
}

const components = {
  block: {
    normal: ({children}: {children: React.ReactNode}) => (
      <p className="leading-relaxed tracking-wide mb-4">{children}</p>
    ),
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


