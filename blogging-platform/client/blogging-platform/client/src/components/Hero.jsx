function Hero() {
    return (
        <section className="w-full flex justify-center mt-12 mb-8 px-4">
            <div className="text-center max-w-4xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Welcome to{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        PostBlog
                    </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                    Read posts from users around the world
                </p>
            </div>
        </section>
    );
}

export default Hero;