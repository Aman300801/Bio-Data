import React from 'react'
import Section from './Section'
import InfoGrid from './InfoGrid'
import './Section.css'

const LifestyleDetails = ({ data }) => {
  const icon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  )

  return (
    <Section
      id="lifestyle"
      title="Lifestyle"
      subtitle="Habits, hobbies, and personality"
      icon={icon}
      accent="sky"
    >
      <InfoGrid
        items={[
          { label: 'Diet', value: data.diet },
          { label: 'Smoking', value: data.smoking },
          { label: 'Drinking', value: data.drinking },
        ]}
      />

      {data.hobbies_and_interests?.length > 0 && (
        <div className="family-meta">
          <div className="info-cell" style={{ borderBottom: 'none', paddingTop: 12 }}>
            <dt>Hobbies & Interests</dt>
            <div className="tags-container">
              {data.hobbies_and_interests.map((hobby) => (
                <span key={hobby} className="tag">{hobby}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {data.personality_traits?.length > 0 && (
        <div className="info-cell" style={{ borderBottom: 'none' }}>
          <dt>Personality Traits</dt>
          <div className="tags-container">
            {data.personality_traits.map((trait) => (
              <span key={trait} className="tag">{trait}</span>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}

export default LifestyleDetails
