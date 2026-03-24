import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
    {
        num: '01',
        category: 'RESEARCH · NLP',
        title: 'Indian Language Identification',
        description: 'Three-stream deep learning architecture for identifying 15 Indic languages from noisy, code-mixed speech with 93.47% accuracy.',
        tech: ['Python', 'NLP', 'Deep Learning', 'Django'],
        image: '/projects/project1.png',
        color: '#E8730C',        /* orange */
        link: 'https://github.com/Binusai/ILR_Indic-Language-Recognizer',
        highlight: true,
    },
    {
        num: '02',
        category: 'ML · HEALTHCARE',
        title: 'ECG Anomaly Detection',
        description: 'End-to-end ECG analysis pipeline using Vision Transformer and Streamlit to automate cardiac anomaly detection with 92% accuracy.',
        tech: ['Python', 'ML', 'Streamlit', 'ViT'],
        image: '/projects/project2.png',
        color: '#1A8D5F',        /* green */
        link: 'https://github.com/Binusai/ECG-Anomaly-Detection-Machine-Learning-',
        highlight: false,
    },
    {
        num: '03',
        category: 'FULL-STACK · AI',
        title: 'Mental Health Platform',
        description: 'Django-based web app for anonymous confessions and journals with an AI chatbot detecting user mood with ~85% accuracy.',
        tech: ['Django', 'AI', 'Python', 'APIs'],
        image: '/projects/project3.png',
        color: '#7C3AED',        /* purple */
        link: 'https://github.com/Binusai/EmotionSpace---Anonymous-Confession-and-Journal-Writing',
        highlight: false,
    },
];

const ProjectCard = ({ project, index, isInView }) => {
    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group block"
            style={{ textDecoration: 'none' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.01em' }}>{project.num}</span>
                    <span style={{ width: '24px', height: '1px', background: '#d1d1d6' }} />
                    <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#86868b', fontWeight: 500 }}>{project.category}</span>
                </div>
                {project.highlight && (
                    <span style={{
                        fontSize: '10px', letterSpacing: '0.08em', padding: '4px 12px',
                        borderRadius: '20px', background: '#f0f0f0', color: '#1d1d1f', fontWeight: 600,
                    }}>★ IEEE</span>
                )}
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, color: '#1d1d1f',
                letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '20px',
            }}>{project.title}</h3>

            {/* Colored container with description + image */}
            <div style={{
                background: project.color,
                borderRadius: '20px',
                overflow: 'hidden',
                padding: '32px 32px 0 32px',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s',
            }}
                className="group-hover:scale-[1.02] group-hover:shadow-2xl"
            >
                <p style={{
                    fontSize: '15px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.7,
                    fontWeight: 400, maxWidth: '400px', marginBottom: '24px',
                }}>{project.description}</p>

                {/* Screenshot image — browser-style window */}
                <div style={{
                    position: 'relative',
                    borderRadius: '12px 12px 0 0',
                    overflow: 'hidden',
                    background: '#1d1d1f',
                    marginTop: 'auto',
                    boxShadow: '0 -4px 30px rgba(0,0,0,0.2)',
                }}>
                    {/* Browser dots */}
                    <div style={{
                        display: 'flex', gap: '6px', padding: '10px 14px',
                        background: 'rgba(0,0,0,0.3)',
                    }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
                    </div>
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{
                            width: '100%', height: 'auto', display: 'block',
                            objectFit: 'cover', maxHeight: '220px',
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.insertAdjacentHTML('beforeend',
                                `<div style="height:180px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:13px;letter-spacing:0.1em">SCREENSHOT</div>`
                            );
                        }}
                    />
                </div>
            </div>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                {project.tech.map((t) => (
                    <span key={t} style={{
                        fontSize: '11px', letterSpacing: '0.04em', padding: '5px 14px',
                        borderRadius: '20px', border: '1px solid #e5e5e7', color: '#6e6e73',
                        fontWeight: 500, background: '#fafafa',
                    }}>{t}</span>
                ))}
            </div>
        </motion.a>
    );
};

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-20px' });

    return (
        <section id="projects" ref={ref} style={{ background: '#ffffff', paddingTop: '80px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700,
                        letterSpacing: '-0.03em', color: '#1d1d1f',
                    }}>Featured Project</h2>
                    <p style={{
                        fontSize: '17px', color: '#86868b', marginTop: '16px',
                        maxWidth: '520px', margin: '16px auto 0', lineHeight: 1.6,
                    }}>
                        Research and engineering projects that push the boundaries of AI and full-stack development.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
                    gap: '48px',
                }}>
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} isInView={isInView} />
                    ))}
                </div>

                {/* GitHub link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ textAlign: 'center', marginTop: '64px' }}
                >
                    <a
                        href="https://github.com/Binusai"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: '14px', color: '#6e6e73', textDecoration: 'none',
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            transition: 'color 0.3s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#1d1d1f'}
                        onMouseLeave={e => e.currentTarget.style.color = '#6e6e73'}
                    >
                        Explore all projects on GitHub <span style={{ fontSize: '12px' }}>↗</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
