import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'

const NavbarOwner = () => {
  const { user } = useAppContext()

  return (
    <motion.div
      initial={{y: -20 , opacity: 0}}
      animate={{y: 0 , opacity: 1}}
      transition={{duration: 0.5}}
      className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'
    >
      <Link to='/'>
        <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="" className='h-7' />
      </Link>
      <p>Welcome {user?.name || "Owner"}</p>
    </motion.div>
  )
}

export default NavbarOwner;