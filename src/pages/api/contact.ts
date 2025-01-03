import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, phone, message } = req.body;

        const appPassword = process.env.APPPASSWORD;
        const fromEmail = process.env.EMAIL;
        const toEmail = process.env.TOEMAIL;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: fromEmail,
                pass: appPassword,
            },
        });

        const mailOptions = {
            from: fromEmail,
            to: toEmail,
            subject: `Сообщение от ${name}`,
            text: `имя - ${name},\n почта - ${email},\n телефон - ${phone}\n\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                    <p><strong>Имя:</strong> ${name}</p>
                    <p><strong>Почта:</strong> <a href="mailto:${email}" style="color: #1a73e8;">${email}</a></p>
                    <p><strong>Телефон:</strong> <a href="tel:${phone}" style="color: #1a73e8;">${phone}</a></p>
                    <p style="margin-top: 20px;"><strong>Сообщение:</strong></p>
                    <p style="white-space: pre-line;">${message}</p>
                </div>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
