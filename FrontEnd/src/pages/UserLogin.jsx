import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, Bounce, Slide, Flip, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem('token')

        if(token){
            axios.get("https://fc-app.onrender.com/protected/verify",{
                headers:{
                    "Authorization":"Bearer "+token
                }

            }).then(res=>{
                if(res.data.message=="Authorized")
                {
                    navigate('/home')
                }
            }).catch((err)=>console.log(err))
        }
        
    })

    const notifySuccess = () => toast.success('Logging you in!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
    });

    const notifyError = () => toast.error('Invalid credentials. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,


    });

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://fc-app.onrender.com/auth/login', { username:email, password });

            if (res.data.message === 'Success') {
                console.log('Login Successful');
                notifySuccess();
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', email);
                

                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                console.log(res.message);
                notifyError();
            }
        } catch (error) {
            console.error(error.response.data);
            notifyError();
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-10 shadow-2xl rounded-3xl bg-[#4C7766] font-sans max-w-sm w-96">
                <h1 className="text-4xl text-center mb-6 font-bold text-black"> User Login</h1>

                <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                    <div className="relative my-6">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="block w-full px-3 py-2 border border-black rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder=" Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative my-6">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full px-3 py-2 border border-black rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full py-2 mb-4 text-xl text-white bg-black rounded-full border-black border-2 hover:border-white"
                        type="button"
                        onClick={handleSubmit}>
                        Login
                    </button>

                    <div className="text-center font-semibold">
                        <span className="text-md text-stone-950">
                            New Here? <Link to="/register" className="text-gray-50 underline hover:text-black">Create an account</Link>
                        </span>
                    </div>
                </form>
            </div>
            <ToastContainer /> {/* Ensure the ToastContainer is included here */}
        </div>
    );
};

export default UserLogin;
