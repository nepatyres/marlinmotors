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
            subtotal,
            promoCode,
            sum,
            selectedOption,
            toggler,
            selection,
            selectedDate,
            selectedSlot
        } = req.body;

        const formattedSum = parseFloat(sum).toFixed(2);
        const formatPrice = (price: number) => price.toFixed(2);
        const carTypeExtra = formatPrice((subtotal * carType) - subtotal);

        const getAbsoluteImageUrl = (url: string) => {
            if (!url) return '';
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            return `${process.env.NEXT_PUBLIC_DOMAIN || 'https://your-domain.com'}${url.startsWith('/') ? '' : '/'}${url}`;
        };

        const generateServicesHTML = () => {
            let servicesHTML = '';
            toggler.forEach((tog: any, i: number) => {
                if (Number(services[i].index) >= 0) {
                    const imageUrl = getAbsoluteImageUrl(selection[i].options[Number(services[i].index)].url);
                    servicesHTML += `
                        <div style="display: flex; padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 8px;">
                            <div style="width: 64px; height: 64px; margin-right: 12px;">
                                <img src="${imageUrl}"
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
                            const imageUrl = getAbsoluteImageUrl(selection[i].toggle[+toggleIndex]?.url);
                            servicesHTML += `
                                <div style="display: flex; padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 8px;">
                                    <div style="width: 64px; height: 64px; margin-right: 12px;">
                                        <img src="${imageUrl}"
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

        const formatDate = (date: Date) => {
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        };

        const russianMailOptions = {
            from: process.env.EMAIL,
            to: process.env.TOEMAIL,
            subject: `Заказ от ${formData.name}, ${formatDate(new Date(selectedDate))} ${selectedSlot}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; background-color: #1a1a1a; padding: 20px; border-radius: 8px;">
                    <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #ffffff; margin-bottom: 20px;">Детали резервации</h2>
                        <p style="color: #ffffff;"><strong>Модель автомобиля:</strong> <span style="color: #1a73e8;">${formData.model}</span></p>
                        <p style="color: #ffffff;"><strong>Регистрационный номер:</strong> <span style="color: #1a73e8;">${formData.plate}</span></p>
                        <p style="color: #ffffff;"><strong>Имя клиента:</strong> <span style="color: #1a73e8;">${formData.name}</span></p>
                        <p style="color: #ffffff;"><strong>Электронная почта:</strong> <span style="color: #1a73e8;">${formData.email}</span></p>
                        <p style="color: #ffffff;"><strong>Телефон:</strong> <span style="color: #1a73e8;">${formData.number}</span></p>
                        ${formData.address.trim().length > 0 ? `<p style="color: #ffffff;"><strong>Локация автомобиля:</strong> <span style="color: #1a73e8;">${formData.address}</span></p>` : ''}
                        
                        <div style="margin-top: 20px;">
                            <h3 style="color: #ffffff;">Выбранные услуги</h3>
                            ${generateServicesHTML()}
                        </div>

                        <div style="margin-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px;">
                            <p style="color: #ffffff; font-size: 16px;"><strong>Промежуточная сумма:</strong> <span style="color: #1a73e8;">€${formatPrice(subtotal)}</span></p>
                            <p style="color: #ffffff; font-size: 16px;"><strong>Тип кузова:</strong> <span style="color: #1a73e8;">€${carTypeExtra}</span></p>
                            ${promoCode ? `<p style="color: #ffffff; font-size: 16px;"><strong>Промокод:</strong> <span style="color: #1a73e8;">-€${promoCode}</span></p>` : ''}
                            <p style="color: #ffffff; font-size: 18px;"><strong>Итоговая сумма:</strong> <span style="color: #1a73e8;">€${formattedSum}</span></p>
                        </div>
                    </div>
                </div>
            `,
        };

        const lithuanianMailOptions = {
            from: process.env.EMAIL,
            to: formData.email,
            subject: `Dėkojame už Jūsų rezervaciją!`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; background-color: #1a1a1a; padding: 20px; border-radius: 8px;">
                    <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px;">
                        
                        <div style="margin-top: 20px;">
                            <h2 style="color: #ffffff;"><strong>Jūsų rezervacijos data ir laikas</strong> ${formatDate(new Date(selectedDate))} ${selectedSlot}</h2>
                        </div>
        
                        <div style="margin-top: 20px;">
                            <h3 style="color: #ffffff;">Pasirinktos paslaugos</h3>
                            ${generateServicesHTML()}
                        </div>
        
                        <div style="margin-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px;">
                            <p style="color: #ffffff; font-size: 16px;"><strong>Tarpinė suma:</strong> <span style="color: #1a73e8;">€${formatPrice(subtotal)}</span></p>
                            <p style="color: #ffffff; font-size: 16px;"><strong>Kūno tipas:</strong> <span style="color: #1a73e8;">€${carTypeExtra}</span></p>
                            ${promoCode ? `<p style="color: #ffffff; font-size: 16px;"><strong>Nuolaidos kodas:</strong> <span style="color: #1a73e8;">-€${promoCode}</span></p>` : ''}
                            <p style="color: #ffffff; font-size: 18px;"><strong>Bendra suma:</strong> <span style="color: #1a73e8;">€${formattedSum}</span></p>
                        </div>
        
                        <div style="margin-top: 20px;">
                            <p style="color: #ffffff;">Jeigu turite klausimų, susisiekite su mumis. Mes visada pasiruošę padėti!</p>
                        </div>
                    </div>
                </div>
            `,
        };
        

        try {
            await transporter.sendMail(russianMailOptions);
            await transporter.sendMail(lithuanianMailOptions);
            res.status(200).json({ success: true, message: 'Emails sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
