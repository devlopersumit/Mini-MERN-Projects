import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-1/2 h-auto min-h-[70px] mt-8 px-6 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 backdrop-blur-lg bg-opacity-90 rounded-3xl flex flex-col md:flex-row justify-between items-center m-auto text-white shadow-2xl border border-gray-600/50 hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
            
            {/* Logo and Mobile Menu Button */}
            <div className="w-full md:w-auto flex justify-between items-center">
                <h1 
                    onClick={() => navigate('/')}
                    className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                    PostBlog
                </h1>
                
                {/* Mobile menu button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-lg p-2 hover:bg-white/10 transition-all duration-200"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <svg className="h-6 w-6 transform rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-3 lg:gap-5 items-center">
                {token ? (
                    // Logged In Navigation
                    <>
                        <Link 
                            to="/write" 
                            className="relative inline-block text-lg lg:text-xl group"
                        >
                            <span className="relative z-10 hover:text-blue-400 transition-colors duration-200">Write</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            to="/profile" 
                            className="relative inline-block text-lg lg:text-xl group"
                        >
                            <span className="relative z-10 hover:text-blue-400 transition-colors duration-200">Profile</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            className="relative w-[80px] sm:w-[90px] h-[35px] sm:h-[40px] bg-gradient-to-r from-red-600 to-red-700 rounded-full hover:from-red-500 hover:to-red-600 text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105 active:scale-95 overflow-hidden group"
                        >
                            <span className="relative z-10">Logout</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>
                    </>
                ) : (
                    // Logged Out Navigation
                    <>
                        <Link 
                            to="/" 
                            className="relative inline-block text-lg lg:text-xl group"
                        >
                            <span className="relative z-10 hover:text-blue-400 transition-colors duration-200">Home</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <button 
                            onClick={() => navigate('/login')} 
                            className="relative w-[70px] sm:w-[80px] h-[35px] sm:h-[40px] bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-500 hover:to-blue-600 text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 overflow-hidden group"
                        >
                            <span className="relative z-10">Login</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>
                        <button 
                            onClick={() => navigate('/signup')} 
                            className="relative w-[70px] sm:w-[80px] h-[35px] sm:h-[40px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95 overflow-hidden group"
                        >
                            <span className="relative z-10">Signup</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>
                    </>
                )}
            </div>

            {/* Mobile Navigation Menu */}
            <div 
                className={`w-full md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="flex flex-col gap-3 items-center bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-600/30">
                    {token ? (
                        // Logged In Mobile Menu
                        <>
                            <Link 
                                to="/write" 
                                onClick={() => setIsMenuOpen(false)}
                                className="inline-block text-lg w-full text-center py-2 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-200 hover:text-blue-400"
                            >
                                Write
                            </Link>
                            <Link 
                                to="/profile" 
                                onClick={() => setIsMenuOpen(false)}
                                className="inline-block text-lg w-full text-center py-2 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-200 hover:text-blue-400"
                            >
                                Profile
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="w-full max-w-[200px] h-[40px] bg-gradient-to-r from-red-600 to-red-700 rounded-full hover:from-red-500 hover:to-red-600 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105 active:scale-95"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        // Logged Out Mobile Menu
                        <>
                            <Link 
                                to="/" 
                                onClick={() => setIsMenuOpen(false)}
                                className="inline-block text-lg w-full text-center py-2 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-200 hover:text-blue-400"
                            >
                                Home
                            </Link>
                            <button 
                                onClick={() => handleNavigation('/login')} 
                                className="w-full max-w-[200px] h-[40px] bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-500 hover:to-blue-600 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => handleNavigation('/signup')} 
                                className="w-full max-w-[200px] h-[40px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95"
                            >
                                Signup
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;