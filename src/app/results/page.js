// app/results/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ScoreCircle from '../../components/ScoreCircle';
import SentimentBox from '../../components/SentimentBox';
import FeedbackSection from '../../components/FeedbackSection';

export default function Results() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score')) || 0;
  const tone = searchParams.get('tone') || 'neutral';
  const confidence = parseFloat(searchParams.get('confidence')) || 0.5;
  const feedback = decodeURIComponent(searchParams.get('feedback') || '');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Grading Results</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex justify-center">
            <ScoreCircle score={score} />
          </div>
          <div className="flex justify-center">
            <SentimentBox tone={tone} confidence={confidence} />
          </div>
        </div>

        <FeedbackSection feedback={feedback} />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/" className="btn-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M3 12h18m-18 0l8.5-8.5M3 12l8.5 8.5" />
            </svg>
            Grade Another
          </Link>
          <button
            onClick={() => window.print()}
            className="btn-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <path d="M6 14h12v8H6z" />
            </svg>
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}