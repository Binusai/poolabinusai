import { useState, useEffect } from 'react';

const navItems = [
    { label: 'About', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [onWhite, setOnWhite] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 500);
            setScrolled(window.scrollY > 60);

            /* Detect if we're on a white-background section */
            const projectsEl = document.getElementById('projects');
            if (projectsEl) {
                /* The white zone starts a bit before projects (the gradient) */
                const whiteStart = projectsEl.offsetTop - 120;
                setOnWhite(window.scrollY + 80 >= whiteStart);
            }

            const sections = navItems.map((item) => document.getElementById(item.id));
            const scrollPos = window.scrollY + 300;
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i] && sections[i].offsetTop <= scrollPos) {
                    setActive(navItems[i].id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    /* Colors based on white/dark background */
    const textColor = onWhite ? 'rgba(29,29,31,0.5)' : 'rgba(255,255,255,0.45)';
    const textHover = onWhite ? 'rgba(29,29,31,0.85)' : 'rgba(255,255,255,0.8)';
    const textActive = onWhite ? '#1d1d1f' : '#ffffff';
    const logoColor = onWhite ? 'rgba(29,29,31,0.8)' : 'rgba(255,255,255,0.8)';
    const bgBar = scrolled
        ? (onWhite ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)')
        : 'transparent';
    const borderBar = scrolled
        ? (onWhite ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)')
        : 'transparent';

    return (
        <nav
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
                transition: 'all 0.5s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-100%)',
                pointerEvents: visible ? 'auto' : 'none',
                background: bgBar,
                backdropFilter: scrolled ? 'blur(40px) saturate(1.5)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(1.5)' : 'none',
                borderBottom: `1px solid ${borderBar}`,
            }}
        >
            <div style={{
                maxWidth: '1300px', margin: '0 auto', padding: '0 32px',
                height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <button
                    onClick={() => scrollTo('home')}
                    style={{
                        fontSize: '15px', fontWeight: 600, letterSpacing: '0.15em',
                        textTransform: 'uppercase', cursor: 'pointer', color: logoColor,
                        background: 'none', border: 'none', transition: 'color 0.5s',
                    }}
                >BSP</button>

                {/* Desktop nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}
                    className="hidden md:flex"
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            style={{
                                fontSize: '13px', fontWeight: 500, letterSpacing: '0.04em',
                                cursor: 'pointer', position: 'relative',
                                color: active === item.id ? textActive : textColor,
                                background: 'none', border: 'none', transition: 'color 0.5s',
                            }}
                            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.color = textHover; }}
                            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.color = textColor; }}
                        >
                            {item.label}
                            {active === item.id && (
                                <span style={{
                                    position: 'absolute', bottom: '-4px', left: 0, right: 0,
                                    height: '1px', background: textActive, opacity: 0.6,
                                }} />
                            )}
                        </button>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden"
                    style={{ color: logoColor, cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}
                >
                    <div style={{ width: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <span style={{
                            display: 'block', height: '1.5px', background: logoColor,
                            transition: 'all 0.3s',
                            transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
                        }} />
                        <span style={{
                            display: 'block', height: '1.5px', background: logoColor,
                            transition: 'all 0.3s',
                            opacity: menuOpen ? 0 : 1,
                        }} />
                        <span style={{
                            display: 'block', height: '1.5px', background: logoColor,
                            transition: 'all 0.3s',
                            transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
                        }} />
                    </div>
                </button>
            </div>

            {/* Mobile menu */}
            <div style={{
                overflow: 'hidden', transition: 'max-height 0.5s',
                maxHeight: menuOpen ? '400px' : '0',
            }} className="md:hidden">
                <div style={{
                    padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: '20px',
                    background: onWhite ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(40px)',
                    borderTop: `1px solid ${borderBar}`,
                }}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            style={{
                                fontSize: '14px', fontWeight: 500, textAlign: 'left',
                                cursor: 'pointer', letterSpacing: '0.04em',
                                color: active === item.id ? textActive : textColor,
                                background: 'none', border: 'none', transition: 'color 0.3s',
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;