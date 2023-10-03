"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import useAuthContext from "../../hooks/use-auth-hooks";
import { HandleGetUser, HandleGetCart } from "@/api/UserAPI";
import emptycart from "../../public/empty-cart.jpg";
import Error from "../../components/Error";

export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [streetAddress, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState(0);
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();

    useEffect(() => {
        try {
            if (isLoggedIn) {
                const fetchUser = async () => {
                    const userId = localStorage.getItem("userId");
                    const response = await HandleGetUser(userId);
                    console.log(response);
                    setUser(response.user);
                };
                fetchUser();
                const fetchCart = async () => {
                    let cartId = localStorage.getItem("cartId");
                    const userId = localStorage.getItem("userId");
                    if (!cartId && !userId) {
                        const response = await HandleCreateCart();
                        cartId = response.cartId;
                        localStorage.setItem("cartId", cartId);
                    }
                    const response = await HandleGetCart(userId, cartId);
                    const mealPlans = response?.cart?.mealPlans || [];
                    setCartItems(mealPlans);
                    setTotalBill(response?.cart?.totalPrice || 0);
                };
                fetchCart();
            }
        } catch (err) {
            showToast("Cannot fetch User", "fail");
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user?.deliveryAddress?.streetAddress);
        setState(user?.deliveryAddress?.state);
        setCity(user?.deliveryAddress?.city);
        setPincode(user?.deliveryAddress?.pincode);
    }, [user]);

    const handleStreetAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    const handlePincodeChange = (e) => {
        setPincode(e.target.value);
    };

    const getMealPlan = (datesLength) => {
        if (datesLength === 5) {
            return "5 Meals";
        } else if (datesLength === 10) {
            return "10 Meals";
        } else if (datesLength === 20) {
            return "20 Meals";
        } else {
            return "25 Meals";
        }
    };

    return isLoggedIn ? (
        <div className="bg-white text-black">
            <div className="flex flex-row">
                <div className="border-r-2">
                    <h1 className="flex pl-10 pt-20 text-4xl font-medium leading-snug font-serif text-gray-600">
                        <svg
                            className="h-10 w-10 mr-5"
                            width="80px"
                            height="80px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.5 13.24V11.51C2.5 9.44001 4.18999 7.75 6.25999 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H12.26"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                opacity="0.4"
                                d="M2.5 12.4098V7.83986C2.5 6.64986 3.23 5.58982 4.34 5.16982L12.28 2.16982C13.52 1.69982 14.85 2.61985 14.85 3.94985V7.74983"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M22.5608 13.9702V16.0302C22.5608 16.5802 22.1208 17.0302 21.5608 17.0502H19.6008C18.5208 17.0502 17.5308 16.2602 17.4408 15.1802C17.3808 14.5502 17.6208 13.9602 18.0408 13.5502C18.4108 13.1702 18.9208 12.9502 19.4808 12.9502H21.5608C22.1208 12.9702 22.5608 13.4202 22.5608 13.9702Z"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                opacity="0.4"
                                d="M7 12H14"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 16.5H8.34C8.98 16.5 9.5 17.02 9.5 17.66V18.94"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4.22 15.2803L3 16.5002L4.22 17.7202"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.5 21.7803H4.16C3.52 21.7803 3 21.2603 3 20.6203V19.3403"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.2793 23.0001L9.4993 21.7801L8.2793 20.5601"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Checkout
                    </h1>
                    <form className=" w-full mt-5 mr-10 mb-16 ml-0 ">
                        <div className="flex">
                            <div className="">
                                <input
                                    placeholder="Name"
                                    disabled
                                    value={name}
                                    type="text"
                                    className="border-2 placeholder-gray-400 focus:outline-none
                focus:border-black  pt-4 pb-4 mt-2 ml-10 pl-1  text-base block bg-white
                border-gray-300 rounded-md shadow-xl placeholder:italic placeholder:text-slate-400 disabled:cursor-not-allowed opacity-50"
                                />
                            </div>
                            <div className="mr-0">
                                <input
                                    placeholder="Mobile No."
                                    value={phone}
                                    type="text"
                                    disabled
                                    className="border-2 placeholder-gray-400 focus:outline-none
                            focus:border-black  pt-4 pb-4 mt-2 ml-2 pl-1 text-base block bg-white
                            border-gray-300 rounded-md shadow-xl placeholder:italic placeholder:text-slate-400 disabled:cursor-not-allowed opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="">
                                <input
                                    placeholder="Email"
                                    value={email}
                                    type="email"
                                    disabled
                                    className="border-2 placeholder-gray-400 focus:outline-none
                                focus:border-black  pt-4 pb-4 mt-2 ml-10 pl-1 text-base block bg-white
                                border-gray-300 rounded-md shadow-xl w-96 placeholder:italic placeholder:text-slate-400 disabled:cursor-not-allowed opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="">
                                <input
                                    placeholder="Street Address"
                                    value={streetAddress}
                                    onChange={handleStreetAddressChange}
                                    type="text"
                                    className="border-2 placeholder-gray-400 focus:outline-none
                                focus:border-black  pt-4 pb-4 mt-2 ml-10 pl-1 text-base block bg-white
                                border-gray-300 rounded-md shadow-xl w-96 placeholder:italic placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="">
                                <input
                                    placeholder="Pin  Code"
                                    type="text"
                                    value={pincode}
                                    onChange={handlePincodeChange}
                                    className="border-2 placeholder-gray-400 focus:outline-none
                            focus:border-black  pt-4 pb-4 mt-2 mb-4 ml-10 pl-2 pr-2 text-base block bg-white
                            border-gray-300 rounded-md shadow-xl w-32 placeholder:italic placeholder:text-slate-400"
                                />
                            </div>
                            <div className="">
                                <input
                                    placeholder="City"
                                    type="text"
                                    value={city}
                                    onChange={handleCityChange}
                                    className="border-2 placeholder-gray-400 focus:outline-none
                                    focus:border-black  pt-4 pb-4 mt-2 mb-4 ml-4 pl-2 pr-2 text-base block bg-white
                                    border-gray-300 rounded-md shadow-xl w-28 placeholder:italic placeholder:text-slate-400"
                                />
                            </div>
                            <div className="">
                                <input
                                    placeholder="State"
                                    type="text"
                                    value={state}
                                    onChange={handleStateChange}
                                    className="border-2 placeholder-gray-400 focus:outline-none
                                    focus:border-black  pt-4 pb-4 mt-2 mb-4 ml-4 pl-2 pr-2 text-base block bg-white
                                    border-gray-300 rounded-md shadow-xl w-28 placeholder:italic placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="relative inline-flex items-center justify-center mt-5 ml-28 px-6 py-4 overflow-hidden font-medium text-xl tracking-tighter text-white bg-or rounded-lg group">
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-do rounded-full group-hover:w-56 group-hover:h-56"></span>
                                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-or"></span>
                                <span className="relative">
                                    Proceed To Payment
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-full bg-gray-200">
                    <h1 className="pl-8 pt-5 text-4xl text-center font-medium leading-snug font-serif text-gray-600">
                        Order Summary
                    </h1>
                    <div className="w-full border-b-2 border-white border-shadow-2xl ">
                        <div className="grid h-96 overflow-y-auto ">
                            <div className="rounded-lg px-5 py-5">
                                {cartItems.length > 0 ? (
                                    cartItems.map((cart, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="justify-between mb-3 rounded-lg bg-white px-6 py-4 shadow-md sm:flex sm:justify-start"
                                            >
                                                <Image
                                                    src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                    alt="product-image"
                                                    className="w-full rounded-lg sm:w-60"
                                                    height={100}
                                                    width={100}
                                                />
                                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div className="mt-5 sm:mt-0">
                                                        <h2 className="text-xl font-bold text-gray-900">
                                                            {cart.combo.name}
                                                        </h2>
                                                        <p className="mt-1 text-lg text-gray-700 font-medium">
                                                            {
                                                                cart.foodOption
                                                                    .type
                                                            }
                                                        </p>
                                                        <p className="mt-1 text-lg text-gray-700 font-light">
                                                            {getMealPlan(
                                                                cart.meals
                                                                    .length
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                        <div className="flex items-center space-x-4">
                                                            <p className="text-xl font-bold">
                                                                ${cart.price}.00
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="bg-white">
                                        <div className="pt-5">
                                            <Image
                                                className="mb-10 mx-auto"
                                                alt="Cart Image"
                                                src={emptycart}
                                                width={300}
                                                height={300}
                                                priority={true}
                                            />
                                        </div>
                                        <h1 className="mt-4 mb-10 pb-20 text-center text-black font-medium text-2xl text-semibold">
                                            No items in cart!
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 pb-6 border-b-2 font-bold text-xl ">
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-black pt-2 pl-10 mt-4">
                                Total Bill:
                            </p>
                            <p className="text-black pt-2 pl-64 mt-5">
                                $ {totalBill}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-black pt-2 pl-10 mt-2">Taxes</p>
                            <p className="text-black pt-2 pl-64 mt-2">
                                ${(totalBill * 0.18).toFixed(2)}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-black pt-2 pl-10 mt-2">
                                Final Amount:
                            </p>
                            <p className="text-black pt-2 pl-64 mt-2">
                                $ {totalBill + totalBill * 0.18}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Error />
    );
}
