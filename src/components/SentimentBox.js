// components/SentimentBox.js
export default function SentimentBox({ tone, confidence }) {
    const getIcon = () => {
      switch (tone.toLowerCase()) {
        case 'positive':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          );
        case 'negative':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          );
        default: // neutral
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          );
      }
    };
  
    return (
      <div className="sentiment-section mb-4">
        <div className={`sentiment-box ${tone.toLowerCase()}`}>
          <div className="sentiment-icon">{getIcon()}</div>
          <div className="sentiment-details">
            <span className="sentiment-label">Tone</span>
            <span className="sentiment-value">{tone.charAt(0).toUpperCase() + tone.slice(1)}</span>
            <div className="confidence-bar" style={{ '--confidence': `${confidence * 100}%` }}>
              <div className="confidence-fill"></div>
            </div>
            <span className="confidence-label">Confidence: {Math.round(confidence * 100)}%</span>
          </div>
        </div>
      </div>
    );
  }