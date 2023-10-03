import { HandleDeleteProduct } from "@/api/UserAPI";

const handleDeleteProduct = async (
    productId,
    setShowUI,
    setUpdateProductUI
) => {
    await HandleDeleteProduct(productId, setShowUI, setUpdateProductUI);
};

export default function ShowProduct({
    products,
    setShowUI,
    setUpdateProductUI,
}) {
    return (
        <div className="shadow-md m-5">
            <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                Products
            </h2>
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                    <tr className="text-lg">
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        >
                            Price
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        ></th>
                    </tr>
                </thead>
                {products.map((product, i) => {
                    return (
                        <tbody
                            key={i}
                            className="divide-y divide-gray-100 border-t border-gray-100"
                        >
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-normal text-gray-900">
                                    <div className="relative h-10 w-30 font-medium text-gray-700">
                                        {product.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {product.price}
                                    </div>
                                </td>

                                <td className="px-6 py-4 flex justify-end">
                                    <button
                                        className="px-3 py-2 bg-red-800 mr-1 text-white font-semibold rounded"
                                        onClick={() =>
                                            handleDeleteProduct(
                                                product._id,
                                                setShowUI,
                                                setUpdateProductUI
                                            )
                                        }
                                    >
                                        <span className="text-center text-base">
                                            Delete
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
}
