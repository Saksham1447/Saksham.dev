import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Experience = () => {
    const experiences = [
        {
            type: 'education',
            title: 'Bachelor of Technology (B.Tech)',
            company: 'D.Y Patil College of Engineering, Kolhapur',
            period: '2022 - 2026 (Pursuing)',
            description: 'Pursuing B.Tech degree with focus on Computer Science and Engineering, specializing in web development and software engineering.',
            achievements: [
                'Learning full-stack web development',
                'Building practical projects',
                'Active participation in coding activities',
            ],
        },
    ];

    const education = [
        {
            type: 'education',
            title: 'Microsoft Certification',
            company: 'Microsoft',
            period: '2024',
            description: 'Professional certification in Microsoft technologies and development practices',
            achievements: [
                'Completed Microsoft certification program',
                'Enhanced technical skills',
                'Industry-recognized credential',
            ],
        },
        {
            type: 'education',
            title: 'TCS iON Certification',
            company: 'TCS iON',
            period: '2024',
            description: 'Career Edge certification program focusing on industry-relevant skills and professional development',
            achievements: [
                'Completed TCS iON Career Edge',
                'Developed professional skills',
                'Industry exposure and training',
            ],
        },
    ];

    const TimelineItem = ({ item, index, isLeft }) => (
        <motion.div
            className={`flex items-center gap-6 mb-12 ${isLeft ? 'md:flex-row-reverse' : ''}`}
            initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Content */}
            <div className={`flex-1 ${isLeft ? 'md:text-right' : ''}`}>
                <motion.div
                    className="card card-hover"
                    whileHover={{ scale: 1.02 }}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className={isLeft ? 'md:order-2' : ''}>
                            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                            <p className="text-primary-400 font-semibold">{item.company}</p>
                        </div>
                        <span className="text-sm px-3 py-1 glass rounded-full text-gray-400">
                            {item.period}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 text-sm">{item.description}</p>

                    {/* Achievements */}
                    <ul className={`space-y-2 ${isLeft ? 'md:items-end md:flex md:flex-col' : ''}`}>
                        {item.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-gray-500 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                                {achievement}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Timeline Icon */}
            <div className="relative flex-shrink-0">
                <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center text-xl glow-effect z-10 relative"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                >
                    {item.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                </motion.div>

                {/* Vertical Line */}
                {index < experiences.length - 1 && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-primary-600 to-transparent"></div>
                )}
            </div>

            {/* Spacer for desktop */}
            <div className="hidden md:block flex-1"></div>
        </motion.div>
    );

    return (
        <section id="experience" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                        Education & <span className="gradient-text">Certifications</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        My academic journey and professional certifications
                    </p>
                </motion.div>

                {/* Work Experience */}
                <div className="mb-16">
                    <motion.h3
                        className="text-2xl font-bold mb-8 flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <FaGraduationCap className="text-primary-500" />
                        Current Education
                    </motion.h3>

                    <div className="relative">
                        {experiences.map((item, index) => (
                            <TimelineItem
                                key={index}
                                item={item}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <motion.h3
                        className="text-2xl font-bold mb-8 flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <FaGraduationCap className="text-primary-500" />
                        Certifications
                    </motion.h3>

                    <div className="relative">
                        {education.map((item, index) => (
                            <TimelineItem
                                key={index}
                                item={item}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
