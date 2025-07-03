import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const Login = () => {
    const { setShowLogin, axios, setToken, setUser } = useAppContext();
    const navigate = useNavigate();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
            
            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
                toast.success(state === "login" ? "Login Successful" : "Account Created");
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <div onClick={() => setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
            <form
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
                onSubmit={onSubmitHandler}
                onClick={e => e.stopPropagation()}
            >
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            onChange={e => setName(e.target.value)}
                            value={name}
                            placeholder="type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            type="text"
                            required
                        />
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full relative">
                    <p>Password</p>
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type={showPassword ? "text" : "password"}
                        required
                    />
                    <img src={showPassword? assets.eye_icon : assets.eye_close_icon} alt="" className='absolute right-2 bottom-0.5 ' onClick={() => setShowPassword(!showPassword)} />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                    </p>
                )}
                <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>

                {
                    state === "login" && (
                         <div className='flex flex-col  mt-4 text-sm border p-3'>
                         Dummy login data
                            <p>email: admin@gmail.com</p>
                            <p>password: admin12</p>

                         </div>
                        

                    )
                }
            </form>
        </div>
    )
}

export default Login