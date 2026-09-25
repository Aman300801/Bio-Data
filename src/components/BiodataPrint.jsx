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

const Field = ({ label, value, chip, soft, wide }) => {
  if (!value) return null
  return (
    <div className={`pdf-field${wide ? ' is-wide' : ''}`}>
      <span className="pdf-label">{label}</span>
      <span className="pdf-value">
        {chip ? (
          <span className={`pdf-chip${soft ? ' pdf-chip-soft' : ''}`}>{value}</span>
        ) : (
          value
        )}
      </span>
    </div>
  )
}

const FieldGrid = ({ items }) => {
  const visible = items.filter((item) => item.value)
  if (!visible.length) return null
  return (
    <div className="pdf-grid">
      {visible.map((item) => (
        <Field key={item.label} {...item} />
      ))}
    </div>
  )
}

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

  const siblingLine = (sibling) => {
    if (sibling?.count === undefined || sibling?.count === null || sibling?.count === '') return ''
    if (String(sibling.count) === '0') return 'None'
    return sibling.marital_status ? `${sibling.count} · ${sibling.marital_status}` : sibling.count
  }

  const snapshot = [
    personal.age && { label: 'Age', value: `${personal.age} yrs` },
    personal.height && { label: 'Height', value: personal.height },
    personal.sub_caste && { label: 'Caste', value: personal.sub_caste },
    professional.work_location && { label: 'City', value: professional.work_location },
    personal.blood_group && { label: 'Blood', value: personal.blood_group },
    personal.marital_status && { label: 'Status', value: personal.marital_status },
  ].filter(Boolean)

  return createPortal(
    <div className="pdf-overlay">
      <div className="pdf-toolbar">
        <button
          type="button"
          className="pdf-icon-btn"
          onClick={() => window.print()}
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
          <div className="pdf-ornament" aria-hidden="true" />

          <div className="pdf-blessing">
            <img src={ganeshImage} alt="Lord Ganesha" className="pdf-ganesh" />
            <p className="pdf-mantra">॥ श्री गणेशाय नमः ॥</p>
          </div>

          <header className="pdf-identity">
            <p className="pdf-kicker">Marriage Biodata</p>
            <h1>{personal.full_name}</h1>
            <p className="pdf-role-line">
              {[professional.occupation, professional.organization_name, professional.work_location]
                .filter(Boolean)
                .join(' · ')}
            </p>
            <div className="pdf-chip-row">
              {professional.designation && (
                <span className="pdf-chip">{professional.designation}</span>
              )}
              {professional.salary && (
                <span className="pdf-chip pdf-chip-soft">{professional.salary}</span>
              )}
              {education.highest_qualification && (
                <span className="pdf-chip pdf-chip-muted">{education.highest_qualification}</span>
              )}
            </div>
          </header>

          {snapshot.length > 0 && (
            <div
              className="pdf-snapshot"
              style={{ gridTemplateColumns: `repeat(${snapshot.length}, minmax(0, 1fr))` }}
            >
              {snapshot.map((item) => (
                <div className="pdf-snapshot-item" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          )}

          <section className="pdf-section">
            <h2>Personal</h2>
            <FieldGrid
              items={[
                { label: 'Date of Birth', value: formatDate(personal.date_of_birth) },
                { label: 'Place of Birth', value: personal.place_of_birth },
                { label: 'Religion', value: personal.religion },
                { label: 'Mother Tongue', value: personal.mother_tongue },
                { label: 'Nationality', value: personal.nationality },
                { label: 'Gender', value: personal.gender },
              ]}
            />
          </section>

          <section className="pdf-section">
            <h2>Education</h2>
            <FieldGrid
              items={[
                { label: 'Qualification', value: education.highest_qualification },
                { label: 'Year', value: education.year_of_passing },
                { label: 'College', value: education.institution, wide: true },
              ]}
            />
          </section>

          <section className="pdf-section">
            <h2>Profession</h2>
            <FieldGrid
              items={[
                { label: 'Occupation', value: professional.occupation },
                { label: 'Organization', value: professional.organization_name },
                { label: 'Designation', value: professional.designation, chip: true },
                { label: 'Location', value: professional.work_location },
                { label: 'Salary', value: professional.salary, chip: true, soft: true },
                { label: 'Employment', value: professional.employment_type },
              ]}
            />
          </section>

          <section className="pdf-section">
            <h2>Family</h2>
            <div className="pdf-family">
              {family.father?.name && (
                <div className="pdf-person">
                  <span className="pdf-person-role">Father</span>
                  <strong>{family.father.name}</strong>
                  {family.father.occupation && <p>{family.father.occupation}</p>}
                </div>
              )}
              {family.mother?.name && (
                <div className="pdf-person">
                  <span className="pdf-person-role">Mother</span>
                  <strong>{family.mother.name}</strong>
                  {family.mother.occupation && <p>{family.mother.occupation}</p>}
                </div>
              )}
            </div>
            <FieldGrid
              items={[
                { label: 'Brothers', value: siblingLine(family.siblings?.brothers) },
                { label: 'Sisters', value: siblingLine(family.siblings?.sisters) },
                { label: 'Family Type', value: family.family_type },
                { label: 'Native Place', value: family.native_place },
              ]}
            />
          </section>

          <section className="pdf-contact">
            <h2>Contact</h2>
            <div className="pdf-contact-grid">
              <div>
                <span className="pdf-label">Person</span>
                <strong>{contact.contact_person_name}</strong>
                {contact.relationship_to_candidate && (
                  <p>{contact.relationship_to_candidate}</p>
                )}
              </div>
              <div>
                <span className="pdf-label">Phone</span>
                <strong>{contact.phone_number}</strong>
              </div>
              <div>
                <span className="pdf-label">Address</span>
                <strong>{contact.residential_address}</strong>
              </div>
            </div>
          </section>

          <div className="pdf-ornament pdf-ornament-bottom" aria-hidden="true" />
        </motion.article>
      </div>
    </div>,
    document.body
  )
}

export default BiodataPrint
