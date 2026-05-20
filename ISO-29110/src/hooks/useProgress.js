import { useState, useEffect } from 'react';

const STORAGE_KEY = 'iso29110_progress';

export function useProgress() {
  const [visitedSections, setVisitedSections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizResults, setQuizResults] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quiz`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

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

  const isVisited = (sectionId) => visitedSections.includes(sectionId);

  const totalSections = 6;
  const progressPercent = Math.round((visitedSections.length / totalSections) * 100);

  const resetProgress = () => {
    setVisitedSections([]);
    setQuizResults(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}_quiz`);
  };

  return {
    visitedSections,
    markVisited,
    isVisited,
    progressPercent,
    quizResults,
    setQuizResults,
    resetProgress,
  };
}
