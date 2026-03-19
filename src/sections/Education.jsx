import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const education = [
    {
        degree: 'B.Tech — Computer Science & Engineering',
        institution: 'Lovely Professional University',
        location: 'Phagwara, Punjab',
        period: '2023 – Present',
        score: 'CGPA: 8.6',
    },
    {
        degree: 'Intermediate — PCM',
        institution: 'Sri Chaitanya Junior College',
        location: 'Chittoor, A.P',
        period: '2021 – 2023',
        score: 'Percentage: 94',
    },
    {
        degree: 'Secondary School',
        institution: 'Camford English High School',
        location: 'Chittoor, A.P',
        period: '2020 – 2021',
        score: 'CGPA: 9.5',
    },
];

const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="education" ref={ref} style={{ background: '#ffffff', padding: '100px 0' }}>
            <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 24px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700,
                        letterSpacing: '-0.03em', color: '#1d1d1f',
                    }}>Education</h2>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {education.map((edu, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                padding: '32px', borderRadius: '20px',
                                border: '1px solid #e5e5e7', background: '#fafafa',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.borderColor = '#d1d1d6';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = '#e5e5e7';
                            }}
                        >
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.02em' }}>{edu.degree}</h3>
                                    <p style={{ fontSize: '14px', color: '#86868b', marginTop: '4px' }}>{edu.institution}</p>
                                    <p style={{ fontSize: '12px', color: '#a1a1a6', marginTop: '4px' }}>{edu.location} · {edu.period}</p>
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                    <span style={{
                                        fontSize: '12px', padding: '6px 16px', borderRadius: '20px',
                                        background: '#f0f0f0', color: '#6e6e73',
                                        border: '1px solid #e5e5e7',
                                    }}>{edu.score}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
