import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiChevronRight, FiShield, FiActivity, FiUsers } from 'react-icons/fi';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            if (typeof onLogin === "function") {
                const result = onLogin(email, password);
                
                if (result.success) {
                    // Redirect based on user role
                    switch (result.user.role) {
                        case 'admin':
                            navigate("/admin");
                            break;
                        case 'owner':
                        case 'farmer':
                            navigate("/dashboard");
                            break;
                        default:
                            navigate("/dashboard");
                    }
                } else {
                    setError("Invalid credentials. Please try again.");
                }
            } else {
                console.error("onLogin is not a function");
                setError("Something went wrong. Please try again later.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 p-4">
            {/* More compact login container */}
            <div className="w-full max-w-4xl flex overflow-hidden rounded-2xl shadow-xl bg-white">
                {/* Left side - hidden on mobile */}
                <div className="hidden md:block md:w-5/12 bg-gradient-to-br from-teal-500 to-emerald-600 relative overflow-hidden">
                    {/* Simple geometric overlays */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white"></div>
                        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
                    </div>
                    
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                            alt="Aquaponics system" 
                            className="w-full h-full object-cover opacity-30"
                        />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/90 to-emerald-600/90 z-10"></div>
                    
                    {/* Content */}
                    <div className="relative z-20 p-8 flex flex-col h-full">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mr-3 shadow-lg">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/4721/4721490.png" 
                                    alt="Aquaponics logo" 
                                    className="w-6 h-6"
                                />
                            </div>
                            <span className="text-white text-xl font-bold">AquaGrow</span>
                        </div>
                        
                        <div className="my-auto">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
                                    Welcome to Your Farm Intelligence Hub
                                </h2>
                                <p className="text-white/90 text-base leading-relaxed">
                                    Sign in to monitor your aquaponics ecosystem in real-time.
                                </p>
                            </div>
                            
                            {/* Key features - reduced */}
                            <div className="space-y-4 mt-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md shadow-md flex items-center justify-center">
                                        <FiActivity className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="text-white/90 text-sm">Real-time data monitoring</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md shadow-md flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                        </svg>
                                    </div>
                                    <p className="text-white/90 text-sm">Visual analytics dashboard</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md shadow-md flex items-center justify-center">
                                        <FiUsers className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="text-white/90 text-sm">Role-based access control</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Simple trust indicator */}
                        <div className="mt-auto flex items-center space-x-2 text-white/80 text-xs">
                            <FiShield className="w-4 h-4" />
                            <span>SSL secured connection</span>
                        </div>
                    </div>
                </div>
                
                {/* Login form side - more compact */}
                <div className="w-full md:w-7/12 bg-white p-6 md:p-8 flex items-center">
                    <div className="w-full max-w-sm mx-auto">
                        {/* Mobile logo */}
                        <div className="flex items-center justify-center mb-6 md:hidden">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mr-3">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/4721/4721490.png" 
                                    alt="Aquaponics logo" 
                                    className="w-6 h-6"
                                />
                            </div>
                            <span className="text-emerald-600 text-lg font-bold">AquaGrow</span>
                        </div>
                        
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
                            <p className="text-gray-500 text-sm">Sign in to continue to your dashboard</p>
                        </div>
                        
                        {error && (
                            <div className="mb-5 p-3 bg-red-50 border-l-3 border-red-500 text-red-700 text-sm rounded-md flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p>{error}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="appearance-none block w-full px-3 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="appearance-none block w-full px-3 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button 
                                        type="button"
                                        className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-3.5 w-3.5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700">
                                    Remember me for 30 days
                                </label>
                            </div>
                            
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex items-center justify-center w-full px-4 py-2.5 text-white text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition-all duration-200 ${
                                        loading ? "opacity-80 cursor-not-allowed" : ""
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <FiLogIn className="mr-2 h-4 w-4" />
                                            Sign in
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-white text-gray-500">or</span>
                            </div>
                        </div>
                        
                        <Link 
                            to="/"
                            className="flex items-center justify-center w-full px-4 py-2.5 text-gray-700 text-sm font-medium bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition-all duration-200"
                        >
                            Create new account <FiChevronRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                        
                        {/* Simple footer */}
                        <div className="mt-6 text-center text-xs text-gray-500">
                            <p>
                                By signing in, you agree to our{" "}
                                <button type="button" className="text-emerald-600 hover:underline">Terms</button>
                                {" "}and{" "}
                                <button type="button" className="text-emerald-600 hover:underline">Privacy</button>
                            </p>
                            <div className="flex justify-center space-x-3 mt-4">
                                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111348.png" alt="Security" className="h-5 opacity-60" />
                                <img src="https://cdn-icons-png.flaticon.com/512/9422/9422883.png" alt="Green" className="h-5 opacity-60" />
                            </div>
                            <p className="mt-3 text-gray-400">© {new Date().getFullYear()} AquaGrow</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
