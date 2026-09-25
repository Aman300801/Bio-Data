import React from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import InfoGrid from './InfoGrid'
import useIsMobile from '../hooks/useIsMobile'
import './Section.css'

const siblingLabel = (count, maritalStatus) => {
  if (count === undefined || count === null || count === '') return ''
  if (String(count) === '0') return 'None'
  return maritalStatus ? `${count} · ${maritalStatus}` : String(count)
}

const FamilyDetails = ({ data }) => {
  const icon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )

  const isMobile = useIsMobile()
  const people = [
    data.father?.name && {
      role: 'Father',
      name: data.father.name,
      occupation: data.father.occupation,
    },
    data.mother?.name && {
      role: 'Mother',
      name: data.mother.name,
      occupation: data.mother.occupation,
    },
  ].filter(Boolean)

  return (
    <Section
      id="family"
      title="Family"
      subtitle="Parents, siblings, and native place"
      icon={icon}
      accent="gold"
    >
      <div className="person-grid">
        {people.map((person, index) => (
          <motion.article
            key={person.role}
            className="person-card"
            initial={{
              opacity: 0,
              y: isMobile ? 48 : 36,
              x: isMobile ? 0 : index === 0 ? -40 : 40,
              scale: isMobile ? 0.9 : 1,
            }}
            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.25 : 0.5 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: index * 0.12,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="role">{person.role}</div>
            <h3>{person.name}</h3>
            {person.occupation && <p>{person.occupation}</p>}
          </motion.article>
        ))}
      </div>

      <div className="family-meta">
        <InfoGrid
          items={[
            { label: 'Brothers', value: siblingLabel(data.siblings?.brothers?.count, data.siblings?.brothers?.marital_status) },
            { label: 'Sisters', value: siblingLabel(data.siblings?.sisters?.count, data.siblings?.sisters?.marital_status) },
            { label: 'Family Type', value: data.family_type },
            { label: 'Family Status', value: data.family_status },
            { label: 'Native Place', value: data.native_place },
          ]}
        />
      </div>
    </Section>
  )
}

export default FamilyDetails
