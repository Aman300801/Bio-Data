import React from 'react'
import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const InfoGrid = ({ items = [], columns = 2 }) => {
  const isMobile = useIsMobile()
  const visible = items.filter((item) => item.value !== undefined && item.value !== null && item.value !== '')

  if (!visible.length) return null

  return (
    <dl className={`info-grid cols-${columns}`}>
      {visible.map((item, index) => (
        <motion.div
          className="info-cell"
          key={item.label}
          initial={{
            opacity: 0,
            y: isMobile ? 42 : 28,
            x: isMobile ? 0 : index % 2 === 0 ? -24 : 24,
            scale: isMobile ? 0.9 : 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          }}
          viewport={{ once: true, amount: isMobile ? 0.2 : 0.4, margin: isMobile ? '0px 0px -12% 0px' : '0px' }}
          transition={{
            type: 'spring',
            stiffness: isMobile ? 280 : 240,
            damping: 20,
            delay: isMobile ? Math.min(index, 5) * 0.07 : (index % 4) * 0.05,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <dt>{item.label}</dt>
          <dd>
            {item.href ? (
              <a href={item.href} className="info-link">
                {item.value}
              </a>
            ) : (
              item.value
            )}
            {item.sub && <span className="info-sub">{item.sub}</span>}
          </dd>
        </motion.div>
      ))}
    </dl>
  )
}

export default InfoGrid
