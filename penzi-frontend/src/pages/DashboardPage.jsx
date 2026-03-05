import { useState, useEffect } from 'react';
import { FiUsers, FiArrowUpRight, FiRefreshCw, FiSend } from 'react-icons/fi';
import { sendSms, getDashboardStats } from '../api/penziApi';

function fmtTime(ts) {
    if (!ts) return "---";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function DashboardPage() {
    const [stats, setStats] = useState({
        total_users: 0,
        active_today: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sendPhone, setSendPhone] = useState('');
    const [sendMsg, setSendMsg] = useState('');
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const [sendSuccess, setSendSuccess] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const statsData = await getDashboardStats();
            setStats(statsData);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch real-time data. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    //
    const handleQuickSend = async (e) => {
        e.preventDefault();
        if (!sendPhone || !sendMsg) return;
        setSending(true);
        setSendError('');
        setSendSuccess('');
        try {
            const data = await sendSms(sendPhone, sendMsg);
            setSendSuccess(data.System || 'Message sent!');
            setSendMsg('');
            fetchData(); // Refresh after send
        } catch (err) {
            setSendError(err.response?.data?.System || err.message || 'Error sending message.');
        } finally {
            setSending(false);
        }
    };

    const statCards = [
        { label: 'Registered Users', value: (stats?.total_users ?? 0).toLocaleString(), color: '#ff4d8d', bg: 'rgba(255,77,141,0.12)' },
        { label: 'Active Users Today', value: (stats?.active_today ?? 0).toLocaleString(), color: '#4ade80', bg: 'rgba(74,222,128,0.15)' },
    ];

    return (
        <div className="dashboard-page">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
                        <span className="gradient-text">Service Overview</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
                        Real-time stats and SMS portal
                    </p>
                </div>
                {/* <button className="btn-ghost" onClick={fetchData} disabled={loading}>
                    <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh Stats
                </button> */}
            </div>

            {/* Stat Cards */}
            <div className="stats-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '40px' }}>
                {statCards.map((s) => (
                    <div className="stat-card" key={s.label} style={{ padding: '30px' }}>
                        <h4 style={{ fontSize: '1rem', opacity: 0.8 }}>{s.label}</h4>
                        <div className="num gradient-text" style={{ fontSize: '2.8rem' }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Message Log + Quick Send */}
            <div className="dashboard-main-content" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'start' }}>
                {/* Enhanced Quick Send Panel */}
                <div className="section-card" style={{ padding: '32px' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Quick SMS Portal</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Directly trigger SMS commands to the Penzi engine</p>
                    </div>

                    <form className="quick-send" onSubmit={handleQuickSend} style={{ gap: '20px' }}>
                        <div className="form-group">
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--pink-light)' }}>RECIPIENT PHONE</label>
                            <input
                                className="form-input"
                                type="tel"
                                placeholder="+2547XXXXXXXX"
                                value={sendPhone}
                                onChange={(e) => setSendPhone(e.target.value)}
                                required
                                style={{ fontSize: '1.05rem', padding: '14px' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--pink-light)' }}>SMS COMMAND</label>
                            <textarea
                                className="form-input"
                                rows={5}
                                placeholder="Enter command e.g. PENZI or match#24-28#Nairobi"
                                value={sendMsg}
                                onChange={(e) => setSendMsg(e.target.value)}
                                required
                                style={{ fontSize: '1.05rem', padding: '14px', lineHeight: 1.5 }}
                            />
                        </div>

                        {sendError && <div className="error-msg" style={{ padding: '12px' }}>{sendError}</div>}
                        {sendSuccess && (
                            <div style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '12px', padding: '12px 18px', color: '#4ade80', fontSize: '0.9rem' }}>
                                ✅ <strong>System Reply:</strong> {sendSuccess}
                            </div>
                        )}

                        <button
                            className="btn-primary"
                            type="submit"
                            disabled={sending}
                            style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: '10px' }}
                        >
                            {sending ? 'Processing...' : <>Execute Command</>}
                        </button>
                    </form>
                </div>

                {/* Command Reference Panel */}
                <div className="section-card" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Command Cheat Sheet</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            ['PENZI', 'Join the service'],
                            ['start#...', 'Register user'],
                            ['details#...', 'Add bio info'],
                            ['MYSELF ...', 'Self intro'],
                            ['match#age#town', 'Search matches'],
                            ['NEXT', 'View more results'],
                        ].map(([cmd, desc]) => (
                            <div key={cmd} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                padding: '14px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)'
                            }}>
                                <code style={{ color: 'var(--pink-light)', fontSize: '0.95rem', fontWeight: 700 }}>{cmd}</code>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
