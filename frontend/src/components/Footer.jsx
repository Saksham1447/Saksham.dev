import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        'Quick Links': [
            { name: 'Home', href: '#home' },
            { name: 'Services', href: '#services' },
            { name: 'Portfolio', href: '#portfolio' },
            { name: 'Contact', href: '#contact' },
        ],
        'Services': [
            { name: 'Web Development', href: '#services' },
            { name: 'UI/UX Design', href: '#services' },
            { name: 'Branding', href: '#services' },
            { name: 'App Design', href: '#services' },
        ],
        'Resources': [
            { name: 'Blog', href: '#blog' },
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'FAQ', href: '#' },
        ],
    };

    return (
        <footer className="bg-gray-900/50 border-t border-gray-800">
            <div className="container-custom section-padding">
                {/* Footer Content */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold gradient-text mb-4 font-display">
                            Portfolio
                        </h3>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Creating beautiful digital experiences through innovative web development and design.
                        </p>
                    </motion.div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([category, links], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index + 1) * 0.1 }}
                        >
                            <h4 className="text-lg font-semibold mb-4">{category}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                        © {currentYear} Portfolio. Made with <FaHeart className="text-red-500" /> by Saksham Wayadande
                    </p>

                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-primary-400 transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-primary-400 transition-colors">
                            Terms
                        </a>
                        <a href="#" className="hover:text-primary-400 transition-colors">
                            Cookies
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
