import { useState, useEffect, useContext } from "react";
import { api } from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Write = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [postId, setPostId] = useState(null);
  
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if we're in edit mode
    const editId = searchParams.get("edit");
    if (editId) {
      setIsEditMode(true);
      setPostId(editId);
      fetchPostData(editId);
    }
  }, [searchParams]);

  const fetchPostData = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const post = response.data.getPost || response.data;
      setForm({
        title: post.title || "",
        content: post.content || "",
      });
      if (post.image) {
        setImagePreview(post.image);
      }
    } catch (err) {
      console.error("Error fetching post:", err);
      setError("Failed to load post data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size should be less than 10MB");
        return;
      }
      
      setImage(file);
      setError("");
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!form.content.trim()) {
      setError("Content is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      if (image) {
        formData.append("image", image);
      }

      if (isEditMode && postId) {
        // Update existing post
        await api.put(`/posts/${postId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Post updated successfully!");
      } else {
        // Create new post
        await api.post("/posts", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Post created successfully!");
      }
      
      navigate("/profile");
    } catch (err) {
      console.error("Error submitting post:", err);
      setError(
        err.response?.data?.message || 
        `Failed to ${isEditMode ? "update" : "create"} post. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isEditMode ? "Edit Post" : "Create New Post"}
            </h1>
            <p className="text-gray-600">
              {isEditMode 
                ? "Update your post and share your thoughts" 
                : "Share your thoughts with the world"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label 
                htmlFor="title" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={form.title}
                placeholder="Enter the title"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
                disabled={loading}
                maxLength={100}
              />
              <p className="mt-1 text-sm text-gray-500">
                {form.title.length}/100 characters
              </p>
            </div>

            {/* Content Textarea */}
            <div>
              <label 
                htmlFor="content" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={form.content}
                placeholder="Write your content here..."
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                disabled={loading}
              />
              <p className="mt-1 text-sm text-gray-500">
                {form.content.length} characters
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Featured Image (Optional)
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    disabled={loading}
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={loading}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-indigo-600 font-medium hover:text-indigo-700">
                      Click to upload image
                    </span>
                    <span className="text-gray-500 text-sm mt-1">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{isEditMode ? "Update Post" : "Create Post"}</>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Write;