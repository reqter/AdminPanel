import { useLayoutEffect } from 'react'

export default function useLayout (layout) {
  useLayoutEffect(
    () => {
      // Iterate through each value in theme object
      for (const key in layout) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, layout[key])
      }
    },
    [layout] // Only call again if theme object reference changes
  )
}
