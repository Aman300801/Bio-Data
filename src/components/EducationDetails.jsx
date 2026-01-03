import React from 'react'
import Section from './Section'
import './Section.css'

const EducationDetails = ({ data }) => {
  const icon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  )

  const details = [
    { label: 'Highest Qualification', value: data.highest_qualification },
    { label: 'Other Qualifications', value: data.other_qualifications },
    { label: 'Institution', value: data.institution },
    { label: 'Year of Passing', value: data.year_of_passing },
  ]

  const icons = ['🎓', '📜', '🏫', '📆']

  return (
    <Section title="Education" icon={icon} gradient="gradient-2">
      <div className="details-flow">
        {details.map((detail, index) => (
          detail.value && (
            <div key={index} className="detail-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="detail-icon-wrapper">
                <span>{icons[index] || '✨'}</span>
              </div>
              <div className="detail-content">
                <div className="detail-label">{detail.label}</div>
                <div className="detail-value">{detail.value}</div>
              </div>
            </div>
          )
        ))}
      </div>
    </Section>
  )
}

export default EducationDetails

