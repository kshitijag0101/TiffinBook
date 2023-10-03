import { BsArrowRight } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import Link from "next/link";

export default function Footer({ children }) {
    return (
        <footer className="bg-lb text-white py-2 pl-6 pr-6 md:pl-12 md:pr-12 sm:w-100 lg:max-w-full">
            <div className="flex flex-col md:flex-row justify-between lg:mt-10">
                <div className="md:w-1/4 lg:ml-32">
                    <Link href="/">
                        <h1 className="font-serif font-bold italic text-3xl">
                            Sister&apos;s{" "}
                            <span className="text-red-800">Spices</span>
                        </h1>
                    </Link>
                    <p className="font-medium text-xl md:text-2xl text-gray-200 mt-6 md:w-80 md:pr-10">
                        Fresh, Tasty, and Convenient – Tiffin Service at its
                        Best!
                    </p>
                </div>
                <div className="text-2xl font-semibold text-gray-200 mt-8 md:mt-0 md:w-1/4 md:ml-10">
                    <h1>Menu</h1>
                    <ul className="mt-6 text-xl font-medium">
                        <a href="/">
                            <li className="flex gap-4 py-2">
                                Home <BsArrowRight className="lg:mt-2 mt-2" />
                            </li>
                        </a>
                        <a href="/Menu">
                            <li className="flex gap-4 py-2 ">
                                Menu <BsArrowRight className="lg:mt-2 mt-2" />
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="text-2xl font-semibold text-gray-200 mt-8 md:mt-0 md:w-1/4 lg:mr-10">
                    <h1>Contact Us</h1>
                    <div className="mt-6 flex">
                        <MdLocationOn />
                        <h1 className="ml-4 text-xl font-medium md:w-56">
                            1717 Harrison St, San Francisco, CA 94103, United
                            States
                        </h1>
                    </div>
                    <hr className="mt-3 md:hidden" />
                    <div className="mt-3 flex">
                        <MdEmail />
                        <h1 className="ml-4 text-xl font-medium md:w-56">
                            tiffinservice@mail.com
                        </h1>
                    </div>
                    <div className="mt-3 flex">
                        <BsFillTelephoneFill />
                        <h1 className="ml-4 text-xl font-medium md:w-56">
                            +91 7453201387
                        </h1>
                    </div>
                </div>
            </div>
            <hr className="mt-7 ml-6 mr-6 md:ml-32 md:mr-32" />
            <div className="text-sm font-light flex flex-col md:flex-row justify-between lg:ml-32 lg:mr-28">
                <h1 className="py-4">
                    Copyright © 2023. TiffinService. All rights reserved.
                </h1>
                <div className="flex mt-4 md:mt-0 lg:ml-10 ">
                    <h1 className="p-4 pl-6 pr-10">Privacy Policy</h1>
                    <h1 className="p-4 pl-6 ">Terms & Service</h1>
                </div>
            </div>
        </footer>
    );
}
