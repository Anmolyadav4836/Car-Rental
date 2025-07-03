import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import TestimonialCard from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedSection />
        <Banner />
        <TestimonialCard/>
        <Newsletter />
    </>
  )
}

export default Home