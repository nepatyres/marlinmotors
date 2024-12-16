import EmailForm from '@/components/emailForm';
import { address, schedule } from '@/constants';
import React from 'react';

function Footer() {
    return (
        <div className="bg-black h-auto" id='scrollToFooter'>
            <div className="flex-col flex items-center w-[90%] sm:w-[80%] m-auto lg:flex-row lg:justify-between">
                <div className="w-full lg:w-[50%]">
                    <div className="font-ubuntuL text-white w-full">
                        <span className="flex justify-center mt-[50px] mb-2.5 font-gruppo font-semibold text-white/90 tracking-wider text-[30px]">MUS RASITE</span>
                        <div className="flex justify-between lg:flex-row mb-2.5 gap-[5px] font-ubuntuL w-full text-[20px] flex-col">
                            <p>{address}</p>
                            <p>{schedule}</p>
                        </div>
                    </div>
                    <div>
                        <iframe
                            className='w-full h-[300px] sm:h-[350px] lg:h-[390px]'
                            title='Embedded Map'
                            src="https://www.openstreetmap.org/export/embed.html?bbox=21.186389835586548%2C55.6779861422142%2C21.19714893722534%2C55.68100920402566&amp;layer=mapnik&amp;marker=55.67962968694164%2C21.191895386429965"
                            style={{ border: '1px solid black' }}
                        ></iframe>
                    </div>
                </div>
                <EmailForm />
            </div>
            <div className='flex justify-center flex-col w-full text-center items-center m-0 bottom-0 left-0 pt-14 pb-2'>
                {/* <span className='text-[#ffffffb3] font-ubuntuL'>Designed and developed by <a className='no-underline font-ubuntuL text-white/70' target='_blank' rel="noreferrer" href='https://julijus.com'>Julijus</a></span> */}
                <span className='text-[#71717a] font-ubuntuL leading-none'>© 2024 All rights reserved</span>
            </div>
        </div>
    )
}

export default Footer;