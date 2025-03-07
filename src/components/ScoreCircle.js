// components/ScoreCircle.js
'use client';
import { useEffect, useState } from 'react';

export default function ScoreCircle({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1000; // Animation duration in ms
    const steps = 60; // Number of steps for smooth animation
    const increment = score / steps;
    let currentScore = 0;

    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= score) {
        currentScore = score;
        clearInterval(timer);
      }
      setAnimatedScore(Math.round(currentScore));
    }, duration / steps);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [score]);

  return (
    <div className="score-section mb-4">
      <div className="score-circle" data-score={score}>
        <span className="score-number">{animatedScore}</span>
        <span className="score-label">Score</span>
      </div>
    </div>
  );
}