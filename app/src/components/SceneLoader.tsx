import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const LazyScene = lazy(() => import('./ArchitecturalScene').then((module) => ({ default: module.ArchitecturalScene })))

function ScenePoster() {
  return <div className="scene-fallback" aria-hidden="true"><i /><i /><i /><i /></div>
}

export function SceneLoader() {
  const ref = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoad(true); observer.disconnect() }
    }, { rootMargin: '500px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div className="scene-loader" ref={ref}>
    <ScenePoster />
    {load && <Suspense fallback={null}><LazyScene /></Suspense>}
  </div>
}
