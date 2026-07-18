import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    /*
     * Hidden honeypot field.
     * Normal users will leave this empty, while many bots fill it.
     */
    if (website) {
      return NextResponse.json({
        success: true,
        message: "Message Sent Successfully!",
      });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Complete All Required Fields",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Enter a Valid Email Address",
        },
        { status: 400 },
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must be 100 characters or fewer.",
        },
        { status: 400 },
      );
    }

    if (subject.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject must be 150 characters or fewer.",
        },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be 5,000 characters or fewer.",
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    const senderEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Explore Contact <onboarding@resend.dev>";

    if (!apiKey || !receiverEmail) {
      console.error("Missing Resend environment variables!");

      return NextResponse.json(
        {
          success: false,
          message: "The Email Service Has Not Been Configured!",
        },
        { status: 500 },
      );
    }

    // Prevent line breaks from being inserted into the email subject.
    const safeSubject = subject.replace(/[\r\n]+/g, " ");

    const emailText = `
      New message from the Explore contact form

        Name: ${name}
        Email: ${email}
        Subject: ${safeSubject}

      Message:
        ${message}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [receiverEmail],
      replyTo: email,
      subject: `[Explore Contact] ${safeSubject}`,
      text: emailText,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "The message could not be sent. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your Message Was Sent Successfully!",
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}
