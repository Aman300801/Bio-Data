import React, { useEffect, useState } from 'react'
import { motion, LayoutGroup, useScroll, useSpring } from 'framer-motion'
import biodata from './data/biodata.json'
import PersonalDetails from './components/PersonalDetails'
import EducationDetails from './components/EducationDetails'
import ProfessionalDetails from './components/ProfessionalDetails'
import FamilyDetails from './components/FamilyDetails'
import ReligiousDetails from './components/ReligiousDetails'
import ContactDetails from './components/ContactDetails'
import Hero from './components/Hero'
import useIsMobile from './hooks/useIsMobile'
import './App.css'
import './components/Section.css'

const NAV_LINKS = [
  { href: '#personal', id: 'personal', label: 'Personal' },
  { href: '#education', id: 'education', label: 'Education' },
  { href: '#career', id: 'career', label: 'Career' },
  { href: '#family', id: 'family', label: 'Family' },
  { href: '#horoscope', id: 'horoscope', label: 'Horoscope' },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

function App() {
  const personal = biodata.personal_details
  const professional = biodata.professional_details
  const [activeId, setActiveId] = useState('personal')
  const [navStuck, setNavStuck] = useState(false)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })

  const highlights = [
    { label: 'Age', value: personal.age ? `${personal.age} yrs` : null },
    { label: 'Height', value: personal.height },
    { label: 'Profession', value: professional.occupation },
    { label: 'Lives in', value: professional.work_location },
  ].filter((item) => item.value)

  useEffect(() => {
    const nav = document.querySelector('.site-nav')
    const onScroll = () => {
      if (!nav) return
      setNavStuck(nav.getBoundingClientRect().top <= 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Hero data={biodata} />

      <header className={`site-nav ${navStuck ? 'is-stuck' : ''}`}>
        <div className="site-nav-inner">
          <a href="#top" className="site-nav-name">
            {personal.full_name}
          </a>
          <LayoutGroup>
            <nav className="profile-nav" aria-label="Profile sections">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={activeId === link.id ? 'is-active' : ''}
              >
                {activeId === link.id && (
                  <motion.span
                    className="nav-pill"
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span>{link.label}</span>
              </a>
            ))}
            </nav>
          </LayoutGroup>
        </div>
      </header>

      <main className="profile-sheet">
        {highlights.length > 0 && (
          <motion.div
            className="highlight-strip"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: isMobile ? 0.1 : 0.12, delayChildren: 0.04 } },
            }}
          >
            {highlights.map((item, index) => (
              <motion.div
                className="highlight-chip"
                key={item.label}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: isMobile ? 40 : 36,
                    rotate: isMobile ? 0 : index % 2 === 0 ? -4 : 4,
                    scale: isMobile ? 0.86 : 0.86,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 320, damping: 16 },
                  },
                }}
                whileTap={{ scale: 0.96 }}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </motion.div>
            ))}
          </motion.div>
        )}

        <PersonalDetails data={personal} />

        <div className="section-split">
          <EducationDetails data={biodata.education_details} />
          <ProfessionalDetails data={biodata.professional_details} />
        </div>

        <FamilyDetails data={biodata.family_details} />
        <ReligiousDetails data={biodata.religious_and_cultural_details} />
        <ContactDetails data={biodata.contact_details} />

        <motion.p
          className="profile-footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Marriage biodata of {personal.full_name}
        </motion.p>
      </main>
    </div>
  )
}

export default App
