# Vercel email setup

The contact form sends submissions to `techlinksl247@gmail.com` through the Vercel function in `api/contact.js` and Resend.

1. Create a Resend account and verify the `techlinksl.com` sending domain.
2. Create a Resend API key.
3. In Vercel, open the project settings and add these environment variables for Production (and Preview if needed):
   - `RESEND_API_KEY`: the API key from Resend.
   - `RESEND_FROM_EMAIL`: a sender on the verified domain, for example `TechLink SL <noreply@techlinksl.com>`.
4. Redeploy the project so the function receives the new variables.

Do not commit API keys. Add them in Vercel's Environment Variables settings. `.env.example` shows the variable names for local reference.

After a successful form submission, the email is sent directly through Resend. The page also opens a prefilled WhatsApp chat with `+232 71 345276`; the visitor must press **Send** in WhatsApp for that message to arrive in the business inbox.