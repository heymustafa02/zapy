import nodemailer from "nodemailer";

// const transport = nodemailer.createTransport({
//     host: process.env.SMTP_ENDPOINT,
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//       user: process.env.SMTP_USERNAME,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });
const transport = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  logger: true,
  debug: true,
});

transport.verify((err, success) => {
  if (err) {
    console.error("transporter.verify() error:", err);
  } else {
    console.log("transporter verified:", success);
  }
});

// export async function sendEmail(to: string, body: string) {
//     await transport.sendMail({
//         from: "mallebhari.login@gmail.com",
//         sender: "mallebhari.login@gmail.com",
//         to,
//         subject: "Hello from Zapier",
//         text: body
//     })  
// }
export async function sendEmail(to: string, body: string) {
  try {
    const info = await transport.sendMail({
      from: "mallebhari.login@gmail.com",
      sender: "mallebhari.login@gmail.com",
      to,
      subject: "Hello from Zapy",
      text: body  
    });
    console.log("sendMail info:", info);
  } catch (err) {
    console.error("sendMail failed:", err);
    throw err;
  }
}
