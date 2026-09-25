import React from 'react'
import Section from './Section'
import InfoGrid from './InfoGrid'
import './Section.css'

const ProfessionalDetails = ({ data }) => {
  const icon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  )

  return (
    <Section
      id="career"
      title="Profession"
      subtitle="Work and career"
      icon={icon}
      accent="sky"
      from="right"
    >
      <InfoGrid
        columns={1}
        items={[
          { label: 'Occupation', value: data.occupation },
          { label: 'Designation', value: data.designation },
          { label: 'Organization', value: data.organization_name },
          { label: 'Work Location', value: data.work_location },
          { label: 'Annual Income', value: data.salary || data.annual_income },
          { label: 'Employment Type', value: data.employment_type },
        ]}
      />
    </Section>
  )
}

export default ProfessionalDetails
