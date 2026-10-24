import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		// to get payload body data
		const { email, subject, message } = await request.json()

		// Validate the submitted fields
		if (
			typeof email !== "string" ||
			typeof subject !== "string" ||
			typeof message !== "string" ||
			!email.trim() ||
			!subject.trim() ||
			!message.trim()
		) {
			return NextResponse.json(
				{ error: "Please complete all fields." },
				{ status: 400 }
			);
		}
		// Trim recieved data
		const normalizedEmail = email.trim();
		const normalizedSubject = subject.trim();
		const normalizedMessage = message.trim();

		//  validate normalized or trimed data
		if (
			normalizedEmail.length > 254 ||
			normalizedSubject.length > 150 ||
			normalizedMessage.length > 5000 ||
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
		) {
			return NextResponse.json(
				{ error: "Please enter valid details." },
				{ status: 400 }
			);
		}

		const apiKey = process.env.RESEND_EMAIL_API_KEY;
		const recipient = process.env.CONTACT_EMAIL;
		const from = process.env.CONTACT_FROM_EMAIL;

		// Vaidating Key details
		if (!apiKey || !recipient || !from) {
			console.error("Contact email environment variables are missing.");

			return NextResponse.json(
				{ error: "Email service is not configured." },
				{ status: 500 }
			);
		}

		//  Create resend object
		const resend = new Resend(apiKey);

		//Format email details object
		const { error } = await resend.emails.send({
			from,
			to: [recipient],
			replyTo: normalizedEmail,
			subject: `Portfolio Contact: ${normalizedSubject}`,
			text: [
				"You received a new message from your portfolio.",
				"",
				`Sender email: ${normalizedEmail}`,
				`Subject: ${normalizedSubject}`,
				"",
				"Message:",
				normalizedMessage,
			].join("\n"),
		});

		if (error) {
			console.error("Resend email error:", error);

			return NextResponse.json(
				{ error: "Unable to send your message right now." },
				{ status: 502 }
			);
		}

		return NextResponse.json({
			success: true,
			message: "Your message has been sent successfully!",
		});


	} catch (error) {
		console.error("Contact API error:", error);

		return NextResponse.json(
			{ error: "Something went wrong. Please try again." },
			{ status: 500 }
		);

	}
}