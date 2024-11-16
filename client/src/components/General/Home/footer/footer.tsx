
const footer = () => {
    return (
        <div className="w-full h-auto bg-stone-900" >
            <div className="p-16 h-[50px] relative">
                <span className="text-red-500 text-3xl font-extrabold font-montserrat break-words">TECH</span>
                <span className="text-red-500 text-3xl font-normal font-montserrat break-words">UNT</span>
            </div>
            <div>
                <div className=" w-auto h-auto grid grid-cols-4 gap-4">
                    <div className="bg- w-auto ml-16  xl:col-span-1 md:col-span-2 sm:col-span-2 col-span-4">
                        <ul className="text-white text-xs font-sans leading-snug flex flex-col">
                            <li className="mb-4"><b>For clients</b></li>
                            <li className="mb-2">How to Hire</li>
                            <li className="mb-2">Talent Marketplace</li>
                            <li className="mb-2">Project Catalog</li>
                            <li className="mb-2">Talent Scout</li>
                            <li className="mb-2">Enterprise</li>
                            <li className="mb-2">Payroll Services</li>
                            <li className="mb-2">Direct Contracts</li>
                            <li className="mb-2">Hire Worldwide</li>
                            <li className="mb-2">Hire in the USA</li>
                        </ul>
                    </div>
                    <div className=" w-auto ml-16   ">
                        <ul className="text-white text-xs font-sans leading-snug flex flex-col">
                            <li className="mb-4 text-bold"><b>For Talent</b></li>
                            <li className="mb-2">How to Find Work</li>
                            <li className="mb-2">Direct Contracts</li>
                            <li className="mb-2">Find Freelance Jobs Worldwide</li>
                            <li className="mb-2">Find Freelance Jobs in the USA</li>
                        </ul>
                    </div>
                    <div className=" w-auto ml-16  xl:col-span-1 md:col-span-2 sm:col-span-2 col-span-4">
                        <ul className="text-white text-xs font-sans leading-snug flex flex-col">
                            <li className="mb-4"><b>Help & Support</b></li>
                            <li className="mb-2">Success Stories</li>
                            <li className="mb-2">Upwork Reviews</li>
                            <li className="mb-2">Resources</li>
                            <li className="mb-2">Blog</li>
                            <li className="mb-2">Community</li>
                            <li className="mb-2">Affiliate Program</li>
                        </ul>
                    </div>
                    <div className=" w-auto ml-16  xl:col-span-1 md:col-span-2 sm:col-span-2 col-span-4">
                        <ul className="text-white text-xs font-sans leading-snug flex flex-col">
                            <li className="mb-4"><b>About Us</b></li>
                            <li className="mb-2">Leadership</li>
                            <li className="mb-2">Investor Relations</li>
                            <li className="mb-2">Careers</li>
                            <li className="mb-2">Our Impact</li>
                            <li className="mb-2">Press</li>
                            <li className="mb-2">Contact Us</li>
                            <li className="mb-2">Trust, Safety & Security</li>
                            <li className="mb-2">UK Modern Slavery Statement</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default footer;