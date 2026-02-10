import { motion } from 'framer-motion';
import { FaPaintBrush, FaCode, FaMobile, FaPalette } from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            icon: FaCode,
            title: 'Frontend Development',
            description: 'Building responsive and interactive user interfaces using modern frameworks and best practices.',
            features: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Responsive Design'],
        },
        {
            icon: FaPaintBrush,
            title: 'Backend Development',
            description: 'Developing robust server-side applications and RESTful APIs with secure data management.',
            features: ['Django Framework', 'REST APIs', 'MySQL Database', 'Authentication'],
        },
        {
            icon: FaPalette,
            title: 'Web Development',
            description: 'Creating complete web solutions from concept to deployment with modern technologies.',
            features: ['Full-Stack Development', 'Database Integration', 'Version Control (Git)', 'Deployment'],
        },
        {
            icon: FaMobile,
            title: 'Website Maintenance',
            description: 'Providing ongoing support, updates, and optimization for existing web applications.',
            features: ['Bug Fixes', 'Performance Optimization', 'Content Updates', 'Security Updates'],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section id="services" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                        My <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Comprehensive solutions to bring your digital vision to life
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="card card-hover group"
                            variants={itemVariants}
                        >
                            {/* Icon */}
                            <motion.div
                                className="w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 glow-effect"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <service.icon />
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                {service.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="text-gray-500 text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-purple-600/0 group-hover:from-primary-600/5 group-hover:to-purple-600/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <a href="#contact" className="btn-primary inline-block">
                        Let's Work Together
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
