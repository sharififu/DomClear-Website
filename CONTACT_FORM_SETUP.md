# Contact Form Setup

The contact and book-demo pages post to `POST /api/contact`, which is implemented as a Vercel serverless function in `api/contact.ts`.

## Required Environment Variables

Set these in Vercel project settings for production and in `.env` when using `vercel dev` locally:

- `SMTP_HOST`: Hostinger SMTP host, usually `smtp.hostinger.com`.
- `SMTP_PORT`: Hostinger SMTP port, usually `465`.
- `SMTP_SECURE`: Use `true` for port `465`.
- `SMTP_USER`: your Hostinger mailbox, for example `hello@domi-clear.com`.
- `SMTP_PASS`: the Hostinger mailbox password or app password.
- `CONTACT_FROM_EMAIL`: sender address shown in the email. Use your Hostinger mailbox, or a display format like `DomiClear <hello@domi-clear.com>`.
- `CONTACT_TO_EMAIL`: inbox that receives submissions. Defaults to `info@domi-clear.com` if omitted.

## Behaviour

- Valid contact and demo request submissions are sent via Hostinger SMTP.
- The visitor's email is set as `replyTo`, so replying to the notification emails replies to the lead.
- Invalid name, email, subject, or message values return a `400` with a user-facing error.
- The hidden `website` honeypot field returns `{ "ok": true }` without sending email.
- If SMTP credentials are missing, the API returns a configuration error instead of pretending the message was sent.

## Checks

Run the API typecheck with:

```bash
npm run typecheck:api
```

Run the full production build with:

```bash
npm run build
```

To test the full form locally, run the site through Vercel so `/api/contact` is available:

```bash
npx vercel dev
```

Vercel CLI needs to be logged in for this command. If you only run `npm run dev`, Vite serves the frontend but not the `/api/contact` serverless function.
