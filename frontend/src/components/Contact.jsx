import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Call Django backend API
            const response = await fetch('http://localhost:8000/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Success
                setSubmitStatus('success');
                setStatusMessage("Message sent successfully. I'll contact you within 24 hours.");
                setFormData({ name: '', email: '', subject: '', message: '' });

                // Clear success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null);
                    setStatusMessage('');
                }, 5000);
            } else {
                // Error from backend
                setSubmitStatus('error');

                // Extract error message if available
                let errMsg = 'Failed to send message. Please try again or email me directly.';
                if (data.debug_error) {
                    errMsg = `Error: ${data.debug_error}`;
                } else if (data.errors) {
                    const firstError = Object.values(data.errors)[0];
                    if (Array.isArray(firstError)) errMsg = firstError[0];
                    else if (typeof firstError === 'string') errMsg = firstError;
                } else if (data.message) {
                    errMsg = data.message;
                }

                setStatusMessage(errMsg);
                console.error('Backend error:', data);

                // Clear error message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null);
                    setStatusMessage('');
                }, 5000);
            }
        } catch (error) {
            // Network or other error
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setStatusMessage('Network error. Please check if the backend server is running.');

            // Clear error message after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
                setStatusMessage('');
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: 'Email',
            value: 'sakshamwayadande01@gmail.com',
            link: 'mailto:sakshamwayadande01@gmail.com',
        },
        {
            icon: FaPhone,
            title: 'Phone',
            value: '+91 7887873374',
            link: 'tel:+917887873374',
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Location',
            value: 'Kolhapur, Maharashtra',
            link: '#',
        },
    ];

    const socialLinks = [
        { icon: FaGithub, href: 'https://github.com/Saksham1447', label: 'GitHub' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/saksham-wayadande-21a192316/', label: 'LinkedIn' },
        { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: FaDribbble, href: 'https://sakshamwayadande.in', label: 'Portfolio' },
    ];

    return (
        <section id="contact" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have a project in mind? Let's work together to create something amazing
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            I'm always open to discussing new projects, creative ideas, or
                            opportunities to be part of your vision. Feel free to reach out!
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-4 mb-8">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={index}
                                    href={info.link}
                                    className="flex items-center gap-4 card card-hover group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center text-xl glow-effect">
                                        <info.icon />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{info.title}</p>
                                        <p className="font-semibold group-hover:text-primary-400 transition-colors">
                                            {info.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 glass glass-hover rounded-full flex items-center justify-center text-xl"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label={social.label}
                                    >
                                        <social.icon />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="card space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <FaPaperPlane />
                                    </>
                                )}
                            </motion.button>


                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                                >
                                    ✓ {statusMessage}
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
                                >
                                    ✗ {statusMessage}
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
