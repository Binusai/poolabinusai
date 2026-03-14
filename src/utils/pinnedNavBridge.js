/* ═══════════════════════════════════════════════════════════════
   NAV BRIDGE — lets Navbar scroll to pinned sub-sections
   ═══════════════════════════════════════════════════════════════ */
const PINNED_PROGRESS = { about: 0.45, techstack: 0.68, experience: 0.87 };

export const pinnedNavBridge = {
    scrollTo: (id) => {
        const progress = PINNED_PROGRESS[id];
        if (progress === undefined || !pinnedNavBridge._st) return false;
        const st = pinnedNavBridge._st;
        const pos = st.start + (st.end - st.start) * progress;
        window.scrollTo({ top: pos, behavior: 'smooth' });
        return true;
    },
    _st: null, /* populated by PortfolioExperience's GSAP useEffect */
};
