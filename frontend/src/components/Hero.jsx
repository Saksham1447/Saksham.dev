import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

const Hero = () => {
    const stats = [
        { label: 'Education', value: 'B.Tech' },
        { label: 'Projects Built', value: '5+' },
        { label: 'Technologies', value: '10+' },
        { label: 'Certifications', value: '2' },
    ];

    return (
        <section id="home" className="min-h-screen flex items-center section-padding pt-32">
            <div className="container-custom w-full">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            className="text-primary-400 font-semibold mb-4 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            👋 Hello, I'm
                        </motion.p>

                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-4 font-display"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="gradient-text">Saksham Madhukar Wayadande</span>
                        </motion.h1>

                        <motion.h2
                            className="text-2xl md:text-3xl text-gray-300 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Aspiring Web Developer
                        </motion.h2>

                        <motion.p
                            className="text-gray-400 text-lg mb-8 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Passionate B.Tech student specializing in web development, eager to explore opportunities
                            in challenging environments. Focused on utilizing my skills and efficiency to deliver
                            value-driven solutions while continuously learning and growing in the field.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <a href="#contact" className="btn-primary flex items-center gap-2">
                                Hire Me
                                <HiArrowDown className="animate-bounce" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/saksham-wayadande-21a192316/"
                                className="btn-secondary flex items-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaDownload />
                                Resume / CV
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            {[
                                { icon: FaGithub, href: 'https://github.com/Saksham1447' },
                                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/saksham-wayadande-21a192316/' },
                                { icon: FaTwitter, href: 'https://twitter.com' },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 glass glass-hover rounded-full flex items-center justify-center text-xl"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Gradient Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                            {/* Profile Image Container */}
                            <motion.div
                                className="relative glass rounded-full p-2 glow-effect"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <div className="w-full aspect-square rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-1">
                                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                        {/* Profile Photo */}
                                        <img
                                            src="/profile.jpg"
                                            alt="Saksham Wayadande - Web Developer"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Fallback to emoji if image not found
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-primary-900/50 to-purple-900/50 flex items-center justify-center text-6xl">👨‍💻</div>';
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 glass rounded-2xl p-4"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="text-3xl">🎨</span>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 glass rounded-2xl p-4"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="text-3xl">💻</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="card card-hover text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
