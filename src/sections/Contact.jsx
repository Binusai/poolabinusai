import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const SERVICE_ID = 'YOUR_SERVICE_ID';
            const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
            const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

            if (SERVICE_ID === 'YOUR_SERVICE_ID') {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 4000);
                return;
            }

            const { default: emailjs } = await import('@emailjs/browser');
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'Poola Binu Sai',
                },
                PUBLIC_KEY
            );
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 4000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus(''), 4000);
        }
    };

    const GREEN = '#00ff5e';
    const GREEN_BG = 'rgba(0, 255, 94, 1)';

    const inputStyle = {
        width: '100%',
        background: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        borderRadius: '12px',
        padding: '13px 18px',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        fontFamily: 'inherit',
    };

    return (
        <>

            <section
                id="contact"
                ref={ref}
                style={{
                    background: 'linear-gradient(to bottom, #ffffff 0%, #e6ffe9 10%, #ccffcf 20%, #99ffaa 35%, #66ff87 50%, #33ff6d 65%, #1aff5f 80%, #00ff5e 100%)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle pattern overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    maxWidth: '640px',
                    margin: '0 auto',
                    padding: '48px 28px 40px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 2,
                }}>
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        style={{ textAlign: 'center', marginBottom: '40px' }}
                    >
                        <p style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: 'rgba(35, 35, 35, 0.55)',
                            marginBottom: '10px',
                        }}>
                            Let&apos;s Connect
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: '#000000ff',
                            lineHeight: 1.1,
                        }}>
                            Get in Touch
                        </h2>
                        <p style={{
                            fontSize: '15px',
                            color: 'rgba(73, 73, 73, 0.6)',
                            marginTop: '12px',
                            maxWidth: '400px',
                            margin: '12px auto 0',
                            lineHeight: 1.6,
                        }}>
                            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{
                                    fontSize: '10px', color: 'rgba(30, 30, 30, 0.6)', textTransform: 'uppercase',
                                    letterSpacing: '0.15em', marginBottom: '6px', display: 'block', fontWeight: 600,
                                }}>Name</label>
                                <input
                                    type="text" required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={inputStyle}
                                    placeholder="Your name"
                                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    fontSize: '10px', color: 'rgba(30,30,30,0.6)', textTransform: 'uppercase',
                                    letterSpacing: '0.15em', marginBottom: '6px', display: 'block', fontWeight: 600,
                                }}>Email</label>
                                <input
                                    type="email" required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={inputStyle}
                                    placeholder="your@email.com"
                                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{
                                fontSize: '10px', color: 'rgba(30,30,30,0.6)', textTransform: 'uppercase',
                                letterSpacing: '0.15em', marginBottom: '6px', display: 'block', fontWeight: 600,
                            }}>Message</label>
                            <textarea
                                required rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{ ...inputStyle, resize: 'none' }}
                                placeholder="Tell me about your project..."
                                onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        <div style={{ textAlign: 'center', paddingTop: '4px' }}>
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                style={{
                                    padding: '13px 44px',
                                    borderRadius: '50px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    letterSpacing: '0.06em',
                                    background: '#ffffff',
                                    color: '#0a0a0a',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.35s ease',
                                    opacity: status === 'sending' ? 0.5 : 1,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                }}
                                onMouseEnter={e => {
                                    if (status !== 'sending') {
                                        e.target.style.background = 'rgba(255,255,255,0.85)';
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 28px rgba(0,0,0,0.2)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = '#ffffff';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                                }}
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>

                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ textAlign: 'center', fontSize: '13px', color: '#ffffff', fontWeight: 500 }}
                            >
                                ✓ Message sent successfully.
                            </motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ textAlign: 'center', fontSize: '13px', color: '#8b0000', fontWeight: 500 }}
                            >
                                Failed to send. Please try again.
                            </motion.p>
                        )}
                    </motion.form>

                    {/* Direct contact links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            marginTop: '40px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '28px',
                            fontSize: '12px',
                        }}
                    >
                        <a href="mailto:binusaipoola@gmail.com"
                            style={{
                                color: 'rgba(255, 255, 255, 0.72)',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                letterSpacing: '0.02em',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.83)'}>
                            binusaipoola@gmail.com
                        </a>
                        <a href="https://www.linkedin.com/in/poola-binu-sai-805071290/" target="_blank" rel="noopener noreferrer"
                            style={{
                                color: 'rgba(255,255,255,0.7)',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                letterSpacing: '0.02em',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.82)'}>
                            LinkedIn
                        </a>
                        <a href="https://github.com/Binusai" target="_blank" rel="noopener noreferrer"
                            style={{
                                color: 'rgba(255,255,255,0.7)',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                letterSpacing: '0.02em',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.88)'}>
                            GitHub
                        </a>
                    </motion.div>

                    {/* Footer */}
                    <div style={{
                        marginTop: '40px',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                        textAlign: 'center',
                    }}>
                        <p style={{
                            fontSize: '11px',
                            color: 'rgba(0, 0, 0, 0.3)',
                            letterSpacing: '0.04em',
                        }}>
                            © 2026 Poola Binu Sai. All rights reserved.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
