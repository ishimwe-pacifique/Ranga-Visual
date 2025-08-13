"use server"

import dbConnect from "@/lib/dbConnect"
import Booking from "@/models/Booking"
import nodemailer from "nodemailer"

export async function createBooking(formData: FormData) {
  console.log("🚀 Server action called")

  try {
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pacifiquishimwe151@gmail.com",
        pass: "rxvv xzsh ysta iayz",
      },
    })

    console.log("📧 Transporter created")

    // Verify email configuration
    await transporter.verify()
    console.log("✅ Email transporter verified")

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

    // Connect to database and save booking
    await dbConnect()
    console.log("🗄️ Database connected")

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

    // Prepare equipment list for emails
    const equipmentListText = equipment.map((eq, index) => `${index + 1}. ${eq.item} (Qty: ${eq.quantity})`).join("\n")
    const equipmentListHtml = equipment.map((eq, index) => `<li>${eq.item} - Quantity: ${eq.quantity}</li>`).join("")

    // Send business notification email
    const businessEmailResult = await transporter.sendMail({
      from: "pacifiquishimwe151@gmail.com",
      to: "rangavisuals@gmail.com",
      subject: `🔔 New Equipment Booking - ${clientName}`,
      text: createBusinessEmailText(
        clientName,
        phone,
        email,
        equipmentListText,
        paymentAmount,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        workLocation,
      ),
      html: createBusinessEmailHtml(
        clientName,
        phone,
        email,
        equipmentListHtml,
        paymentAmount,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        workLocation,
      ),
    })

    console.log("✅ Business email sent:", businessEmailResult.messageId)

    // Send customer confirmation email
    const customerEmailResult = await transporter.sendMail({
      from: "Ranga Visuals <pacifiquishimwe151@gmail.com>",
      to: email,
      subject: `✅ Booking Confirmation - Thank You ${clientName}!`,
      text: createCustomerEmailText(
        clientName,
        equipmentListText,
        paymentAmount,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        workLocation,
      ),
      html: createCustomerEmailHtml(
        clientName,
        equipmentListHtml,
        paymentAmount,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        workLocation,
      ),
    })

    console.log("✅ Customer email sent:", customerEmailResult.messageId)

    return {
      success: true,
      message: "Booking created successfully! Confirmation emails sent to both you and our team.",
      businessEmailId: businessEmailResult.messageId,
      customerEmailId: customerEmailResult.messageId,
    }
  } catch (error) {
    console.error("❌ Error in createBooking:", error)
    return {
      success: false,
      message: `Booking failed: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      error: error instanceof Error ? error.stack : String(error),
    }
  }
}

// Business notification email templates
function createBusinessEmailText(
  clientName: string,
  phone: string,
  email: string,
  equipmentList: string,
  paymentAmount: string,
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
  workLocation: string,
) {
  return `
NEW EQUIPMENT BOOKING REQUEST

CLIENT DETAILS:
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

PAYMENT INFO:
MoMoPay Code: *182*8*1*997006*${paymentAmount}#

Booking Time: ${new Date().toLocaleString()}

Please contact the client to confirm availability and arrange pickup.
  `
}

function createBusinessEmailHtml(
  clientName: string,
  phone: string,
  email: string,
  equipmentList: string,
  paymentAmount: string,
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
  workLocation: string,
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #2563eb; margin-bottom: 20px; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
          🔔 New Equipment Booking
        </h1>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #334155; margin-top: 0;">Client Information</h2>
          <p><strong>Name:</strong> ${clientName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>

        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #166534; margin-top: 0;">Equipment Requested</h2>
          <ul style="margin: 0; padding-left: 20px;">
            ${equipmentList}
          </ul>
        </div>

        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #92400e; margin-top: 0;">Rental Details</h2>
          <p><strong>Payment Amount:</strong> ${paymentAmount} RWF</p>
          <p><strong>Pickup:</strong> ${pickupDate} at ${pickupTime}</p>
          <p><strong>Return:</strong> ${returnDate} at ${returnTime}</p>
          <p><strong>Work Location:</strong> ${workLocation}</p>
        </div>

        <div style="background: #ddd6fe; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #6b21a8; margin-top: 0;">Payment Information</h2>
          <p><strong>MoMoPay Code:</strong> <code style="background: #fff; padding: 5px 10px; border-radius: 4px;">*182*8*1*997006*${paymentAmount}#</code></p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 14px;">
            Booking received: ${new Date().toLocaleString()}<br>
            Please contact the client to confirm availability and arrange pickup.
          </p>
        </div>
      </div>
    </div>
  `
}

// Customer confirmation email templates
function createCustomerEmailText(
  clientName: string,
  equipmentList: string,
  paymentAmount: string,
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
  workLocation: string,
) {
  return `
Dear ${clientName},

Thank you for booking equipment with RANGA Visuals! 🎬

We have received your rental request and our team will contact you shortly to confirm availability and finalize the details.

YOUR BOOKING DETAILS:
${equipmentList}

RENTAL PERIOD:
Pickup: ${pickupDate} at ${pickupTime}
Return: ${returnDate} at ${returnTime}
Location: ${workLocation}

PAYMENT: ${paymentAmount} RWF
Payment Method: MoMoPay *182*8*1*997006*${paymentAmount}# (Pay to Patrick)

WHAT'S NEXT?
1. Our team will call you within 24 hours to confirm availability
2. Complete payment before pickup date
3. Bring valid ID for equipment pickup
4. Return equipment on time in good condition

CONTACT US:
Phone: +250 786 008 625, +250 783 897 631
Address: KG 11 Ave, Kigali-Rwanda, Kimironko Opposite COPEDU Bank

Thank you for choosing RANGA Visuals for your creative projects!

Best regards,
RANGA Visuals Team
  `
}

function createCustomerEmailHtml(
  clientName: string,
  equipmentList: string,
  paymentAmount: string,
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
  workLocation: string,
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🎬 RANGA Visuals</h1>
        <p style="color: #e2e8f0; margin: 10px 0 0 0;">Professional Equipment Rentals</p>
      </div>
      
      <div style="background: white; padding: 30px;">
        <h2 style="color: #2563eb; margin-top: 0;">Hello ${clientName}! 👋</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Thank you for booking equipment with us! We're excited to help bring your creative vision to life.
        </p>
        
        <div style="background: #f0f9ff; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">📋 Your Booking Details</h3>
          <ul style="margin: 10px 0; padding-left: 20px; color: #374151;">
            ${equipmentList}
          </ul>
        </div>

        <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin: 20px 0;">
          <h3 style="color: #15803d; margin-top: 0;">📅 Rental Schedule</h3>
          <p style="margin: 5px 0;"><strong>Pickup:</strong> ${pickupDate} at ${pickupTime}</p>
          <p style="margin: 5px 0;"><strong>Return:</strong> ${returnDate} at ${returnTime}</p>
          <p style="margin: 5px 0;"><strong>Location:</strong> ${workLocation}</p>
        </div>

        <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
          <h3 style="color: #d97706; margin-top: 0;">💰 Payment Information</h3>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${paymentAmount} RWF</p>
          <p style="margin: 5px 0;"><strong>MoMoPay Code:</strong> 
            <code style="background: #fef3c7; padding: 5px 10px; border-radius: 4px; font-weight: bold;">
              *182*8*1*997006*${paymentAmount}#
            </code>
          </p>
          <p style="margin: 5px 0; font-size: 14px; color: #92400e;">Pay to: Patrick</p>
        </div>

        <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #475569; margin-top: 0;">🚀 What Happens Next?</h3>
          <ol style="color: #374151; line-height: 1.6;">
            <li>Our team will call you within 24 hours to confirm equipment availability</li>
            <li>Complete payment using the MoMoPay code above before pickup</li>
            <li>Bring valid ID when picking up equipment</li>
            <li>Return equipment on time and in good condition</li>
          </ol>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <div style="background: #1f2937; color: white; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #f9fafb;">📞 Contact Us</h3>
            <p style="margin: 5px 0;">Phone: +250 786 008 625, +250 783 897 631</p>
            <p style="margin: 5px 0;">Address: KG 11 Ave, Kigali-Rwanda</p>
            <p style="margin: 5px 0;">Kimironko Opposite COPEDU Bank</p>
          </div>
        </div>

        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Thank you for choosing RANGA Visuals for your creative projects! 🎥✨
          </p>
        </div>
      </div>
    </div>
  `
}

// Test email function
export async function testEmail() {
  console.log("🧪 Testing email functionality...")

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pacifiquishimwe151@gmail.com",
        pass: "rxvv xzsh ysta iayz",
      },
    })

    await transporter.verify()
    console.log("✅ Email configuration verified")

    const testResult = await transporter.sendMail({
      from: "Ranga Visuals <pacifiquishimwe151@gmail.com>",
      to: "rangavisuals@gmail.com",
      subject: "🧪 Email Test - System Working",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #16a34a;">✅ Email System Test</h2>
          <p>This is a test email to confirm that the email system is working properly.</p>
          <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">If you received this email, the system is working correctly! 🎉</p>
          </div>
        </div>
      `,
    })

    console.log("✅ Test email sent:", testResult.messageId)
    return {
      success: true,
      message: "Test email sent successfully!",
      messageId: testResult.messageId,
    }
  } catch (error) {
    console.error("❌ Test email failed:", error)
    return {
      success: false,
      message: `Test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      error: String(error),
    }
  }
}
