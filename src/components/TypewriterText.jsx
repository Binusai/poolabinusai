import { useState, useEffect, useRef } from 'react';

const roles = [
    'Machine Learning Engineer',
    'Full-Stack Developer',
    'AI Researcher',
    'Freelancer',
];

const TypewriterText = () => {
    const [displayText, setDisplayText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        if (!isDeleting) {
            if (displayText.length < currentRole.length) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                }, 50);
            } else {
                timeoutRef.current = setTimeout(() => setIsDeleting(true), 2800);
            }
        } else {
            if (displayText.length > 0) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 25);
            } else {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }
        }
        return () => clearTimeout(timeoutRef.current);
    }, [displayText, isDeleting, roleIndex]);

    return (
        <span className="text-white/35 font-light">
            {displayText}
            <span className="cursor-blink text-white/20 ml-0.5">|</span>
        </span>
    );
};

export default TypewriterText;
