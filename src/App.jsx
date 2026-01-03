import React, { useState, useEffect } from 'react'
import biodata from './data/biodata.json'
import PersonalDetails from './components/PersonalDetails'
import EducationDetails from './components/EducationDetails'
import ProfessionalDetails from './components/ProfessionalDetails'
import FamilyDetails from './components/FamilyDetails'
import LifestyleDetails from './components/LifestyleDetails'
import ReligiousDetails from './components/ReligiousDetails'
import ContactDetails from './components/ContactDetails'
import Hero from './components/Hero'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Hero data={biodata} scrollY={scrollY} />
      <div className="content-container">
        <PersonalDetails data={biodata.personal_details} />
        <EducationDetails data={biodata.education_details} />
        <ProfessionalDetails data={biodata.professional_details} />
        <FamilyDetails data={biodata.family_details} />
        {/* <LifestyleDetails data={biodata.lifestyle_and_habits} /> */}
        <ReligiousDetails data={biodata.religious_and_cultural_details} />
        <ContactDetails data={biodata.contact_details} />
      </div>
    </div>
  )
}

export default App

