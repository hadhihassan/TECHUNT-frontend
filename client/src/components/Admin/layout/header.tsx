import {
    Navbar,
    Typography,
} from "@material-tailwind/react";
const AdminHeader = () => {
    return (
        <>
            <Navbar
                variant="gradient"
                color="blue"
                className="mx-auto w-[100%] border-b-2 bg-gray-900  from-blue-gray-900 to-blue-gray-800 px-4 py-3 rounded-none" placeholder={undefined}            >
                <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
                    <Typography
                        as="a"
                        variant="h4"
                        className="flex items-center mr-4 ml-2 cursor-pointer py-1.5" placeholder={undefined}                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-10 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                            />
                        </svg>
                        TECHUNT ADMIN
                    </Typography>
                </div>
            </Navbar>
        </>
    )
}


export default AdminHeader;