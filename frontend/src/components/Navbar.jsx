import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {assets, menuLinks} from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

export const Navbar = () => {

    const {setShowLogin , user, logout, isOwner, axios, setIsOwner} = useAppContext();

    const [showProfile, setShowProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    });

    const location = useLocation();
    const [open , setOpen] = useState(false);
    
    const navigate = useNavigate();

    const changeRole = async() => {
        try{
            const res = await axios.post('/api/owner/change-role')
            console.log(res);
            const {data} = res;
            if(data.success){
                setIsOwner(data.data)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    return (
        <motion.div 
            initial={{y: -20 , opacity: 0}}
            animate={{y: 0 , opacity: 1}}
            exit={{y: -20, opacity: 0}}
            transition={{duration: 0.5}}
            className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === '/' && 'bg-light'}`}>
            <Link to="/">
                <motion.img 
                    whileHover={{scale: 1.05}}
                    src={assets.logo} alt='logo' className='h-8'/>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === '/' ? 'bg-light' : 'bg-white'} ${open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}`}>
                {
                    menuLinks.map((link, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 + index * 0.05 }}
                        >
                            <Link to={link.path}>
                                {link.name}
                            </Link>
                        </motion.div>
                    ))
                }

                {/* <div className='hidden lg:flex items-center gap-2 text-sm border border-borderColor px-3 rounded-full max-w-56'>
                    <input type="text" placeholder='Search' className='py-1.5 w-full bg-transparent outline-none placeholder:text-gray-500max-w-56'/>
                    <img src={assets.search_icon} alt='search'/>
                </div> */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className='flex max-sm:flex-col items-start sm:items-center gap-6'
                >
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className='cursor-pointer' 
                        onClick={()=>{isOwner ? navigate('/owner') : changeRole()}}
                    >
                        {isOwner ? 'Dashboard' : "List cars"}
                    </motion.button>

                    {user && (
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg overflow-hidden border border-primary"
                            onClick={() => setShowProfile(true)}
                            title="Edit Profile"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            {user.image ? (
                                <img src={user.image} alt="profile" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                user.name ? user.name[0].toUpperCase() : "U"
                            )}
                        </motion.button>
                    )}

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'
                        onClick={()=>{ user ? logout() : setShowLogin(true)}}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.45 }}
                    >
                        {user ? 'Logout' : 'Login'}
                    </motion.button>
                </motion.div>
            </motion.div>

            <motion.button
                className='sm:hidden cursor-pointer'
                aria-label='Menu'
                onClick={()=>setOpen(!open)}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                <img src={open ? assets.close_icon : assets.menu_icon} alt='menu' />
            </motion.button>

            <AnimatePresence>
                {showProfile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative"
                        >
                            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowProfile(false)}>×</button>
                            <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    try {
                                        const { data } = await axios.post('/api/user/update-profile', profileData);
                                        if (data.success) {
                                            toast.success("Profile updated!");
                                            setShowProfile(false);
                                            // Optionally refresh user context here
                                        } else {
                                            toast.error(data.message);
                                        }
                                    } catch (err) {
                                        toast.error(err.message);
                                    }
                                }}
                                className="flex flex-col gap-3"
                            >
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="border px-3 py-2 rounded"
                                    value={profileData.name}
                                    onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="border px-3 py-2 rounded"
                                    value={profileData.email}
                                    onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="border px-3 py-2 rounded"
                                    value={profileData.password}
                                    onChange={e => setProfileData({ ...profileData, password: e.target.value })}
                                />
                                <motion.button
                                    whileTap={{ scale: 0.96 }}
                                    type="submit"
                                    className="bg-primary text-white py-2 rounded mt-2"
                                >
                                    Update
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
   )
} 

