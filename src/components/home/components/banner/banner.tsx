"use client"
import Image from 'next/image';
import React, { useState } from 'react';


const Banner = () => {
    const [isOpen, setOpen] = useState(false)

    return (
        <div className='bg-image relative' id="home-section">
            <div className='arrowOne'></div>
            <div className='radial-banner hidden lg:content'></div>
            {/* <ModalVideo channel='youtube' isOpen={isOpen} videoId="1YyAzVmP9xQ" onClose={() => setOpen(false)} /> */}

            <div className="mx-auto max-w-7xl pt-16 lg:pt-40 sm:pb-24 px-6">

                <div className='height-work'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 my-16'>
                        <div className='arrowTwo'></div>
                        <div className='col-span-7'>
                            <h1 className="text-4xl lg:text-7xl font-bold mb-5 md:4px md:text-start text-center">
                                Buy,  Sell & Accept <br /> Digital Assets
                            </h1>
                            <p className='md:text-lg font-normal mb-10 md:text-start text-center'>Lorem Ipsum is simply dummy text of the printing and <br /> typesetting industry. Lorem Ipsum has been the industry <br /> standard dummy text ever since the 1500s</p>
                            <div className='flex align-middle justify-center md:justify-start'>
                                <button className='text-xl font-semibold py-4 px-6 lg:px-12 navbutton mr-6 text-white'>Get Started</button>
                                {/* <button onClick={() => setOpen(true)} className='bg-transparent flex justify-center items-center'><Image src={'/images/Banner/playbutton.svg'} alt="button-image" className='mr-3' width={47} height={47} />How it work</button> */}
                            </div>
                        </div>

                        <div className='col-span-5 '>
                            <div className='arrowThree'></div>
                            <div className='arrowFour'></div>
                            <div className='arrowFive'></div>
                            <Image src="/images/Banner/banner.png" alt="nothing" width={1013} height={760} />
                            <div className='arrowSix'></div>
                            <div className='arrowSeven'></div>
                            <div className='arrowEight'></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;
