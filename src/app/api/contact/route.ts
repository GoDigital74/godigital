// import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { firstName, lastName, email, message } = body;

//     const data = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>', 
//       to: ['godigital74@gmail.com'], 
//       subject: `New Project Inquiry from ${firstName} ${lastName}`,
//       html: `
//         <h2>New Contact Request</h2>
//         <p><strong>Name:</strong> ${firstName} ${lastName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong><br/> ${message}</p>
//       `,
//     });

//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     console.error("Resend Error:", error);
//     return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // 1. Validate Email with MyEmailVerifier
    const apiKey = process.env.MYEMAILVERIFIER_API_KEY;
    
    if (!apiKey) {
      console.warn("MyEmailVerifier API key is missing. Skipping validation.");
    } else {
      const verifyUrl = `https://client.myemailverifier.com/verifier/validate_single/${email}/${apiKey}`;
      const verifyRes = await fetch(verifyUrl);
      const verifyData = await verifyRes.json();

      // If the email is explicitly invalid, block the request
      if (verifyData.Status === "Invalid") {
        return NextResponse.json(
          { error: "The provided email address does not exist or is invalid." },
          { status: 400 }
        );
      }
    }

    // 2. If email is valid, proceed to send via Resend
    const resendResponse = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', 
      to: ['godigital74@gmail.com'], 
      subject: `New Project Inquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    });

    // Check if Resend API returned an error
    if (resendResponse.error) {
      console.error("Resend API Error:", resendResponse.error);
      return NextResponse.json({ error: 'Failed to send email via Resend' }, { status: 500 });
    }

    // Success!
    return NextResponse.json({ success: true, data: resendResponse.data });
    
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Something went wrong processing your request.' }, { status: 500 });
  }
}

