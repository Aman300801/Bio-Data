import React from 'react'
import Section from './Section'
import './Section.css'

const FamilyDetails = ({ data }) => {
  const icon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )

  const icons = ['👨', '👩', '👦', '👧', '🏠', '💼', '📍']
  let iconIndex = 0

  return (
    <Section title="Family Details" icon={icon} gradient="gradient-1">
      <div className="details-flow">
        {data.father?.name && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Father's Name</div>
              <div className="detail-value">{data.father.name}</div>
              {data.father.occupation && (
                <div className="detail-subvalue">{data.father.occupation}</div>
              )}
            </div>
          </div>
        )}
        
        {data.mother?.name && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Mother's Name</div>
              <div className="detail-value">{data.mother.name}</div>
              {data.mother.occupation && (
                <div className="detail-subvalue">{data.mother.occupation}</div>
              )}
            </div>
          </div>
        )}
        
        {data.siblings?.brothers?.count && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Brothers</div>
              <div className="detail-value">{data.siblings.brothers.count}</div>
              {data.siblings.brothers.marital_status && (
                <div className="detail-subvalue">{data.siblings.brothers.marital_status}</div>
              )}
            </div>
          </div>
        )}
        
        {data.siblings?.sisters?.count && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Sisters</div>
              <div className="detail-value">{data.siblings.sisters.count}</div>
              {data.siblings.sisters.marital_status && (
                <div className="detail-subvalue">{data.siblings.sisters.marital_status}</div>
              )}
            </div>
          </div>
        )}
        
        {data.family_type && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Family Type</div>
              <div className="detail-value">{data.family_type}</div>
            </div>
          </div>
        )}
        
        {data.family_status && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Family Status</div>
              <div className="detail-value">{data.family_status}</div>
            </div>
          </div>
        )}
        
        {data.native_place && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Native Place</div>
              <div className="detail-value">{data.native_place}</div>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

export default FamilyDetails

