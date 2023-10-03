import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.jpg";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthContext from "../hooks/use-auth-hooks";
import Login from "./Login";
import Register from "./Register";

export default function Header() {
    const {
        isLoggedIn,
        setIsLoggedIn,
        showLogin,
        setShowLogin,
        showSignUp,
        setShowSignUp,
    } = useAuthContext();
    const router = useRouter();

    const pathUrl = usePathname();

    useEffect(() => {
        console.log(pathUrl);
    }, [pathUrl]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setTimeout(() => {
            setShowLogin(true);
            router.push("/");
        }, 1000);
    };

    const handleLogin = () => {
        setShowSignUp(false);
        setShowLogin(true);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(true);
            }
        };

        document.addEventListener("keydown", handleOutsideClick);

        return () => {
            document.removeEventListener("keydown", handleOutsideClick);
        };
    }, []);

    return (
        <header className="bg-white text-black px-4 md:px-24">
            <div className="flex justify-between items-center mx-auto">
                <Link href="/">
                    <div className="flex gap-4 font-serif font-bold italic text-2xl">
                        <span>
                            <Image
                                src={logo}
                                height={50}
                                width={70}
                                alt="logo"
                            />
                        </span>
                        <span className="my-auto">
                            Sister&apos;s{" "}
                            <span className="text-red-800">Spices</span>
                        </span>
                    </div>
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex text-xl font-bold gap-8">
                        <Link href="/">
                            <li
                                className={`p-2 md:p-4 hover:text-red-800 ${
                                    pathUrl === "/" ? "text-red-800" : ""
                                }`}
                            >
                                Home
                            </li>
                        </Link>
                        <Link href="/Menu">
                            <li
                                className={`p-2 md:p-4 hover:text-red-800 ${
                                    pathUrl === "/Menu" ? "text-red-800" : ""
                                }`}
                            >
                                Menu
                            </li>
                        </Link>
                        <Link href="/Cart">
                            <li
                                className={`p-2 md:p-4 hover:text-red-800 ${
                                    pathUrl === "/Cart" ? "text-red-800" : ""
                                }`}
                            >
                                Cart
                            </li>
                        </Link>
                        {isLoggedIn ? (
                            <ul className="flex gap-8">
                                <Link href="/Dashboard">
                                    <li
                                        className={`p-2 md:p-4 hover:text-red-800 ${
                                            pathUrl === "/Dashboard"
                                                ? "text-red-800"
                                                : ""
                                        }`}
                                    >
                                        Dashboard
                                    </li>
                                </Link>
                                <button onClick={handleLogout}>
                                    <li className="p-2 md:p-4">Logout</li>
                                </button>
                            </ul>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="login-button"
                            >
                                <li className="p-2 md:p-4">Login</li>
                            </button>
                        )}
                    </ul>
                </nav>
                <div className="md:hidden">
                    <button
                        className="p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div
                            className="absolute bg-white top-12 right-0 z-20 shadow-md rounded-md text-black"
                            ref={menuRef}
                        >
                            <ul className="flex flex-col items-start text-lg font-semibold gap-1 pb-4 pr-3 p-3 mx-1">
                                <Link href="/">
                                    <li
                                        className="p-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </li>
                                </Link>
                                <Link href="/Menu">
                                    <li
                                        className="p-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Menu
                                    </li>
                                </Link>
                                <Link href="/Cart">
                                    <li
                                        className="p-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Cart
                                    </li>
                                </Link>
                                {isLoggedIn ? (
                                    <>
                                        <Link href="/Dashboard">
                                            <li
                                                className="p-2"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Dashboard
                                            </li>
                                        </Link>
                                        <button onClick={handleLogout}>
                                            <li
                                                className="p-2"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Logout
                                            </li>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        className="login-button"
                                    >
                                        <li
                                            className="p-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </li>
                                    </button>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                {showLogin && <Login />}
                {showSignUp && <Register />}
            </div>
        </header>
    );
}
