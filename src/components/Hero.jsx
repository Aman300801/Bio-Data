import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import './Hero.css'

const photoModules = import.meta.glob(
  ['../assets/*.{jpg,jpeg,png,webp}', '!../assets/*original*'],
  { eager: true, import: 'default' }
)

const resolvePhotoUrl = (filename) => {
  if (!filename) return null
  const entry = Object.entries(photoModules).find(([path]) =>
    path.endsWith(`/${filename}`)
  )
  return entry ? entry[1] : null
}

const easeOut = [0.22, 1, 0.36, 1]

const Hero = ({ data }) => {
  const personal = data.personal_details || {}
  const professional = data.professional_details || {}
  const name = personal.full_name || 'Bio Data Profile'
  const isMobile = useIsMobile()
  const photo = data.photograph

  const photos = useMemo(
    () =>
      (photo?.photo_available ? photo.photos || [] : [])
        .map((item) => ({
          ...item,
          url: resolvePhotoUrl(item.file),
        }))
        .filter((item) => item.url),
    [photo]
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const thumbsRef = useRef(null)
  const resumeTimer = useRef(null)

  const hasMultiple = photos.length > 1
  const currentPhoto = photos[currentIndex]
  const stackPhotos = photos.map((item, index) => ({
    ...item,
    offset: (index - currentIndex + photos.length) % photos.length,
  })).filter((item) => item.offset < 3)

  const facts = [
    personal.age && `${personal.age} yrs`,
    personal.height,
    professional.occupation,
    professional.work_location,
  ].filter(Boolean)

  const goTo = useCallback(
    (index, dir = 1) => {
      if (!photos.length) return
      const next = (index + photos.length) % photos.length
      setDirection(dir)
      setCurrentIndex(next)
    },
    [photos.length]
  )

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo])

  const pauseTemporarily = () => {
    setPaused(true)
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), 8000)
  }

  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  useEffect(() => {
    if (!lightboxOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [lightboxOpen])

  useEffect(() => {
    photos.forEach((p) => {
      if (p.url) {
        const img = new Image()
        img.src = p.url
      }
    })
  }, [photos])

  useEffect(() => {
    if (!hasMultiple || paused || lightboxOpen) return undefined
    const timer = setInterval(goNext, 5200)
    return () => clearInterval(timer)
  }, [hasMultiple, paused, lightboxOpen, goNext])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (!hasMultiple) return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasMultiple, goNext, goPrev])

  useEffect(() => {
    const container = thumbsRef.current
    const active = container?.querySelector('.gallery-thumb.active')
    if (!container || !active) return
    const offset = active.offsetLeft - container.clientWidth / 2 + active.offsetWidth / 2
    container.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' })
  }, [currentIndex])

  return (
    <div className="hero-section" id="top">
      <div className="hero-background" aria-hidden="true">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="hero-grain"></div>
      </div>

      <div className="hero-content">
        {photos.length > 0 && (
          <motion.div
            className="hero-gallery"
            initial={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : -28, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: easeOut }}
            onMouseEnter={() => {
              clearTimeout(resumeTimer.current)
              setPaused(true)
            }}
            onMouseLeave={() => {
              if (!lightboxOpen) setPaused(false)
            }}
          >
            <div className="hero-photo-stack">
              {stackPhotos
                .sort((a, b) => b.offset - a.offset)
                .map((item) => (
                  <motion.div
                    key={item.file}
                    className={`stack-card ${item.offset === 0 ? 'is-front' : ''}`}
                    animate={{
                      x: item.offset * (isMobile ? 12 : 22),
                      y: item.offset * (isMobile ? 10 : 16),
                      scale: 1 - item.offset * (isMobile ? 0.05 : 0.07),
                      rotate: item.offset * (isMobile ? 2.2 : 3.5),
                      opacity: 1 - item.offset * 0.16,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    style={{ zIndex: 10 - item.offset }}
                  >
                    <img
                      key={`${item.file}-${item.offset}`}
                      src={item.url}
                      alt={item.offset === 0 ? item.alt || name : ''}
                      className={item.offset === 0 ? 'is-live' : ''}
                    />
                  </motion.div>
                ))}

              <motion.button
                type="button"
                className="hero-photo-hit"
                onClick={() => currentPhoto && setLightboxOpen(true)}
                aria-label="View photo larger"
                drag={hasMultiple && !lightboxOpen ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) {
                    pauseTemporarily()
                    goNext()
                  } else if (info.offset.x > 60) {
                    pauseTemporarily()
                    goPrev()
                  }
                }}
              />

              {hasMultiple && !paused && !lightboxOpen && (
                <span className="photo-progress" key={currentIndex} />
              )}
              {hasMultiple && (
                <span className="photo-count">
                  {currentIndex + 1} / {photos.length}
                </span>
              )}

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    className="gallery-nav gallery-nav-prev"
                    onClick={() => {
                      pauseTemporarily()
                      goPrev()
                    }}
                    aria-label="Previous photo"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="gallery-nav gallery-nav-next"
                    onClick={() => {
                      pauseTemporarily()
                      goNext()
                    }}
                    aria-label="Next photo"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {hasMultiple && (
              <div className="gallery-thumbs" ref={thumbsRef} role="tablist" aria-label="Photo gallery">
                {photos.map((p, i) => (
                  <motion.button
                    key={p.file}
                    type="button"
                    role="tab"
                    aria-selected={i === currentIndex}
                    className={`gallery-thumb ${i === currentIndex ? 'active' : ''}`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      pauseTemporarily()
                      goTo(i, i > currentIndex ? 1 : -1)
                    }}
                    aria-label={p.alt || `Photo ${i + 1}`}
                  >
                    <img src={p.url} alt="" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

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

          {(professional.occupation || professional.organization_name) && (
            <motion.p
              className="hero-role"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } } }}
            >
              {[professional.occupation, professional.organization_name].filter(Boolean).join(' at ')}
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

          <motion.a
            href="#personal"
            className="hero-cta"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } } }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore biodata
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxOpen && currentPhoto && (
              <motion.div
                className="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxOpen(false)}
              >
                <button type="button" className="lightbox-close" aria-label="Close photo" onClick={() => setLightboxOpen(false)}>
                  ×
                </button>
                {hasMultiple && (
                  <button
                    type="button"
                    className="lightbox-nav prev"
                    aria-label="Previous photo"
                    onClick={(e) => {
                      e.stopPropagation()
                      goPrev()
                    }}
                  >
                    ‹
                  </button>
                )}
                <motion.img
                  key={currentPhoto.file}
                  src={currentPhoto.url}
                  alt={currentPhoto.alt || name}
                  initial={{ scale: 0.92, opacity: 0, y: 18 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  onClick={(e) => e.stopPropagation()}
                />
                {hasMultiple && (
                  <button
                    type="button"
                    className="lightbox-nav next"
                    aria-label="Next photo"
                    onClick={(e) => {
                      e.stopPropagation()
                      goNext()
                    }}
                  >
                    ›
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}

export default Hero
