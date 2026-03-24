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

const educationCSS = `
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

.edu-card {
    position: relative;
    padding: 36px 36px 36px 48px;
    border-radius: 16px;
    border: 1px solid #e8e8ea;
    background: #fdfdfd;
    transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
}
.edu-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #ffffff 0%, #e6ffe9 10%, #ccffcf 20%, #99ffaa 35%, #66ff87 50%, #33ff6d 65%, #1aff5f 80%, #00ff5e 100%);  /* ← changed */
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 0 2px 2px 0;
}
.edu-card:hover {
    transform: translateY(-4px);
    border-color: #d9d9dc;
    background: #ffffff;
    box-shadow: 0 12px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04);
}
.edu-card:hover::before {
    transform: scaleY(1);
}
.edu-score {
    font-size: 12px;
    padding: 6px 16px;
    border-radius: 20px;
    background: #f5f5f7;
    color: #6e6e73;
    border: 1px solid #e5e5e7;
    letter-spacing: 0.04em;
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;
}
.edu-card:hover .edu-score {
    background: #f0fff4;         /* ← changed */
    border-color: #99ffaa;       /* ← changed */
    color: #00a040;              /* ← changed */
}
.timeline-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #e5e5e7;
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 1px #d1d1d6;
    transition: all 0.35s ease;
    flex-shrink: 0;
    margin-top: 6px;
}
.edu-item:hover .timeline-dot {
    background: #00ff5e;                                              /* ← changed */
    box-shadow: 0 0 0 1px #00ff5e, 0 0 12px rgba(0,255,94,0.3);     /* ← changed */
}
`;

if (typeof document !== 'undefined' && !document.getElementById('edu-style')) {
    const s = document.createElement('style');
    s.id = 'edu-style';
    s.textContent = educationCSS;
    document.head.appendChild(s);
}

const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="education" ref={ref} style={{ background: '#ffffff', padding: '100px 0' }}>
            <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 24px' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '72px' }}
                >
                    <p style={{
                        fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: '#a1a1a6', fontWeight: 500, marginBottom: '14px',
                    }}>Academic Background</p>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600,
                        letterSpacing: '-0.03em', color: '#1d1d1f',
                        fontFamily: "'EB Garamond', Georgia, serif",
                        fontStyle: 'italic',
                    }}>Education</h2>
                    {/* Decorative rule */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
                        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#d4af37' }} />
                        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
                    </div>
                </motion.div>

                {/* Timeline */}
                <div style={{ position: 'relative' }}>

                    {/* Vertical spine line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'absolute',
                            left: '18px', top: '16px', bottom: '16px',
                            width: '1px',
                            background: 'linear-gradient(180deg, #e5e5e7 0%, #d1d1d6 50%, #e5e5e7 100%)',
                            transformOrigin: 'top',
                        }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {education.map((edu, i) => (
                            <motion.div
                                key={i}
                                className="edu-item"
                                initial={{ opacity: 0, x: -24 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}
                            >
                                {/* Timeline dot */}
                                <div className="timeline-dot" />

                                {/* Card */}
                                <div className="edu-card" style={{ flex: 1 }}>
                                    {/* Index number — watermark */}
                                    <span style={{
                                        position: 'absolute', top: '20px', right: '24px',
                                        fontSize: '48px', fontWeight: 700, color: '#f0f0f2',
                                        fontFamily: "'EB Garamond', Georgia, serif",
                                        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                                        letterSpacing: '-0.04em',
                                    }}></span>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h3 style={{
                                                fontSize: '17px', fontWeight: 600, color: '#1d1d1f',
                                                letterSpacing: '-0.02em', marginBottom: '6px',
                                                lineHeight: 1.3,
                                            }}>{edu.degree}</h3>
                                            <p style={{
                                                fontSize: '14px', color: '#3a3a3c',
                                                marginBottom: '6px', fontWeight: 500,
                                            }}>{edu.institution}</p>
                                            <p style={{
                                                fontSize: '12px', color: '#a1a1a6',
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                flexWrap: 'wrap',
                                            }}>
                                                <span>{edu.location}</span>
                                                <span style={{ color: '#d1d1d6' }}>·</span>
                                                <span style={{ letterSpacing: '0.04em' }}>{edu.period}</span>
                                            </p>
                                        </div>
                                        <div style={{ paddingTop: '2px' }}>
                                            <span className="edu-score">{edu.score}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
