import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS Configuration
const corsOptions = {
  origin: [
    "https://jyot-vasava.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(80000); // 80 seconds
  res.setTimeout(80000);
  next();
});

// Create transporter with better error handling
let transporter;
try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  console.log("📧 Transporter created successfully");
} catch (error) {
  console.error("❌ Failed to create transporter:", error);
}

// Verify transporter configuration
if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      console.log("❌ Email transporter error:", error.message);
    } else {
      console.log("✅ Server is ready to send emails");
    }
  });
} else {
  console.error("❌ Transporter not initialized - check environment variables");
}

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Ping endpoint to keep server warm
app.get("/api/ping", (req, res) => {
  res.json({ status: "alive", timestamp: new Date().toISOString() });
});

// Email sending endpoint with better error handling
app.post("/api/send-email", async (req, res) => {
  console.log("📧 Email request received:", new Date().toISOString());
  console.log("📍 Request origin:", req.headers.origin);

  const { name, email, subject, message } = req.body;

  // Check if transporter exists
  if (!transporter) {
    console.error("❌ Transporter not configured");
    return res.status(500).json({
      error: "Email service not configured properly",
      details: "SMTP settings missing",
    });
  }

  // Validation
  if (!name || !email || !subject || !message) {
    console.log("❌ Validation failed: Missing fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("❌ Invalid email format");
    return res.status(400).json({ error: "Invalid email format" });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #EAB308; border-bottom: 3px solid #EAB308; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #EAB308; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    console.log("📤 Attempting to send email...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", process.env.RECIPIENT_EMAIL);
    res.status(200).json({
      message: "Email sent successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || "NOT SET"}`);
  console.log(`📧 SMTP Port: ${process.env.SMTP_PORT || "NOT SET"}`);
  console.log(`📬 Recipient: ${process.env.RECIPIENT_EMAIL || "NOT SET"}`);
  console.log(`🌐 CORS enabled for: https://jyot-vasava.vercel.app`);
});
