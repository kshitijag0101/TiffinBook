import { useState } from "react";
import { HandleAddProduct } from "@/api/UserAPI";

export default function AddProduct({ setUpdateProductUI }) {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productType, setProductType] = useState(true);

    const HandleAddProductReset = () => {
        setProductName("");
        setProductPrice("");
    };

    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        if (productName !== "" || productPrice !== "") {
            await HandleAddProduct(
                productName,
                productPrice,
                productType,
                setUpdateProductUI
            );
            HandleAddProductReset();
        } else {
            showToast("Please enter all details!", "fail");
        }
    };

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    return (
        <div class="p-8">
            <h1 class="font-medium text-3xl text-center">Add Product</h1>
            <form className="w-1/2 mx-auto" onSubmit={handleAddProductSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div className="mb-6">
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
                            value={productName}
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="Product name"
                            onChange={handleProductNameChange}
                        />
                    </div>

                    <div className="mb-6">
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
                            value={productPrice}
                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="0"
                            onChange={handleProductPriceChange}
                        />
                    </div>
                    <div className="flex justify-start gap-4">
                        <div className="flex gap-4">
                            <label
                                htmlFor="isVegetarian"
                                className="text-xl text-gray-700 block mb-1 font-medium"
                            >
                                Veg
                            </label>
                            <input
                                type="radio"
                                name="veg"
                                id="veg"
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                defaultChecked
                                onClick={() => setProductType(true)}
                            />
                        </div>
                        <div className="flex gap-4">
                            <label
                                htmlFor="Non Veg"
                                className="text-xl text-gray-700 block mb-1 font-medium"
                            >
                                NonVeg
                            </label>
                            <input
                                type="radio"
                                name="veg"
                                id="nonveg"
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                onClick={() => setProductType(false)}
                            />
                        </div>
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
