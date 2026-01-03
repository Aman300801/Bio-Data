import React from 'react'
import Section from './Section'
import './Section.css'

const LifestyleDetails = ({ data }) => {
  const icon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  )

  const details = [
    { label: 'Diet', value: data.diet },
    { label: 'Smoking', value: data.smoking },
    { label: 'Drinking', value: data.drinking },
  ]

  const icons = ['🥗', '🚭', '🍷']
  let iconIndex = 0

  return (
    <Section title="Lifestyle & Habits" icon={icon} gradient="gradient-2">
      <div className="details-flow">
        {details.map((detail, index) => (
          detail.value && (
            <div key={index} className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
              <div className="detail-icon-wrapper">
                <span>{icons[iconIndex++] || '✨'}</span>
              </div>
              <div className="detail-content">
                <div className="detail-label">{detail.label}</div>
                <div className="detail-value">{detail.value}</div>
              </div>
            </div>
          )
        ))}
        
        {data.hobbies_and_interests && data.hobbies_and_interests.length > 0 && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>🎯</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Hobbies & Interests</div>
              <div className="tags-container">
                {data.hobbies_and_interests.map((hobby, index) => (
                  <span key={index} className="tag">{hobby}</span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {data.personality_traits && data.personality_traits.length > 0 && (
          <div className="detail-item" style={{ animationDelay: `${(iconIndex + 1) * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>⭐</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Personality Traits</div>
              <div className="tags-container">
                {data.personality_traits.map((trait, index) => (
                  <span key={index} className="tag">{trait}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

export default LifestyleDetails

