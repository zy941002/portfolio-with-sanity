import type {LanguageParam} from '@/lib/language'

interface SiteLayoutProps {
  children: React.ReactNode
  langParam: LanguageParam
  pathSegments?: string[]
}

export default function SiteLayout({children, langParam}: SiteLayoutProps) {
  const isEnglish = langParam === 'en'

  return (
    <div className={`min-h-screen bg-waura-pink text-waura-brown ${isEnglish ? 'english' : 'chinese'}`}>
      <main>{children}</main>
    </div>
  )
}


