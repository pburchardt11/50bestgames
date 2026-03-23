import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Us — 50 Best Games',
  description: 'Get in touch with the 50 Best Games team. Feedback, partnerships, and press inquiries welcome.',
};

export default function ContactPage() {
  return (
    <main className="page-content">
      <div className="page-container">
        <article className="blog-post">
          <header className="blog-post-header">
            <h1>Contact Us</h1>
            <p className="blog-post-subtitle">We&apos;d love to hear from you. Reach out for feedback, partnerships, or press inquiries.</p>
          </header>
          <div className="blog-post-content">
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <div className="contact-item">
                  <h3>General Inquiries</h3>
                  <p>info@50bestgames.com</p>
                </div>
                <div className="contact-item">
                  <h3>Editorial &amp; Press</h3>
                  <p>editorial@50bestgames.com</p>
                </div>
                <div className="contact-item">
                  <h3>Partnerships &amp; Advertising</h3>
                  <p>partnerships@50bestgames.com</p>
                </div>
                <div className="contact-item">
                  <h3>Report an Issue</h3>
                  <p>If you notice incorrect data or want to suggest a game for our rankings, please email us at info@50bestgames.com with the subject &quot;Data Correction&quot; or &quot;Game Suggestion&quot;.</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
