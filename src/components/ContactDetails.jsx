import React from 'react'
import Section from './Section'
import './Section.css'

const ContactDetails = ({ data }) => {
  const icon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )

  const icons = ['👤', '📞', '📧', '📍']
  let iconIndex = 0

  return (
    <Section title="Contact Details" icon={icon} gradient="gradient-1">
      <div className="details-flow">
        {data.contact_person_name && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Contact Person</div>
              <div className="detail-value">{data.contact_person_name}</div>
              {data.relationship_to_candidate && (
                <div className="detail-subvalue">{data.relationship_to_candidate}</div>
              )}
            </div>
          </div>
        )}
        
        {data.phone_number && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Phone Number</div>
              <div className="detail-value">
                <a href={`tel:${data.phone_number}`} className="contact-link">
                  {data.phone_number}
                </a>
              </div>
            </div>
          </div>
        )}
        
        {data.email_address && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Email Address</div>
              <div className="detail-value">
                <a href={`mailto:${data.email_address}`} className="contact-link">
                  {data.email_address}
                </a>
              </div>
            </div>
          </div>
        )}
        
        {data.residential_address && (
          <div className="detail-item" style={{ animationDelay: `${iconIndex * 0.1}s` }}>
            <div className="detail-icon-wrapper">
              <span>{icons[iconIndex++] || '✨'}</span>
            </div>
            <div className="detail-content">
              <div className="detail-label">Residential Address</div>
              <div className="detail-value">{data.residential_address}</div>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

export default ContactDetails

