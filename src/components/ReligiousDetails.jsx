import React from 'react'
import Section from './Section'
import InfoGrid from './InfoGrid'
import './Section.css'

const ReligiousDetails = ({ data }) => {
  const icon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>
  )

  return (
    <Section
      id="horoscope"
      title="Horoscope & Culture"
      subtitle="Gotra, kundli, and cultural details"
      icon={icon}
      accent="rose"
    >
      <InfoGrid
        items={[
          { label: 'Gotra', value: data.gotra },
          { label: "Father's Gotra", value: data.father_gotra },
          { label: "Mother's Gotra", value: data.mother_gotra },
          { label: 'Zodiac Sign', value: data.zodiac_sign },
          { label: 'Raasi', value: data.raasi },
          { label: 'Nakshatra', value: data.nakshatra },
          { label: 'Manglik Status', value: data.manglik_status },
        ]}
      />
    </Section>
  )
}

export default ReligiousDetails
