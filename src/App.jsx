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
            {/* Dark section */}
            <div className="bg-black text-[#f5f5f7]">
                <PortfolioExperience />
            </div>
            {/* Black → White gradient transition */}
            <div style={{
                height: '200px',
                background: 'linear-gradient(to bottom, #000000 0%, #ffffff 100%)',
            }} />
            {/* White section */}
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
