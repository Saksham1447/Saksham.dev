import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Web Design', 'UI/UX', 'Development', 'Branding'];

    const projects = [
        {
            id: 1,
            title: 'School Website',
            category: 'Web Design',
            image: '🏫',
            description: 'A comprehensive school website with information management and user-friendly interface',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            liveUrl: '#',
            githubUrl: 'https://github.com/Saksham1447',
        },
        {
            id: 2,
            title: 'Election Voting Slipper',
            category: 'Development',
            image: '🗳️',
            description: 'Digital voting system for elections with secure authentication and vote tracking',
            tech: ['Django', 'Python', 'MySQL', 'HTML/CSS'],
            liveUrl: '#',
            githubUrl: 'https://github.com/Saksham1447',
        },
        {
            id: 3,
            title: 'Portfolio Website',
            category: 'Web Design',
            image: '💼',
            description: 'Personal portfolio showcasing projects, skills, and professional experience',
            tech: ['React', 'Tailwind CSS', 'Framer Motion'],
            liveUrl: 'https://sakshamwayadande.in',
            githubUrl: 'https://github.com/Saksham1447',
        },
        {
            id: 4,
            title: 'REST API Project',
            category: 'Development',
            image: '🔌',
            description: 'Backend API development with Django REST Framework for data management',
            tech: ['Django', 'REST API', 'Python', 'MySQL'],
            liveUrl: '#',
            githubUrl: 'https://github.com/Saksham1447',
        },
    ];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id="portfolio" className="section-padding bg-gray-900/30">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                        Recent <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Showcasing my latest projects and creative solutions
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {filters.map((filter) => (
                        <motion.button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === filter
                                ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'
                                : 'glass glass-hover text-gray-300'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {filter}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    layout
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="card group cursor-pointer overflow-hidden"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                layout
                            >
                                {/* Project Image/Icon */}
                                <div className="relative w-full h-48 bg-gradient-to-br from-primary-900/30 to-purple-900/30 rounded-xl mb-4 flex items-center justify-center text-6xl overflow-hidden">
                                    {project.image}

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                                        <motion.a
                                            href={project.liveUrl}
                                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaExternalLinkAlt className="text-white" />
                                        </motion.a>
                                        <motion.a
                                            href={project.githubUrl}
                                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaGithub className="text-white" />
                                        </motion.a>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                                            {project.title}
                                        </h3>
                                        <span className="text-xs px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full">
                                            {project.category}
                                        </span>
                                    </div>

                                    <p className="text-gray-400 text-sm">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-2 py-1 glass rounded-md text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View More */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <a href="#" className="btn-secondary inline-block">
                        View All Projects
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
