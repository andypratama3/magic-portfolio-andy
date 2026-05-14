import { NextRequest, NextResponse } from 'next/server';

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

    // Here you can add your email sending logic
    // For now, we'll just log it and return success
    console.log('Contact form submission:', {
      name: name || 'Anonymous',
      email,
      message,
      engagementTypes: engagementTypes || [],
      availability: availability || 'Not specified',
      subscribe: subscribe || false,
    });

    // TODO: Integrate with your email service (SendGrid, Resend, Mailchimp, etc.)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@andypratama.vercel.app',
    //   to: 'andypratama1211@gmail.com',
    //   subject: `New Contact: ${name || 'Anonymous'}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name || 'Anonymous'}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //     <p><strong>Engagement Types:</strong> ${engagementTypes.join(', ') || 'None'}</p>
    //     <p><strong>Availability:</strong> ${availability || 'Not specified'}</p>
    //     <p><strong>Subscribe:</strong> ${subscribe ? 'Yes' : 'No'}</p>
    //   `,
    // });

    // If subscribe is true, you can also add them to your newsletter
    // if (subscribe) {
    //   // Add to Mailchimp or your newsletter service
    // }

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
