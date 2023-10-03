"use client";
import Image from "next/image";
import deliveryboy from "../public/deliveryboy.png";
import { useState } from "react";
import { checkPincode } from "../api/UserAPI";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import useAuthContext from "../hooks/use-auth-hooks";

export default function Home() {
    const [pincode, setPincode] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        checkPincode(pincode, router);
    };

    const handlePincodeChange = (e) => {
        setPincode(e.target.value);
    };
    return (
        <main className="h-full bg-white text-black">
            <ToastContainer />
            <div className="flex flex-col md:flex-row md:justify-around ">
                <div className="flex flex-col md:ml-10 md:pt-10 md:w-[45%] justify-center">
                    <h1 className="text-4xl md:text-6xl w-11/12 md:w-[80%] lg:ml-10 lg:leading-tight leading-normal font-bold text-center md:text-left">
                        Home-Cooked Goodness,
                        <br /> Just a Bite Away!
                    </h1>
                    <p
                        className="pt-6 text-base md:text-lg font-medium w-11/12 md:w-[75%] lg:ml-10 mx-auto text-center text-gray-800
                     md:text-left "
                    >
                        Experience the convenience of a personalized tiffin
                        service, delivering delectable and wholesome meals
                        straight to your doorstep. Elevate your dining
                        experience with our diverse menu options, prepared with
                        love and care, to nourish your body and delight your
                        taste buds.
                    </p>
                    <form
                        className="flex flex-row drop-shadow-xl lg:ml-10 pt-6 pb-12 w-11/12 text-black md:w-[75%] mx-auto md:ml-0 md:mr-auto lg:mt-8 mt-4"
                        onSubmit={handleSubmit}
                        name="form"
                        id="form"
                    >
                        <input
                            className="h-12 w-full md:w-96 border border-black rounded-xl text-center placeholder-italic placeholder-pl-4 mb-10 text-lg text-black"
                            type="number"
                            placeholder="Enter pincode"
                            name="pincode"
                            id="pincode"
                            value={pincode}
                            onChange={handlePincodeChange}
                        />
                        <button
                            className="relative inline-flex items-center justify-center px-6 py-4 ml-2 md:ml-4 order h-12 w-72 md:w-32 overflow-hidden font-medium text-xl tracking-tighter text-white bg-black rounded-lg group"
                            type="submit"
                        >
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#183D3D] rounded-full group-hover:w-56 group-hover:h-56"></span>
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                            <span className="relative">Check</span>
                        </button>
                    </form>
                </div>
                <div className="mt-6 md:mt-0 md:w-[45%] md:ml-10 md:block hidden">
                    <Image
                        className="h-full w-full"
                        src={deliveryboy}
                        alt="Picture of a delivery boy"
                        width={600}
                        placeholder="blur"
                    />
                </div>
            </div>
        </main>
    );
}
