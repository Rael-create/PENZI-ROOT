// creates a chat message bubble that displays a message and its time.

export default function MessageBubble({ direction, content, timestamp }) {
    const isSent = direction === 'OUT' || direction === 'sent';

    const fmt = (ts) => {
        if (!ts) return '';
        const d = new Date(ts);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`bubble ${isSent ? 'sent' : 'received'}`}>
            {content}
            {timestamp && <div className="bubble-time">{fmt(timestamp)}</div>}
        </div>
    );
}
