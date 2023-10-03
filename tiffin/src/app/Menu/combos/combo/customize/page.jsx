"use client";
import { useEffect, useState } from "react";
import {
    HandleMealSelected,
    HandleCreateCart,
    HandleCart,
} from "@/api/UserAPI";
import {
    AiOutlineMinusCircle,
    AiOutlinePlusCircle,
    AiFillCloseSquare,
} from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/utils/showToast";
import { useRouter } from "next/navigation";

export default function CustomizeMeal(props) {
    const router = useRouter();

    const [mealId, setSelectedMealId] = useState(null);
    const [selectedMealPlan, setSelectedMealPlan] = useState(null);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [meals, setMeals] = useState([]);
    const [price, setPrice] = useState(0);
    const [addOnPrice, setAddOnPrice] = useState(0);
    const [selectedSubstitutes, setSelectedSubstitutes] = useState({});
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        try {
            const query = window.location.href.split("?")[1].split("&");
            const mealId = query[0].split("=")[1];
            const combo = query[1].split("=")[1];
            const mealplan = query[2].split("=")[1];
            const food = query[3].split("=")[1];
            const dates = query[4].split("=")[1].split(",");
            setSelectedMealId(mealId);
            setSelectedCombo(combo);
            setSelectedMealPlan(mealplan);
            setSelectedFood(food);
            setSelectedDates(dates);
        } catch (err) {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                if (
                    selectedCombo &&
                    selectedFood &&
                    selectedDates.length !== 0 &&
                    selectedMealPlan &&
                    mealId
                ) {
                    const response = await HandleMealSelected(
                        mealId,
                        selectedMealPlan,
                        selectedDates,
                        selectedCombo,
                        selectedFood
                    );
                    console.log(response);
                    setMeals(response.mealPlan);
                    setPrice(response.price);
                }
            } catch (error) {
                showToast("Cannot fetch meal plan", "fail");
            }
        };
        fetchMeals();
    }, [selectedDates, selectedFood, selectedCombo, mealId, selectedMealPlan]);

    const handleIncreaseAddon = (mealIndex, addonIndex) => {
        setMeals((prevMeals) => {
            const updatedMeals = [...prevMeals];
            if (
                updatedMeals[mealIndex].meal.addons[addonIndex].quantity ===
                undefined
            ) {
                updatedMeals[mealIndex].meal.addons[addonIndex].quantity = 1;
            } else {
                updatedMeals[mealIndex].meal.addons[addonIndex].quantity++;
            }
            const newPrice =
                addOnPrice +
                updatedMeals[mealIndex].meal.addons[addonIndex].price;
            setAddOnPrice(newPrice);
            return updatedMeals;
        });
    };

    const handleDecreaseAddon = (mealIndex, addonIndex) => {
        setMeals((prevMeals) => {
            const updatedMeals = [...prevMeals];
            let newPrice = addOnPrice;
            const quantity =
                updatedMeals[mealIndex].meal.addons[addonIndex].quantity;
            if (
                updatedMeals[mealIndex].meal.addons[addonIndex].quantity ===
                undefined
            ) {
                updatedMeals[mealIndex].meal.addons[addonIndex].quantity = 0;
            } else {
                if (
                    updatedMeals[mealIndex].meal.addons[addonIndex].quantity > 0
                ) {
                    newPrice =
                        addOnPrice -
                        updatedMeals[mealIndex].meal.addons[addonIndex].price;
                }
                updatedMeals[mealIndex].meal.addons[addonIndex].quantity =
                    Math.max(0, quantity - 1);
            }
            setAddOnPrice(newPrice);
            return updatedMeals;
        });
    };

    const handleSubstituteSelection = (mealIndex, substituteIndex) => {
        setSelectedSubstitutes((prevSelectedSubstitutes) => ({
            ...prevSelectedSubstitutes,
            [mealIndex]: substituteIndex,
        }));
    };

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleAddToCart = async () => {
        const cartItems = [];
        let newPrice = price + addOnPrice;
        meals.map((meal, i) => {
            let prods = [];
            meal.meal.products.map((product) => {
                const prod = {
                    product: product._id,
                    quantity: product.quantity,
                };
                prods.push(prod);
            });
            let substitutes = [];
            const selectedSubstitute = selectedSubstitutes[i];
            if (selectedSubstitute !== undefined) {
                const subs = {
                    product:
                        meal.meal.substitutes[selectedSubstitute].product._id,
                    quantity:
                        meal.meal.substitutes[selectedSubstitute].quantity,
                };
                substitutes.push(subs);
            }
            let addons = [];
            meal.meal.addons.map((addon) => {
                if (addon.quantity !== undefined && addon.quantity > 0) {
                    const add = {
                        product: addon._id,
                        quantity: addon.quantity,
                    };
                    addons.push(add);
                }
            });
            const items = {
                deliveryDate: meal.date,
                products: prods,
                substitutes: substitutes,
                addons: addons,
            };
            cartItems.push(items);
        });
        try {
            let cartId = localStorage.getItem("cartId");
            let userId = localStorage.getItem("userId");

            if (!cartId && !userId) {
                const response = await HandleCreateCart();
                cartId = response.cartId;
                localStorage.setItem("cartId", cartId);
            }

            const res = await HandleCart(
                cartId,
                cartItems,
                userId,
                selectedCombo,
                selectedFood,
                newPrice
            );
            showToast("Items added to cart", "success");
            setTimeout(() => {
                router.push("/Cart");
            }, 500);
        } catch (error) {
            showToast("Add to Cart Failed", "fail");
        }
    };

    return (
        <div className=" bg-white mx-auto flex items-center justify-center text-white">
            <div
                className={`bg-white lg:rounded-xl lg:pb-10 ${
                    windowWidth > 768 ? "lg:w-[100%]" : "w-[100%]"
                }`}
            >
                <h1 className="lg:mx-auto lg:p-4 mt-4 mx-auto text-2xl text-center font-bold bg-rd">
                    Customize Meal
                </h1>
                <div className="mx-auto lg:pl-10 lg:pb-5 lg:pt-5 lg:mt-10 lg:grid lg:grid-cols-4 text-xl hidden font-semibold bg-rd text-white">
                    <div>
                        <h1>Date</h1>
                    </div>
                    <div>
                        <h1>Meal</h1>
                    </div>
                    <div>
                        <h1>Substitute</h1>
                    </div>
                    <div>
                        <h1>Addons</h1>
                    </div>
                </div>
                <div
                    className={`mb-6 ${
                        windowWidth > 768 ? "" : "text-center mx-auto"
                    }`}
                >
                    {meals.map((meal, i) => {
                        return (
                            <div
                                className={`lg:pl-10 lg:py-4 lg:grid lg:grid-cols-4 text-lg text-black ${
                                    i % 2 == 0 ? "bg-white" : "bg-slate-200"
                                }`}
                                key={i}
                            >
                                <div className="lg:mt-0 py-4">
                                    <span className="lg:hidden text-lg font-bold font-serif italic">
                                        Date:
                                    </span>
                                    <h1>{meal.date}</h1>
                                </div>
                                <div className="hidden lg:block">
                                    <span className="lg:hidden ml:20 text-lg font-bold font-serif italic">
                                        Meal:
                                    </span>
                                    <div className="w-[90%] lg:ml-0 ml-5">
                                        {meal.meal.products.map(
                                            (product, j) => {
                                                return (
                                                    <span className="" key={j}>
                                                        {product.name}
                                                        ,&nbsp;
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="lg:mt-0 py-4 hidden lg:block ">
                                    <span className="lg:hidden ml:20 text-lg font-bold font-serif italic">
                                        Substitute:
                                    </span>
                                    <div>
                                        {meal.meal.substitutes.map((sub, j) => {
                                            return (
                                                <div key={j}>
                                                    <label
                                                        htmlFor={"Sabzee" + i}
                                                        className=""
                                                    >
                                                        <input
                                                            className="lg:mr-4 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                                            type="radio"
                                                            name={"Sabzee" + i}
                                                            id={"Sabzee" + j}
                                                            checked={
                                                                selectedSubstitutes[
                                                                    i
                                                                ] === j
                                                            }
                                                            onChange={() =>
                                                                handleSubstituteSelection(
                                                                    i,
                                                                    j
                                                                )
                                                            }
                                                        />
                                                        {sub.name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                </div>
                                <div className="flex sm:hidden mt:20">
                                <div className="m-auto grid grid-cols-1">
                                    <span className="lg:hidden text-lg font-bold font-serif italic">
                                        Meal:
                                    </span>
                                    <div className="grid grid-cols-1">
                                        {meal.meal.products.map(
                                            (product, j) => {
                                                return (
                                                    <span className="" key={j}>
                                                        {product.name}
                                                        ,&nbsp;
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="mx-auto grid grid-cols-1"> 
                                    <span className="lg:hidden text-lg font-bold font-serif italic">
                                        Substitute:
                                    </span>
                                    <div className="-mt-10">
                                        {meal.meal.substitutes.map((sub, j) => {
                                            return (
                                                <div key={j}>
                                                    <label
                                                        htmlFor={"Sabzee" + i}
                                                        className=""
                                                    >
                                                        <input
                                                            className="mr-4 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                                            type="radio"
                                                            name={"Sabzee" + i}
                                                            id={"Sabzee" + j}
                                                            checked={
                                                                selectedSubstitutes[
                                                                    i
                                                                ] === j
                                                            }
                                                            onChange={() =>
                                                                handleSubstituteSelection(
                                                                    i,
                                                                    j
                                                                )
                                                            }
                                                        />
                                                        {sub.name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    </div>
                                </div>
                                <div className="lg:mt-0 mp-4">
                                    <span className="lg:hidden text-lg font-serif font-bold italic">
                                        Addons:
                                    </span>
                                    <div className="mr-4">
                                        {meal.meal.addons.map((addon, j) => {
                                            return (
                                                <div
                                                    className="flex justify-center"
                                                    key={j}
                                                >
                                                    <div>
                                                        {addon.name} {"  ( $"}
                                                        {addon.price}
                                                        {")"}
                                                    </div>
                                                    <div className="flex">
                                                        <button
                                                            className="ml-5 lg:w-9 w-4"
                                                            onClick={() =>
                                                                handleDecreaseAddon(
                                                                    i,
                                                                    j
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineMinusCircle className="lg:h-6 lg:w-8" />
                                                        </button>
                                                        <input
                                                            className="lg:mx-2 lg:h-8 lg:w-16 mx-4 w-12 mb-2 border rounded-2xl text-center "
                                                            type="number"
                                                            name="quantity"
                                                            id="quantity"
                                                            value={
                                                                addon.quantity ===
                                                                undefined
                                                                    ? 0
                                                                    : addon.quantity
                                                            }
                                                            readOnly
                                                        />
                                                        <button
                                                            className="lg:w-9"
                                                            onClick={() =>
                                                                handleIncreaseAddon(
                                                                    i,
                                                                    j
                                                                )
                                                            }
                                                        >
                                                            <AiOutlinePlusCircle className="lg:h-6 lg:w-8" />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <hr className="h-2" />
                <div className="flex justify-end text-black font-semibold text-xl mr-4">
                    <div className="grid grid-cols-2">
                        <span className="py-1 px-10">Meal Price</span>
                        <span className="py-1 px-10">$ {price}</span>
                        <span className="py-1 px-10">AddOn Price</span>
                        <span className="py-1 px-10">$ {addOnPrice}</span>
                        <span className="py-1 px-10">Total Price</span>
                        <span className="py-1 px-10">
                            $ {price + addOnPrice}
                        </span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="relative inline-flex items-center justify-center my-10 px-6 py-4 overflow-hidden font-medium text-xl tracking-tighter text-white bg-or rounded-lg group"
                        onClick={() => handleAddToCart()}
                    >
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-do rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-or"></span>
                        <span className="relative">Add To Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
