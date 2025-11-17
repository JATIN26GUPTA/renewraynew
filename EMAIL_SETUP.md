# Email Setup Guide for Contact Form

This guide explains how to set up email notifications when users submit the contact form.

## Prerequisites

1. **Supabase Project** (Already set up ✓)
2. **Resend Account** (Free tier available)
3. **Custom Domain Email** (optional but recommended)

## Step-by-Step Setup

### 1. Create a Resend Account

- Go to https://resend.com
- Sign up for a free account
- Create a project called "RenewRay"
- Get your API key from the dashboard

### 2. Deploy Supabase Edge Function

The Edge Function (`send-email`) has already been created in your project at:

```
supabase/functions/send-email/index.ts
```

To deploy it:

```bash
# Login to Supabase CLI
supabase login

# Deploy the function
supabase functions deploy send-email --project-id YOUR_PROJECT_ID
```

### 3. Set Environment Secret

Add your Resend API key as a Supabase secret:

```bash
supabase secrets set RESEND_API_KEY="your_resend_api_key_here" --project-id YOUR_PROJECT_ID
```

Or via Supabase Dashboard:

1. Go to Project Settings → Secrets
2. Add new secret: `RESEND_API_KEY` = `your_resend_api_key`

### 4. (Optional) Setup Custom Domain Email

For emails to appear from `noreply@renewray.in`:

1. In Resend Dashboard:

   - Add your domain `renewray.in`
   - Follow DNS configuration steps
   - Verify the domain

2. Update the function to use your domain:
   - Change `from: "noreply@renewray.in"` in the function

### 5. Test the Setup

After deployment:

1. Go to your website at http://localhost:5173
2. Fill out the contact form
3. Check `info@renewray.in` for the email notification
4. Also check the `leads` table in Supabase for the saved submission

## What Happens When Form is Submitted

1. ✓ Contact form data is saved to the `leads` table in Supabase
2. ✓ Email notification is sent to `info@renewray.in` with:
   - Customer's name
   - Customer's email
   - Customer's phone
   - Customer's message
   - Submission timestamp

## Troubleshooting

### Email not received

- Check Supabase function logs in the dashboard
- Verify RESEND_API_KEY is set correctly
- Check spam/junk folder

### Function deployment issues

- Make sure you have Supabase CLI installed: `npm install -g supabase`
- Check Supabase function logs for errors

### Alternative: Use Supabase Auth Emails

If you want to use Supabase's built-in email (limited):

1. Go to Project Settings → Email Templates
2. Configure SMTP or use Supabase's email service

## Current Implementation

The contact form:

- Collects: name, email, phone, message
- Stores in: `leads` table
- Sends email to: `info@renewray.in`
- Function: `supabase/functions/send-email/index.ts`

## Additional Configuration (Future)

To add more features:

### Auto-reply to customer

```typescript
// Send confirmation email to customer
await sendEmail({
  to: data.email,
  subject: "We received your inquiry",
  html: `Thank you for contacting RenewRay!...`,
});
```

### Webhook notifications

Send SMS or Slack notifications when form is submitted

### Email templates

Create HTML email templates for better formatting

---

Need help? Contact Supabase support or Resend support for specific issues.
