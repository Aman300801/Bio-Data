import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

// Import the optimized image (144KB instead of 3.5MB)
import amanPhoto from '../assets/aman.jpg'

const Hero = ({ data, scrollY }) => {
  const name = data.personal_details?.full_name || 'Bio Data Profile'
  const photo = data.photograph
  const photoUrl = photo?.photo_available ? amanPhoto : null
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (photoUrl) {
      const img = new Image()
      img.onload = () => setImageLoaded(true)
      img.onerror = () => setImageError(true)
      img.src = photoUrl
    }
  }, [photoUrl])
  
  return (
    <div className="hero-section">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        {photoUrl && (
          <motion.div
            className="hero-photo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.8 }}
            transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
          >
            {!imageLoaded && !imageError && (
              <div className="image-placeholder">
                <div className="placeholder-spinner"></div>
              </div>
            )}
            {imageError && (
              <div className="image-placeholder">
                <span>📷</span>
              </div>
            )}
            {imageLoaded && (
              <img 
                src={photoUrl} 
                alt={name}
                loading="eager"
                decoding="async"
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            )}
          </motion.div>
        )}
        
        <motion.div
          className="hero-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span>Marriage Profile</span>
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {name}
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
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

