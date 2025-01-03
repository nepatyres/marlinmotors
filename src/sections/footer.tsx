import EmailForm from '@/components/emailForm';
import { address, schedule, scheduleRu } from '@/constants';
import React from 'react';

function Footer({ language }: any) {
    return (
        <div className="bg-black h-auto" id='scrollToFooter'>
            <div className="flex-col flex items-center w-[90%] sm:w-[80%] m-auto lg:flex-row lg:justify-between">
                <div className="w-full lg:w-[50%]">
                    <div className="font-ubuntuL text-white w-full">
                        <span className={`flex justify-center mt-[50px] mb-2.5 text-white/90 tracking-wider text-[30px] ${language ? 'font-gruppo font-semibold' : 'font-montserratR'}`}>{language ? 'MUS RASITE' : 'НАС НАЙДЕТЕ'}</span>
                        <div className="flex justify-between lg:flex-row mb-2.5 gap-[5px] font-ubuntuL w-full text-[20px] flex-col">
                            <p>{address}</p>
                            <p>{language ? schedule : scheduleRu}</p>
                        </div>
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d140.43265493886796!2d21.13829308051765!3d55.72509936134936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e4d90ab964e2b7%3A0xbf8131d32e2e72b!2sMarlin%20Motors!5e0!3m2!1sen!2slt!4v1735913504637!5m2!1sen!2slt"
                            loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full h-[300px] sm:h-[350px] lg:h-[390px]'>
                        </iframe>
                    </div>
                </div>
                <EmailForm language={language} />
            </div>
            <div className='flex justify-center flex-col w-full text-center items-center m-0 bottom-0 left-0 pt-14 pb-2'>
                <span className='text-[#71717a] font-ubuntuL leading-none'>© 2024 {language ? 'All rights reserved' : 'Все права защищены'}</span>
            </div>
        </div>
    )
}

export default Footer;