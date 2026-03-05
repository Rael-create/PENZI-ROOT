import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const steps = [
    {
        n: 1,
        title: 'Activate Penzi',
        desc: 'Start by sending the keyword PENZI to shortcode 22141. You\'ll receive a welcome message and instructions to register.',
        cmd: 'PENZI',
    },
    {
        n: 2,
        title: 'Register Your Profile',
        desc: 'Send your basic details — name, age, gender, county, and town — in this exact format.',
        cmd: 'start#Jane#24#Female#Nairobi#Westlands',
    },
    {
        n: 3,
        title: 'Add More Details',
        desc: 'Share your education, profession, marital status, religion, and ethnicity to help find better matches.',
        cmd: 'details#Degree#Engineer#Single#Christian#Kikuyu',
    },
    {
        n: 4,
        title: 'Describe Yourself',
        desc: 'Write a brief description starting with MYSELF. This is what potential matches will read about you.',
        cmd: 'MYSELF tall, funny, loves hiking and great coffee',
    },
    {
        n: 5,
        title: 'Search for Matches',
        desc: 'You\'re registered! Now search for potential matches by specifying an age range and town.',
        cmd: 'match#25-32#Nairobi',
    },
    {
        n: 6,
        title: 'Get More Matches',
        desc: 'Matches are sent 3 at a time. Send NEXT to receive the next batch of potential partners.',
        cmd: 'NEXT',
    },
];

function StepCard({ step }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(step.cmd).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="step-card">
            <div className="step-number">{step.n}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            <div className="sms-example">
                <code>{step.cmd}</code>
                <button className="copy-btn" onClick={handleCopy} title="Copy command">
                    {copied ? <FiCheck style={{ color: '#4ade80' }} /> : <FiCopy />}
                </button>
            </div>
        </div>
    );
}

export default function HowItWorksPage() {
    return (
        <div className="how-page">
            <div className="page-header">
                <h1><span className="gradient-text">How It Works</span></h1>
                <p>Six simple SMS steps to find your perfect match</p>
            </div>

            <div className="steps-grid">
                {steps.map((step) => (
                    <StepCard key={step.n} step={step} />
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '56px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <p>Send any of these commands to <strong style={{ color: 'var(--pink)' }}>22141</strong> via SMS</p>
            </div>
        </div>
    );
}
