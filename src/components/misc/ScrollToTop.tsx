'use client'

import { useEffect } from 'react'

export default function ScrollToTop() {
  useEffect(() => {
    // 1. Prevent the browser from restoring the previous scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 2. Force the window to the very top
    window.scrollTo(0, 0)

    // Optional cleanup: restore default behavior when the component unmounts
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [])

  // This component doesn't render anything visually
  return null 
}