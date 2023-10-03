"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import { getDay, addDays, addYears } from "date-fns";
import { showToast } from "@/utils/showToast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import {
    HandleGetMealCounts,
    HandleGetFoodOptions,
    HandleGetComboById,
} from "@/api/UserAPI";

export default function Combo() {
    const router = useRouter();

    const [mealId, setSelectedmealId] = useState(null);
    const [selectedMealPlan, setSelectedMealPlan] = useState(0);
    const [selectedMealPlanId, setSelectedMealPlanId] = useState("");
    const [selectedComboId, setSelectedComboId] = useState(null);
    const [selectedFoodId, setSelectedFoodId] = useState("");
    const [selectedFood, setSelectedFood] = useState(0);
    const [selectedDates, setSelectedDates] = useState([]);
    const [mealCounts, setMealCounts] = useState([]);
    const [foodOptions, setFoodOptions] = useState([]);
    const [combo, setCombo] = useState({});
    const [price, setPrice] = useState(0);

    const [maxDate, setMaxDate] = useState(() => {
        const today = new Date();
        const nextYear = addYears(today, 1);
        return nextYear;
    });

    const noOfDaysAdded = () => {
        if (selectedMealPlan === null) {
            return 0;
        } else {
            const days = mealCounts[selectedMealPlan].count;
            return days + days / 2;
        }
    };

    const totalDates = (mealPlan) => {
        return mealCounts[mealPlan].count;
    };

    const handleDateChange = (dates) => {
        const maxDates = totalDates(selectedMealPlan);
        const filteredDates = dates
            .filter((date) => getDay(new Date(date.format("YYYY-MM-DD"))) !== 0)
            .slice(0, maxDates);
        setSelectedDates(filteredDates);
        if (filteredDates.length > 0) {
            const minDate = new Date(
                Math.min(...filteredDates.map((date) => date.valueOf()))
            );
            const days = noOfDaysAdded();
            if (days !== 0) {
                const maxDate = addDays(minDate, days);
                setMaxDate(maxDate);
            }
        }
    };

    const handleCustomize = () => {
        if (
            selectedMealPlan === null ||
            selectedComboId === "" ||
            selectedFood === "" ||
            selectedDates.length === 0
        ) {
            showToast("Please select all the fields", "fail");
            return false;
        } else if (
            mealCounts[selectedMealPlan].count === selectedDates.length
        ) {
            const dates = selectedDates.map((date) =>
                date.format("YYYY-MM-DD")
            );
            router.push(
                `/Menu/combos/combo/customize?mealId=${mealId}&combo=${selectedComboId}&mealPlan=${selectedMealPlanId}&food=${selectedFoodId}&dates=${dates}`
            );
        } else {
            showToast("Please select dates according to meal plan", "fail");
            return false;
        }
    };

    useEffect(() => {
        const query = window.location.href.split("?")[1].split("&");
        const mealId = query[0].split("=")[1];
        const comboId = query[1].split("=")[1];
        setSelectedmealId(mealId);
        setSelectedComboId(comboId);
        const fetchCombo = async () => {
            const response = await HandleGetComboById(comboId);
            console.log(response);
            setCombo(response.combo);
            const mealCountResponse = await HandleGetMealCounts();
            setMealCounts(mealCountResponse.mealCounts);
            const foodOptionsResponse = await HandleGetFoodOptions();
            setFoodOptions(foodOptionsResponse.foodOptions);
        };
        fetchCombo();
    }, []);

    useEffect(() => {
        setSelectedFoodId(foodOptions[0]?._id);
    }, [foodOptions]);

    useEffect(() => {
        setSelectedMealPlanId(mealCounts[0]?._id);
    }, [mealCounts]);

    useEffect(() => {
        setPrice(combo?.mealCounts?.[0].price);
    }, [combo]);

    return (
        <section className="text-black bg-white body-font overflow-hidden">
            <ToastContainer />
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-base title-font text-gray-800 tracking-widest">
                                    COMBO
                                </h2>
                                <h1 className="text-3xl title-font font-medium mb-1">
                                    {combo.name}
                                </h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-or"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-or"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-or"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-or"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-or"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-800 ml-3">
                                            4 Reviews
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="my-auto">
                                <span className="title-font font-bold text-2xl">
                                    $ {price}.00
                                </span>
                            </div>
                        </div>
                        <p className="mb-10 leading-relaxed">
                            {combo.description}
                        </p>
                        <div className="lg:grid lg:grid-cols md:grid md:grid-cols grid grid-cols-3 mb-10 ">
                            {mealCounts.map((counts, i) => {
                                return (
                                    <span
                                        className={`lg:w-full md:w-full w-full  hover:bg-rd border-r-white border-2 text-center font-semibold lg:text-sm md:text-sm text-sm text-white lg:pt-4 lg:pb-4 md:pt-4 md:pb-4 pt-4 pb-4 pl-1 pr-1 ${
                                            selectedMealPlan === i
                                                ? "bg-do"
                                                : "bg-or"
                                        }`}
                                        onClick={() => {
                                            setSelectedMealPlan(i);
                                            setSelectedMealPlanId(counts._id);
                                            setPrice(
                                                combo?.mealCounts?.[i].price
                                            );
                                        }}
                                        key={i}
                                    >
                                        {counts.count} {"Meals"}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="flex mb-5 text-xl font-medium">
                            <span>Dates:</span>
                            {selectedMealPlan !== "" ? (
                                <div className="mx-auto text-black" key={0}>
                                    <DatePicker
                                        multiple={5}
                                        value={selectedDates.map(
                                            (date) => new Date(date)
                                        )}
                                        onChange={handleDateChange}
                                        minDate={Date.now()}
                                        maxDate={maxDate}
                                        format="DD/MM/YYYY"
                                        responsive="vertical"
                                        plugins={[
                                            <DatePanel
                                                position="right"
                                                key="date-panel"
                                            />,
                                            weekends([0]),
                                        ]}
                                    />
                                </div>
                            ) : (
                                <div className="ml-5 opacity-50 cursor-not-allowed">
                                    <DatePicker disabled />
                                </div>
                            )}
                            <span className="text-xl font-semibold text-red-500">
                                {selectedDates.length === 0
                                    ? ""
                                    : selectedDates.length + " Selected"}
                            </span>
                        </div>
                        <div className="mb-10 text-xl">
                            <h2 className="text-2xl title-font text-gray-800 tracking-widest mb-1 font-serif">
                                Food Options
                            </h2>
                            <div className="text-black font-medium mt-2 font-serif">
                                {foodOptions.map((option, i) => {
                                    return (
                                        <div
                                            className="grid grid-cols-2"
                                            key={i}
                                        >
                                            {option.type}{" "}
                                            <input
                                                name="foodOption"
                                                type="radio"
                                                id="food"
                                                className="h-4 mt-2"
                                                onClick={() => {
                                                    setSelectedFoodId(
                                                        option._id
                                                    );
                                                    setSelectedFood(i);
                                                }}
                                                defaultChecked={i === 0}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="title-font font-bold text-2xl">
                                $ {price}.00
                            </span>
                            <button
                                className="relative inline-flex items-center justify-center px-6 py-4 overflow-hidden font-medium text-xl tracking-tighter text-white bg-or rounded-lg group"
                                onClick={() => handleCustomize()}
                            >
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-do rounded-full group-hover:w-56 group-hover:h-56"></span>
                                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-or"></span>
                                <span className="relative">Customize</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
