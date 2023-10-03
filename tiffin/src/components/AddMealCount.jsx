import { useState } from "react";
import { HandleAddMealCount, HandleAddFoodOptions } from "@/api/UserAPI";

export default function AddMealCount({ setUpdateMealCountUI }) {
    const [addmealCount, setAddMealCount] = useState("");
    const [foodType, setFoodType] = useState("");

    const handleMealCountChange = (e) => {
        setAddMealCount(e.target.value);
    };

    const handleFoodTypeChange = (e) => {
        setFoodType(e.target.value);
    };

    const handleAddMealCountSubmit = async (e) => {
        e.preventDefault();
        if (addmealCount !== "") {
            let count = addmealCount;
            await HandleAddMealCount(count, setUpdateMealCountUI);
            setAddMealCount("");
        } else {
            showToast("Please fill all the details", "fail");
        }
    };

    const handleFoodOptionSubmit = async (e) => {
        e.preventDefault();
        if (foodType !== "") {
            let type = foodType;
            await HandleAddFoodOptions(type, setUpdateMealCountUI);
            setFoodType("");
        } else {
            showToast("Please fill all the details", "fail");
        }
    };

    return (
        <div>
            <div className="p-8">
                <h1 className="font-medium text-3xl text-center">
                    Add Meal Counts
                </h1>
                <form
                    className="w-full mx-auto"
                    onSubmit={handleAddMealCountSubmit}
                >
                    <div className="mt-8 grid lg:grid-cols-2 gap-4">
                        <div className="mb-6 flex gap-32">
                            <label
                                htmlFor="mealcount"
                                className="text-gray-700 block mb-1 font-medium text-xl"
                            >
                                Meal Count
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={addmealCount}
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-20 my-auto"
                                placeholder="0"
                                onChange={handleMealCountChange}
                            />
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
            <div className="p-8">
                <h1 className="font-medium text-3xl text-center">
                    Add Food Options
                </h1>
                <form
                    className="w-full mx-auto"
                    onSubmit={handleFoodOptionSubmit}
                >
                    <div className="mt-8 grid lg:grid-cols-2 gap-4">
                        <div className="mb-6 flex gap-32">
                            <label
                                htmlFor="mealcount"
                                className="text-gray-700 block mb-1 font-medium text-xl"
                            >
                                Food Type
                            </label>
                            <input
                                type="text"
                                name="type"
                                id="type"
                                value={foodType}
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-60 my-auto"
                                placeholder="Type"
                                onChange={handleFoodTypeChange}
                            />
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
        </div>
    );
}
