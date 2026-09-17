import React from 'react'
import Section from './Section'
import InfoGrid from './InfoGrid'
import './Section.css'

const formatDate = (value) => {
  if (!value) return value
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const PersonalDetails = ({ data }) => {
  const icon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )

  return (
    <Section
      id="personal"
      title="Personal Details"
      subtitle="A quick snapshot of identity and background"
      icon={icon}
      accent="violet"
    >
      <InfoGrid
        items={[
          { label: 'Full Name', value: data.full_name },
          { label: 'Gender', value: data.gender },
          { label: 'Date of Birth', value: formatDate(data.date_of_birth) },
          { label: 'Age', value: data.age ? `${data.age} years` : '' },
          { label: 'Place of Birth', value: data.place_of_birth },
          { label: 'Height', value: data.height },
          { label: 'Weight', value: data.weight },
          { label: 'Complexion', value: data.complexion },
          { label: 'Blood Group', value: data.blood_group },
          { label: 'Marital Status', value: data.marital_status },
          { label: 'Religion', value: data.religion },
          { label: 'Caste / Community', value: data.caste_or_community || data.sub_caste },
          { label: 'Sub Caste', value: data.caste_or_community ? data.sub_caste : '' },
          { label: 'Nationality', value: data.nationality },
          { label: 'Mother Tongue', value: data.mother_tongue },
        ]}
      />
    </Section>
  )
}

export default PersonalDetails
