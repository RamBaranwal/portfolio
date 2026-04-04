import { useEffect, useState } from 'react';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import { FaCode, FaFire, FaExternalLinkAlt } from 'react-icons/fa';
import './Achievements.css';

const profileConfigs = [
  {
    id: 'leetcode',
    platform: 'LeetCode',
    username: 'Ram_Baranwal',
    url: 'https://leetcode.com/u/Ram_Baranwal/',
    icon: <SiLeetcode className="card-logo-icon" />,
    box1Label: 'Problems Solved',
    box2Label: 'Max Day Streak',
    box2Icon: <FaFire />,
    fetchFn: async () => {
      // Mock fetch to keep the UI exactly as the screenshot previously
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        box1Value: '210',
        box2Value: '76',
        total: '210 / 3874',
        easy: { count: 116, color: '#10b981' },
        medium: { count: 72, color: '#fbbf24' },
        hard: { count: 22, color: '#ef4444' }
      };
    }
  },
  {
    id: 'hackerrank',
    platform: 'HackerRank',
    username: 'ram_baranwal',
    url: 'https://www.hackerrank.com/profile/ram_baranwal',
    icon: <SiHackerrank className="card-logo-icon" />,
    box1Label: 'Challenges Solved',
    box2Label: 'Badges Earned',
    box2Icon: <FaFire />,
    fetchFn: async () => {
      // Mock fetch with delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        box1Value: '80+',
        box2Value: '50',
        total: '80 / 800',
        easy: { count: 53, color: '#10b981' },
        medium: { count: 25, color: '#fbbf24' },
        hard: { count: 2, color: '#ef4444' }
      };
    }
  },
  {
    id: 'codolio',
    platform: 'Codolio',
    username: 'rambaranwal',
    url: 'https://codolio.com/profile/rambaranwal',
    icon: <FaCode className="card-logo-icon" />,
    box1Label: 'Total Submissions',
    box2Label: 'Accuracy (%)',
    box2Icon: <FaFire />,
    fetchFn: async () => {
      // Mock fetch with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        box1Value: '450',
        box2Value: '160',
        total: '450 / 500',
        easy: { count: 294, color: '#10b981' },
        medium: { count: 97, color: '#fbbf24' },
        hard: { count: 29, color: '#ef4444' }
      };
    }
  }
];

function AchievementCard({ config }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    config.fetchFn()
      .then(res => {
        if (mounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [config]);

  if (loading) {
    return (
      <div className="achievement-card skeleton-card">
        <div className="skeleton-pulse skel-header"></div>
        <div className="skeleton-pulse skel-row"></div>
        <div className="skeleton-pulse skel-breakdown"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="achievement-card error-state">
         <div className="card-header">
           <div className="card-icon-wrapper">{config.icon}</div>
           <div className="card-title-stack">
             <h3 className="card-platform">{config.platform}</h3>
             <span className="card-subtitle">@{config.username}</span>
           </div>
         </div>
         <div className="error-message">Could not load profile data.</div>
         <a href={config.url} target="_blank" rel="noreferrer" className="achievement-btn mt-auto">
           View Profile
         </a>
      </div>
    );
  }

  // Calculate percentages safely to avoid division by zero
  const totalSolved = data.easy.count + data.medium.count + data.hard.count;
  const easyPct = totalSolved === 0 ? 0 : (data.easy.count / totalSolved) * 100;
  const mediumPct = totalSolved === 0 ? 0 : (data.medium.count / totalSolved) * 100;
  const hardPct = totalSolved === 0 ? 0 : (data.hard.count / totalSolved) * 100;

  return (
    <a href={config.url} target="_blank" rel="noreferrer" className="achievement-card">
      {/* Header */}
      <div className="card-header">
        <div className="card-icon-wrapper">
          {config.icon}
        </div>
        <div className="card-title-stack">
          <h3 className="card-platform">{config.platform}</h3>
          <span className="card-subtitle">@{config.username}</span>
        </div>
      </div>

      {/* Middle Row */}
      <div className="card-stats-row">
        <div className="stat-box stat-left">
          <span className="stat-value">{data.box1Value}</span>
          <span className="stat-label">{config.box1Label}</span>
        </div>
        <div className="stat-box stat-right">
          <span className="stat-value highlight">
            {data.box2Value} {config.box2Icon}
          </span>
          <span className="stat-label highlight-label">{config.box2Label}</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="card-breakdown">
        <div className="breakdown-header">
          <span className="breakdown-title">Difficulty Breakdown</span>
          <span className="breakdown-total">{data.total}</span>
        </div>
        
        <div className="breakdown-bar-container">
          {easyPct > 0 && <div className="breakdown-bar easy" style={{ backgroundColor: data.easy.color, width: `${easyPct}%` }}></div>}
          {mediumPct > 0 && <div className="breakdown-bar medium" style={{ backgroundColor: data.medium.color, width: `${mediumPct}%` }}></div>}
          {hardPct > 0 && <div className="breakdown-bar hard" style={{ backgroundColor: data.hard.color, width: `${hardPct}%` }}></div>}
        </div>

        <div className="breakdown-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: data.easy.color }}></span>
            <span className="legend-count" style={{ color: data.easy.color }}>{data.easy.count}</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: data.medium.color }}></span>
            <span className="legend-count" style={{ color: data.medium.color }}>{data.medium.count}</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: data.hard.color }}></span>
            <span className="legend-count" style={{ color: data.hard.color }}>{data.hard.count}</span>
          </div>
        </div>
      </div>

      <span className="click-hint" aria-hidden="true">
        <FaExternalLinkAlt className="click-hint-icon" />
        <span className="click-hint-text">Click to view</span>
      </span>
    </a>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <h2 className="section-title">Achievements</h2>
        <p className="section-subtitle">Coding Profiles and Competitive Programming</p>

        <div className="achievements-grid">
          {profileConfigs.map((config) => (
            <AchievementCard key={config.id} config={config} />
          ))}
        </div>
      </div>
    </section>
  );
}
