import { useState, useEffect } from 'react';

const STORAGE_KEY = 'iso29110_progress';

export function useProgress() {
  const [visitedSections, setVisitedSections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [quizResults, setQuizResults] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quiz`);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [part5_1Done, setPart5_1Done] = useState(
    () => localStorage.getItem(`${STORAGE_KEY}_p511`) === 'true'
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitedSections));
  }, [visitedSections]);

  useEffect(() => {
    if (quizResults) {
      localStorage.setItem(`${STORAGE_KEY}_quiz`, JSON.stringify(quizResults));
    }
  }, [quizResults]);

  const markVisited = (sectionId) => {
    setVisitedSections((prev) =>
      prev.includes(sectionId) ? prev : [...prev, sectionId]
    );
  };

  const markPart5_1Complete = () => {
    localStorage.setItem(`${STORAGE_KEY}_p511`, 'true');
    setPart5_1Done(true);
    markVisited('part5_1');
  };

  const isVisited = (sectionId) => visitedSections.includes(sectionId);

  // Determina si una página está desbloqueada para ser visitada
  const isUnlocked = (pageId) => {
    switch (pageId) {
      case 'part1':  return true;
      case 'part2':  return isVisited('part1');
      case 'part3':  return isVisited('part2');
      case 'part4':  return quizResults !== null;
      case 'part5_1': return isVisited('part4');
      case 'part5_2': return part5_1Done;
      default: return false;
    }
  };

  const totalSections = 6;
  const progressPercent = Math.round((visitedSections.length / totalSections) * 100);

  const resetProgress = () => {
    setVisitedSections([]);
    setQuizResults(null);
    setPart5_1Done(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}_quiz`);
    localStorage.removeItem(`${STORAGE_KEY}_p511`);
  };

  return {
    visitedSections,
    markVisited,
    markPart5_1Complete,
    isVisited,
    isUnlocked,
    progressPercent,
    quizResults,
    setQuizResults,
    part5_1Done,
    resetProgress,
  };
}
