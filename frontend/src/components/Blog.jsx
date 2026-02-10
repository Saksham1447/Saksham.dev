import { motion } from 'framer-motion';
import { FaCalendar, FaArrowRight } from 'react-icons/fa';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'The Future of Web Development in 2024',
            excerpt: 'Exploring emerging trends, technologies, and best practices shaping the future of web development.',
            category: 'Web Development',
            date: 'Jan 15, 2024',
            readTime: '5 min read',
            image: '🚀',
        },
        {
            id: 2,
            title: 'Mastering UI/UX Design Principles',
            excerpt: 'Essential design principles every designer should know to create exceptional user experiences.',
            category: 'UI/UX Design',
            date: 'Jan 10, 2024',
            readTime: '7 min read',
            image: '🎨',
        },
        {
            id: 3,
            title: 'Building Scalable React Applications',
            excerpt: 'Best practices and architectural patterns for building maintainable React applications at scale.',
            category: 'React',
            date: 'Jan 5, 2024',
            readTime: '10 min read',
            image: '⚛️',
        },
    ];

    return (
        <section id="blog" className="section-padding bg-gray-900/30">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                        Latest <span className="gradient-text">Blog Posts</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Insights, tutorials, and thoughts on web development and design
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="card group cursor-pointer overflow-hidden"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            {/* Featured Image */}
                            <div className="relative w-full h-48 bg-gradient-to-br from-primary-900/30 to-purple-900/30 rounded-xl mb-4 flex items-center justify-center text-6xl overflow-hidden">
                                {post.image}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-purple-600/0 group-hover:from-primary-600/20 group-hover:to-purple-600/20 transition-all duration-300"></div>
                            </div>

                            {/* Category & Date */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                    <FaCalendar />
                                    <span>{post.date}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                                {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                {post.excerpt}
                            </p>

                            {/* Read More */}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 text-xs">{post.readTime}</span>
                                <motion.a
                                    href="#"
                                    className="flex items-center gap-2 text-primary-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    Read More
                                    <FaArrowRight />
                                </motion.a>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <a href="#" className="btn-secondary inline-block">
                        View All Posts
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Blog;
