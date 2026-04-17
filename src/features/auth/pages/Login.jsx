import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const submitForm = async (event) => {
        event.preventDefault()
        const payload = { email, password }
        await handleLogin(payload)
        navigate("/")
    }

    if (!loading && user) {
        return <Navigate to="/" replace />
    }

    return (
        <>
            {/* Only keyframes & font import remain — Tailwind can't define these inline */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    50%      { opacity: 1;   transform: scale(1.08); }
                }
                .animate-slideUp   { animation: slideUp   0.55s cubic-bezier(0.22,1,0.36,1) both; }
                .animate-pulseGlow  { animation: pulseGlow 5s ease-in-out infinite; }
                .animate-pulseGlow2 { animation: pulseGlow 7s ease-in-out infinite reverse; }
            `}</style>

            {/* login-root */}
            <div className="min-h-screen bg-[#0a0a0f] flex font-[DM_Sans,sans-serif] overflow-hidden relative">

                {/* login-root::before — grid background via div */}
                <div
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(49,184,198,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(49,184,198,0.04) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* ── Left form panel ── */}
                <div className="relative z-10 flex-none w-full flex items-center justify-center px-6 py-10 md:w-[480px] md:px-14 md:py-12">

                    {/* login-card */}
                    <div className="w-full max-w-[400px] animate-slideUp">

                        {/* login-card-header */}
                        <div className="mb-9">
                            {/* login-step-badge */}
                            <div className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.14em] uppercase text-[#31b8c6] mb-4">
                                {/* login-step-line */}
                                <span className="inline-block w-6 h-0.5 bg-[#31b8c6] rounded-sm" />
                                Welcome Back
                            </div>
                            {/* login-title */}
                            <h1 className="font-[Syne,sans-serif] text-[2rem] font-extrabold tracking-[-0.035em] text-[#f0fafb] mb-2 leading-[1.15]">
                                Sign in to<br />your account
                            </h1>
                            {/* login-subtitle */}
                            <p className="text-[0.88rem] text-[rgba(240,250,251,0.45)] leading-relaxed">
                                Enter your credentials to continue.
                            </p>
                        </div>

                        {/* login-form */}
                        <form onSubmit={submitForm} className="flex flex-col gap-[1.1rem]">

                            {/* Email — login-field */}
                            <div className="flex flex-col gap-[7px]">
                                {/* login-label */}
                                <label htmlFor="email" className="text-[0.78rem] font-medium tracking-[0.04em] uppercase text-[rgba(240,250,251,0.55)]">
                                    Email
                                </label>
                                {/* login-input-wrap */}
                                <div className="relative flex items-center">
                                    {/* login-input-icon */}
                                    <span className="absolute left-[14px] text-[rgba(49,184,198,0.5)] pointer-events-none flex">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="16" x="2" y="4" rx="2"/>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                        </svg>
                                    </span>
                                    {/* login-input */}
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-[10px] py-3 pl-[42px] pr-[14px] text-[#f0fafb] font-[DM_Sans,sans-serif] text-[0.93rem] outline-none transition-all duration-200 placeholder:text-[rgba(240,250,251,0.22)] focus:border-[#31b8c6] focus:bg-[rgba(49,184,198,0.06)] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.15)]"
                                    />
                                </div>
                            </div>

                            {/* Password — login-field */}
                            <div className="flex flex-col gap-[7px]">
                                {/* login-label */}
                                <label htmlFor="password" className="text-[0.78rem] font-medium tracking-[0.04em] uppercase text-[rgba(240,250,251,0.55)]">
                                    Password
                                </label>
                                {/* login-input-wrap */}
                                <div className="relative flex items-center">
                                    {/* login-input-icon */}
                                    <span className="absolute left-[14px] text-[rgba(49,184,198,0.5)] pointer-events-none flex">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                        </svg>
                                    </span>
                                    {/* login-input */}
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-[10px] py-3 pl-[42px] pr-[14px] text-[#f0fafb] font-[DM_Sans,sans-serif] text-[0.93rem] outline-none transition-all duration-200 placeholder:text-[rgba(240,250,251,0.22)] focus:border-[#31b8c6] focus:bg-[rgba(49,184,198,0.06)] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.15)]"
                                    />
                                </div>
                            </div>

                            {/* login-divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(49,184,198,0.2)] to-transparent my-1" />

                            {/* login-btn  — group used for arrow hover */}
                            <button
                                type="submit"
                                className="group relative w-full border-none rounded-[10px] py-[13px] px-6 font-[Syne,sans-serif] text-[0.95rem] font-bold tracking-[0.02em] text-[#0a0a0f] bg-[#31b8c6] cursor-pointer overflow-hidden transition-all duration-200 mt-[0.4rem] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(49,184,198,0.35)] active:translate-y-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(255,255,255,0.18)] before:to-transparent before:pointer-events-none"
                            >
                                Sign In{' '}
                                {/* login-btn-arrow */}
                                <span className="inline-block ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </button>
                        </form>

                        {/* login-footer */}
                        <p className="mt-7 text-center text-[0.84rem] text-[rgba(240,250,251,0.4)]">
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/register"
                                className="text-[#31b8c6] font-semibold no-underline transition-colors duration-150 hover:text-[#5dd2dd]"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>

                {/* ── Right decorative panel ── */}
                {/* login-right */}
                <div className="hidden md:flex relative z-10 flex-1 bg-gradient-to-br from-[#0d1f22] to-[#091418] border-l border-[rgba(49,184,198,0.12)] overflow-hidden p-12 flex-col justify-between">

                    {/* login-right-glow */}
                    <div
                        className="animate-pulseGlow absolute -top-[120px] -right-[80px] w-[480px] h-[480px] pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(49,184,198,0.18) 0%, transparent 70%)' }}
                    />
                    {/* login-right-glow2 */}
                    <div
                        className="animate-pulseGlow2 absolute -bottom-[100px] -left-[60px] w-[360px] h-[360px] pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(49,184,198,0.10) 0%, transparent 70%)' }}
                    />

                    {/* login-brand */}
                    <div className="flex items-center gap-2.5 relative z-20">
                        {/* login-brand-icon */}
                        <div className="w-9 h-9 rounded-lg bg-[#31b8c6] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" stroke="#0a0a0f" strokeWidth="2" strokeLinejoin="round"/>
                                <circle cx="10" cy="10" r="2.5" fill="#0a0a0f"/>
                            </svg>
                        </div>
                        {/* login-brand-name */}
                        <span className="font-[Syne,sans-serif] font-extrabold text-[1.15rem] text-[#f0fafb] tracking-[-0.02em]">
                            NexChat
                        </span>
                    </div>

                    {/* login-right-center */}
                    <div className="relative z-20">
                        {/* login-right-tag */}
                        <span className="inline-block text-[0.7rem] font-medium tracking-[0.16em] uppercase text-[#31b8c6] bg-[rgba(49,184,198,0.1)] border border-[rgba(49,184,198,0.25)] rounded-full px-[14px] py-1 mb-6">
                            Trusted Platform
                        </span>
                        {/* login-right-headline */}
                        <h2 className="font-[Syne,sans-serif] text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#f0fafb] mb-5">
                            Good to see<br />you <span className="text-[#31b8c6]">again.</span>
                        </h2>
                        {/* login-right-sub */}
                        <p className="text-[0.95rem] text-[rgba(240,250,251,0.5)] leading-relaxed max-w-[340px]">
                            Pick up right where you left off. Your work, your progress — all waiting for you.
                        </p>
                    </div>

                    {/* login-right-stats */}
                    <div className="flex flex-col gap-3 relative z-20">
                        {/* login-stat */}
                        <div className="flex items-center gap-3 bg-[rgba(49,184,198,0.06)] border border-[rgba(49,184,198,0.14)] rounded-xl py-3 px-4">
                            <div className="w-2 h-2 rounded-full bg-[#31b8c6] shrink-0 shadow-[0_0_8px_rgba(49,184,198,0.6)]" />
                            <span className="text-[0.82rem] text-[rgba(240,250,251,0.65)] tracking-[0.01em]">Your data is always safe &amp; encrypted</span>
                        </div>
                        <div className="flex items-center gap-3 bg-[rgba(49,184,198,0.06)] border border-[rgba(49,184,198,0.14)] rounded-xl py-3 px-4">
                            <div className="w-2 h-2 rounded-full bg-[#31b8c6] shrink-0 shadow-[0_0_8px_rgba(49,184,198,0.6)]" />
                            <span className="text-[0.82rem] text-[rgba(240,250,251,0.65)] tracking-[0.01em]">Sessions secured with industry standards</span>
                        </div>
                        <div className="flex items-center gap-3 bg-[rgba(49,184,198,0.06)] border border-[rgba(49,184,198,0.14)] rounded-xl py-3 px-4">
                            <div className="w-2 h-2 rounded-full bg-[#31b8c6] shrink-0 shadow-[0_0_8px_rgba(49,184,198,0.6)]" />
                            <span className="text-[0.82rem] text-[rgba(240,250,251,0.65)] tracking-[0.01em]">24/7 uptime so you're never blocked</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
