import PostCard from "./PostCard";

function PostList({ posts }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center space-y-4">
                    <div className="text-6xl">📝</div>
                    <h3 className="text-2xl font-bold text-gray-700">No posts yet</h3>
                    <p className="text-gray-500">Be the first to create a post!</p>
                </div>
            </div>
        );
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Section Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Posts</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    );
}

export default PostList;