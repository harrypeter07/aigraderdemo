// src/app/page.js
'use client';
import { useState } from 'react';
import UploadBox from '@/components/UploadBox';
import styles from './Home.module.css';

export default function Home() {
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignmentFile) return alert('Please upload an assignment.');
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('student_assignment', assignmentFile);
    if (modelFile) formData.append('model_answer', modelFile);

    const res = await fetch('/api/grade', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setIsSubmitting(false);

    if (res.ok) {
      window.location.href = `/results?score=${data.score}&tone=${data.sentiment.tone}&confidence=${data.sentiment.confidence}&feedback=${encodeURIComponent(data.feedback)}`;
    } else {
      alert(data.error || 'An error occurred while grading.');
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.card}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Assignment Grading</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={styles.formLabel}>Student Assignment (PDF) *</label>
              <UploadBox onFileSelect={(file) => setAssignmentFile(file)} accept=".pdf" required />
            </div>
            <div className="mb-4">
              <label className={styles.formLabel}>Model Answer (PDF) - Optional</label>
              <small className={styles.infoText}>
                If no model answer is provided, AI will evaluate based on general criteria.
              </small>
              <UploadBox onFileSelect={(file) => setModelFile(file)} accept=".pdf" />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Grading...
                  </>
                ) : (
                  'Grade Assignment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}