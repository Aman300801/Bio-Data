import React from 'react'
import Section from './Section'
import InfoGrid from './InfoGrid'
import './Section.css'

const EducationDetails = ({ data }) => {
  const icon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10L12 5 2 10l10 5 10-5z"></path>
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"></path>
    </svg>
  )

  return (
    <Section
      id="education"
      title="Education"
      subtitle="Academic background"
      icon={icon}
      accent="rose"
      from="left"
    >
      <InfoGrid
        columns={1}
        items={[
          { label: 'Highest Qualification', value: data.highest_qualification },
          { label: 'Institution', value: data.institution },
          { label: 'Year of Passing', value: data.year_of_passing },
          { label: 'Other Qualifications', value: data.other_qualifications },
        ]}
      />
    </Section>
  )
}

export default EducationDetails
