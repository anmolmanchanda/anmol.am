import { NextRequest, NextResponse } from "next/server"
import { ContactFormData } from "@/types"

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json()

    // Validate the data
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Here you would typically send an email using a service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // - Or save to a database

    // For now, we'll just log the submission
    console.log("Contact form submission:", body)

    // In production, you'd send the email here
    // Example with a hypothetical email service:
    // await emailService.send({
    //   to: "hi@anmol.am",
    //   from: body.email,
    //   subject: `Contact Form: ${body.subject}`,
    //   text: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`
    // })

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}