import React from 'react'
import Section from './Section'
import './Section.css'

const ReligiousDetails = ({ data }) => {
  const icon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )

  const details = [
    { label: 'Gotra', value: data.gotra },
    { label: 'Raasi', value: data.raasi },
    { label: 'Zodiac Sign', value: data.zodiac_sign },
    { label: 'Nakshatra', value: data.nakshatra },
    { label: 'Manglik Status', value: data.manglik_status },
  ]

  const icons = ['🕉️', '⭐', '♈', '🌟', '✨']

  return (
    <Section title="Religious & Cultural Details" icon={icon} gradient="gradient-3">
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

export default ReligiousDetails

