const CONTACT_EMAIL = 'techlinksl247@gmail.com';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, phone, subject, message } = req.body || {};
  const inquiry = {
    name: clean(name, 120),
    email: clean(email, 254),
    phone: clean(phone, 40),
    subject: clean(subject, 160).replace(/[\r\n]+/g, ' '),
    message: clean(message, 5000)
  };

  if (!inquiry.name || !inquiry.subject || !inquiry.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return res.status(400).json({ error: 'Enter your name, a valid email, a subject, and a message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return res.status(503).json({ error: 'Email delivery is not configured yet. Please try again later.' });
  }

  const text = [
    'New contact form submission for TechLink SL',
    '',
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone / WhatsApp: ${inquiry.phone || 'Not provided'}`,
    `Subject: ${inquiry.subject}`,
    '',
    'Message:',
    inquiry.message
  ].join('\n');
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
    <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(inquiry.phone || 'Not provided')}</p>
    <p><strong>Subject:</strong> ${escapeHtml(inquiry.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>
  `;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: inquiry.email,
        subject: `Website inquiry: ${inquiry.subject}`,
        text,
        html
      })
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'The email provider could not accept your message. Please try WhatsApp instead.' });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'The email service could not be reached. Please try WhatsApp instead.' });
  }
}