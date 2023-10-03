"use client";
import Image from "next/image";
import emptycart from "../../public/empty-cart.jpg";
import { useState, useEffect } from "react";
import useAuthContext from "../../hooks/use-auth-hooks";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/showToast";
import {
    HandleGetCart,
    HandleCreateCart,
    HandleDeleteFromCart,
} from "../../api/UserAPI";

export default function Cart(children) {
    const [cartItems, setCartItems] = useState([]);
    const { isLoggedIn, setIsLoggedIn, setShowSignUp, setShowLogin } =
        useAuthContext();
    const [price, setPrice] = useState(0);

    const router = useRouter();

    useEffect(() => {
        try {
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
                console.log(mealPlans);
                setCartItems(mealPlans);
                setPrice(response?.cart?.totalPrice || 0);
            };
            fetchCart();
        } catch (err) {
            showToast("Cannot fetch Cart", "fail");
        }
    }, []);

    async function handleRemoveFromCart(mealPlanId) {
        try {
            const cartId = localStorage.getItem("cartId");
            const userId = localStorage.getItem("userId");
            const response = await HandleDeleteFromCart(
                cartId,
                userId,
                mealPlanId
            );
            const mealPlans = response?.cart?.mealPlans || [];
            setCartItems(mealPlans);
            setPrice(response?.cart?.totalPrice || 0);
        } catch (err) {
            showToast("Cannot remove item from cart", "fail");
        }
    }

    const handleOrderSubmit = () => {
        if (!isLoggedIn) {
            showToast("You need to login first", "fail");
            setTimeout(() => {
                setShowLogin(true);
            }, 500);
        } else {
            if (cartItems.length === 0) {
                showToast("Add something in cart to proceed");
            } else {
                router.push("/Checkout");
            }
        }
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

    return (
        <section>
            <ToastContainer />
            <div className="min-h-screen bg-white text-black pt-5">
                <h1 className="mb-10 text-center text-3xl font-bold bg-rd text-white py-4">
                    Cart Items
                </h1>
                <div className="mx-auto px-10 justify-center md:flex md:space-x-6 xl:px-10">
                    <div className="rounded-lg md:w-2/3">
                        {cartItems.length > 0 ? (
                            cartItems.map((cart, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
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
                                                    {cart.foodOption.type}
                                                </p>
                                                <p className="mt-1 text-lg text-gray-700 font-light">
                                                    {getMealPlan(
                                                        cart.meals.length
                                                    )}
                                                </p>
                                            </div>
                                            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                <div className="flex justify-end border-gray-100">
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveFromCart(
                                                                cart._id
                                                            )
                                                        }
                                                    >
                                                        <AiFillDelete className="h-7 w-7" />
                                                    </button>
                                                </div>
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
                    <div className="lg:mt-6 mt-6 h-full rounded-lg border bg-white lg:p-6 p-5 shadow-md md:mt-0 md:w-1/3">
                        <div className="lg:mb-2 flex justify-between font-medium text-lg">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">${price}.00</p>
                        </div>
                        <div className="flex justify-between font-medium text-lg">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$0.00</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-xl font-bold">
                                    ${price}.00 USD
                                </p>
                            </div>
                        </div>
                        <button
                            className="mt-6 w-full rounded-md bg-or py-3 font-medium text-blue-50 hover:bg-do"
                            onClick={handleOrderSubmit}
                        >
                            Checkout
                        </button>
                    </div>
                    <div className="pb-5"></div>
                </div>
            </div>
        </section>
    );
}
