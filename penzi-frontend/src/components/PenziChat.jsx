import React, { useState, useRef, useEffect } from "react";
import { sendSms } from "../api/penziApi";          // directly from penziApi.js
import MessageBubble from "./MessageBubble";

/**
 * PenziChat — standalone chat widget that connects directly to the Flask backend.
 * Drop this into any page or use it as a modal body.
 *
 * Props:
 *   phoneNumber {string}  – pre-fill a phone number (optional)
 */
function PenziChat({ phoneNumber: initialPhone = "" }) {
    const [phone, setPhone] = useState(initialPhone);
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);   // [{direction, content, ts}]
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const bottomRef = useRef(null);

    // Auto-scroll to latest bubble
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, loading]);

    const handleSend = async (overrideMsg) => {
        let text = (overrideMsg ?? message).trim();

        // SAFEGUARD: The backend fails if a message starts with '#'. 
        // Users often misinterpret the format. We strip a leading '#' if present.
        if (text.startsWith('#')) {
            text = text.substring(1).trim();
        }

        if (!text || !phone.trim() || loading) return;

        setError("");
        setMessage("");

        // Add the outgoing bubble immediately
        setHistory((h) => [...h, { direction: "sent", content: text, ts: new Date().toISOString() }]);
        setLoading(true);

        try {
            const data = await sendSms(phone.trim(), text);
            const reply = data.System ?? data.message ?? JSON.stringify(data);
            setHistory((h) => [...h, { direction: "received", content: reply, ts: new Date().toISOString() }]);
        } catch (err) {
            const msg =
                err.response?.data?.System ||
                err.message ||
                "Could not reach the backend. Make sure Flask is running on http://localhost:5000";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    // Quick-action SMS shortcuts matching each registration stage
    const quick = [
        { label: "PENZI", cmd: "PENZI" },
        { label: "Register", cmd: "start#John Doe#26#Male#Nakuru#Naivasha" },
        { label: "Details", cmd: "details#Degree#Engineer#Single#Christian#Kikuyu" },
        { label: "Myself", cmd: "MYSELF tall, dark and handsome" },
        { label: "Match", cmd: "match#24-30#Nairobi" },
        { label: "Next", cmd: "NEXT" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0, height: "100%" }}>

            {/* ── Phone number input ── */}
            {!initialPhone && (
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--glass-border)", background: "var(--bg3)" }}>
                    <input
                        className="form-input"
                        type="tel"
                        placeholder="Your phone number e.g. +254712345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ width: "100%", fontSize: "0.85rem" }}
                    />
                </div>
            )}

            {/* ── Chat history ── */}
            <div className="phone-messages" style={{ flex: 1, minHeight: 0 }}>
                {history.length === 0 && !loading && (
                    <div className="empty-state">
                        Enter your phone number, then tap <strong>PENZI</strong> to begin 💬
                    </div>
                )}

                {history.map((msg, i) => (
                    <MessageBubble
                        key={i}
                        direction={msg.direction}
                        content={msg.content}
                        timestamp={msg.ts}
                    />
                ))}

                {/* Typing indicator while waiting for backend */}
                {loading && (
                    <div className="typing-indicator">
                        <span /><span /><span />
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* ── Error banner ── */}
            {error && (
                <div style={{ padding: "8px 14px", background: "var(--bg3)" }}>
                    <div className="error-msg">{error}</div>
                </div>
            )}

            {/* ── Quick-action shortcuts ── */}
            <div className="quick-actions">
                {quick.map((q) => (
                    <button
                        key={q.label}
                        className="quick-btn"
                        disabled={loading || !phone.trim()}
                        onClick={() => handleSend(q.cmd)}
                    >
                        {q.label}
                    </button>
                ))}
            </div>

            {/* ── Text input + send ── */}
            <div className="phone-input-area">
                <textarea
                    className="phone-input"
                    rows={1}
                    placeholder={phone ? "Type an SMS command…" : "Set phone number first"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKey}
                    disabled={!phone.trim() || loading}
                />
                <button
                    className="send-btn"
                    onClick={() => handleSend()}
                    disabled={!phone.trim() || !message.trim() || loading}
                    aria-label="Send"
                >
                    ➤
                </button>
            </div>
        </div>
    );
}

export default PenziChat;
