import type {LanguageParam} from '@/lib/language'

interface SiteLayoutProps {
  children: React.ReactNode
  langParam: LanguageParam
  pathSegments?: string[]
}

export default function SiteLayout({children}: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-waura-pink text-waura-brown">
      {/* <header className="px-6 md:px-12 py-8 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-4xl font-semibold tracking-wide uppercase">瓦闻</span>
          <span className="text-base tracking-[0.3em] uppercase mt-1">wauramoon</span>
        </div>

      </header> */}
      <main>{children}</main>
      {/* <footer className="px-6 md:px-12 py-10 text-sm text-waura-deep-gray border-t border-waura-border mt-16">
        <p>© {new Date().getFullYear()} wauramoon</p>
      </footer> */}
    </div>
  )
}


