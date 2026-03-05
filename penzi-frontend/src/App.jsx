import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import SimulatorPage from './pages/SimulatorPage';
import LandingPage from './pages/LandingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [showSimulatorModal, setShowSimulatorModal] = useState(false);

  return (
    <BrowserRouter>
      <Navbar onOpenSimulator={() => setShowSimulatorModal(true)} />

      <Routes>
        <Route path="/" element={<LandingPage onOpenSimulator={() => setShowSimulatorModal(true)} />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global quick-launch simulator modal triggered from Navbar / Landing */}
      <Modal
        isOpen={showSimulatorModal}
        onClose={() => setShowSimulatorModal(false)}
        title=""
        maxWidth="460px"
      >
        <div style={{ textAlign: 'center', paddingBottom: '8px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px' }}>
            Open SMS Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
            Head to the full simulator page for the complete phone experience.
          </p>
          <Link
            to="/simulator"
            className="btn-primary"
            style={{ display: 'inline-flex', justifyContent: 'center', width: '100%' }}
            onClick={() => setShowSimulatorModal(false)}
          >
            Go to Simulator
          </Link>
        </div>
      </Modal>
    </BrowserRouter>
  );
}

export default App;
