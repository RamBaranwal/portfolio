import { useState, useEffect } from 'react';
import './Loader.css';

export default function Loader({ onLoadingComplete }) {
  const [phase, setPhase] = useState('entering');

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Pause at starting, then run everything parallelly
    const timer1 = setTimeout(() => {
      setPhase('all-at-once');
    }, 1800);

    // Unmount when animation finishes
    const timer2 = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onLoadingComplete();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = 'unset';
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loader-container ${phase === 'all-at-once' ? 'split' : ''}`}>
      <div className="loader-panel loader-left">
        <span className={`loader-text text-left ${phase === 'all-at-once' ? 'fade-out' : ''}`}>cloud computing</span>
      </div>
      <div className="loader-panel loader-right">
        <span className={`loader-text text-right ${phase === 'all-at-once' ? 'fade-out' : ''}`}>devloper</span>
      </div>

      <div className={`loader-circle-container ${phase === 'all-at-once' ? 'move-to-hero' : ''}`}>
        <span className={`loader-logo ${phase === 'all-at-once' ? 'hide' : ''}`}>
          <span style={{ color: '#ffffff' }}>&lt;</span>RB<span style={{ color: '#ffffff' }}>/&gt;</span>
        </span>
        <img src="/myprofile.jpg" alt="Profile" className={`loader-photo ${phase === 'all-at-once' ? 'show' : ''}`} />
      </div>
    </div>
  );
}
