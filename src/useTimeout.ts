import { useEffect, useLayoutEffect, useRef } from 'react'

const DEFAULT_DELAY = 300

export function useTimeout(callback: () => void, delay = DEFAULT_DELAY) {
  const latestCallback = useRef<() => void>(callback)

  useLayoutEffect(() => {
    latestCallback.current = callback
  }, [callback])

  useEffect(() => {
    const timer = setTimeout(() => {
      latestCallback.current()
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay])
}
