import './globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsTransitioning(true)
    }

    const handleRouteChangeComplete = () => {
      // 快速恢复，让新内容尽快显示
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>gallery瓦聞</title>
        <meta name="description" content="gallery瓦聞" />
        <link rel="icon" href="/favicon.ico" />
        {/* 字体预加载 - 优化加载性能（使用 WOFF2 格式，体积减少 61%） */}
        <link
          rel="preload"
          href="/fonts/方正兰亭黑_GBK.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <div className={`page-transition-wrapper ${isTransitioning ? 'transitioning' : ''}`}>
      <Component {...pageProps} />
      </div>
    </>
  )
}