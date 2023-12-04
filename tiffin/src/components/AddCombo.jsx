import { useState, useEffect } from "react";
import { HandleAddCombo } from "@/api/UserAPI";

export default function AddCombo({ mealCounts, setShowUI, setUpdateComboUI }) {
    const [comboName, setComboName] = useState("");
    const [comboDescription, setComboDescription] = useState("");
    const [comboPrices, setComboPrices] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(null);
            return;
        }
        setSelectedImage(e.target.files[0]);
    };

    const handleComboNameChange = (e) => {
        setComboName(e.target.value);
    };

    const handleComboDescriptionChange = (e) => {
        setComboDescription(e.target.value);
    };

    const handleComboPriceChange = (index, value) => {
        const updatedPrices = [...comboPrices];
        updatedPrices[index] = parseInt(value);
        setComboPrices(updatedPrices);
    };

    const HandleAddComboReset = () => {
        setComboName("");
        setComboDescription("");
        const comboPrice = Array(mealCounts.length).fill(0);
        setComboPrices(comboPrice);
        setShowUI("");
        setTimeout(() => {
            setShowUI("addcombo");
        }, 100);
    };

    const handleAddComboSubmit = async (e) => {
        e.preventDefault();
        const index = comboPrices.indexOf(0);
        if (index === -1 || comboName !== "" || comboDescription !== "") {
            let mealCounts = [];
            mealCounts.map((count, i) => {
                mealCounts.push({
                    mealCount: count._id,
                    price: comboPrices[i],
                });
            });
            await HandleAddCombo(
                comboName,
                comboDescription,
                mealCounts,
                setUpdateComboUI,
                selectedImage
            );
            HandleAddComboReset();
        } else {
            showToast("Please fill all the details", "fail");
        }
    };

    useEffect(() => {
        const comboPrice = Array(mealCounts.length).fill(0);
        setComboPrices(comboPrice);
    }, []);

    return (
        <div className="p-8">
            <h1 className="font-medium text-3xl text-center">Add Combo</h1>
            <form className="w-full mx-auto" onSubmit={handleAddComboSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div className="mb-6 flex gap-32">
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
                            value={comboName}
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-60"
                            placeholder="Combo name"
                            onChange={handleComboNameChange}
                        />
                    </div>
                </div>
                <div className="mb-6 flex gap-20">
                    <label
                        htmlFor="name"
                        className="text-gray-700 block mb-1 font-medium text-xl"
                    >
                        Description
                    </label>
                    <textarea
                        type="text"
                        name="name"
                        id="description"
                        value={comboDescription}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2 h-40"
                        placeholder="Combo description"
                        onChange={handleComboDescriptionChange}
                    />
                </div>
                <div className="flex flex-row gap-20">
                    <div className="mt-5 w-1/3">
                        <label
                            htmlFor="name"
                            className="text-gray-700 block mb-2 font-medium text-xl"
                        >
                            Prices
                        </label>
                        {mealCounts.map((count, i) => {
                            return (
                                <div
                                    className="grid lg:grid-cols-2 mb-2"
                                    key={i}
                                >
                                    <label
                                        htmlFor="count"
                                        className="text-gray-700 block font-medium text-xl my-auto"
                                    >
                                        {count.count} {"Meals"}
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={
                                            comboPrices[i] === 0
                                                ? ""
                                                : comboPrices[i]
                                        }
                                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full my-auto"
                                        placeholder="0"
                                        onChange={(e) =>
                                            handleComboPriceChange(
                                                i,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-5 w-1/3">
                        <label
                            htmlFor="image"
                            className="text-gray-700 block mb-2 font-medium text-xl"
                        >
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple={false}
                            encType="multipart/form-data"
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
    );
}
