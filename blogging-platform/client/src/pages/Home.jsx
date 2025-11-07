import { useEffect, useState } from "react";
import { api } from "../api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PostList from "../components/PostList";

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

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 pt-8">
            <Navbar />
            <Hero />
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                        <h3 className="text-xl font-semibold text-gray-700">Loading posts...</h3>
                    </div>
                </div>
            ) : (
                <PostList posts={posts} />
            )}
        </div>
    )
}

export default Home;