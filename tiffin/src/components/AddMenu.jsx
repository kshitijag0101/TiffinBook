import { useState } from "react";
import { HandleAddMenu } from "@/api/UserAPI";

export default function AddMenu({ meals, setShowUI, setUpdateMenuUI }) {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const [menuName, setMenuName] = useState("");
    const [evenWeekMenu, setEvenWeekMenu] = useState(["", "", "", "", "", ""]);
    const [oddWeekMenu, setOddWeekMenu] = useState(["", "", "", "", "", ""]);

    const handleMenuNameChange = (e) => {
        setMenuName(e.target.value);
    };

    const handleEvenWeekSelect = (weekIndex, mealId) => {
        const updatedMenu = [...evenWeekMenu];
        updatedMenu[weekIndex] = mealId;
        setEvenWeekMenu(updatedMenu);
    };

    const handleOddWeekSelect = (weekIndex, mealId) => {
        const updatedMenu = [...oddWeekMenu];
        updatedMenu[weekIndex] = mealId;
        setOddWeekMenu(updatedMenu);
    };

    const HandleAddMenuReset = () => {
        setMenuName("");
        setEvenWeekMenu(["", "", "", "", "", ""]);
        setOddWeekMenu(["", "", "", "", "", ""]);
        setShowUI("");
        setTimeout(() => {
            setShowUI("addmenu");
        }, 100);
    };

    const handleAddMenuSubmit = async (e) => {
        e.preventDefault();
        const index1 = evenWeekMenu.indexOf("");
        const index2 = oddWeekMenu.indexOf("");
        if ((index1 === -1 && index2 === -1) || menuName === "") {
            await HandleAddMenu(
                menuName,
                evenWeekMenu,
                oddWeekMenu,
                setUpdateMenuUI
            );
            HandleAddMenuReset();
        } else {
            showToast("Please Select All the Fields", "fail");
        }
    };

    return (
        <div className="p-8">
            <h1 className="font-medium text-3xl text-center">Add Menu</h1>
            <form className="w-full mx-auto" onSubmit={handleAddMenuSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div className="mb-6 flex gap-7">
                        <label
                            htmlFor="name"
                            className="text-gray-700 block mb-1 font-medium text-xl"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={menuName}
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-60"
                            placeholder="Menu name"
                            onChange={handleMenuNameChange}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-40">
                    <div className="mt-5 w-1/3">
                        <label
                            htmlFor="name"
                            className="text-gray-700 block mb-2 font-medium text-xl"
                        >
                            Even Week
                        </label>
                        {weekdays.map((day, i) => {
                            return (
                                <div className="grid lg:grid-cols-2" key={i}>
                                    <label
                                        htmlFor="weekday"
                                        className="text-gray-700 block font-medium text-xl my-auto"
                                    >
                                        {day}
                                    </label>
                                    <select
                                        name="meals"
                                        id="meals"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                                        onChange={(e) =>
                                            handleEvenWeekSelect(
                                                i,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select Meal</option>
                                        {meals.map((meal, i) => {
                                            return (
                                                <option
                                                    value={meal._id}
                                                    key={i}
                                                >
                                                    {meal.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-5 w-1/3">
                        <label
                            htmlFor="name"
                            className="text-gray-700 block mb-2 font-medium text-xl"
                        >
                            Odd Week
                        </label>
                        {weekdays.map((day, i) => {
                            return (
                                <div className="grid lg:grid-cols-2" key={i}>
                                    <label
                                        htmlFor="weekday"
                                        className="text-gray-700 block font-medium text-xl my-auto"
                                    >
                                        {day}
                                    </label>
                                    <select
                                        name="meals"
                                        id="meals"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                                        onChange={(e) =>
                                            handleOddWeekSelect(
                                                i,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select Meal</option>
                                        {meals.map((meal, i) => {
                                            return (
                                                <option
                                                    value={meal._id}
                                                    key={i}
                                                >
                                                    {meal.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-x-4 mt-8 flex justify-center">
                    <button
                        className="relative inline-flex items-center justify-center px-6 py-4 ml-2 md:ml-4 order h-12 w-72 md:w-32 overflow-hidden font-medium text-xl tracking-tighter text-white bg-or rounded-lg group"
                        type="submit"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-do rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-or"></span>
                        <span className="relative">Add</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
