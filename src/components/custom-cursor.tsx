'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Glow effect - follows cursor */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[1]"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-500/20 via-amber-500/20 to-rose-500/20 blur-2xl"></div>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[1]"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          mass: 1,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-400/15 to-amber-400/15 blur-xl"></div>
      </motion.div>
    </>
  )
}
