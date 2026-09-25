import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const easeOut = [0.22, 1, 0.36, 1]

const Hero = ({ data, onOpenPdf }) => {
  const personal = data.personal_details || {}
  const professional = data.professional_details || {}
  const name = personal.full_name || 'Bio Data Profile'

  const facts = [
    personal.age && `${personal.age} yrs`,
    personal.height,
    professional.designation || professional.occupation,
    professional.salary,
  ].filter(Boolean)

  return (
    <div className="hero-section" id="top">
      <div className="hero-background" aria-hidden="true">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="hero-grain"></div>
      </div>

      {onOpenPdf && (
        <button
          type="button"
          className="hero-pdf-btn"
          onClick={onOpenPdf}
          aria-label="View PDF biodata"
          title="PDF"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
            <path d="M8 13h8M8 17h5" />
          </svg>
        </button>
      )}

      <div className="hero-content">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
        >
          <motion.div
            className="hero-badge"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } } }}
          >
            <span>Marriage Profile</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
          >
            {name}
          </motion.h1>

          {(professional.occupation || professional.organization_name || professional.designation) && (
            <motion.p
              className="hero-role"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } } }}
            >
              {[
                [professional.occupation, professional.organization_name].filter(Boolean).join(' at '),
                professional.designation,
              ]
                .filter(Boolean)
                .join(' · ')}
            </motion.p>
          )}

          <motion.p
            className="hero-subtitle"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } } }}
          >
            A beautiful journey begins with the right connection
          </motion.p>

          {facts.length > 0 && (
            <motion.div
              className="hero-facts"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } } }}
            >
              {facts.map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </motion.div>
          )}

          <motion.div
            className="hero-cta-row"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } } }}
          >
            <a href="#personal" className="hero-cta">
              Explore biodata
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
