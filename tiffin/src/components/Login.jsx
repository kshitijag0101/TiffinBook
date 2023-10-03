"use client";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { HandleLogin, HandleGoogleLogin, HandleFacebookLogin } from "@/api/UserAPI";
import useAuthContext from "@/hooks/use-auth-hooks";
import { FaRegWindowClose } from "react-icons/fa";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {
        isLoggedIn,
        setIsLoggedIn,
        showLogin,
        setShowLogin,
        showSignUp,
        setShowSignUp,
    } = useAuthContext();

    const router = useRouter();
    const formContainerRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await HandleLogin(email, password, router, setIsLoggedIn, setShowLogin);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleShowRegister = () => {
        setShowLogin(false);
        setShowSignUp(true);
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        await HandleGoogleLogin(router, setIsLoggedIn, setShowLogin);
    };

    const handleFacebookLogin = async (e) => {
        e.preventDefault();
        await HandleFacebookLogin(router, setIsLoggedIn, setShowLogin);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showLogin &&
                formContainerRef.current &&
                !formContainerRef.current.contains(event.target) &&
                !document
                    .querySelector(".login-button")
                    .contains(event.target) &&
                !event.target.closest(".login-button")
            ) {
                console.log("hi");
                setShowLogin(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [showLogin]);

    return (
        <div className="fixed inset-0 flex items-center justify-center lg:mt-0 mt-10 bg-black text-black bg-opacity-50 z-20">
            <ToastContainer />
            <div className="rounded-lg shadow-lg">
                <div
                    className="flex flex-col items-center justify-center lg:pr-10 lg:pl-20 lg:mb-10 mr-auto ml-auto max-w-6xl
        xl:px-5 lg:flex-row"
                >
                    <div className="flex flex-col items-center justify-center lg:mb-0 mb-10 lg:pl-10 lg:flex-row  ">
                        <div className="lg:w-96 lg:mt-20 w-76 flex justify-end">
                            <div
                                ref={formContainerRef}
                                className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
              relative z-10"
                            >
                                <p className="w-full text-4xl font-medium text-center leading-snug font-serif text-gray-600">
                                    Login
                                </p>

                                <form className="w-full mt-10 mr-0 mb-10 ml-0 relative space-y-8 sm:max-w-full md:max-w-full xm:w-full ">
                                    <div className="relative">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            Email
                                        </p>
                                        <input
                                            placeholder="johndoe@gmail.com"
                                            type="email"
                                            onChange={handleEmailChange}
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black w-full pt-4 pr-4 pb-6 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                    border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="relative">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            Password
                                        </p>
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            onChange={handlePasswordChange}
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black w-full pt-4 pr-4 pb-6 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                    border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="relative">
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="w-full inline-block px-5 py-4 text-xl font-medium text-center bg-or hover:bg-do
                    rounded-lg transition duration-200 text-white"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                                <p className="w-full mb-6 text-base text-black text-center">
                                    Sign In With
                                </p>
                                <ul className="-mx-2 mb-12 flex justify-center">
                                    <li className="w-72 px-2">
                                        <button
                                            onClick={handleGoogleLogin}
                                            className="flex h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M17.8477 8.17132H9.29628V10.643H15.4342C15.1065 14.0743 12.2461 15.5574 9.47506 15.5574C5.95916 15.5574 2.8306 12.8821 2.8306 9.01461C2.8306 5.29251 5.81018 2.47185 9.47506 2.47185C12.2759 2.47185 13.9742 4.24567 13.9742 4.24567L15.7024 2.47185C15.7024 2.47185 13.3783 0.000145544 9.35587 0.000145544C4.05223 -0.0289334 0 4.30383 0 8.98553C0 13.5218 3.81386 18 9.44526 18C14.4212 18 17.9967 14.7141 17.9967 9.79974C18.0264 8.78198 17.8477 8.17132 17.8477 8.17132Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </button>
                                    </li>
                                    <li className="w-full px-2">
                                        <button
                                            onClick={handleFacebookLogin}
                                            className="flex h-11 items-center justify-center rounded-md bg-[#4064AC] hover:bg-opacity-90"
                                        >
                                            <svg
                                                width="10"
                                                height="20"
                                                viewBox="0 0 10 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.29878 8H7.74898H7.19548V7.35484V5.35484V4.70968H7.74898H8.91133C9.21575 4.70968 9.46483 4.45161 9.46483 4.06452V0.645161C9.46483 0.290323 9.24343 0 8.91133 0H6.89106C4.70474 0 3.18262 1.80645 3.18262 4.48387V7.29032V7.93548H2.62912H0.747223C0.359774 7.93548 0 8.29032 0 8.80645V11.129C0 11.5806 0.304424 12 0.747223 12H2.57377H3.12727V12.6452V19.129C3.12727 19.5806 3.43169 20 3.87449 20H6.47593C6.64198 20 6.78036 19.9032 6.89106 19.7742C7.00176 19.6452 7.08478 19.4194 7.08478 19.2258V12.6774V12.0323H7.66596H8.91133C9.2711 12.0323 9.54785 11.7742 9.6032 11.3871V11.3548V11.3226L9.99065 9.09677C10.0183 8.87097 9.99065 8.6129 9.8246 8.35484C9.76925 8.19355 9.52018 8.03226 9.29878 8Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                                <p className="w-full text-black text-center">
                                    Do not have an account?
                                    <button
                                        onClick={handleShowRegister}
                                        className="self-end font-small pl-1 text-gray-600 text register-button"
                                    >
                                        Register Now
                                    </button>
                                </p>
                            </div>
                            <div className="h-10 w-10 absolute z-20">
                                <button onClick={() => setShowLogin(false)}>
                                    <FaRegWindowClose className="h-7 w-7 text-gray-700 hover:text-black" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
