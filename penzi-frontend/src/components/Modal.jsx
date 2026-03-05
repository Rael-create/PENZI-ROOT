// A modal component that displays a title, subtitle, and children.
// It closes when the user clicks the close button or presses the Escape key.
// It also prevents the body from scrolling when the modal is open.

import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';  // close icon

export default function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = '540px' }) {
    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);
    // if modal is not open, return null
    if (!isOpen) return null;

    //dark background overlay
    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-box" style={{ maxWidth }}>
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <FiX />
                </button>
                {title && <h2 className="modal-title">{title}</h2>}
                {subtitle && <p className="modal-subtitle">{subtitle}</p>}
                {children}
            </div>
        </div>
    );
}
