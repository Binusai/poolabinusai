import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useCallback } from 'react';

/* ── Minimal Celebration Particles ─────────────────────────── */
const useCelebrationParticles = (canvasRef, isActive) => {
    const animRef = useRef(null);
    const particlesRef = useRef([]);

    const createParticle = useCallback((w, h) => {
        const gold = [
            'rgba(234,199,0,', 'rgba(255,215,0,', 'rgba(218,165,32,',
            'rgba(255,223,100,', 'rgba(200,170,50,',
        ];
        return {
            x: Math.random() * w,
            y: Math.random() * h,          /* spawn ANYWHERE in the section */
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4, /* drift in any direction */
            size: 1.5 + Math.random() * 3,
            color: gold[Math.floor(Math.random() * gold.length)],
            alpha: 0.35 + Math.random() * 0.55,
            decay: 0.0012 + Math.random() * 0.002,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.02 + Math.random() * 0.04,
            type: Math.random() > 0.55 ? 'line' : 'dot',
            angle: Math.random() * Math.PI * 2,
            len: 6 + Math.random() * 12,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const { width: w, height: h } = canvas;
            ctx.clearRect(0, 0, w, h);

            if (!isActive) {
                /* Section not in view — clear everything, stop rendering */
                particlesRef.current = [];
                animRef.current = requestAnimationFrame(draw);
                return;
            }

            /* Spawn new particles — spread across the whole section */
            if (Math.random() < 0.7) {
                particlesRef.current.push(createParticle(w, h));
            }
            /* Extra burst — spawn 2nd particle sometimes */
            if (Math.random() < 0.3) {
                particlesRef.current.push(createParticle(w, h));
            }

            const alive = [];
            for (const p of particlesRef.current) {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.decay;
                p.twinkle += p.twinkleSpeed;

                const flicker = 0.5 + 0.5 * Math.sin(p.twinkle);
                const a = p.alpha * flicker;

                if (a > 0.005 && p.x > -20 && p.x < w + 20 && p.y > -20 && p.y < h + 20) {
                    ctx.globalAlpha = a;
                    if (p.type === 'dot') {
                        ctx.fillStyle = p.color + '1)';
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        ctx.strokeStyle = p.color + '1)';
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(
                            p.x + Math.cos(p.angle) * p.len,
                            p.y + Math.sin(p.angle) * p.len
                        );
                        ctx.stroke();
                    }
                    alive.push(p);
                }
            }
            particlesRef.current = alive;
            ctx.globalAlpha = 1;
            animRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [canvasRef, isActive, createParticle]);
};

/* ── Gold shimmer CSS keyframes (injected once) ──────────── */
const shimmerCSS = `
@keyframes goldShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('gold-shimmer-style')) {
    const s = document.createElement('style');
    s.id = 'gold-shimmer-style';
    s.textContent = shimmerCSS;
    document.head.appendChild(s);
}

/* ── Main Component ──────────────────────────────────────── */
const Achievements = () => {
    const ref = useRef(null);
    const canvasRef = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' });

    useCelebrationParticles(canvasRef, isInView);

    return (
        <section id="achievements" ref={ref} style={{ background: '#ffffff', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
            {/* Particle canvas — absolute, behind content */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    pointerEvents: 'none', zIndex: 0,
                }}
            />

            <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700,
                        letterSpacing: '-0.03em',
                        background: 'linear-gradient(90deg, #b8860b 0%, #ffd700 25%, #fff8dc 50%, #ffd700 75%, #b8860b 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'goldShimmer 3s linear infinite',
                    }}>Achievement</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        maxWidth: '680px', margin: '0 auto', padding: '40px',
                        borderRadius: '20px', border: '1px solid #e5e5e7',
                        background: '#fafafa',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                        <div style={{
                            flexShrink: 0, width: 56, height: 56, borderRadius: '50%',
                            background: '#f0f0f0', border: '1px solid #e5e5e7',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <span style={{ fontSize: '20px' }}>📄</span>
                        </div>
                        <div>
                            <div style={{ marginBottom: '16px' }}>
                                <span style={{
                                    fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
                                    padding: '4px 12px', borderRadius: '20px',
                                    background: '#e8f5e9', color: '#2e7d32', fontWeight: 600,
                                    border: '1px solid #c8e6c9',
                                }}>Research Paper Accepted</span>
                            </div>
                            <h3 style={{
                                fontSize: '20px', fontWeight: 600, color: '#1d1d1f',
                                letterSpacing: '-0.02em', marginBottom: '12px',
                            }}>IEEE NMIC 2026 Conference</h3>
                            <p style={{ fontSize: '15px', color: '#86868b', lineHeight: 1.7, marginBottom: '16px' }}>
                                Research paper on &quot;Multimodal Indian Language Identification Using Script Analysis,
                                Textual Similarity, and Phoneme Representations&quot; accepted at the prestigious
                                IEEE National Conference on Modern Information and Communication Technologies (NMIC 2026).
                            </p>
                            <p style={{ fontSize: '14px', color: '#a1a1a6', lineHeight: 1.7 }}>
                                The paper presents a novel three-stream architecture for identifying 15 Indic languages
                                from short, noisy, and code-mixed speech, achieving state-of-the-art accuracy of 93.47%
                                and 93.2% Macro-F1.
                            </p>
                            <div style={{
                                display: 'flex', gap: '32px', marginTop: '24px', paddingTop: '24px',
                                borderTop: '1px solid #e5e5e7',
                            }}>
                                <div>
                                    <p style={{ color: '#a1a1a6', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>Accuracy</p>
                                    <p style={{ color: '#1d1d1f', fontSize: '24px', fontWeight: 300 }}>93.47%</p>
                                </div>
                                <div>
                                    <p style={{ color: '#a1a1a6', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>Languages</p>
                                    <p style={{ color: '#1d1d1f', fontSize: '24px', fontWeight: 300 }}>15</p>
                                </div>
                                <div>
                                    <p style={{ color: '#a1a1a6', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>Macro-F1</p>
                                    <p style={{ color: '#1d1d1f', fontSize: '24px', fontWeight: 300 }}>93.2%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Achievements;
