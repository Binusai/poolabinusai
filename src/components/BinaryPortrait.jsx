import { useEffect, useRef, useCallback } from 'react';

const BinaryPortrait = ({ className = '', style = {} }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const particlesRef = useRef([]);
    const readyRef = useRef(false);

    const FONT_SIZE = 3;

    // 🔧 CHANGE THIS VALUE to control portrait size
    const PORTRAIT_SCALE = 0.45;

    const setup = useCallback((canvas) => {

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.scale(dpr, dpr);

        const particles = [];
        const gap = FONT_SIZE + 0.5;

        const w = rect.width;
        const h = rect.height;

        const cols = Math.floor(w / gap);
        const rows = Math.floor(h / gap);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                particles.push({
                    x: x * gap + gap / 2,
                    y: y * gap + gap / 2,
                    baseX: x * gap + gap / 2,
                    baseY: y * gap + gap / 2,
                    char: Math.random() > 0.5 ? '1' : '0',
                    alpha: 0,
                    brightness: 0,
                    isPortrait: false,
                });
            }
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {

            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = w;
            tempCanvas.height = h;

            tempCtx.fillStyle = '#000';
            tempCtx.fillRect(0, 0, w, h);

            const imgAspect = img.width / img.height;
            const canvasAspect = w / h;

            let drawW, drawH;

            if (imgAspect > canvasAspect) {
                drawW = w * PORTRAIT_SCALE;
                drawH = drawW / imgAspect;
            } else {
                drawH = h * PORTRAIT_SCALE;
                drawW = drawH * imgAspect;
            }

            const offsetX = (w - drawW) / 2;
            const offsetY = (h - drawH) / 2;

            tempCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

            const data = tempCtx.getImageData(0, 0, w, h);

            particles.forEach((p) => {

                const px = Math.floor(p.baseX);
                const py = Math.floor(p.baseY);

                const idx = (py * w + px) * 4;

                const r = data.data[idx];
                const g = data.data[idx + 1];
                const b = data.data[idx + 2];
                const a = data.data[idx + 3];

                const brightness = ((r + g + b) / 3) * (a / 255);

                p.brightness = brightness;
                p.isPortrait = brightness > 12;

                p.char = brightness > 128 ? '1' : '0';

                p.alpha = p.isPortrait
                    ? (brightness / 255) * 0.88 + 0.12
                    : 0.015;

            });

            particlesRef.current = particles;
            readyRef.current = true;
        };

        img.onerror = () => {
            particlesRef.current = particles;
            readyRef.current = true;
        };

        img.src = '/profile.png';

        return { ctx, w: rect.width, h: rect.height };

    }, []);

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        let { ctx, w, h } = setup(canvas);

        const handleMouseMove = (e) => {

            const rect = canvas.getBoundingClientRect();

            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        const animate = () => {

            if (!readyRef.current) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            const particles = particlesRef.current;

            ctx.clearRect(0, 0, w, h);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            const distortRadius = 70;

            ctx.font = `${FONT_SIZE}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let i = 0; i < particles.length; i++) {

                const p = particles[i];

                const dx = p.baseX - mx;
                const dy = p.baseY - my;

                const dist = Math.sqrt(dx * dx + dy * dy);

                let drawX, drawY;

                if (dist < distortRadius && dist > 0) {

                    const force = (1 - dist / distortRadius) * 14;

                    const angle = Math.atan2(dy, dx);

                    drawX = p.baseX + Math.cos(angle) * force;
                    drawY = p.baseY + Math.sin(angle) * force;

                    p.x += (drawX - (p.x || p.baseX)) * 0.2;
                    p.y += (drawY - (p.y || p.baseY)) * 0.2;

                } else {

                    p.x = p.x
                        ? p.x + (p.baseX - p.x) * 0.12
                        : p.baseX;

                    p.y = p.y
                        ? p.y + (p.baseY - p.y) * 0.12
                        : p.baseY;
                }

                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;

                ctx.fillText(p.char, p.x || p.baseX, p.y || p.baseY);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };

    }, [setup]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ ...style, display: 'block' }}
        />
    );
};

export default BinaryPortrait;