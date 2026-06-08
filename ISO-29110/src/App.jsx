import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useProgress } from './hooks/useProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageLayout from './components/layout/PageLayout';
import HeroSection from './components/sections/HeroSection';
import Part1 from './components/sections/Part1';
import Part2 from './components/sections/Part2';
import Part3 from './components/sections/Part3';
import Part4 from './components/sections/Part4_1';
import Part5_1_1 from './components/sections/Part5_1_1';
import Part5_1_2 from './components/sections/Part5_1_2';
import FinalQuiz from './components/sections/FinalQuiz';

/** Redirige al inicio si la página está bloqueada */
function ProtectedPage({ pageId, isUnlocked, children }) {
  if (!isUnlocked(pageId)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const {
    markVisited, markPart5_1Complete,
    isVisited, isUnlocked,
    progressPercent,
    quizResults, setQuizResults,
    resetProgress,
  } = useProgress();

  // Estado de completado de actividades para Part5_1_1 y Part5_1_2
  const [p511Done, setP511Done] = useState(false);
  const [p512Done, setP512Done] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Navbar
        progressPercent={progressPercent}
        isVisited={isVisited}
        isUnlocked={isUnlocked}
        onReset={resetProgress}
      />

      <Routes>
        {/* ── Hero ──────────────────────────────────────── */}
        <Route path="/" element={<><HeroSection /><Footer /></>} />

        {/* ── Parte 1 — solo lectura + scroll ──────────── */}
        <Route path="/parte/1" element={
          <ProtectedPage pageId="part1" isUnlocked={isUnlocked}>
            <PageLayout
              pageId="part1"
              prevPath="/"
              nextPath="/parte/2"
              requiresScroll={true}
              onNext={() => markVisited('part1')}
            >
              <Part1 />
            </PageLayout>
          </ProtectedPage>
        } />

        {/* ── Parte 2 — solo lectura + scroll ──────────── */}
        <Route path="/parte/2" element={
          <ProtectedPage pageId="part2" isUnlocked={isUnlocked}>
            <PageLayout
              pageId="part2"
              prevPath="/parte/1"
              nextPath="/parte/3"
              requiresScroll={true}
              onNext={() => markVisited('part2')}
            >
              <Part2 />
            </PageLayout>
          </ProtectedPage>
        } />

        {/* ── Parte 3 — requiere completar el quiz ─────── */}
        <Route path="/parte/3" element={
          <ProtectedPage pageId="part3" isUnlocked={isUnlocked}>
            <PageLayout
              pageId="part3"
              prevPath="/parte/2"
              nextPath="/parte/4"
              requiresScroll={false}
              canAdvance={quizResults !== null}
              onNext={() => markVisited('part3')}
            >
              <Part3
                setQuizResults={setQuizResults}
                quizResults={quizResults}
              />
            </PageLayout>
          </ProtectedPage>
        } />

        {/* ── Parte 4 — solo lectura + scroll ──────────── */}
        <Route path="/parte/4" element={
          <ProtectedPage pageId="part4" isUnlocked={isUnlocked}>
            <PageLayout
              pageId="part4"
              prevPath="/parte/3"
              nextPath="/parte/5-1"
              requiresScroll={true}
              onNext={() => markVisited('part4')}
            >
              <Part4 />
            </PageLayout>
          </ProtectedPage>
        } />

        {/* ── Parte 5-1-1 — requiere 100 % actividades ── */}
        <Route path="/parte/5-1" element={
          <ProtectedPage pageId="part5_1" isUnlocked={isUnlocked}>
            <PageLayout
              pageId="part5_1"
              prevPath="/parte/4"
              nextPath="/parte/5-2"
              requiresScroll={false}
              canAdvance={p511Done}
              onNext={markPart5_1Complete}
            >
              <Part5_1_1 onAllCompleted={() => setP511Done(true)} />
            </PageLayout>
          </ProtectedPage>
        } />

        {/* ── Parte 5-1-2 — última página ──────────────── */}
        <Route path="/parte/5-2" element={
          <ProtectedPage pageId="part5_2" isUnlocked={isUnlocked}>
            <PageLayout
              pageId="part5_2"
              prevPath="/parte/5-1"
              nextPath={null}
              requiresScroll={false}
              canAdvance={p512Done}
              onNext={() => markVisited('part5_2')}
              isLast={true}
            >
              <Part5_1_2 onAllCompleted={() => setP512Done(true)} />
            </PageLayout>
          </ProtectedPage>
        } />

        {/* ── Cuestionario Final ────────────────────────── */}
        <Route path="/cuestionario-final" element={
          <><FinalQuiz /><Footer /></>
        } />

        {/* ── Fallback ──────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
