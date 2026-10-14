import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

const certifications = [
    {
        title: 'Full Stack with Django & AI Agents',
        issuer: 'W3grades',
        date: "Aug '25",
        credentialLink: 'https://drive.google.com/file/d/1711ncEa-TCEB06jx0s7a8in2g26h9R9j/view',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXsuDO3InDaxNXcDRbN_V0w2qqLGTU54Yrg&s',
    },
    {
        title: 'Digital Privacy and Security',
        issuer: 'NPTEL',
        date: "Oct '25",
        credentialLink: 'https://drive.google.com/file/d/1JGisSTxRJesw-cuYyZLXka2HEvJNwJuy/view',
        logo: 'https://sangamuniversity.ac.in/wp-content/uploads/2023/03/nptel.jpg',
    },
    {
        title: 'Computer Networking',
        issuer: 'Coursera',
        date: "Oct '24",
        credentialLink: 'https://www.coursera.org/account/accomplishments/verify/CSNUU1AHUOHM',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/960px-Coursera-Logo_600x600.svg.png',
    },
    {
        title: 'Operating Systems',
        issuer: 'Coursera',
        date: "Sep '24",
        credentialLink: 'https://www.coursera.org/account/accomplishments/verify/GA8VIV65TIBQ',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/960px-Coursera-Logo_600x600.svg.png',
    },
];

/* ── RGB glow keyframes (injected once) ────────────────────────── */
const styleInjected = { current: false };
const injectStyles = () => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rgbRotate {
            0%   { --rgb-angle: 0deg; }
            100% { --rgb-angle: 360deg; }
        }

        @property --rgb-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
        }

        .cert-card-glow {
            --rgb-angle: 0deg;
            animation: rgbRotate 3s linear infinite;
        }

        .cert-card-glow::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 22px;
            padding: 2px;
            background: conic-gradient(
                from var(--rgb-angle),
                #ff0000, #ff8800, #ffff00, #00ff00,
                #00ffff, #0088ff, #8800ff, #ff00ff, #ff0000
            );
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.45s ease;
            pointer-events: none;
            z-index: 0;
        }

        .cert-card-glow:hover::before {
            opacity: 1;
        }

        .cert-card-glow::after {
            content: '';
            position: absolute;
            inset: -8px;
            border-radius: 28px;
            background: conic-gradient(
                from var(--rgb-angle),
                rgba(255,0,0,0.15), rgba(255,136,0,0.15), rgba(255,255,0,0.15),
                rgba(0,255,0,0.15), rgba(0,255,255,0.15), rgba(0,136,255,0.15),
                rgba(136,0,255,0.15), rgba(255,0,255,0.15), rgba(255,0,0,0.15)
            );
            filter: blur(18px);
            opacity: 0;
            transition: opacity 0.45s ease;
            pointer-events: none;
            z-index: -1;
        }

        .cert-card-glow:hover::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
};

/* ── 3D Certification Card ─────────────────────────────────────── */
const CertCard = ({ cert, index, isInView }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        setTilt({ rotateX, rotateY });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setTilt({ rotateX: 0, rotateY: 0 });
    }, []);

    return (
        <motion.a
            ref={cardRef}
            href={cert.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card-glow"
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '36px 32px 28px',
                borderRadius: '20px',
                background: isHovered
                    ? 'linear-gradient(145deg, #ffffff 0%, #f8f8fa 100%)'
                    : '#fafafa',
                border: `1px solid ${isHovered ? 'transparent' : '#e5e5ea'}`,
                textDecoration: 'none',
                cursor: 'pointer',
                minHeight: '260px',
                perspective: '800px',
                transformStyle: 'preserve-3d',
                transform: isHovered
                    ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-14px) scale(1.03)`
                    : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
                transition: isHovered
                    ? 'transform 0.08s ease-out, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease'
                    : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                boxShadow: isHovered
                    ? '0 25px 50px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                zIndex: isHovered ? 10 : 1,
            }}
        >
            {/* Issuer logo */}
            <div style={{ marginBottom: '24px', position: 'relative', zIndex: 2 }}>
                <div
                    style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        background: '#fff',
                        border: '1px solid #ececee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isHovered
                            ? '0 4px 16px rgba(0,0,0,0.08)'
                            : '0 1px 3px rgba(0,0,0,0.04)',
                        transition: 'box-shadow 0.35s ease',
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={cert.logo}
                        alt={cert.issuer}
                        width={32}
                        height={32}
                        style={{
                            objectFit: 'contain',
                            borderRadius: '4px',
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML =
                                `<span style="font-size:14px;font-weight:700;color:#1d1d1f;letter-spacing:-0.02em">${cert.issuer.slice(0, 2).toUpperCase()}</span>`;
                        }}
                    />
                </div>
            </div>

            {/* Title */}
            <h3
                style={{
                    fontSize: '19px',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.35,
                    marginBottom: '10px',
                    flex: 1,
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                {cert.title}
            </h3>

            {/* Footer */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #f0f0f2',
                    paddingTop: '16px',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                        style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: '#6e6e73',
                        }}
                    >
                        {cert.issuer}
                    </span>
                    <span style={{ color: '#d1d1d6', fontSize: '10px' }}>•</span>
                    <span
                        style={{
                            fontSize: '12px',
                            color: '#a1a1a6',
                            fontWeight: 500,
                        }}
                    >
                        {cert.date}
                    </span>
                </div>
                <span
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: isHovered ? '#1d1d1f' : '#a1a1a6',
                        transition: 'color 0.3s ease',
                    }}
                >
                    Verify
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        style={{
                            transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <path
                            d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </div>

            {/* Subtle inner shine on hover */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '20px',
                    background: isHovered
                        ? `radial-gradient(circle at ${50 + tilt.rotateY * 3}% ${50 + tilt.rotateX * -3}%, rgba(255,255,255,0.6) 0%, transparent 60%)`
                        : 'transparent',
                    transition: 'background 0.15s ease',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />
        </motion.a>
    );
};

/* ── Certifications Section ────────────────────────────────────── */
const Certifications = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    // Inject RGB glow CSS on mount
    useState(() => injectStyles());

    return (
        <section
            id="certifications"
            ref={ref}
            style={{ background: '#ffffff', padding: '100px 0 120px' }}
        >
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px' }}>
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '72px' }}
                >
                    <p
                        style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#86868b',
                            marginBottom: '12px',
                        }}
                    >
                        Credentials
                    </p>
                    <h2
                        style={{
                            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            fontFamily: "'EB Garamond', Georgia, serif",
                            fontStyle: 'italic',
                            color: '#1d1d1f',
                            lineHeight: 1.1,
                        }}
                    >
                        Certifications
                    </h2>
                </motion.div>

                {/* 2×2 Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '40px',
                    }}
                >
                    {certifications.map((cert, i) => (
                        <CertCard
                            key={i}
                            cert={cert}
                            index={i}
                            isInView={isInView}
                        />
                    ))}
                </div>

                {/* Responsive fallback */}
                <style>{`
                    @media (max-width: 600px) {
                        #certifications > div > div:last-of-type {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Certifications;
