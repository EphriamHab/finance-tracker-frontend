import React, { useState } from 'react';
import { useRegisterMutation } from '../app/api';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, ArrowRight, CheckCircle2, Wallet } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [register, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData).unwrap();
            navigate('/login');
        } catch (err) {
            console.error('Failed to register:', err);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FE] flex items-center justify-center">
            <div className="w-full  bg-white shadow-xl shadow-indigo-100/50 overflow-hidden flex flex-col md:flex-row min-h-175">
                <div className="hidden md:flex md:w-1/2 bg-indigo-600 p-12 flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500 rounded-full opacity-50"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-black text-2xl">
                                <Wallet size={24} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">FinanceTrack</span>
                        </div>
                        <h1 className="text-4xl font-bold leading-tight mb-6">
                            Start your <br />
                            <span className="text-indigo-200">Finance Tracking</span> <br />
                            with us today.
                        </h1>
                        <ul className="space-y-4 text-indigo-100">
                            <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-indigo-300" /> Track Income & Expenses </li>
                            <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-indigo-300" /> Real-time Financial Summary </li>
                            <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-indigo-300" /> Categorized Transactions </li>
                        </ul>
                    </div>

                    <div className="relative z-10 bg-indigo-500/30 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                        <p className="text-sm italic">"The professional dashboard makes it easy to visualize my total balance and spending categories."</p>
                        <p className="mt-4 font-bold text-sm">— Finance Tracker User</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-8 md:hidden">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl">$</div>
                        <span className="text-xl font-bold text-slate-800">FinTrack</span>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Profile</h2>
                        <p className="text-slate-400 font-medium">Join our community of smart savers </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-rose-50 text-rose-500 rounded-xl text-sm font-medium border border-rose-100">
                                Registration failed. This profile name might be taken.
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="Choose a username"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-slate-700 font-medium"
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Create a strong password"
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-slate-700 font-medium"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
                        >
                            {isLoading ? 'Creating Profile...' : 'Get Started'}
                            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-500 text-sm font-medium">
                        Already have an account? {' '}
                        <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;