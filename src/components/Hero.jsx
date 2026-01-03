import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

// Import the image
import amanPhoto from '../assets/aman.jpg'

const Hero = ({ data, scrollY }) => {
  const name = data.personal_details?.full_name || 'Bio Data Profile'
  const photo = data.photograph
  const photoUrl = photo?.photo_available ? amanPhoto : null
  
  return (
    <div className="hero-section">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        {photoUrl && (
          <motion.div
            className="hero-photo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <img src={photoUrl} alt={name} />
          </motion.div>
        )}
        
        <motion.div
          className="hero-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <span>Marriage Profile</span>
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {name}
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          A beautiful journey begins with the right connection
        </motion.p>
        
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
      
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
    </div>
  )
}

export default Hero

