import { motion } from 'framer-motion';
import { FaReact, FaNode, FaPython, FaFigma, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiPostgresql, SiTypescript, SiNextdotjs, SiDjango } from 'react-icons/si';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Frontend',
            skills: [
                { name: 'HTML5', level: 85, icon: FaReact, color: 'from-orange-500 to-red-500' },
                { name: 'CSS3', level: 80, icon: SiTailwindcss, color: 'from-blue-400 to-cyan-400' },
                { name: 'JavaScript', level: 75, icon: SiTypescript, color: 'from-yellow-400 to-yellow-600' },
                { name: 'React.js', level: 70, icon: FaReact, color: 'from-cyan-500 to-blue-500' },
            ],
        },
        {
            title: 'Backend',
            skills: [
                { name: 'Django', level: 75, icon: SiDjango, color: 'from-green-700 to-green-800' },
                { name: 'Python', level: 70, icon: FaPython, color: 'from-blue-500 to-yellow-500' },
                { name: 'REST APIs', level: 65, icon: FaNode, color: 'from-green-600 to-green-700' },
                { name: 'MySQL', level: 70, icon: SiPostgresql, color: 'from-blue-600 to-blue-700' },
            ],
        },
        {
            title: 'Tools & Others',
            skills: [
                { name: 'Git', level: 75, icon: FaGitAlt, color: 'from-orange-600 to-red-600' },
                { name: 'GitHub', level: 75, icon: FaGitAlt, color: 'from-gray-700 to-gray-900' },
                { name: 'VS Code', level: 85, icon: FaDocker, color: 'from-blue-500 to-blue-600' },
                { name: 'Postman', level: 65, icon: SiMongodb, color: 'from-orange-500 to-orange-600' },
            ],
        },
    ];

    return (
        <section id="skills" className="section-padding bg-gray-900/30">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Technologies and tools I work with to build amazing products
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            className="card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.2 }}
                        >
                            <h3 className="text-xl font-bold mb-6 gradient-text">
                                {category.title}
                            </h3>

                            <div className="space-y-6">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                                    >
                                        {/* Skill Header */}
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <motion.div
                                                    className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center text-white`}
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                >
                                                    <skill.icon className="text-lg" />
                                                </motion.div>
                                                <span className="font-semibold text-gray-200">{skill.name}</span>
                                            </div>
                                            <span className="text-sm text-gray-400">{skill.level}%</span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Skills Cloud */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-xl font-bold mb-6">Also Familiar With</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            'Bootstrap', 'Tailwind CSS', 'jQuery', 'AJAX', 'JSON',
                            'SQLite', 'API Development', 'Responsive Design', 'Vite', 'npm',
                            'Debugging', 'Problem Solving', 'Team Collaboration', 'Agile'
                        ].map((tech, index) => (
                            <motion.span
                                key={index}
                                className="px-4 py-2 glass glass-hover rounded-full text-sm text-gray-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 + index * 0.05 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
