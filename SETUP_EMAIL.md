# 📧 Email Setup Guide

Your contact form is now integrated with **Resend** for sending emails. Follow these steps to complete the setup:

## 🚀 Quick Setup (5 minutes)

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free forever)
3. Verify your email address

### 2. Get Your API Key
1. Go to [API Keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Name it: `Portfolio Contact Form`
4. Copy the API key (starts with `re_...`)

### 3. Add API Key to Your Project

**For Local Development:**
1. Open your `.env` file (or create it if it doesn't exist)
2. Add this line:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
3. Restart your dev server

**For Vercel Production:**
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `magic-portfolio-andy`
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_actual_api_key_here`
   - **Environment:** Production, Preview, Development (select all)
5. Click **Save**
6. Redeploy your site (or it will auto-deploy on next push)

### 4. Test Your Contact Form
1. Go to your portfolio
2. Fill out the contact form
3. Submit it
4. Check your email at **andypratama1211@gmail.com**
5. You should receive a beautifully formatted email! 🎉

## 📝 What Happens Now

When someone submits your contact form:
- ✅ You receive an email at `andypratama1211@gmail.com`
- ✅ The email includes all form details (name, email, message, engagement types, availability)
- ✅ You can reply directly to the sender's email
- ✅ Beautiful HTML formatting with your brand colors

## 🎨 Email Template Features

The email you receive includes:
- 👤 Sender's name
- 📧 Sender's email (with reply-to configured)
- 💬 Their message
- 💼 Selected engagement types (Full-time, Contract, etc.)
- 🕐 Their availability
- 📬 Newsletter subscription preference

## 🔧 Customization

To customize the email template, edit:
```
src/app/api/contact/route.ts
```

Look for the `html` section in the `resend.emails.send()` call.

## 🆓 Free Tier Limits

Resend free tier includes:
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ No credit card required
- ✅ Perfect for portfolio contact forms

## 🚨 Troubleshooting

**"Email service not configured" error:**
- Make sure `RESEND_API_KEY` is set in your `.env` file
- Restart your dev server after adding the key

**Not receiving emails:**
- Check your spam folder
- Verify the API key is correct
- Check Vercel logs for errors

**Want to use your own domain?**
1. Add your domain in [Resend Domains](https://resend.com/domains)
2. Add DNS records (Resend will guide you)
3. Update the `from` field in `route.ts`:
   ```typescript
   from: 'Portfolio Contact <contact@yourdomain.com>'
   ```

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Next.js Guide](https://resend.com/docs/send-with-nextjs)
- [Resend API Reference](https://resend.com/docs/api-reference/emails/send-email)

---

**Need help?** Check the Resend docs or reach out! 🚀
