import { useEffect, useState } from "react";
import { api } from "../api";

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
        <div className="w-full h-screen bg-gray-700">
        {
            loading ? (
                <h3 className="flex justify-center items-center h-screen">Loading...</h3>
            ):
            (
                <div>
                    {
                        posts.map((post) => (
                            <div key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                            </div>
                        ))
                    }
                </div>
            )
        }  
        </div>
    )
}

export default Home;