import React from 'react'
import Section from './Section'
import './Section.css'

const ProfessionalDetails = ({ data }) => {
  const icon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  )

  const details = [
    { label: 'Occupation', value: data.occupation },
    { label: 'Organization', value: data.organization_name },
    { label: 'Designation', value: data.designation },
    { label: 'Annual Income', value: data.annual_income },
    { label: 'Work Location', value: data.work_location },
    { label: 'Employment Type', value: data.employment_type },
  ]

  const icons = ['💼', '🏢', '👔', '💰', '📍', '⏰']

  return (
    <Section title="Professional Details" icon={icon} gradient="gradient-3">
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

export default ProfessionalDetails

