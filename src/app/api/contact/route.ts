import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, engagementTypes, availability, subscribe } = body;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      console.log('Contact form submission (email not sent):', {
        name: name || 'Anonymous',
        email,
        message,
        engagementTypes: engagementTypes || [],
        availability: availability || 'Not specified',
        subscribe: subscribe || false,
      });
      
      return NextResponse.json(
        { ok: false, error: 'Email service not configured. Please contact directly at andypratama1211@gmail.com' },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format engagement types
    const engagementText = engagementTypes && engagementTypes.length > 0 
      ? engagementTypes.join(', ') 
      : 'Not specified';

    // Send email to yourself
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use Resend's test domain or your verified domain
      to: 'andypratama1211@gmail.com',
      replyTo: email,
      subject: `New Contact from Portfolio: ${name || 'Anonymous'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #667eea; }
              .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">🚀 New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${name || 'Anonymous'}</div>
                </div>
                
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="field">
                  <div class="label">💼 Engagement Types:</div>
                  <div class="value">${engagementText}</div>
                </div>
                
                <div class="field">
                  <div class="label">🕐 Availability:</div>
                  <div class="value">${availability || 'Not specified'}</div>
                </div>
                
                <div class="field">
                  <div class="label">📬 Newsletter Subscription:</div>
                  <div class="value">${subscribe ? '✅ Yes, wants to subscribe' : '❌ No subscription'}</div>
                </div>
                
                <div class="footer">
                  <p>This message was sent from your portfolio contact form at andypratama.vercel.app</p>
                  <p>Reply directly to this email to respond to ${name || 'the sender'}.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to send email. Please try again or contact directly at andypratama1211@gmail.com' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { ok: true, message: 'Message received successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
