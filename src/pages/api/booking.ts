import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {
            formData,
            carType,
            selectedType,
            services,
            toggleStates,
            moreToggleStates,
            subtotal,
            promoCode,
            sum,
            selectedOption,
            toggler,
            selection,
            moreToggles,
        } = req.body;

        const formattedSum = parseFloat(sum).toFixed(2);
        const generateServicesHTML = () => {
            let servicesHTML = '';

            toggler.forEach((tog: any, i: number) => {
                if (Number(services[i].index) >= 0) {
                    servicesHTML += `
                        <div style="display: flex; padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 8px;">
                            <div style="width: 64px; height: 64px; margin-right: 12px;">
                                <img src="${selection[i].options[Number(services[i].index)].url}"
                                     style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover;"
                                     alt="${selection[i].options[Number(services[i].index)].name}"/>
                            </div>
                            <div style="flex: 1;">
                                <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0;">
                                    ${selection[i].options[Number(services[i].index)].name}
                                </p>
                                <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 4px 0 0 0;">
                                    €${selection[i].options[Number(services[i].index)].price}
                                </p>
                            </div>
                        </div>
                    `;
                }

                if (toggleStates[i]) {
                    Object.entries(toggleStates[i]).forEach(([toggleIndex, isActive]) => {
                        if (isActive) {
                            servicesHTML += `
                                <div style="display: flex; padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 8px;">
                                    <div style="width: 64px; height: 64px; margin-right: 12px;">
                                        <img src="${selection[i].toggle[+toggleIndex]?.url}"
                                             style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover;"
                                             alt="${selection[i].toggle[+toggleIndex]?.name}"/>
                                    </div>
                                    <div style="flex: 1;">
                                        <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0;">
                                            ${selection[i].toggle[+toggleIndex]?.name}
                                        </p>
                                        <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 4px 0 0 0;">
                                            €${selection[i].toggle[+toggleIndex]?.price || 0}
                                        </p>
                                    </div>
                                </div>
                            `;
                        }
                    });
                }
            });

            Object.entries(moreToggleStates).forEach(([toggleIndex, isActive]) => {
                if (isActive) {
                    servicesHTML += `
                        <div style="display: flex; padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 8px;">
                            <div style="width: 64px; height: 64px; margin-right: 12px;">
                                <img src="${moreToggles[+toggleIndex].url}"
                                     style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover;"
                                     alt="${moreToggles[+toggleIndex].name}"/>
                            </div>
                            <div style="flex: 1;">
                                <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0;">
                                    ${moreToggles[+toggleIndex].name}
                                </p>
                                <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 4px 0 0 0;">
                                    €${moreToggles[+toggleIndex].price}
                                </p>
                            </div>
                        </div>
                    `;
                }
            });

            return servicesHTML;
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APPPASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.TOEMAIL,
            subject: `Сообщение от ${formData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; background-color: #1a1a1a; padding: 20px; border-radius: 8px;">
                    <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #ffffff; margin-bottom: 20px;">Order Details</h2>
                        <p style="color: #ffffff;"><strong>Модель машины:</strong> <span style="color: #1a73e8;">${formData.model}</span></p>
                        <p style="color: #ffffff;"><strong>Номер машины:</strong> <span style="color: #1a73e8;">${formData.plate}</span></p>
                        <p style="color: #ffffff;"><strong>Имя:</strong> <span style="color: #1a73e8;">${formData.name}</span></p>
                        <p style="color: #ffffff;"><strong>Почта:</strong> <span style="color: #1a73e8;">${formData.email}</span></p>
                        <p style="color: #ffffff;"><strong>Телефон:</strong> <span style="color: #1a73e8;">${formData.number}</span></p>
                        
                        <div style="margin-top: 20px;">
                            <h3 style="color: #ffffff;">Selected Services</h3>
                            ${generateServicesHTML()}
                        </div>

                        <div style="margin-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px;">
                            <p style="color: #ffffff; font-size: 18px;"><strong>Total:</strong> <span style="color: #1a73e8;">€${formattedSum}</span></p>
                        </div>
                    </div>
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
