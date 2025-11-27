"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 
import { useRouter } from "next/navigation";


type FormMode = 'emailInput' | 'login' | 'register';

const INPUT_CLASSES = "w-full h-11 px-4 shadow-[0_1px_3px_rgba(0,0,0,0.55)] rounded-xl outline outline-1 outline-[#3F3F47] -outline-offset-1 bg-transparent text-[#D4D4D8] placeholder:text-[#52525C] text-sm font-medium leading-[18.2px] focus:outline-[#79D4F4] focus:outline-2";
const BLUE_BUTTON_CLASSES = "w-full h-11 px-4 bg-[#00BCFF] shadow-[0_1px_3px_rgba(0,0,0,0.55)] rounded-xl flex items-center justify-center gap-3 hover:bg-[#00a8e6] transition-colors";
const TEXT_LINK_CLASSES = "text-[#79D4F4] text-sm font-semibold leading-5 hover:text-[#54b8e8] transition-colors cursor-pointer";

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.8 10.2C19.8 9.5 19.7 8.9 19.6 8.3H10.1V11.8H15.6C15.3 13.5 14.3 14.7 12.9 15.6L12.9 15.7L15.9 18.0L16.0 18.0C17.9 16.2 19.8 13.7 19.8 10.2Z" fill="#4285F4"/>
        <path d="M10.1 20C12.7 20 14.9 19.1 16.5 17.6L12.9 14.7C12.0 15.3 11.1 15.6 10.1 15.6C8.2 15.6 6.6 14.5 5.9 13.2L5.9 13.1L2.8 15.5L2.8 15.5C4.5 18.8 7.3 20 10.1 20Z" fill="#34A853"/>
        <path d="M5.9 13.2C5.7 12.6 5.6 11.9 5.6 11.2C5.6 10.5 5.7 9.8 5.9 9.2L5.9 9.1L2.8 6.7L2.8 6.7C2.1 8.2 1.9 9.7 1.9 11.2C1.9 12.7 2.1 14.2 2.8 15.7L5.9 13.2V13.2Z" fill="#FBBC05"/>
        <path d="M10.1 4.4C11.1 4.4 12.0 4.8 12.8 5.4L16.5 1.9C14.9 0.7 12.7 0 10.1 0C7.3 0 4.5 1.1 2.8 4.4L5.9 6.8C6.6 5.5 8.2 4.4 10.1 4.4Z" fill="#EA4335"/>
    </svg>
);


export default function FilmForgeLogin() {
    const [mode, setMode] = useState<FormMode>('emailInput');
    const [email, setEmail] = useState('johndoe@gmail.com');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
const router = useRouter();


    const renderHeader = () => {
        if (mode === 'login') {
            return (
                <h1 className="text-center text-[28px] font-bold leading-[36.4px] text-[rgba(186.88,213.89,234.16,0.83)]">
                    Login to your account
                </h1>
            );
        }
        
        return (
            <h1 className="text-center text-[28px] font-bold leading-[36.4px]">
                <span className="text-[rgba(186.88,213.89,234.16,0.83)]">Welcome to </span>
                <span className="text-[#79D4F4]">FilmForge</span>
            </h1>
        );
    };

    const renderForm = () => {
        const isRegister = mode === 'register';
        const buttonText = isRegister ? "Create Account" : "Login";
        const actionText = isRegister ? "Already have an account?" : "Don't have an account?";
        const actionLinkText = isRegister ? "Login" : "Register";
        const nextMode = isRegister ? 'login' : 'register';

        return (
            <div className="w-full flex flex-col items-end gap-5">
                <div className="w-full flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${INPUT_CLASSES} ${mode !== 'emailInput' ? 'text-[#D4D4D8]/80' : ''}`}
                        disabled={mode !== 'emailInput'}
                    />

                    {mode !== 'emailInput' && (
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`${INPUT_CLASSES} pr-12`} 
                            />
                            <button 
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-[#79D4F4] opacity-70 hover:opacity-100"
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    )}

                    {mode === 'register' && (
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className={`${INPUT_CLASSES} pr-12`}
                            />
                            <button 
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-[#79D4F4] opacity-70 hover:opacity-100"
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    )}
                </div>

                <button
      className={BLUE_BUTTON_CLASSES}
onClick={() => router.push("/dash")}
    >
      <span className="text-black text-base font-semibold leading-5">
        {buttonText}
      </span>
    </button>
                
                <span className="text-right text-sm text-[#9F9FA9]">
                    {actionText}{' '}
                    <button 
                        className={TEXT_LINK_CLASSES}
                        onClick={() => setMode(nextMode)}
                    >
                        {actionLinkText}
                    </button>
                </span>
            </div>
        );
    };

    const renderEmailInput = () => (
        <div className="w-full flex flex-col items-end gap-5">
            <button className="w-full h-11 px-4 bg-[#212124] shadow-[0_1px_3px_rgba(0,0,0,0.55)] rounded-xl outline outline-1 outline-[#3F3F47] -outline-offset-1 flex items-center justify-center gap-3 hover:bg-[#2a2a2d] transition-colors">
                <div className="w-5 h-5 relative flex items-center justify-center">
                    <GoogleIcon />
                </div>
                <span className="text-[#D4D4D8] text-base font-semibold leading-5">
                    Continue with Google
                </span>
            </button>

            <div className="w-full flex items-center gap-2">
                <div className="flex-1 h-px outline outline-1 outline-[#27272A] -outline-offset-[0.5px]" />
                <span className="text-[#9F9FA9] text-sm font-semibold leading-5">Or</span>
                <div className="flex-1 h-px outline outline-1 outline-[#27272A] -outline-offset-[0.5px]" />
            </div>

            <div className="w-full flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={INPUT_CLASSES}
                />
                <button 
                    className={BLUE_BUTTON_CLASSES}
                    onClick={() => setMode('login')} 
                >
                    <span className="text-black text-base font-semibold leading-5">
                        Continue with Email
                    </span>
                </button>
            </div>
        </div>
    );


    return (
        <div className="w-full h-screen bg-gradient-to-b from-[#2F3236] via-[#022435] via-13% to-[#18181B] to-39% flex items-center justify-center overflow-hidden">
            <div className="w-[290px] flex flex-col items-center gap-8">
                
                <div className="w-[36.25px] flex flex-col gap-[2.94px] shadow-[inset_0_1.7px_0_rgba(255,255,255,0.25)]">
                    <div className="w-full h-[13.03px] rounded-[7.34px] border-[4.41px] border-[#79D4F4]" />
                    <div className="w-full h-[13.03px] bg-[#79D4F4] rounded-[7.34px]" />
                </div>

                <div className="w-full flex flex-col items-center gap-14">
                    {renderHeader()}

                    {mode === 'emailInput' ? renderEmailInput() : renderForm()}

                </div>
            </div>





        </div>
    );


}