"use client";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { HandleRegister } from "@/api/UserAPI";
import useAuthContext from "@/hooks/use-auth-hooks";
import { AiOutlineClose } from "react-icons/ai";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState(0);
    const {
        isLoggedIn,
        setIsLoggedIn,
        setShowLogin,
        setShowSignUp,
        showSignUp,
    } = useAuthContext();

    const router = useRouter();
    const formContainerRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await HandleRegister(
            name,
            email,
            password,
            contact,
            router,
            setShowSignUp,
            setShowLogin
        );
        setShowLogin(true);
        setShowSignUp(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handleLogin = () => {
        setShowSignUp(false);
        setShowLogin(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showSignUp &&
                formContainerRef.current &&
                !formContainerRef.current.contains(event.target) &&
                !event.target.closest(".register-button")
            ) {
                setShowSignUp(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [showSignUp]);

    return (
        <div className="fixed inset-0 h-screen flex items-center mb-10 justify-center bg-black text-black bg-opacity-50 z-20">
            <ToastContainer />
            <div className="rounded-lg shadow-lg">
                <div
                    className="flex flex-col items-center justify-center lg:mb-5 
        xl:px-5 lg:flex-row"
                >
                    <div className="flex flex-col items-center justify-center mb-10 lg:flex-row  ">
                        <div className="lg:mt-20 w-11/12 mt-20  flex justify-end">
                            <div
                                className="flex flex-col items-start justify-start lg:pt-10 lg:pr-10 lg:pb-5 lg:pl-10 bg-white shadow-2xl rounded-xl
              relative z-10"
                                ref={formContainerRef}
                            >
                                <p className="w-full text-4xl lg:mt-0 mt-5 font-medium text-center leading-snug font-serif text-gray-600">
                                    Register
                                </p>

                                <form className="w-full mt-10 mr-0 lg:mb-10 mb-8 ml-0 relative space-y-8 items-center justify-center">
                                    <div className="lg:flex lg:flex-row flex flex-col items-center justify-center gap-2">
                                        <div className="relative lg:w-full">
                                            <p
                                                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-6 font-medium text-gray-600
                    absolute"
                                            >
                                                Name
                                            </p>
                                            <input
                                                placeholder="johndoe"
                                                type="text"
                                                onChange={handleNameChange}
                                                className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-full w-64 lg:pt-4 pt-2 lg:pr-4 pr-2 lg:pb-6 pb-3 lg:pl-4 pl-2 lg:mt-2 mt-1 lg:mr-0 mr-4 lg:mb-0 lg:ml-0 ml-5 mb-2 text-base block bg-white
                    border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="relative lg:w-full ">
                                            <p
                                                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-6 font-medium text-gray-600
                    absolute"
                                            >
                                                Email
                                            </p>
                                            <input
                                                placeholder="johndoe@gmail.com"
                                                type="email"
                                                onChange={handleEmailChange}
                                                className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-full w-64 lg:pt-4 pt-2 lg:pr-4 pr-2 lg:pb-6 pb-3 lg:pl-4 pl-2 lg:mt-2 mt-1 mr-4 mb-0 lg:ml-4 ml-5 text-base block bg-white
                    border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:flex lg:flex-row flex flex-col items-center justify-center gap-2">
                                        <div className="relative lg:w-full">
                                            <p
                                                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-6 font-medium text-gray-600
                    absolute"
                                            >
                                                Password
                                            </p>
                                            <input
                                                placeholder="Password"
                                                type="password"
                                                onChange={handlePasswordChange}
                                                className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-full w-64 lg:pt-4 pt-2 lg:pr-4 pr-2 lg:pb-6 pb-3 lg:pl-4 pl-2 lg:mt-2 mt-0 lg:mr-0 mr-4 lg:mb-0 lg:ml-0 ml-5 mb-2 text-base block bg-white
                    border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="relative lg:w-full">
                                            <p
                                                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-6 font-medium text-gray-600
                    absolute"
                                            >
                                                Contact No
                                            </p>
                                            <input
                                                placeholder="contact"
                                                type="contact"
                                                onChange={handleContactChange}
                                                className="border placeholder-gray-400 focus:outline-none
                                                focus:border-black lg:w-full w-64 lg:pt-4 pt-2 lg:pr-4 pr-2 lg:pb-6 pb-3 lg:pl-4 pl-2 lg:mt-2 mt-2 mr-4 mb-0 lg:ml-4 ml-5 text-base block bg-white
                                                border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="w-60 inline-block pt-3 pr-5 pb-3 pl-5 text-xl font-medium text-center bg-or hover:bg-do
                    rounded-lg transition duration-200 text-white"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>

                                <p className="w-full lg:mb-0 mb-5 text-black text-center">
                                    Do have an account?
                                    <button
                                        onClick={handleLogin}
                                        className="self-end font-small pl-1 text-gray-600 text login-button"
                                    >
                                        Login Now
                                    </button>
                                </p>
                            </div>
                            <div className="h-10 w-10 absolute z-20">
                                <button onClick={() => setShowSignUp(false)}>
                                    <AiOutlineClose className="h-7 w-7 text-gray-700 hover:text-black" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
