import Link from 'next/link'
import {LANGUAGE_OPTIONS, buildLanguageHref, type LanguageParam} from '@/lib/language'

interface LanguageSwitcherProps {
  current: LanguageParam
  pathSegments?: string[]
}

export default function LanguageSwitcher({current, pathSegments = []}: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      {LANGUAGE_OPTIONS.map((option) => {
        const href = buildLanguageHref(option.param, pathSegments)
        const isActive = option.param === current
        return (
          <Link
            key={option.param}
            href={href}
            className={`transition-colors ${isActive ? 'text-waura-brown' : 'text-waura-deep-gray hover:text-waura-brown'}`}
          >
            {option.label}
          </Link>
        )
      })}
    </div>
  )
}


