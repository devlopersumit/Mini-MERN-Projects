import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 🟩 if user has a token, fetch their profile
    if (token) {
      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data); // backend sends user object directly
        })
        .catch((err) => {
          console.error("Profile fetch error:", err);
          logout(); // if token invalid, log out user
          navigate("/login");
        });
    } else {
      // 🟥 if no token, redirect to login
      navigate("/login");
    }
  }, [token, navigate, logout, setUser]);

  // 🟦 show loading until user data comes
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>

        <div className="text-left space-y-4">
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
