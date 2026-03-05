import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageCircle, FiHeart, FiUsers, FiStar } from 'react-icons/fi';

const HEARTS = ['💕', '❤️', '💖', '💘', '💗', '💝', '💞'];

function FloatingHearts() {
    return (
        <div className="hearts-container" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
                <span
                    key={i}
                    className="heart"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${4 + Math.random() * 5}s`,
                        fontSize: `${0.8 + Math.random() * 1.2}rem`,
                    }}
                >
                    {HEARTS[i % HEARTS.length]}
                </span>
            ))}
        </div>
    );
}

export default function LandingPage({ onOpenSimulator }) {
    const navigate = useNavigate();

    return (
        <section className="landing">
            <div className="landing-bg" />
            <FloatingHearts />

            {/* <div className="landing-badge">
                #1 SMS Dating Service
            </div> */}

            <h1>
                Find Your<br />
                <span className="gradient-text">Perfect Match</span>
            </h1>

            <p className="subtitle">
                Connect with thousands of singles across Kenya through a simple SMS.
                No apps, no data — just send PENZI  to <strong>22141</strong> and let love find you.
            </p>

            <div className="landing-cta">
                <button className="btn-primary" onClick={onOpenSimulator} style={{ padding: '16px 36px', fontSize: '1.1rem' }}>

                    Try the Simulator
                </button>
            </div>

            <div className="stats-row">
                <div className="stat-item">
                    <div className="stat-num">6,000+</div>
                    <div className="stat-label">Potential Partners</div>
                </div>
                <div className="stat-item">
                    <div className="stat-num">22141</div>
                    <div className="stat-label">SMS Number</div>
                </div>
                <div className="stat-item">
                    <div className="stat-num">5 Steps</div>
                    <div className="stat-label">To Register</div>
                </div>
                <div className="stat-item">
                    <div className="stat-num">Free</div>
                    <div className="stat-label">To Get Started</div>
                </div>
            </div>
        </section>
    );
}
