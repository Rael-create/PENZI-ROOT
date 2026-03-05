import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiPhone, FiRefreshCw } from 'react-icons/fi';
import { sendSms, checkRegistration } from '../api/penziApi';
import MessageBubble from '../components/MessageBubble';
import Modal from '../components/Modal';

//list of preset buttons to send messages
const quickActions = [
    { label: 'PENZI', cmd: 'PENZI' },
    { label: 'Register', cmd: 'start#John Doe#26#Male#Nakuru#Naivasha' },
    { label: 'Details', cmd: 'details#Degree#Engineer#Single#Christian#Kikuyu' },
    { label: 'Myself', cmd: 'MYSELF tall, dark and handsome' },
    { label: 'Match', cmd: 'match#26-30#Nairobi' },
    { label: 'NEXT', cmd: 'NEXT' },
];

export default function SimulatorPage() {
    const [phone, setPhone] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [phoneSet, setPhoneSet] = useState(false);
    const [showSetup, setShowSetup] = useState(true);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSentPenzi, setHasSentPenzi] = useState(false);
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    //scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    //handle setting phone number
    const handleSetPhone = async (e) => {
        e.preventDefault();
        const phoneVal = tempPhone.trim();
        if (!phoneVal) return;

        setLoading(true);
        setError('');
        try {
            const data = await checkRegistration(phoneVal);
            setPhone(phoneVal);
            setPhoneSet(true);
            setShowSetup(false);
            if (data.is_registered) {
                setHasSentPenzi(true);
                setMessages([{
                    direction: 'received',
                    content: `Welcome back, ${data.full_name}! You are already registered. You can start matching or updating your profile immediately.`,
                    timestamp: new Date().toISOString()
                }]);
            }
        } catch (err) {
            setError('Failed to verify registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    //handle sending message
    const sendMessage = async (msgText) => {
        let text = (msgText || input).trim();

        // SAFEGUARD: The backend fails if a message starts with '#'. 
        // We strip a leading '#' if present.
        if (text.startsWith('#')) {
            text = text.substring(1).trim();
        }

        if (!text || loading) return;

        // NEW USER HANDLER: Ensure PENZI is sent first
        const isPenzi = text.toUpperCase() === 'PENZI';
        if (!hasSentPenzi && !isPenzi) {
            setError("Please send 'PENZI' first to start your session.");
            return;
        }

        setInput('');
        setError('');

        //add sent message to messages
        const now = new Date().toISOString();
        setMessages((prev) => [...prev, { direction: 'sent', content: text, timestamp: now }]);
        setLoading(true);

        try {
            const data = await sendSms(phone, text);

            // If PENZI was successful, allow further messages
            if (isPenzi) {
                setHasSentPenzi(true);
            }

            const reply = data.System || data.message || JSON.stringify(data);
            setMessages((prev) => [...prev, { direction: 'received', content: reply, timestamp: new Date().toISOString() }]);
        } catch (err) {
            const msg = err.response?.data?.System || err.message || 'Failed to reach server. Is the Flask backend running?';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    //handle enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleReset = () => {
        setMessages([]);
        setError('');
        setInput('');
        setPhone('');
        setTempPhone('');
        setPhoneSet(false);
        setHasSentPenzi(false);
        setShowSetup(true);
    };

    return (
        <div className="simulator-page">
            {/* Phone Setup Modal */}
            <Modal
                isOpen={showSetup}
                onClose={() => navigate('/')}
                title=" Enter Your Phone Number"
                subtitle="This simulates your SMS identity on the Penzi platform."
                maxWidth="460px"
            >
                <form className="setup-form" onSubmit={handleSetPhone}>
                    <div className="form-group">
                        <label htmlFor="phoneInput">Phone Number</label>
                        <input
                            id="phoneInput"
                            className="form-input"
                            type="tel"
                            placeholder="+254712345678"
                            value={tempPhone}
                            onChange={(e) => setTempPhone(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                        {/* <FiPhone /> */} Start Chatting
                    </button>
                </form>
            </Modal>

            {/* Page Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
                    SMS <span className="gradient-text">Simulator</span>
                </h1>
                {phoneSet && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                            <FiPhone style={{ marginRight: 4 }} />{phone}
                        </span>
                        <button
                            className="btn-ghost"
                            onClick={handleReset}
                            style={{ padding: '5px 14px', fontSize: '0.78rem' }}
                        >
                            <FiRefreshCw size={13} /> Reset
                        </button>
                    </div>
                )}
            </div>

            {/* Phone Frame */}
            <div className="phone-frame">
                {/* Phone Header */}
                <div className="phone-header">
                    <div className="phone-avatar">P</div>
                    <div className="phone-header-info">
                        <h4>Penzi &bull; 22141</h4>
                        <span><span className="online-dot" />Online</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="phone-messages">
                    {messages.length === 0 && !loading && (
                        <div className="empty-state">
                            Use the quick actions below or type your first SMS.
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <MessageBubble
                            key={i}
                            direction={msg.direction}
                            content={msg.content}
                            timestamp={msg.timestamp}
                        />
                    ))}
                    {loading && (
                        <div className="typing-indicator">
                            <span /><span /><span />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Error */}
                {error && (
                    <div style={{ padding: '8px 16px', background: 'var(--bg3)' }}>
                        <div className="error-msg">{error}</div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="quick-actions">
                    {quickActions.map((qa) => (
                        <button
                            key={qa.label}
                            className="quick-btn"
                            onClick={() => {
                                setInput(qa.cmd);
                                setTimeout(() => sendMessage(qa.cmd), 0);
                            }}
                            disabled={loading || !phoneSet || (!hasSentPenzi && qa.cmd !== 'PENZI')}
                        >
                            {qa.label}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <div className="phone-input-area">
                    <textarea
                        className="phone-input"
                        placeholder={phoneSet ? 'Type an SMS command…' : 'Set phone number first'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!phoneSet || loading}
                        rows={1}
                    />
                    <button
                        className="send-btn"
                        onClick={() => sendMessage()}
                        disabled={!phoneSet || loading || !input.trim()}
                        aria-label="Send"
                    >
                        <FiSend />
                    </button>
                </div>
            </div>

            <p
                style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    marginTop: '24px',
                    textAlign: 'center',
                    padding: '12px 0',
                    borderTop: '1px solid var(--border-color)',
                }}
            >
                Penzi SMS Simulator • <br />
                <span style={{ opacity: 0.7 }}>
                    Users can message you to find love.
                </span>
            </p>
        </div>
    );
}
