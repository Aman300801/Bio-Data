import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const Section = ({ children, title, icon, gradient }) => {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Adjust margin based on screen size for better mobile experience
  const margin = isMobile ? "-50px" : "-100px"
  const isInView = useInView(ref, { once: true, margin })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible")
      setHasAnimated(true)
    }
  }, [isInView, controls, hasAnimated])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: isMobile ? 0.1 : 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      className={`section ${gradient || ''}`}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div className="section-header" variants={itemVariants}>
        {icon && <div className="section-icon">{icon}</div>}
        <h2 className="section-title">{title}</h2>
      </motion.div>
      <motion.div className="section-content" variants={itemVariants}>
        {children}
      </motion.div>
    </motion.section>
  )
}

export default Section

