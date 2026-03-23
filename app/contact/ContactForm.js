'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-form-section">
      <h2>Send a Message</h2>
      {submitted ? (
        <p style={{ color: 'var(--accent-success)', fontWeight: 600 }}>
          Thank you! Your message has been sent. We&apos;ll get back to you soon.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required placeholder="Your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select id="subject" name="subject">
              <option value="general">General Inquiry</option>
              <option value="feedback">Feedback</option>
              <option value="partnership">Partnership</option>
              <option value="press">Press / Media</option>
              <option value="correction">Data Correction</option>
              <option value="suggestion">Game Suggestion</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" required placeholder="Your message..." />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      )}
    </div>
  );
}
