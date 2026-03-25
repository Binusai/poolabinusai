import Navbar from './components/Navbar';
import PortfolioExperience from './sections/PortfolioExperience';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Contact from './sections/Contact';

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            {/* PortfolioExperience manages its own bg color (black → white via GSAP) */}
            <div>
                <PortfolioExperience />
            </div>
            {/* White section — starts immediately after PortfolioExperience which ends on white */}
            <div className="bg-white text-[#1d1d1f]">
                <Projects />
                <Achievements />
                <Certifications />
                <Education />
            </div>
            {/* Contact — has its own white→green gradient transition */}
            <Contact />
        </div>
    );
}

export default App;
