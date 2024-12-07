const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configure the transporter for SMTP (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail SMTP server
  auth: {
    user: "firastibi06@gmail.com", // Replace with your Gmail address
    pass: "sqar gwlr lvgr bxgm", // Replace with your Gmail app password
  },
});

// Send email function
const sendEmail = (toEmail, password) => {
  const mailOptions = {
    from: "firastibi06@gmail.com", // Replace with your Gmail address
    to: toEmail,
    subject: "Your Account Details",
    text: `Hello, \n\nYour account has been created successfully. \n\nEmail: ${toEmail} \nPassword: ${password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
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
