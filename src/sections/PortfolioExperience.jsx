import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TypewriterText from '../components/TypewriterText';


gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   TECH DATA
   ───────────────────────────────────────────────────────────────── */
const leftTech = [
    { name: 'C++', url: 'https://isocpp.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Java', url: 'https://java.com', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'C', url: 'https://en.wikipedia.org/wiki/C_(programming_language)', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'HTML/CSS', url: 'https://developer.mozilla.org/docs/Web/HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'NumPy', url: 'https://numpy.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    { name: 'Pandas', url: 'https://pandas.pydata.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'Python', url: 'https://python.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
];

const rightTech = [
    { name: 'Django', url: 'https://djangoproject.com', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
    { name: 'FastAPI', url: 'https://fastapi.tiangolo.com', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Streamlit', url: 'https://streamlit.io', logo: 'https://icon.icepanel.io/Technology/svg/Streamlit.svg' },
    { name: 'SQL', url: 'https://mysql.com', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'REST API', url: 'https://restfulapi.net', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    { name: 'GraphQL', url: 'https://graphql.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
    { name: 'JavaScript', url: 'https://developer.mozilla.org/docs/Web/JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
];

/* ─────────────────────────────────────────────────────────────────
   CIRCUIT LAYOUT
   ───────────────────────────────────────────────────────────────── */
const leftNodes = [
    { cirX: 12, cirY: 12, path: [[20, 12], [20, 15], [38, 15]] },
    { cirX: 7, cirY: 24, path: [[16, 24], [16, 21], [30, 21], [30, 18], [38, 18]] },
    { cirX: 12, cirY: 35, path: [[20, 35], [20, 32], [38, 32]] },
    { cirX: 7, cirY: 62, path: [[16, 62], [16, 65], [38, 65]] },
    { cirX: 12, cirY: 72, path: [[20, 72], [20, 69], [38, 69]] },
    { cirX: 7, cirY: 82, path: [[16, 82], [16, 79], [30, 79], [30, 76], [38, 76]] },
    { cirX: 12, cirY: 90, path: [[20, 90], [20, 87], [38, 87]] },
];

const rightNodes = [
    { cirX: 88, cirY: 12, path: [[80, 12], [80, 15], [62, 15]] },
    { cirX: 93, cirY: 24, path: [[84, 24], [84, 21], [70, 21], [70, 18], [62, 18]] },
    { cirX: 88, cirY: 35, path: [[80, 35], [80, 32], [62, 32]] },
    { cirX: 93, cirY: 62, path: [[84, 62], [84, 65], [62, 65]] },
    { cirX: 88, cirY: 72, path: [[80, 72], [80, 69], [62, 69]] },
    { cirX: 93, cirY: 82, path: [[84, 82], [84, 79], [70, 79], [70, 76], [62, 76]] },
    { cirX: 88, cirY: 90, path: [[80, 90], [80, 87], [62, 87]] },
];

const CIR_SIZE = 58;
const CIR_R = CIR_SIZE / 2;

/* ─────────────────────────────────────────────────────────────────
   TechCircuit
   ───────────────────────────────────────────────────────────────── */
const TechCircuit = () => {
    const containerRef = useRef(null);
    const [dims, setDims] = useState({ w: 1440, h: 900 });
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        const update = () => {
            if (containerRef.current)
                setDims({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const W = dims.w, H = dims.h;
    const vx = (p) => (p / 100) * W;
    const vy = (p) => (p / 100) * H;

    const buildPath = (node, side) => {
        const sx = side === 'L' ? vx(node.cirX) + CIR_R : vx(node.cirX) - CIR_R;
        const sy = vy(node.cirY);
        const segs = node.path.map(([px, py]) => `L ${vx(px)},${vy(py)}`).join(' ');
        return `M ${sx},${sy} ${segs}`;
    };

    const allPts = (node, side) => [
        [side === 'L' ? vx(node.cirX) + CIR_R : vx(node.cirX) - CIR_R, vy(node.cirY)],
        ...node.path.map(([px, py]) => [vx(px), vy(py)]),
    ];

    const NodeCircle = ({ tech, node, id }) => {
        const isHov = hovered === id;
        return (
            <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                    position: 'absolute',
                    left: `${node.cirX}%`,
                    top: `${node.cirY}%`,
                    transform: `translate(-50%,-50%) scale(${isHov ? 1.18 : 1})`,
                    transition: 'transform 0.2s ease',
                    /* CRITICAL: inline pointerEvents auto overrides parent's none */
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                }}
            >
                <div style={{
                    width: CIR_SIZE, height: CIR_SIZE, borderRadius: '50%',
                    border: `1.5px solid ${isHov ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.28)'}`,
                    background: isHov ? 'rgba(255,255,255,0.1)' : 'rgba(8,8,8,0.85)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isHov ? '0 0 22px rgba(255,255,255,0.22)' : 'none',
                    transition: 'all 0.2s ease',
                }}>
                    <img src={tech.logo} alt={tech.name} width={26} height={26}
                        style={{
                            objectFit: 'contain',
                            filter: tech.name === 'Django' ? 'invert(1) brightness(0.8)' : 'none',
                            opacity: isHov ? 1 : 0.88,
                            transition: 'opacity 0.2s',
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML =
                                `<span style="font-size:10px;color:rgba(255,255,255,0.8);font-weight:700">${tech.name.slice(0, 2).toUpperCase()}</span>`;
                        }}
                    />
                </div>
                <span style={{
                    fontSize: 9, letterSpacing: '0.13em', textTransform: 'uppercase',
                    whiteSpace: 'nowrap', fontWeight: 500,
                    color: isHov ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.38)',
                    transition: 'color 0.2s',
                }}>{tech.name}</span>
            </a>
        );
    };

    return (
        /* Container: pointerEvents none — SVG lines never intercept.
           NodeCircle <a> tags use pointerEvents: auto inline to opt back in. */
        <div ref={containerRef} style={{ position: 'absolute', inset: 0 }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 2 }}>
                {leftNodes.map((node, i) => {
                    const isHov = hovered === `l${i}`;
                    const pts = allPts(node, 'L');
                    return (
                        <g key={`ll-${i}`}>
                            <path d={buildPath(node, 'L')} fill="none"
                                stroke={isHov ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.42)'}
                                strokeWidth={isHov ? 1.8 : 1.1}
                                strokeLinecap="round" strokeLinejoin="round"
                                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }} />
                            {pts.map(([cx, cy], j) => {
                                const end = j === 0 || j === pts.length - 1;
                                return <circle key={j} cx={cx} cy={cy}
                                    r={end ? (isHov ? 4 : 3) : (isHov ? 2.5 : 1.8)}
                                    fill={isHov ? 'rgba(255,255,255,0.95)' : end ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)'}
                                    style={{ transition: 'all 0.2s' }} />;
                            })}
                        </g>
                    );
                })}
                {rightNodes.map((node, i) => {
                    const isHov = hovered === `r${i}`;
                    const pts = allPts(node, 'R');
                    return (
                        <g key={`rl-${i}`}>
                            <path d={buildPath(node, 'R')} fill="none"
                                stroke={isHov ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.42)'}
                                strokeWidth={isHov ? 1.8 : 1.1}
                                strokeLinecap="round" strokeLinejoin="round"
                                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }} />
                            {pts.map(([cx, cy], j) => {
                                const end = j === 0 || j === pts.length - 1;
                                return <circle key={j} cx={cx} cy={cy}
                                    r={end ? (isHov ? 4 : 3) : (isHov ? 2.5 : 1.8)}
                                    fill={isHov ? 'rgba(255,255,255,0.95)' : end ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)'}
                                    style={{ transition: 'all 0.2s' }} />;
                            })}
                        </g>
                    );
                })}
            </svg>
            {leftNodes.map((node, i) => <NodeCircle key={`l${i}`} tech={leftTech[i]} node={node} id={`l${i}`} />)}
            {rightNodes.map((node, i) => <NodeCircle key={`r${i}`} tech={rightTech[i]} node={node} id={`r${i}`} />)}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE DATA
   ═══════════════════════════════════════════════════════════════ */
const experiences = [
    {
        title: 'Freelance Web App Developer',
        company: 'YSG Brick Manufacturers',
        location: 'Chittoor, A.P',
        date: 'Feb 2026',
        points: [
            'Delivered a Chrome web app for customer bookings, report generation, and revenue tracking — replacing manual receipt workflows.',
            'Reduced paperwork by ~80% and improved daily operational efficiency.',
        ],
    },
    {
        title: 'Freelance Web Developer',
        company: 'Local Photo Studio Client',
        location: 'Chittoor, A.P',
        date: 'Nov 2025',
        link: 'rkfashionstudio.online',
        points: [
            'Deployed a full-stack Django booking website with WhatsApp integration, improving booking efficiency by 40%.',
            'Built admin dashboard with analytics, achieving 45% faster load speeds.',
        ],
    },
];

/* ═══════════════════════════════════════════════════════════════
   BINARY INTRO HOOK
   ═══════════════════════════════════════════════════════════════ */
const useBinaryIntro = (canvasRef, onIntroComplete) => {
    const animRef = useRef(null);
    const t0Ref = useRef(null);
    const ptsRef = useRef([]);
    const doneRef = useRef(false);
    const FS = 4;
    /* Zoom intro timing */
    const ZOOM_SCALE = 90;      /* starting zoom level — shows ~2 chars */
    const ZOOM_HOLD = 2;        /* 0→1 s  : static zoomed-in "01"       */
    const ZOOM_END = 6;        /* 1→4 s  : zoom out + flicker ramp     */
    /* Phase constants (shifted +2 s from original to accommodate zoom) */
    const T1 = 7, T2 = 13, T3 = 14, T4 = 18;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const W = canvas.width, H = canvas.height, gap = FS + 0.8;

        const pts = [];
        for (let r = 0; r < Math.floor(H / gap); r++)
            for (let c = 0; c < Math.floor(W / gap); c++)
                pts.push({
                    x: c * gap + gap / 2, y: r * gap + gap / 2,
                    char: Math.random() > .5 ? '1' : '0',
                    tChar: '0', tA: 0,
                    cA: Math.random() * .55 + .15,
                    ip: false, dt: Math.random(), dead: false,
                });

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const tc = document.createElement('canvas');
            const tCtx = tc.getContext('2d');
            tc.width = W; tc.height = H;
            tCtx.fillStyle = '#000'; tCtx.fillRect(0, 0, W, H);
            const iA = img.width / img.height;
            const dW = Math.min(H * .8 * iA, W * .85);
            const dH = dW / iA;
            tCtx.drawImage(img, (W - dW) / 2, (H - dH) / 2, dW, dH);
            const d = tCtx.getImageData(0, 0, W, H);
            pts.forEach(p => {
                const ipx = Math.min(Math.floor(p.x), W - 1);
                const ipy = Math.min(Math.floor(p.y), H - 1);
                const idx = (ipy * W + ipx) * 4;
                const br = ((d.data[idx] + d.data[idx + 1] + d.data[idx + 2]) / 3) * (d.data[idx + 3] / 255);
                p.ip = d.data[idx + 3] > 25 && br > 10;
                p.tChar = br > 128 ? '1' : '0';
                p.tA = p.ip ? (br / 255) * .9 + .1 : 0;
            });
            ptsRef.current = pts; t0Ref.current = Date.now();
        };
        img.onerror = () => { ptsRef.current = pts; t0Ref.current = Date.now(); };
        img.src = '/profile.png';

        const draw = () => {
            if (!t0Ref.current) { animRef.current = requestAnimationFrame(draw); return; }
            const e = (Date.now() - t0Ref.current) / 1000;
            const p2 = ptsRef.current;
            ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
            ctx.font = `${FS}px monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

            const cx = W / 2, cy = H / 2;

            if (e < ZOOM_HOLD) {
                /* ── Phase 0: Static large "01" zoomed in to center ── */
                const fi = Math.min(e / 0.5, 1);   /* gentle fade-in */
                const sc = ZOOM_SCALE;
                ctx.save();
                ctx.translate(cx, cy);
                ctx.scale(sc, sc);
                ctx.translate(-cx, -cy);
                const hvw = W / (2 * sc) + gap, hvh = H / (2 * sc) + gap;
                for (let i = 0; i < p2.length; i++) {
                    const p = p2[i];
                    if (Math.abs(p.x - cx) > hvw || Math.abs(p.y - cy) > hvh) continue;
                    ctx.fillStyle = `rgba(255,255,255,${p.cA * fi})`;
                    ctx.fillText(p.char, p.x, p.y);
                }
                ctx.restore();

            } else if (e < ZOOM_END) {
                /* ── Phase 1: Zoom out + flickering ramps up ── */
                const t = (e - ZOOM_HOLD) / (ZOOM_END - ZOOM_HOLD); /* 0→1 */
                const ease = 1 - Math.pow(1 - t, 3);               /* easeOutCubic */
                const sc = ZOOM_SCALE * Math.pow(1 / ZOOM_SCALE, ease); /* 200→1 */
                const flickerRate = t * 0.25;
                ctx.save();
                ctx.translate(cx, cy);
                ctx.scale(sc, sc);
                ctx.translate(-cx, -cy);
                const hvw = W / (2 * sc) + gap * 2, hvh = H / (2 * sc) + gap * 2;
                for (let i = 0; i < p2.length; i++) {
                    const p = p2[i];
                    if (Math.abs(p.x - cx) > hvw || Math.abs(p.y - cy) > hvh) continue;
                    if (Math.random() < flickerRate) p.char = Math.random() > .5 ? '1' : '0';
                    ctx.fillStyle = `rgba(255,255,255,${Math.random() * .5 + .15})`;
                    ctx.fillText(p.char, p.x, p.y);
                }
                ctx.restore();

            } else if (e < T1) {
                /* ── Phase 2: Full-screen random bits at normal speed ── */
                for (let i = 0; i < p2.length; i++) {
                    const p = p2[i];
                    if (Math.random() < .25) p.char = Math.random() > .5 ? '1' : '0';
                    ctx.fillStyle = `rgba(255,255,255,${Math.random() * .5 + .15})`;
                    ctx.fillText(p.char, p.x, p.y);
                }
            } else if (e < T2) {
                const st = (e - T1) / (T2 - T1);
                for (let i = 0; i < p2.length; i++) {
                    const p = p2[i];
                    if (!p.ip) {
                        if (p.dead) continue;
                        if (st >= p.dt) { p.cA *= (1 - Math.min(1, (st - p.dt) / .025)); if (p.cA < .005) { p.dead = true; continue; } }
                        if (Math.random() < .25) p.char = Math.random() > .5 ? '1' : '0';
                        ctx.fillStyle = `rgba(255,255,255,${p.cA})`; ctx.fillText(p.char, p.x, p.y);
                    } else {
                        if (Math.random() < .25) p.char = Math.random() > .5 ? '1' : '0';
                        p.cA += (p.tA - p.cA) * .015;
                        ctx.fillStyle = `rgba(255,255,255,${p.cA})`; ctx.fillText(p.char, p.x, p.y);
                    }
                }
            } else if (e < T3) {
                for (let i = 0; i < p2.length; i++) {
                    const p = p2[i]; if (!p.ip) continue;
                    if (Math.random() < .25) p.char = Math.random() > .5 ? '1' : '0';
                    p.cA += (p.tA - p.cA) * .04;
                    ctx.fillStyle = `rgba(255,255,255,${p.cA})`; ctx.fillText(p.char, p.x, p.y);
                }
            } else if (e < T4) {
                const t = (e - T3) / (T4 - T3), fr = .25 * (1 - t);
                for (let i = 0; i < p2.length; i++) {
                    const p = p2[i]; if (!p.ip) continue;
                    if (Math.random() < fr) p.char = Math.random() > .5 ? '1' : '0';
                    else if (Math.random() < t * .9) p.char = p.tChar;
                    p.cA += (p.tA - p.cA) * .06;
                    ctx.fillStyle = `rgba(255,255,255,${p.cA})`; ctx.fillText(p.char, p.x, p.y);
                }
            } else {
                if (!doneRef.current) { doneRef.current = true; onIntroComplete && onIntroComplete(); }
                for (let i = 0; i < p2.length; i++) {
                    const p = p2[i];
                    if (p.ip && p.tA > .003) { ctx.fillStyle = `rgba(255,255,255,${p.tA})`; ctx.fillText(p.tChar, p.x, p.y); }
                }
            }
            animRef.current = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasRef, onIntroComplete]);
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const PortfolioExperience = () => {
    const canvasRef = useRef(null);
    const sectionRef = useRef(null);
    const cwRef = useRef(null);
    const r1Ref = useRef(null);
    const r2Ref = useRef(null);
    const pcRef = useRef(null);
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const techRef = useRef(null);
    const expRef = useRef(null);
    const navRef = useRef(null);

    const [introReady, setIntroReady] = useState(false);
    const [activeSection, setActiveSection] = useState('none');
    const activeSectionRef = useRef('none');
    const handleDone = useCallback(() => setIntroReady(true), []);
    useBinaryIntro(canvasRef, handleDone);

    /* Lock scroll during intro animation — robust approach */
    useEffect(() => {
        if (!introReady) {
            // Lock overflow on both html and body
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';

            // Block wheel / touch / keyboard scrolling
            const preventWheel = (e) => e.preventDefault();
            const preventTouch = (e) => e.preventDefault();
            const preventKeys = (e) => {
                const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // Space, PgUp/Dn, End, Home, Arrows
                if (scrollKeys.includes(e.keyCode)) e.preventDefault();
            };

            window.addEventListener('wheel', preventWheel, { passive: false });
            window.addEventListener('touchmove', preventTouch, { passive: false });
            window.addEventListener('keydown', preventKeys, { passive: false });

            return () => {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                window.removeEventListener('wheel', preventWheel);
                window.removeEventListener('touchmove', preventTouch);
                window.removeEventListener('keydown', preventKeys);
            };
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
    }, [introReady]);

    useEffect(() => {
        if (!introReady) return;
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top', end: '+=8000',
                        pin: true, scrub: 1.5, anticipatePin: 1,
                        onUpdate: (self) => {
                            const p = self.progress;
                            let next;
                            if (p < 0.15) next = 'none';
                            else if (p < 0.38) next = 'hero';
                            else if (p < 0.58) next = 'about';
                            else if (p < 0.78) next = 'tech';
                            else if (p < 0.95) next = 'exp';
                            else next = 'none';
                            if (next !== activeSectionRef.current) {
                                activeSectionRef.current = next;
                                setActiveSection(next);
                            }
                        },
                    },
                });
                tl.to(cwRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut' }, 0);
                tl.fromTo(r1Ref.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.inOut' }, 0);
                tl.to(pcRef.current, { left: '22%', width: '48vw', duration: 1.5, ease: 'power2.inOut' }, 1);
                tl.fromTo(navRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2);
                tl.fromTo(heroRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1 }, 1.5);
                tl.to(heroRef.current, { opacity: 0, y: -60, duration: 0.8 }, 3);
                tl.to(r1Ref.current, { opacity: 0, duration: 0.8 }, 3);
                tl.fromTo(r2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 3);
                tl.fromTo(aboutRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, 3.2);
                tl.to(aboutRef.current, { opacity: 0, duration: 0.7 }, 4.5);
                tl.to(pcRef.current, { left: '50%', xPercent: -50, width: '40vw', duration: 1.2, ease: 'power2.inOut' }, 4.5);
                tl.fromTo(techRef.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.8 }, 5.2);
                tl.to(techRef.current, { opacity: 0, duration: 0.7 }, 6.2);
                tl.to(pcRef.current, { left: '45%', xPercent: 0, width: '55vw', duration: 1.2, ease: 'power2.inOut' }, 6.2);
                tl.fromTo(expRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 }, 6.8);
                tl.to([expRef.current, pcRef.current, navRef.current], { opacity: 0, duration: 0.6 }, 7.8);
            }, sectionRef);
            return () => ctx.revert();
        }, 200);
        return () => clearTimeout(timer);
    }, [introReady]);

    const maskStyle = {
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%, black 60%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%, black 60%, transparent 100%)',
    };

    return (
        <div ref={sectionRef} className="relative h-screen overflow-hidden bg-black" id="home">

            {/* Portrait — pointerEvents none, never blocks clicks */}
            <div ref={pcRef} className="absolute top-0 h-full flex items-center justify-center"
                style={{ left: '50%', transform: 'translateX(-50%)', width: '100vw', zIndex: 5, pointerEvents: 'none' }}>
                <div ref={cwRef} className="absolute inset-0 z-[4]" style={{ pointerEvents: 'none' }}>
                    <canvas ref={canvasRef} className="w-full h-full" />
                </div>
                <div ref={r1Ref} className="absolute inset-0 z-[3] flex items-center justify-center opacity-0" style={{ pointerEvents: 'none' }}>
                    <img src="/profile.png" alt="Poola Binu Sai" className="max-h-[80vh] w-auto object-contain"
                        style={{ filter: 'grayscale(0.3) contrast(1.05) brightness(0.9)', ...maskStyle }} />
                </div>
                <div ref={r2Ref} className="absolute inset-0 z-[2] flex items-center justify-center opacity-0" style={{ pointerEvents: 'none' }}>
                    <img src="/binusai.png" alt="Poola Binu Sai" className="max-h-[80vh] w-auto object-contain"
                        style={{ filter: 'grayscale(0.2) contrast(1.08) brightness(0.92)', ...maskStyle }} />
                </div>
            </div>

            {/* Navbar placeholder */}
            <div ref={navRef} className="absolute top-0 left-0 right-0 z-[30]" style={{ opacity: 0 }} />

            {/* Hero — z20, pointer events only when active */}
            <div ref={heroRef} className="absolute right-0 top-0 h-full flex items-center"
                style={{ width: '50%', zIndex: 20, opacity: 0, pointerEvents: activeSection === 'hero' ? 'auto' : 'none' }}>
                <div className="px-8 lg:px-16 xl:px-20">
                    <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem', fontWeight: 500, color: '#00ff5e' }}>
                        Hello, I'm
                    </p>
                    <h1 style={{ fontSize: 'clamp(3rem,6.5vw,6.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '1.2rem', color: 'white' }}>
                        Poola<br />Binu Sai
                    </h1>
                    <div className="text-[clamp(1rem,1.6vw,1.3rem)] font-light mb-8 h-9 text-white/60">
                        <TypewriterText />
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                        {[
                            ['GitHub', 'https://github.com/Binusai'],
                            ['LinkedIn', 'https://www.linkedin.com/in/poola-binu-sai-805071290/'],
                            ['Email', 'mailto:binusaipoola@gmail.com'],
                        ].map(([label, href], i, arr) => (
                            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <a href={href} target="_blank" rel="noopener noreferrer"
                                    style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'color 0.4s', cursor: 'pointer' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}>
                                    {label}
                                </a>
                                {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.08)' }}>·</span>}
                            </span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[
                            { label: 'Resume', href: '/resume.pdf', download: true },
                            { label: 'Contact', href: '#contact', download: false },
                        ].map(({ label, href, download }) => (
                            <a key={label} href={href}
                                {...(download ? { download: true, target: '_blank' } : {})}
                                style={{ display: 'inline-block', padding: '0.75rem 2rem', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '8px', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'all 0.3s', cursor: 'pointer' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent'; }}>
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* About — z20, pointer events only when active */}
            <div ref={aboutRef} id="about" className="absolute right-0 top-0 h-full flex items-center"
                style={{ width: '52%', zIndex: 20, opacity: 0, pointerEvents: activeSection === 'about' ? 'auto' : 'none' }}>
                <div className="px-8 lg:px-16 xl:px-20">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', marginBottom: '0.8rem' }}>
                        <span style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'white', lineHeight: 1 }}>About</span>
                        <span style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#00ff5e', lineHeight: 1 }}>Binu Sai</span>
                    </div>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '680px' }}>
                        AI and Machine Learning Engineer focused on designing intelligent systems for real-world problems, including language identification and healthcare anomaly detection. Experienced in building and delivering full-stack applications for clients using Django and modern web technologies. Strong computer science fundamentals in DSA, operating systems, and data systems, with a creative approach to problem solving and UI/UX design to build efficient and user-focused solutions.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Can Speak</span>
                        <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11 }}>—</span>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>English, Telugu, Hindi and Tamil</span>
                    </div>
                </div>
            </div>

            {/* Tech Stack
                - Wrapper: pointerEvents none (does NOT block children with inline pointerEvents auto)
                - zIndex 6: renders above portrait (5) visually
                - NodeCircle <a> tags have inline pointerEvents: auto — they work independently
            */}
            <div ref={techRef} id="techstack" className="absolute inset-0"
                style={{ zIndex: 6, opacity: 0, pointerEvents: activeSection === 'tech' ? 'auto' : 'none' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, pointerEvents: 'none', userSelect: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, color: 'white', textTransform: 'uppercase', marginLeft: '10vw' }}>TECH</span>
                        <span style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, color: 'white', textTransform: 'uppercase', marginRight: '6vw' }}>STACK</span>
                    </div>
                </div>
                <TechCircuit />
            </div>

            {/* Experience — z20, pointer events only when active */}
            <div ref={expRef} id="experience" className="absolute left-0 top-0 h-full flex items-center"
                style={{ width: '50%', zIndex: 20, opacity: 0, pointerEvents: activeSection === 'exp' ? 'auto' : 'none' }}>
                <div style={{ paddingLeft: '8vw', paddingRight: '3vw' }} className="w-full">
                    <p style={{ fontSize: 20, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
                        Freelancing
                    </p>
                    <h2 style={{ fontSize: 'clamp(2.2rem,4vw,3.6rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: '3.5rem', letterSpacing: '-0.03em' }}>
                        <span className="text-white">Work I've </span>
                        <span style={{ color: '#00ff5e' }}>shipped.</span>
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {experiences.map((exp, i) => (
                            <div key={i} style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '1.8rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.5rem' }}>
                                    {exp.link ? (
                                        <a href={`https://${exp.link}`} target="_blank" rel="noopener noreferrer"
                                            style={{ color: 'white', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.3s' }}
                                            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'white'}>
                                            {exp.title} <span style={{ fontSize: '0.9rem', opacity: 0.4 }}>↗</span>
                                        </a>
                                    ) : (
                                        <span style={{ color: 'white' }}>{exp.title}</span>
                                    )}
                                </h3>
                                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span>{exp.company} · {exp.location}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>—</span>
                                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.52)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{exp.date}</span>
                                </p>
                                {exp.points.map((pt, j) => (
                                    <p key={j} style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', lineHeight: 1.85, marginBottom: '0.7rem' }}>— {pt}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            {introReady && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    style={{ pointerEvents: 'none' }}>
                    <span className="text-[10px] tracking-[0.28em] uppercase text-white/65 font-medium">Scroll</span>
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-1">
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                            <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.72)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" style={{ opacity: 0.28 }}>
                            <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.72)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </motion.div>
            )}

            {/* Skip */}
            {!introReady && (
                <button onClick={() => setIntroReady(true)}
                    className="absolute bottom-8 right-8 z-[60] text-white/30 text-[11px] tracking-[0.2em] uppercase hover:text-white/70 transition-colors duration-500 cursor-pointer">
                    Skip →
                </button>
            )}
        </div>
    );
};

export default PortfolioExperience;