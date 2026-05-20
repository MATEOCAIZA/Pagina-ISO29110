import { useRef } from 'react';
import { useProgress } from './hooks/useProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import Part1 from './components/sections/Part1';
import Part2 from './components/sections/Part2';
import Part3 from './components/sections/Part3';
import Part4 from './components/sections/Part4_1';
import Part5_1_1 from './components/sections/Part5_1_1';
import Part5_1_2 from './components/sections/Part5_1_2';

const sectionIds = ['part1', 'part2', 'part3', 'part4', 'part5_1', 'part5_2'];

function navigateTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const { markVisited, isVisited, progressPercent, quizResults, setQuizResults, resetProgress } = useProgress();

  const handleStart = () => navigateTo('part1');

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Navbar
        progressPercent={progressPercent}
        isVisited={isVisited}
        onReset={resetProgress}
        onNavigate={navigateTo}
      />

      <main>
        <HeroSection onStart={handleStart} />

        <div id="part1" className="scroll-mt-16">
          <Part1 markVisited={markVisited} />
        </div>

        <div id="part2" className="scroll-mt-16">
          <Part2 markVisited={markVisited} />
        </div>

        <div id="part3" className="scroll-mt-16">
          <Part3
            markVisited={markVisited}
            setQuizResults={setQuizResults}
            quizResults={quizResults}
          />
        </div>

        <div id="part4" className="scroll-mt-16">
          <Part4 markVisited={markVisited} />
        </div>

        <div id="part5_1" className="scroll-mt-16">
          <Part5_1_1 markVisited={markVisited} />
        </div>

        <div id="part5_2" className="scroll-mt-16">
          <Part5_1_2 markVisited={markVisited} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
