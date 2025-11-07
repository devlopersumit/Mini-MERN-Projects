import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

const Home = () => {
    const[loading, setLoading] = useState(true);
    const[posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchPosts();
    },[])

    const formatDate = (date) => {
        if (!date) return "No date";
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const truncateContent = (content, maxLength = 150) => {
        if (!content) return "No content available";
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
            {/* Header/Navbar */}
            <nav className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-2xl border-b border-gray-600/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            PostBlog
                        </h1>
                        <div className="flex gap-4">
                            <Link 
                                to="/login" 
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 font-semibold"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 font-semibold"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="w-full py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Welcome to{' '}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            PostBlog
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Read posts from users around the world
                    </p>
                </div>
            </section>

            {/* Posts Section */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center space-y-4">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                            <h3 className="text-xl font-semibold text-gray-300">Loading posts...</h3>
                        </div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-center space-y-4">
                            <div className="text-6xl">📝</div>
                            <h3 className="text-2xl font-bold text-gray-300">No posts yet</h3>
                            <p className="text-gray-400">Be the first to create a post!</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Section Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Latest Posts</h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
                        </div>

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <article 
                                    key={post._id}
                                    className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
                                >
                                    <div className="space-y-4">
                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                            {post.title || "Untitled Post"}
                                        </h3>

                                        {/* Meta Information */}
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span>{post.author || "Anonymous"}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{formatDate(post.date || post.createdAt)}</span>
                                            </div>
                                        </div>

                                        {/* Content Preview */}
                                        <p className="text-gray-300 leading-relaxed line-clamp-3">
                                            {truncateContent(post.content)}
                                        </p>

                                        {/* Read More Link */}
                                        <Link
                                            to={`/posts/${post._id}`}
                                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold group/link transition-all duration-200"
                                        >
                                            <span>Read More</span>
                                            <svg 
                                                className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-200" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>

                                    {/* Decorative gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-300 pointer-events-none" />
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default Home;