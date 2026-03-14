import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TypewriterText from '../components/TypewriterText';

gsap.registerPlugin(ScrollTrigger);

const techStackData = [
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://python.org' },
    { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', url: 'https://tensorflow.org' },
    { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', url: 'https://pytorch.org' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', url: 'https://react.dev' },
    { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', url: 'https://djangoproject.com' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', url: 'https://docker.com' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', url: 'https://git-scm.com' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', url: 'https://mysql.com' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', url: 'https://nodejs.org' },
    { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', url: 'https://numpy.org' },
    { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', url: 'https://pandas.pydata.org' },
];

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

const ScrollSections = () => {
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);
    const portraitRef = useRef(null);
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const techRef = useRef(null);
    const expRef = useRef(null);

    useEffect(() => {
        // Wait for DOM
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                // Pin the entire section
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: 'top top',
                        end: '+=4000',
                        pin: true,
                        scrub: 1.5,
                        anticipatePin: 1,
                    },
                });

                // Phase 1→2: Hero fades out, About fades in
                tl.to(heroRef.current, {
                    opacity: 0, y: -80, duration: 1
                }, 0);
                tl.fromTo(aboutRef.current,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 1 },
                    0.5
                );

                // Phase 2→3: About fades, portrait goes center, tech appears
                tl.to(aboutRef.current, {
                    opacity: 0, duration: 0.8
                }, 2);
                tl.to(portraitRef.current, {
                    left: '50%',
                    xPercent: -50,
                    width: '35vw',
                    duration: 1.2,
                    ease: 'power2.inOut'
                }, 2);
                tl.fromTo(techRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.8 },
                    2.8
                );

                // Phase 3→4: Tech fades, portrait goes right, experience left
                tl.to(techRef.current, {
                    opacity: 0, duration: 0.8
                }, 3.8);
                tl.to(portraitRef.current, {
                    left: '65%',
                    width: '30vw',
                    duration: 1.2,
                    ease: 'power2.inOut'
                }, 3.8);
                tl.fromTo(expRef.current,
                    { opacity: 0, x: -60 },
                    { opacity: 1, x: 0, duration: 0.8 },
                    4.5
                );

                // Phase 4→5: Everything fades out
                tl.to([expRef.current, portraitRef.current], {
                    opacity: 0, duration: 0.6
                }, 5.5);

            }, wrapperRef);

            return () => ctx.revert();
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={wrapperRef} className="relative h-screen overflow-hidden" id="home">
            <div ref={containerRef} className="relative w-full h-full">

                {/* Portrait — starts on left 45% */}
                <div
                    ref={portraitRef}
                    className="absolute top-0 left-0 h-full flex items-center justify-center"
                    style={{ width: '45vw', zIndex: 2 }}
                >
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <img
                            src="/profile.png"
                            alt="Poola Binu Sai"
                            className="max-h-[85vh] w-auto object-contain relative z-[1]"
                            style={{
                                filter: 'grayscale(0.35) contrast(1.05) brightness(0.9)',
                                WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 45%, black 50%, transparent 100%)',
                                maskImage: 'radial-gradient(ellipse 85% 85% at 50% 45%, black 50%, transparent 100%)',
                            }}
                        />
                        {/* Subtle scanline/dot overlay for a techy feel */}
                        <div
                            className="absolute inset-0 z-[2] pointer-events-none opacity-20"
                            style={{
                                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)`,
                            }}
                        />
                    </div>
                </div>

                {/* Hero Content — right side */}
                <motion.div
                    ref={heroRef}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-0 h-full flex items-center"
                    style={{ width: '52%', zIndex: 3 }}
                >
                    <div className="px-8 lg:px-16 xl:px-20">
                        <h1 className="text-[clamp(2.2rem,5vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-5">
                            Poola Binu Sai
                        </h1>
                        <div className="text-[clamp(1rem,1.6vw,1.3rem)] font-light mb-10 h-9">
                            <TypewriterText />
                        </div>
                        <div className="flex gap-6 items-center">
                            <a href="https://github.com/Binusai" target="_blank" rel="noopener noreferrer"
                                className="text-[11px] tracking-[0.15em] uppercase text-white/20 hover:text-white/70 transition-colors duration-500">
                                GitHub
                            </a>
                            <span className="text-white/8">·</span>
                            <a href="https://www.linkedin.com/in/poola-binu-sai-805071290/" target="_blank" rel="noopener noreferrer"
                                className="text-[11px] tracking-[0.15em] uppercase text-white/20 hover:text-white/70 transition-colors duration-500">
                                LinkedIn
                            </a>
                            <span className="text-white/8">·</span>
                            <a href="mailto:binusaipoola@gmail.com"
                                className="text-[11px] tracking-[0.15em] uppercase text-white/20 hover:text-white/70 transition-colors duration-500">
                                Email
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* About — right side, initially hidden */}
                <div
                    ref={aboutRef}
                    id="about"
                    className="absolute right-0 top-0 h-full flex items-center"
                    style={{ width: '52%', zIndex: 3, opacity: 0 }}
                >
                    <div className="px-8 lg:px-16 xl:px-20">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/20 mb-6">About</p>
                        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-6">
                            Building Intelligent
                            <br />
                            <span className="text-white/30">Systems.</span>
                        </h2>
                        <p className="text-[15px] text-white/35 leading-[1.7] mb-4 max-w-lg">
                            I&apos;m a Computer Science undergraduate at Lovely Professional University,
                            specializing in Machine Learning, NLP, and Full-Stack Development.
                        </p>
                        <p className="text-[15px] text-white/35 leading-[1.7] mb-8 max-w-lg">
                            From NLP-based language identification with 93%+ accuracy across 15 Indic
                            languages to production web apps — I build systems that work.
                        </p>
                        <div className="flex gap-10">
                            <div>
                                <p className="text-white/12 text-[10px] uppercase tracking-[0.15em] mb-1">CGPA</p>
                                <p className="text-white text-2xl font-light tracking-tight">8.6</p>
                            </div>
                            <div>
                                <p className="text-white/12 text-[10px] uppercase tracking-[0.15em] mb-1">Languages</p>
                                <p className="text-white text-2xl font-light tracking-tight">15</p>
                            </div>
                            <div>
                                <p className="text-white/12 text-[10px] uppercase tracking-[0.15em] mb-1">Accuracy</p>
                                <p className="text-white text-2xl font-light tracking-tight">93%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack — orbiting around center */}
                <div
                    ref={techRef}
                    id="techstack"
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ zIndex: 4, pointerEvents: 'none', opacity: 0 }}
                >
                    <div className="relative w-full h-full">
                        {techStackData.map((tech, i) => {
                            const angle = (i / techStackData.length) * Math.PI * 2 - Math.PI / 2;
                            const cx = 50 + Math.cos(angle) * 35;
                            const cy = 50 + Math.sin(angle) * 33;
                            return (
                                <a key={i} href={tech.url} target="_blank" rel="noopener noreferrer"
                                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-pointer"
                                    style={{ left: `${cx}%`, top: `${cy}%`, pointerEvents: 'auto' }}>
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all duration-500">
                                        <img src={tech.logo} alt={tech.name}
                                            className="w-6 h-6 md:w-7 md:h-7 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `<span class="text-[10px] text-white/40">${tech.name.slice(0, 2).toUpperCase()}</span>`;
                                            }} />
                                    </div>
                                    <span className="text-[9px] text-white/15 group-hover:text-white/60 transition-colors duration-500 uppercase tracking-[0.12em]">
                                        {tech.name}
                                    </span>
                                </a>
                            );
                        })}
                        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                            {techStackData.map((_, i) => {
                                const angle = (i / techStackData.length) * Math.PI * 2 - Math.PI / 2;
                                return (
                                    <line key={i} x1="50%" y1="50%"
                                        x2={`${50 + Math.cos(angle) * 35}%`}
                                        y2={`${50 + Math.sin(angle) * 33}%`}
                                        stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                                );
                            })}
                        </svg>
                    </div>
                </div>

                {/* Experience — left side */}
                <div
                    ref={expRef}
                    id="experience"
                    className="absolute left-0 top-0 h-full flex items-center"
                    style={{ width: '52%', zIndex: 3, opacity: 0 }}
                >
                    <div className="px-8 lg:px-16 xl:px-20 w-full">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/20 mb-6">Experience</p>
                        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-10">
                            Work History
                        </h2>
                        <div className="space-y-8">
                            {experiences.map((exp, i) => (
                                <div key={i} className="border-l border-white/[0.06] pl-6">
                                    <p className="text-[10px] text-white/15 uppercase tracking-[0.12em] mb-2">{exp.date}</p>
                                    <h3 className="text-lg font-medium text-white mb-1">{exp.title}</h3>
                                    <p className="text-[13px] text-white/25 mb-3">
                                        {exp.company} · {exp.location}
                                        {exp.link && (
                                            <a href={`https://${exp.link}`} target="_blank" rel="noopener noreferrer"
                                                className="ml-2 text-white/20 hover:text-white/70 transition-colors duration-500">
                                                ↗ {exp.link}
                                            </a>
                                        )}
                                    </p>
                                    {exp.points.map((point, j) => (
                                        <p key={j} className="text-[13px] text-white/28 mb-1.5 leading-relaxed">{point}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
                >
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/12">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="w-[1px] h-6 bg-gradient-to-b from-white/12 to-transparent"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollSections;
