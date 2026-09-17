import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const desktopOrigins = {
  up: { y: 56, x: 0, rotate: 0.4, scale: 0.96 },
  left: { y: 24, x: -48, rotate: -1.2, scale: 0.97 },
  right: { y: 24, x: 48, rotate: 1.2, scale: 0.97 },
}

const mobileOrigin = { y: 56, x: 0, rotate: 0, scale: 0.92 }

const Section = ({ id, children, title, subtitle, icon, accent = 'violet', from = 'up' }) => {
  const ref = useRef(null)
  const isMobile = useIsMobile()
  const shouldReduce = useReducedMotion()
  const isInView = useInView(ref, {
    once: true,
    margin: isMobile ? '0px 0px -8% 0px' : '-10% 0px',
  })
  const origin = isMobile ? mobileOrigin : (desktopOrigins[from] || desktopOrigins.up)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lift = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [36, 0, 0, -22])

  return (
    <motion.div
      id={id}
      ref={ref}
      className="section-parallax"
      style={{ y: shouldReduce || isMobile ? 0 : lift }}
    >
      <motion.section
        className={`profile-section accent-${accent}`}
        initial={shouldReduce ? false : 'hidden'}
        animate={shouldReduce || isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0, ...origin },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: {
              duration: isMobile ? 0.55 : 0.7,
              ease: [0.16, 1, 0.3, 1],
              staggerChildren: isMobile ? 0.14 : 0.12,
            },
          },
        }}
      >
        <motion.div
          className="profile-section-header"
          variants={{
            hidden: { opacity: 0, y: isMobile ? 28 : 22 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {icon && (
            <motion.div
              className="profile-section-icon"
              variants={{
                hidden: { scale: 0.5, rotate: isMobile ? -12 : -18, opacity: 0 },
                visible: {
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                  transition: { type: 'spring', stiffness: 380, damping: 16 },
                },
              }}
              whileTap={{ scale: 0.94, rotate: 8 }}
            >
              {icon}
            </motion.div>
          )}
          <div className="profile-section-heading">
            <h2 className="profile-section-title">{title}</h2>
            {subtitle && <p className="profile-section-subtitle">{subtitle}</p>}
            <motion.span
              className="section-underline"
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 },
                },
              }}
            />
          </div>
        </motion.div>
        <motion.div
          className="profile-section-body"
          variants={{
            hidden: { opacity: 0, y: isMobile ? 32 : 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {children}
        </motion.div>
      </motion.section>
    </motion.div>
  )
}

export default Section
