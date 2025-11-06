import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { api } from "../api";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, setUser, token, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    bio: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 🟩 if user has a token, fetch their profile and posts
    if (token) {
      fetchProfileData();
    } else {
      // 🟥 if no token, redirect to login
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchProfileData = async () => {
    try {
      // Fetch user profile
      const profileRes = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(profileRes.data);
      setEditForm({
        username: profileRes.data.username || "",
        bio: profileRes.data.bio || "",
      });

      // Fetch user's posts
      const postsRes = await api.get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Filter posts by current user
      const userPosts = postsRes.data.filter(
        (post) => post.author._id === profileRes.data._id
      );
      setPosts(userPosts);
    } catch (err) {
      console.error("Profile fetch error:", err);
      logout();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm({
        username: user.username || "",
        bio: user.bio || "",
      });
    }
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      // Note: This would require a PUT /api/users/:id endpoint on backend
      // For now, we'll just update the local state
      setUser({
        ...user,
        username: editForm.username,
        bio: editForm.bio,
      });
      setIsEditing(false);
      alert("Profile updated! (Note: Backend endpoint needed for persistence)");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== postId));
      alert("Post deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  };

  // 🟦 show loading until user data comes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                      maxLength={100}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {user?.username}
                  </h1>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  {user?.bio && (
                    <p className="text-gray-700 mb-4 italic">"{user.bio}"</p>
                  )}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                    <div className="bg-indigo-50 px-4 py-2 rounded-lg">
                      <span className="text-2xl font-bold text-indigo-600">
                        {posts.length}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {posts.length === 1 ? "Post" : "Posts"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={logout}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
            <Link
              to="/write"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              + New Post
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start sharing your thoughts with the world!
              </p>
              <Link
                to="/write"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded-lg ml-4"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        to={`/posts/${post._id}`}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        to={`/write?edit=${post._id}`}
                        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;