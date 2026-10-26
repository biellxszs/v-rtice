import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ArchitecturalScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      mount.classList.add('scene-failed')
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.domElement.setAttribute('aria-hidden', 'true')
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x111113, 0.055)
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(7.8, 6.2, 10.5)
    camera.lookAt(0, 0.3, 0)

    const group = new THREE.Group()
    group.rotation.y = -0.48
    scene.add(group)

    const stone = new THREE.MeshStandardMaterial({ color: 0x6f6b65, roughness: 0.72, metalness: 0.08 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x242427, roughness: 0.48, metalness: 0.25 })
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x82758f, roughness: 0.16, metalness: 0.05, transparent: true, opacity: 0.38 })
    const volumes = Array.from({ length: 5 }, (_, i) => ({
      w: 2.4 + (i % 3) * 1.15,
      h: 0.35 + ((i * 2) % 4) * 0.55,
      d: 2.1 + ((i + 1) % 2) * 1.2,
      x: (i - 2) * 1.2,
      y: -0.5 + ((i * 2) % 4) * 0.28,
      z: Math.sin(i * 1.7) * 1.35,
    }))
    volumes.forEach((v, i) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(v.w, v.h, v.d), i === 3 ? glass : i % 2 ? dark : stone)
      mesh.position.set(v.x, v.y + v.h / 2, v.z)
      mesh.rotation.y = (i - 2) * 0.045
      group.add(mesh)
    })
    const plane = new THREE.Mesh(new THREE.BoxGeometry(10, 0.12, 7), dark)
    plane.position.y = -0.58
    group.add(plane)

    scene.add(new THREE.HemisphereLight(0xc9c2d0, 0x171719, 2.1))
    const key = new THREE.DirectionalLight(0xffe4c2, 4.2)
    key.position.set(4, 8, 6)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x82758f, 3)
    rim.position.set(-5, 3, -4)
    scene.add(rim)

    let visible = false
    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let scrollTurn = 0
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      renderer.setSize(w, h, false)
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame && !reduceMotion) frame = requestAnimationFrame(render)
    }, { rootMargin: '100px' })
    observer.observe(mount)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)

    const onPointer = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.24
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.12
    }
    const onScroll = () => {
      const rect = mount.getBoundingClientRect()
      scrollTurn = Math.max(-1, Math.min(1, -rect.top / window.innerHeight)) * 0.24
    }
    mount.parentElement?.addEventListener('pointermove', onPointer)
    window.addEventListener('scroll', onScroll, { passive: true })

    function render() {
      if (!visible || reduceMotion) { frame = 0; return }
      group.rotation.y += ((-0.48 + pointerX + scrollTurn) - group.rotation.y) * 0.045
      group.rotation.x += ((-pointerY) - group.rotation.x) * 0.045
      camera.position.y += ((6.2 + pointerY * 3) - camera.position.y) * 0.045
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    resize()
    onScroll()
    if (!reduceMotion) renderer.render(scene, camera)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      mount.parentElement?.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose()
      })
      stone.dispose(); dark.dispose(); glass.dispose(); renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="scene-canvas" ref={mountRef} aria-label="Composição tridimensional abstrata de volumes arquitetônicos" role="img" />
}
