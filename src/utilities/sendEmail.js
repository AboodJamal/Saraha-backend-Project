import nodemailer from "nodemailer";

async function SendEmail(to, html) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const info = await transporter.sendMail({
        from: `The GOAT Website --> <${process.env.EMAIL_ACCOUNT}>`,
        to,
        subject: "Hey bro",
        html
    });

};

export default SendEmail;