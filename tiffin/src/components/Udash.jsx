"use client";
import { useState, useEffect } from "react";
import { HandleGetUser, HandleEditUser } from "../api/UserAPI";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/utils/showToast";

export default function Udash() {
    const [showPersonalInfo, setShowPersonalInfo] = useState(true);
    const [showMyOrder, setMYOrders] = useState(false);
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [streetAddress, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState(0);

    const handlePersonalInfoClick = () => {
        setShowPersonalInfo(true);
        setMYOrders(false);
    };

    const handleMyOrder = () => {
        setMYOrders(true);
        setShowPersonalInfo(false);
    };

    useEffect(() => {
        try {
            const fetchUser = async () => {
                const userId = localStorage.getItem("userId");
                const response = await HandleGetUser(userId);
                console.log(response);
                setUser(response.user);
            };
            fetchUser();
        } catch (err) {
            showToast("Cannot fetch User", "fail");
        }
    }, []);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user?.deliveryAddress?.streetAddress);
        setState(user?.deliveryAddress?.state);
        setCity(user?.deliveryAddress?.city);
        setPincode(user?.deliveryAddress?.pincode);
    }, [user]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

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

    async function handleUpdateUser() {
        console.log("hi");
        try {
            const deliveryAddress = {
                streetAddress: streetAddress,
                state: state,
                city: city,
                pincode: pincode,
            };
            const response = await HandleEditUser(
                name,
                email,
                phone,
                deliveryAddress
            );
            console.log(response);
            setUser(response.user);
        } catch (err) {
            showToast("Cannot Update Deatils", "fail");
        }
    }

    return (
        <div className="bg-white text-black">
            <ToastContainer />
            <div className="h-20 items-center justify-center bg-white border-b-2 rounded-2xl">
                <h1 className="pt-3 text-4xl font-medium text-center leading-snug font-serif text-gray-600">
                    User dashboard
                </h1>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="pr-10 pl-10 md:h-screen sm:w-96 border-b-2 lg:border-r-2">
                    {/* <div className="w-96 md:w-full md:flex md:flex-col md:items-start md:justify-start sm:w-screen pt-10 pr-10 pb-20 pl-10 bg-white sm:border-b-2 md:border-r-2 relative"> */}
                    <div className="mx-auto text-center">
                        <button
                            className={`mt-2 mb-2 md:mt-10 mr-6 md:mr-0 text-xl md:text-sm md:w-[100px] py-2 px-4 sm:ml-20 md:py-1 md:px-2 rounded-full md:rounded-lg font-medium ${
                                showPersonalInfo
                                    ? "bg-do text-white"
                                    : "bg-white text-do"
                            }`}
                            onClick={handlePersonalInfoClick}
                        >
                            Personal Info
                        </button>
                        <button
                            className={`mt-4 md:mt-10 mr-6 md:mr-0 text-xl md:text-sm md:w-[100px] md:ml-20 py-2 px-4 md:py-1 md:px-2 rounded-full md:rounded-lg font-medium ${
                                showMyOrder
                                    ? "bg-do text-white"
                                    : "bg-white text-do"
                            }`}
                            onClick={handleMyOrder}
                        >
                            My Orders
                        </button>
                    </div>
                </div>
                <div className="w-full mt-4 lg:w-[calc(100% - 280px)] md:pl-20">
                    {showPersonalInfo && (
                        <div className="mt-16 md:mt-0 w-full md:w-[calc(100% - 200px)] md:mr-20">
                            <form className="w-full mt-16 mr-10 mb-12 ml-0 ">
                                <div className="grid lg:gap-x-12 lg:gap-y-5 lg:grid-cols-2 grid-cols-1">
                                    <div className="relative lg:ml-4 mx-20">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-4 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            Name
                                        </p>
                                        <input
                                            placeholder=""
                                            type="text"
                                            value={name}
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-96 pt-4 pr-4 pb-6 pl-4 mt-2 mr-6 mb-4 ml-0 text-base block bg-white
                    border-gray-300 rounded-md"
                                            onChange={(e) =>
                                                handleNameChange(e)
                                            }
                                        />
                                    </div>
                                    <div className="relative lg:ml-4 mx-20">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            Email
                                        </p>
                                        <input
                                            placeholder=""
                                            type="email"
                                            value={email}
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-96 pt-4 pr-4 pb-6 pl-4 mt-2 mr-6 mb-4 ml-0 text-base block bg-white
                    border-gray-300 rounded-md disabled:opacity-50 cursor-not-allowed"
                                            disabled
                                        />
                                    </div>
                                    <div className="relative lg:ml-4 mx-20">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            Mobile No.
                                        </p>
                                        <input
                                            placeholder=""
                                            type="text"
                                            value={phone}
                                            onChange={(e) =>
                                                handlePhoneChange(e)
                                            }
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-96 pt-4 pr-4 pb-6 pl-4 mt-2 mr-6 mb-4 ml-0 text-base block bg-white
                    border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="relative lg:ml-4 mx-20">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            Street Address
                                        </p>
                                        <input
                                            placeholder=""
                                            onChange={handleStreetAddressChange}
                                            type="text"
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-96 pt-4 pr-4 pb-6 pl-4 mt-2 mr-6 mb-4  text-base block bg-white
                    border-gray-300 rounded-md"
                                            value={streetAddress}
                                        />
                                    </div>
                                    <div className="relative lg:ml-4 mx-20">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            State
                                        </p>
                                        <input
                                            placeholder=""
                                            type="text"
                                            onChange={handleStateChange}
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-96 pt-4 pr-4 pb-6 pl-4 mt-2 mr-6 mb-2 ml-0 text-base block bg-white
                    border-gray-300 rounded-md"
                                            value={state}
                                        />
                                    </div>
                                    <div className="relative lg:ml-4 mx-20">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            City
                                        </p>
                                        <input
                                            placeholder=""
                                            type="text"
                                            onChange={handleCityChange}
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-96 pt-4 pr-4 pb-6 pl-4 mt-2 mr-6 mb-4 ml-0 px-6 text-base block bg-white
                    border-gray-300 rounded-md"
                                            value={city}
                                        />
                                    </div>

                                    <div className="relative lg:ml-4 mx-20">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                                        >
                                            Pincode
                                        </p>
                                        <input
                                            placeholder=""
                                            type="text"
                                            onChange={handlePincodeChange}
                                            className="border placeholder-gray-400 focus:outline-none
                    focus:border-black lg:w-96 pt-4 pr-4 pb-6 pl-4 mt-2 mr-6 mb-4 ml-0 px-6 text-base block bg-white
                    border-gray-300 rounded-md"
                                            value={pincode}
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className="lg:mt-4 mb-2 lg:ml-96 items-center">
                                <button
                                    type="submit"
                                    className="inline-block py-4 px-6 lg:ml-4 ml-24 text-xl font-medium bg-do hover:bg-do-dark text-white rounded-lg transition duration-200"
                                    onClick={handleUpdateUser}
                                >
                                    Update Details
                                </button>
                            </div>
                        </div>
                    )}
                    {showMyOrder && (
                        <div className="bg-white flex flex-row">
                            {/* My Orders content */}
                            {/* ... (rest of your code) ... */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
