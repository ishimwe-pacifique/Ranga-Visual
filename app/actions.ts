"use server"

import dbConnect from "@/lib/dbConnect"
import Booking from "@/models/Booking"
import nodemailer from "nodemailer"

export async function createBooking(formData: FormData) {
  console.log("🚀 Server action called")

  try {
    // Test email configuration first
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: "pacifiquishimwe151@gmail.com",
        pass: "rxvv xzsh ysta iayz", // Your app password
      },
    })

    console.log("📧 Transporter created")

    // Verify transporter
    await transporter.verify()
    console.log("✅ Email transporter verified successfully")

    // Extract form data
    const clientName = formData.get("clientName") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const paymentAmount = formData.get("paymentAmount") as string
    const pickupDate = formData.get("pickupDate") as string
    const pickupTime = formData.get("pickupTime") as string
    const returnDate = formData.get("returnDate") as string
    const returnTime = formData.get("returnTime") as string
    const workLocation = formData.get("workLocation") as string

    console.log("📝 Form data extracted:", { clientName, email, phone })

    // Extract equipment items
    const equipment: Array<{ item: string; quantity: number }> = []
    let i = 0
    while (formData.has(`equipment[${i}].item`)) {
      const item = formData.get(`equipment[${i}].item`) as string
      const quantity = Number.parseInt(formData.get(`equipment[${i}].quantity`) as string)
      if (item && !isNaN(quantity)) {
        equipment.push({ item, quantity })
      }
      i++
    }

    console.log("🛠️ Equipment extracted:", equipment)

    // Connect to database
    await dbConnect()
    console.log("🗄️ Database connected")

    // Save to database
    const newBooking = new Booking({
      clientName,
      phone,
      email,
      equipment,
      paymentAmount,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      workLocation,
    })

    await newBooking.save()
    console.log("💾 Booking saved to database")

    // Create email content
    const equipmentList = equipment.map((eq, index) => `${index + 1}. ${eq.item} - Quantity: ${eq.quantity}`).join("\n")

    const emailBody = `
NEW BOOKING REQUEST - RANGA VISUALS

CLIENT INFORMATION:
Name: ${clientName}
Phone: ${phone}
Email: ${email}

EQUIPMENT REQUESTED:
${equipmentList}

RENTAL DETAILS:
Payment Amount: ${paymentAmount} RWF
Pickup: ${pickupDate} at ${pickupTime}
Return: ${returnDate} at ${returnTime}
Work Location: ${workLocation}

PAYMENT METHOD:
MoMoPay CODE: *182*8*1*997006*${paymentAmount}#

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
    `

    console.log("📄 Email content prepared")

    // Send email
    const mailOptions = {
      from: "pacifiquishimwe151@gmail.com",
      to: "rangavisuals@gmail.com",
      subject: `🔔 New Booking: ${clientName} - ${equipment[0]?.item || "Equipment Rental"}`,
      text: emailBody,
      html: `<pre style="font-family: Arial, sans-serif; line-height: 1.6; background: #f5f5f5; padding: 20px; border-radius: 8px;">${emailBody}</pre>`,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("✅ Email sent successfully:", result.messageId)

    return {
      success: true,
      message: "Booking created and email sent successfully!",
      emailId: result.messageId,
    }
  } catch (error) {
    console.error("❌ Error in createBooking:", error)

    // Return detailed error information
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      error: error instanceof Error ? error.stack : String(error),
    }
  }
}

// Test function to check email only
export async function testEmail() {
  console.log("🧪 Testing email functionality...")

  try {
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: "pacifiquishimwe151@gmail.com",
        pass: "rxvv xzsh ysta iayz",
      },
    })

    await transporter.verify()
    console.log("✅ Email configuration is valid")

    const testResult = await transporter.sendMail({
      from: "pacifiquishimwe151@gmail.com",
      to: "rangavisuals@gmail.com",
      subject: "🧪 Test Email from Ranga Visuals",
      text: "This is a test email to verify the email functionality is working.",
      html: "<h2>Test Email</h2><p>This is a test email to verify the email functionality is working.</p>",
    })

    console.log("✅ Test email sent:", testResult.messageId)
    return { success: true, message: "Test email sent successfully!", messageId: testResult.messageId }
  } catch (error) {
    console.error("❌ Test email failed:", error)
    return {
      success: false,
      message: `Test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      error: String(error),
    }
  }
}
