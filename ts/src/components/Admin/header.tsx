
const header = () => {
    return (
        <>
            <header className="bg-gray-900 ">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-2  lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1 text-white">
                        <a className="flex items-center w-full px-3 mt-3" href="#">
                            <svg className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                            </svg>
                            <span className="ml-2 text-md font-bold">TECHUNT </span>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <div className="relative">
                            <button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white" aria-expanded="false">
                                Product
                                <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <a href="#" className="text-sm font-semibold leading-6 text-white">Features</a>
                        <a href="#" className="text-sm font-semibold leading-6 text-white">Marketplace</a>
                        <a href="#" className="text-sm font-semibold leading-6 text-white">Company</a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    </div>
                </nav>
            </header>
        </>
    )
}


export default header;