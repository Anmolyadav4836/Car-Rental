import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const Sidebar = () => {
    const {user , axios , fetchUser} = useAppContext();
    const [image, setImage] = useState('');

    const updateImage = async () => {
        try{
            const formData = new FormData();
            formData.append('image', image);
            const res = await axios.post('/api/owner/update-image', formData);
           
            if(res.data.success){
                fetchUser();
                toast.success(res.data.message);
                setImage('');
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error.message)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='group relative'
            >
                <label htmlFor='image' >
                    <img src={image ? URL.createObjectURL(image) : user?.image || assets.user_profile} alt='user profile' className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto'/>

                    <input id="image" accept="image/*" hidden type="file" onChange={e => setImage(e.target.files[0])} 
                    />

                    <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
                        <img src={assets.edit_icon} alt='edit icon' />
                    </div>
                </label>
            </motion.div>

            {
                image && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'
                        onClick={updateImage}
                    >
                        Save
                        <img src={assets.check_icon} alt='check icon' width={13} />
                    </motion.button>
                )
            }

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className='mt-2 text-base max-md:hidden'
            >
                {user?.name}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='w-full'
            >
                {ownerMenuLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        end={link.path === "/owner"}
                        className={({ isActive }) =>
                            `relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? link.coloredIcon : link.icon} alt='car-icon' />
                                <span className='max-md:hidden'>{link.name}</span>
                                {isActive && (
                                    <div className="bg-primary w-1 h-8 rounded-lg right-0 absolute"></div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default Sidebar;