import illustration from "../assets/images/Illustration.png"
import React, { useState } from "react"
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { useNavigate } from "react-router-dom"
export default function Login (){
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();
    
    const login = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Login")
        navigate("/dashboard")
    }

    return(
        <main className="bg-foreground w-screen h-screen">
            <div className="h-full md:flex">
                <div className="bg-white h-full w-full max-w-full md:max-w-md p-4 sm:p-8 pt-8">
                    <header className="w-fit m-auto scale-90">
                        <div className="w-fit">
                            <img src="/Logo.png" className="w-22 h-22 object-cover" alt="DMS Logo" />
                        </div>
                        <h2 className="text-center text-2xl font-semibold mt-8">Login</h2>
                    </header>

                    <div className="mt-12 scale-90">
                        <form onSubmit={login}>
                            <div className="field flex flex-col gap-2 mt-6">
                                <label htmlFor="email" className="text-md font-regular text-black-primary">Email Address</label>
                                <input className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600" type="text" name="" placeholder="example@gmail.com" id="email" />
                            </div>

                            <div className="field flex flex-col gap-2 mt-6 relative">
                                <label htmlFor="password" className="text-md font-regular text-black-primary">Password</label>
                                <input className="outline-none border-none text-black-primary h-[50px] bg-input text-sm px-4 boder border-transparent rounded-[10px] active:border-gray-600" type={showPassword?"text":"password"} name="" placeholder="*********" id="password" />
                                <div className="absolute right-3 bottom-4">
                                    {!showPassword ? <AiFillEyeInvisible className="text-black-primary text-xl" onClick={() => setShowPassword(!showPassword)} /> : <AiFillEye className="text-black-primary text-xl" onClick={() => setShowPassword(!showPassword)} />}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="w-[15px] h-[15px]" name="me" id="me" />
                                    <label className="text-sm text-black-primary" htmlFor="me">Remember me</label>
                                </div>
                                <div className="">
                                    <a href="#" className="text-sm text-primary">Reset Password?</a>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button type="submit" className="h-[50px] bg-primary text-white rounded-[10px] w-full font-semibold">Log in</button>
                            </div>

                            <div className="mt-6">
                                <p className="text-md text-black-primary text-center">Don't have account yet? <a href="#" className="text-primary">New Account</a> </p>
                            </div>

                        </form>
                    </div>

                </div>
                <div className="w-full hidden md:flex items-center justify-center">
                    <img src={illustration} className="w-[60%]" alt="" />
                </div>
            </div>
        </main>
    )
}