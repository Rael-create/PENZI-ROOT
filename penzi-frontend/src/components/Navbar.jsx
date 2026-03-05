import { NavLink } from 'react-router-dom';
import { FiHeart, } from 'react-icons/fi';

export default function Navbar({ onOpenSimulator }) {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <FiHeart className="heart-icon" />
                <span className="gradient-text">Penzi</span>
            </div>

            <ul className="navbar-links">
                <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                <li><NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'active' : ''}>How It Works</NavLink></li>
                <li><NavLink to="/simulator" className={({ isActive }) => isActive ? 'active' : ''}>Simulator</NavLink></li>
                <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
            </ul>

            <button className="btn-primary" onClick={onOpenSimulator}>

                Try Now
            </button>
        </nav>
    );
}
