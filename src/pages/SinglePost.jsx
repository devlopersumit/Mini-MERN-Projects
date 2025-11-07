import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { AuthContext } from "../context/authContext";

const SinglePost = () => {
    const { id } = useParams();
    const[loading, setLoading] = useState(true);
    const[post, setPost] = useState({
        title:"",
        content:"",
        author:"",
        date:null
    });
    const navigate = useNavigate();
    const { token } = useContext(AuthContext)

    useEffect(() => {
        const fetchSinglePost = async () => {
            try{
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
            }catch(err) {
                console.log("Error fetching post:", err.message);
            }finally {
                setLoading(false);
            }
        }
        
        fetchSinglePost();
    }, [id])

    const handleDeletePost = async () => {
       try{
          await api.delete(`/posts/${id}`, {
            headers:{Authorization:`Bearer ${token}`}
          });
          setPost(null);
          navigate('/');
       }catch(err) {
        console.log("error occured in deleting post: ", err.message);
       }
    }
    
    return (
        <div className="w-full min-h-screen bg-gray-700 p-8">
            {loading ? (
                <h3 className="flex justify-center items-center h-screen text-white">Loading...</h3>
            ) : (
                <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-600 mb-4">By {post.author}</p>
                    {post.date && <p className="text-gray-500 text-sm mb-6">{new Date(post.date).toLocaleDateString()}</p>}
                    <div className="text-gray-800">{post.content}</div>

                    <button onClick={handleDeletePost} className="mt-5 w-16 h-8 rounded-lg bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-800">Delete</button>
                </div>
            )}
        </div>
    )
}

export default SinglePost;