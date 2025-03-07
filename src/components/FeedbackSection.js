// components/FeedbackSection.js
export default function FeedbackSection({ feedback }) {
    return (
      <div className="feedback-section">
        <div className="feedback-content" dangerouslySetInnerHTML={{ __html: feedback }} />
      </div>
    );
  }