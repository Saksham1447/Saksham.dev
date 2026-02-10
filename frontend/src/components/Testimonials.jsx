import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'CEO, TechStart Inc.',
            image: '👩‍💼',
            rating: 5,
            text: 'Exceptional work! The website exceeded our expectations. Professional, creative, and delivered on time. Highly recommended!',
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Product Manager, InnovateCo',
            image: '👨‍💻',
            rating: 5,
            text: 'Outstanding UI/UX design skills. Transformed our app into a beautiful, user-friendly experience. A pleasure to work with!',
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Founder, Creative Studio',
            image: '👩‍🎨',
            rating: 5,
            text: 'Incredible attention to detail and creativity. The branding work was phenomenal and perfectly captured our vision.',
        },
        {
            id: 4,
            name: 'David Kim',
            role: 'CTO, DataFlow Systems',
            image: '👨‍💼',
            rating: 5,
            text: 'Top-notch developer with excellent problem-solving skills. Built a robust, scalable platform that handles our growing needs.',
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            role: 'Marketing Director, BrandCo',
            image: '👩',
            rating: 5,
            text: 'Fantastic collaboration! Great communication, creative solutions, and delivered a stunning website that boosted our conversions.',
        },
        {
            id: 6,
            name: 'James Wilson',
            role: 'Entrepreneur',
            image: '👨',
            rating: 5,
            text: 'Professional, reliable, and talented. Brought my startup idea to life with an amazing web application. Couldn\'t be happier!',
        },
    ];

    return (
        <section id="testimonials" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                        Client <span className="gradient-text">Testimonials</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        What my clients say about working with me
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="card card-hover relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-4 right-4 text-primary-500/20 text-4xl">
                                <FaQuoteLeft />
                            </div>

                            {/* Client Info */}
                            <div className="flex items-center gap-4 mb-4">
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center text-3xl"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    {testimonial.image}
                                </motion.div>
                                <div>
                                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + i * 0.1 }}
                                    >
                                        <FaStar className="text-yellow-500" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-400 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Decorative Gradient */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    {[
                        { value: '50+', label: 'Happy Clients' },
                        { value: '100+', label: 'Projects Done' },
                        { value: '5★', label: 'Average Rating' },
                        { value: '100%', label: 'Satisfaction' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                        >
                            <h3 className="text-4xl font-bold gradient-text mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
