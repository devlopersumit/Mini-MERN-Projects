import { Link } from "react-router-dom";

function PostCard({ post }) {
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
        <article className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1">
            {/* Content */}
            <div className="space-y-4">
                {/* Title */}
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {post.title || "Untitled Post"}
                </h2>

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
    );
}

export default PostCard;