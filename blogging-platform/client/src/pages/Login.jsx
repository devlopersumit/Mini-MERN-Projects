import { useState, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", form);
    setUser(res.data.user);
    setToken(res.data.token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                id="email"
                name="email" 
                type="email"
                value={form.email}
                onChange={(e)=>setForm({...form, email:e.target.value})} 
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input 
                id="password"
                type="password" 
                name="password" 
                value={form.password}
                onChange={(e)=>setForm({...form, password:e.target.value})} 
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Create New Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;