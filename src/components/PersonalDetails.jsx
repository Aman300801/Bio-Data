import React from 'react'
import Section from './Section'
import './Section.css'

const PersonalDetails = ({ data }) => {
  const icon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )

  const details = [
    { label: 'Full Name', value: data.full_name },
    { label: 'Gender', value: data.gender },
    { label: 'Date of Birth', value: data.date_of_birth },
    { label: 'Age', value: data.age },
    { label: 'Place of Birth', value: data.place_of_birth },
    { label: 'Height', value: data.height },
    { label: 'Weight', value: data.weight },
    { label: 'Complexion', value: data.complexion },
    { label: 'Blood Group', value: data.blood_group },
    { label: 'Marital Status', value: data.marital_status },
    { label: 'Religion', value: data.religion },
    { label: 'Caste/Community', value: data.caste_or_community },
    { label: 'Sub Caste', value: data.sub_caste },
    { label: 'Nationality', value: data.nationality },
    { label: 'Mother Tongue', value: data.mother_tongue },
  ]

  const icons = ['👤', '⚧️', '📅', '🎂', '📍', '📏', '⚖️', '🎨', '🩸', '💍', '🕉️', '👥', '🏷️', '🌍', '🗣️']

  return (
    <Section title="Personal Details" icon={icon} gradient="gradient-1">
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

export default PersonalDetails

