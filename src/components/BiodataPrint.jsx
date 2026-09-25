import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import ganeshImage from '../assets/ganesh-ji.jpg'
import './BiodataPrint.css'

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const Row = ({ items }) => (
  <div className="pdf-row">
    {items.filter((item) => item.value).map((item) => (
      <div className={`pdf-field${item.wide ? ' is-wide' : ''}`} key={item.label}>
        <span className="pdf-label">{item.label}</span>
        <span className="pdf-value">
          {item.chip ? <span className="pdf-chip">{item.value}</span> : item.value}
        </span>
      </div>
    ))}
  </div>
)

const BiodataPrint = ({ data, onClose }) => {
  const personal = data.personal_details || {}
  const education = data.education_details || {}
  const professional = data.professional_details || {}
  const family = data.family_details || {}
  const contact = data.contact_details || {}

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const handlePrint = () => {
    window.print()
  }

  const siblingLine = (sibling) => {
    if (sibling?.count === undefined || sibling?.count === null || sibling?.count === '') return ''
    if (String(sibling.count) === '0') return 'None'
    return sibling.marital_status ? `${sibling.count} · ${sibling.marital_status}` : sibling.count
  }
  const brotherText = siblingLine(family.siblings?.brothers)
  const sisterText = siblingLine(family.siblings?.sisters)

  return createPortal(
    <div className="pdf-overlay">
      <div className="pdf-toolbar">
        <button
          type="button"
          className="pdf-icon-btn"
          onClick={handlePrint}
          aria-label="Download PDF"
          title="Download PDF"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v10" />
            <path d="M8 10l4 4 4-4" />
            <path d="M5 19h14" />
          </svg>
        </button>
        <button
          type="button"
          className="pdf-icon-btn"
          onClick={onClose}
          aria-label="Close preview"
          title="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="pdf-stage">
        <motion.article
          className="pdf-sheet"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="pdf-blessing">
            <img src={ganeshImage} alt="Lord Ganesha" className="pdf-ganesh" />
            <p className="pdf-mantra">॥ श्री गणेशाय नमः ॥</p>
          </div>

          <header className="pdf-header">
            <div className="pdf-header-copy">
              <p className="pdf-kicker">Marriage Biodata</p>
              <h1>{personal.full_name}</h1>
              <p className="pdf-role">
                {[professional.occupation, professional.organization_name].filter(Boolean).join(' · ')}
                {professional.designation && (
                  <span className="pdf-chip">{professional.designation}</span>
                )}
                {professional.salary && (
                  <span className="pdf-chip pdf-chip-soft">{professional.salary}</span>
                )}
              </p>
              <p className="pdf-meta">
                {[
                  personal.age && `${personal.age} years`,
                  personal.height,
                  personal.sub_caste,
                ]
                  .filter(Boolean)
                  .join('  •  ')}
              </p>
            </div>
          </header>

          <section className="pdf-section">
            <h2>Personal Details</h2>
            <Row
              items={[
                { label: 'Full Name', value: personal.full_name },
                { label: 'Date of Birth', value: formatDate(personal.date_of_birth) },
                { label: 'Age', value: personal.age ? `${personal.age} years` : '' },
                { label: 'Gender', value: personal.gender },
                { label: 'Height', value: personal.height },
                { label: 'Complexion', value: personal.complexion },
                { label: 'Blood Group', value: personal.blood_group },
                { label: 'Marital Status', value: personal.marital_status },
                { label: 'Place of Birth', value: personal.place_of_birth },
                { label: 'Religion', value: personal.religion },
                { label: 'Caste', value: personal.sub_caste },
                { label: 'Mother Tongue', value: personal.mother_tongue },
                { label: 'Nationality', value: personal.nationality },
              ]}
            />
          </section>

          <div className="pdf-split">
            <section className="pdf-section">
              <h2>Education</h2>
              <Row
                items={[
                  { label: 'Qualification', value: education.highest_qualification, wide: true },
                ]}
              />
            </section>
            <section className="pdf-section">
              <h2>Profession</h2>
              <Row
                items={[
                  { label: 'Occupation', value: professional.occupation, wide: true },
                  { label: 'Designation', value: professional.designation, chip: true, wide: true },
                  { label: 'Organization', value: professional.organization_name, wide: true },
                  { label: 'Salary', value: professional.salary || professional.annual_income, chip: true, wide: true },
                  { label: 'Employment', value: professional.employment_type, wide: true },
                ]}
              />
            </section>
          </div>

          <section className="pdf-section">
            <h2>Family Details</h2>
            <Row
              items={[
                { label: 'Father', value: family.father?.name, wide: true },
                { label: "Father's Occupation", value: family.father?.occupation, wide: true },
                { label: 'Mother', value: family.mother?.name, wide: true },
                { label: "Mother's Occupation", value: family.mother?.occupation, wide: true },
                { label: 'Brothers', value: brotherText, wide: true },
                { label: 'Sisters', value: sisterText },
                { label: 'Family Type', value: family.family_type },
                { label: 'Native Place', value: family.native_place, wide: true },
              ]}
            />
          </section>

          <section className="pdf-section">
            <h2>Contact</h2>
            <Row
              items={[
                { label: 'Contact Person', value: contact.contact_person_name, wide: true },
                { label: 'Relation', value: contact.relationship_to_candidate },
                { label: 'Phone', value: contact.phone_number },
                { label: 'Address', value: contact.residential_address, wide: true },
              ]}
            />
          </section>
        </motion.article>
      </div>
    </div>,
    document.body
  )
}

export default BiodataPrint
