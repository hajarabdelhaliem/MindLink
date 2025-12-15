import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <nav className="profile-nav">
        <div className="profile-nav-inner">
          <button
            type="button"
            className="profile-back-btn"
            onClick={() => navigate('/')}
            aria-label="Back to feed"
            title="Back to Feed"
          >
            <i className="uil uil-arrow-left" />
          </button>
          <h2 className="profile-logo">MindLink</h2>
        </div>
      </nav>

      <main className="profile-main">
        <section className="profile-left">
          <div className="profile-card profile-header-card">
            <div className="profile-avatar-large">
              <img src="/logo192.png" alt="Profile" />
            </div>
            <div className="profile-basic-info">
              <h3>Joy is dead</h3>
              <p className="profile-username">@joyzy</p>
              <p className="profile-tagline">
                “Trying to understand my story, one day at a time.”
              </p>
            </div>
          </div>

          <div className="profile-card">
            <h4>About you</h4>
            <p className="profile-text">
              This is your personal space. You can use it to reflect on how
              you’ve been feeling, what you’re working on in therapy, or any
              small wins you’re proud of.
            </p>
            <ul className="profile-list">
              <li>
                <span className="profile-label">Current focus</span>
                <span className="profile-value">Managing anxiety & low mood</span>
              </li>
              <li>
                <span className="profile-label">Support preference</span>
                <span className="profile-value">
                  Short check-ins & practical tips
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="profile-center">
          <div className="profile-card">
            <h4>Your check‑ins</h4>
            <p className="profile-text small">
              Imagine you’ve been using MindLink for a while — this area could
              show your recent mood check‑ins or reflections.
            </p>
            <div className="profile-checkins">
              <div className="profile-checkin">
                <span className="profile-chip profile-chip-calm">Calmer</span>
                <p>
                  “Talked to my therapist about exam stress. Still nervous, but
                  I have a plan now.”
                </p>
                <small>2 days ago</small>
              </div>
              <div className="profile-checkin">
                <span className="profile-chip profile-chip-low">Low</span>
                <p>
                  “Felt really tired and heavy today. Wrote down three small
                  things I’m grateful for.”
                </p>
                <small>4 days ago</small>
              </div>
            </div>
          </div>
        </section>

        <aside className="profile-right">
          <div className="profile-card">
            <h4>Your care team (example)</h4>
            <ul className="profile-list profile-care-team">
              <li>
                <div className="profile-care-info">
                  <span className="profile-name">Dr. Layla Hassan</span>
                  <span className="profile-role">
                    Therapist • Anxiety & young adults
                  </span>
                </div>
              </li>
              <li>
                <div className="profile-care-info">
                  <span className="profile-name">Study & Chill group</span>
                  <span className="profile-role">
                    Peer space • Stress & exams
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Profile;


