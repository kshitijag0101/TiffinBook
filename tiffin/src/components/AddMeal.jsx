import { useState } from "react";
import { HandleAddMeal } from "@/api/UserAPI";

export default function AddMeal({ products, setShowUI, setUpdateMealUI }) {
    const [mealName, setMealName] = useState("");
    const [mealPrice, setMealPrice] = useState("");
    const [mealProducts, setMealProducts] = useState([]);
    const [mealSubstitutes, setMealSubstitutes] = useState([]);
    const [mealAddons, setMealAddons] = useState([]);

    const handleMealNameChange = (e) => {
        setMealName(e.target.value);
    };

    const handleMealPriceChange = (e) => {
        setMealPrice(e.target.value);
    };

    const handleMealProductSelection = (e, prod) => {
        const productId = prod._id;
        if (e.target.checked) {
            setMealProducts([...mealProducts, productId]);
        } else {
            setMealProducts(mealProducts.filter((id) => id !== productId));
        }
    };

    const handleMealSubstituteSelection = (e, prod) => {
        const productId = prod._id;
        if (e.target.checked) {
            setMealSubstitutes([...mealSubstitutes, productId]);
        } else {
            setMealSubstitutes(
                mealSubstitutes.filter((id) => id !== productId)
            );
        }
    };

    const handleMealAddonSelection = (e, prod) => {
        const productId = prod._id;
        if (e.target.checked) {
            setMealAddons([...mealAddons, productId]);
        } else {
            setMealAddons(mealAddons.filter((id) => id !== productId));
        }
    };

    const HandleAddMealReset = () => {
        setMealName("");
        setMealPrice("");
        setMealProducts([]);
        setMealSubstitutes([]);
        setMealAddons([]);
        setShowUI("");
        setTimeout(() => {
            setShowUI("addmeal");
        }, 100);
    };

    const handleAddMealSubmit = async (e) => {
        e.preventDefault();
        if (mealName !== "" || mealPrice !== "" || mealProducts.length !== 0) {
            await HandleAddMeal(
                mealName,
                mealPrice,
                mealProducts,
                mealSubstitutes,
                mealAddons,
                setUpdateMealUI
            );
            HandleAddMealReset();
        } else {
            showToast("Please fill all the fields", "fail");
        }
    };

    return (
        <div className="p-8">
            <h1 className="font-medium text-3xl text-center">Add Meal</h1>
            <form className="w-full mx-auto" onSubmit={handleAddMealSubmit}>
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
                            value={mealName}
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-60"
                            placeholder="Meal name"
                            onChange={handleMealNameChange}
                        />
                    </div>

                    <div className="mb-6 flex gap-7">
                        <label
                            htmlFor="price"
                            className="text-gray-700 block mb-1 font-medium text-xl"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={mealPrice}
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-60"
                            placeholder="0"
                            onChange={handleMealPriceChange}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="products"
                        className="text-gray-700 block mb-1 font-medium text-xl"
                    >
                        Products
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {products.map((prod, i) => {
                            return (
                                <div className="flex gap-3" key={i}>
                                    <label
                                        htmlFor="Products"
                                        className="text-gray-700 block font-normal text-lg"
                                    >
                                        {prod.name}
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="products"
                                        id={"product" + i}
                                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                        onChange={(e) =>
                                            handleMealProductSelection(e, prod)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="substitutes"
                        className="text-gray-700 block mb-1 font-medium text-xl"
                    >
                        Substitutes
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {products.map((prod, i) => {
                            return (
                                <div className="flex gap-3" key={i}>
                                    <label
                                        htmlFor="Substitutes"
                                        className="text-gray-700 block font-normal text-lg"
                                    >
                                        {prod.name}
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="substitutes"
                                        id={"substitutes" + i}
                                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                        onChange={(e) =>
                                            handleMealSubstituteSelection(
                                                e,
                                                prod
                                            )
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="addons"
                        className="text-gray-700 block mb-1 font-medium text-xl"
                    >
                        Addons
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {products.map((prod, i) => {
                            return (
                                <div className="flex gap-3" key={i}>
                                    <label
                                        htmlFor="Addonss"
                                        className="text-gray-700 block font-normal text-lg"
                                    >
                                        {prod.name}
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="addons"
                                        id={"addons" + i}
                                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                        onChange={(e) =>
                                            handleMealAddonSelection(e, prod)
                                        }
                                    />
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
