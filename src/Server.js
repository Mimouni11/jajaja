const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configure the transporter for SMTP (example using Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail", // Or use another SMTP provider (e.g., Outlook, SendGrid, etc.)
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password
  },
});

// Send email function
const sendEmail = (toEmail, password) => {
  const mailOptions = {
    from: "your-email@gmail.com", // Replace with your email
    to: toEmail,
    subject: "Your Account Details",
    text: `Hello, \n\nYour account has been created successfully. \n\nEmail: ${toEmail} \nPassword: ${password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Route to send the email
app.post("/send-email", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  sendEmail(email, password);

  return res.status(200).json({ message: "Email sent successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
