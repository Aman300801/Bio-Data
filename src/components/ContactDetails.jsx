import React from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import InfoGrid from './InfoGrid'
import './Section.css'

const ContactDetails = ({ data }) => {
  const icon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )

  return (
    <Section
      id="contact"
      title="Get in Touch"
      subtitle="Family contact for further conversation"
      icon={icon}
      accent="violet"
    >
      <div className="contact-card">
        <InfoGrid
          columns={1}
          items={[
            {
              label: 'Contact Person',
              value: data.contact_person_name,
              sub: data.relationship_to_candidate,
            },
            {
              label: 'Phone',
              value: data.phone_number,
              href: data.phone_number ? `tel:${data.phone_number}` : undefined,
            },
            {
              label: 'Email',
              value: data.email_address,
              href: data.email_address ? `mailto:${data.email_address}` : undefined,
            },
            { label: 'Address', value: data.residential_address },
          ]}
        />

        <motion.div
          className="contact-actions"
          initial={{ opacity: 0, y: 36, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
        >
          {data.phone_number && (
            <motion.a
              className="contact-btn"
              href={`tel:${data.phone_number}`}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Call now
            </motion.a>
          )}
          {data.email_address && (
            <motion.a
              className="contact-btn secondary"
              href={`mailto:${data.email_address}`}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send email
            </motion.a>
          )}
        </motion.div>
      </div>
    </Section>
  )
}

export default ContactDetails
