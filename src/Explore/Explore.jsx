import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Explore() {
  const navigate = useNavigate();

  return (
    <div className="explore-page">
      <nav className="explore-nav">
        <div className="explore-nav-inner">
          <button
            type="button"
            className="explore-back-btn"
            onClick={() => navigate('/')}
            aria-label="Back to feed"
            title="Back to Feed"
          >
            <i className="uil uil-arrow-left"></i>
          </button>
          <h2 className="explore-logo">MindLink</h2>
          <div className="explore-search">
            <i className="uil uil-search"></i>
            <input
              type="search"
              placeholder="Search feelings, topics, or therapists"
            />
          </div>
        </div>
      </nav>

      <main className="explore-main">
        <aside className="explore-left">
          <div className="explore-card">
            <h3>Your mental health journey</h3>
            <p className="explore-muted">
              Gently explore what you’re going through and find support that
              fits you.
            </p>
            <div className="explore-pill-row">
              <span className="explore-pill">I feel anxious</span>
              <span className="explore-pill">Low mood</span>
              <span className="explore-pill">Stress & burnout</span>
            </div>
          </div>
          <div className="explore-filters">
            <span className="explore-filters-label">
              What do you want to explore today?
            </span>
            <button className="explore-filter active">My current concerns</button>
            <button className="explore-filter">Mental health conditions</button>
            <button className="explore-filter">Therapists & support</button>
          </div>
        </aside>

        <section className="explore-center">
          <h3 className="explore-section-title">Explore your concerns</h3>
          <p className="explore-section-subtitle">
            Start by reading about what you’re feeling. These are not
            diagnoses, just gentle guides.
          </p>
          <div className="explore-grid">
            <div className="explore-tile">
              <h4>Anxiety & worry</h4>
              <p>
                Racing thoughts, tight chest, or constant “what ifs”? Learn
                about anxiety and when to reach out.
              </p>
              <button className="explore-link-btn">Learn about anxiety</button>
            </div>
            <div className="explore-tile">
              <h4>Low mood & depression</h4>
              <p>
                Feeling empty, tired, or losing interest in things you used to
                enjoy? Explore what this could mean.
              </p>
              <button className="explore-link-btn">
                Explore depression support
              </button>
            </div>
            <div className="explore-tile">
              <h4>Stress & burnout</h4>
              <p>
                Overwhelmed by school, work, or family? Understand stress,
                burnout, and small steps to recover.
              </p>
              <button className="explore-link-btn">
                Coping with stress & burnout
              </button>
            </div>
            <div className="explore-tile">
              <h4>Relationships & family</h4>
              <p>
                Confusing friendships, family pressure, or conflict? See how
                therapy can support your connections.
              </p>
              <button className="explore-link-btn">
                Relationship-focused support
              </button>
            </div>
          </div>

          <h3 className="explore-section-title conditions">
            Understand mental health conditions
          </h3>
          <div className="explore-grid">
            <div className="explore-tile small">
              <h4>Generalised anxiety</h4>
              <p>Ongoing worry and tension that’s hard to switch off.</p>
            </div>
            <div className="explore-tile small">
              <h4>Depressive disorders</h4>
              <p>Persistent sadness, low energy, or feeling numb.</p>
            </div>
            <div className="explore-tile small">
              <h4>Panic & phobias</h4>
              <p>Sudden intense fear, or strong fear of specific things.</p>
            </div>
            <div className="explore-tile small">
              <h4>Trauma & PTSD</h4>
              <p>After difficult events, memories and feelings that linger.</p>
            </div>
          </div>
        </section>

        <aside className="explore-right">
          <div className="explore-card">
            <h3>Therapists by focus</h3>
            <p className="explore-muted">
              These are example profiles to help you see different kinds of
              support.
            </p>
            <ul className="explore-list explore-therapists">
              <li>
                <div className="explore-therapist-info">
                  <span className="explore-name">Dr. Layla Hassan</span>
                  <span className="explore-speciality">
                    Anxiety • Panic • Young adults
                  </span>
                </div>
                <button className="explore-join">View</button>
              </li>
              <li>
                <div className="explore-therapist-info">
                  <span className="explore-name">Omar El-Sayed</span>
                  <span className="explore-speciality">
                    Depression • Burnout • Students
                  </span>
                </div>
                <button className="explore-join">View</button>
              </li>
              <li>
                <div className="explore-therapist-info">
                  <span className="explore-name">Nour Ali</span>
                  <span className="explore-speciality">
                    Trauma • Relationships • Family
                  </span>
                </div>
                <button className="explore-join">View</button>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Explore;


