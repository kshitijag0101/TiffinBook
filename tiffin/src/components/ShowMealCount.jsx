import { HandleDeleteMealCount, HandleDeleteFoodOption } from "@/api/UserAPI";

const handleDeleteMealCount = async (
    mealCountId,
    setShowUI,
    setUpdateMealCountUI
) => {
    await HandleDeleteMealCount(mealCountId, setShowUI, setUpdateMealCountUI);
};

const handleDeleteFoodOption = async (
    foodOptionId,
    setShowUI,
    setUpdateMealCountUI
) => {
    await HandleDeleteFoodOption(foodOptionId, setShowUI, setUpdateMealCountUI);
};

export default function ShowMealCount({
    mealCounts,
    foodOptions,
    setShowUI,
    setUpdateMealCountUI,
}) {
    return (
        <div>
            <div className="shadow-md m-5">
                <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                    Meal Count
                </h2>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr className="text-lg">
                            <th
                                scope="col"
                                className="pl-6 pr-2 py-4 font-medium text-gray-900"
                            >
                                Count
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            ></th>
                        </tr>
                    </thead>
                    {mealCounts.map((mealCount, i) => {
                        return (
                            <tbody
                                key={i}
                                className="divide-y divide-gray-100 border-t border-gray-100"
                            >
                                <tr className="hover:bg-gray-50">
                                    <td className="pl-6 pr-2 py-4 font-normal">
                                        <div className="relative h-10 w-20 font-medium text-gray-700">
                                            {mealCount.count}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end">
                                        <button
                                            className="px-3 py-2 bg-red-800 mr-1 text-white font-semibold rounded"
                                            onClick={() =>
                                                handleDeleteMealCount(
                                                    mealCount._id,
                                                    setShowUI,
                                                    setUpdateMealCountUI
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
            <div className="shadow-md m-5">
                <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                    Food Options
                </h2>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr className="text-lg">
                            <th
                                scope="col"
                                className="pl-6 pr-2 py-4 font-medium text-gray-900"
                            >
                                Type
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            ></th>
                        </tr>
                    </thead>
                    {foodOptions.map((foodOption, i) => {
                        return (
                            <tbody
                                key={i}
                                className="divide-y divide-gray-100 border-t border-gray-100"
                            >
                                <tr className="hover:bg-gray-50">
                                    <td className="pl-6 pr-2 py-4 font-normal">
                                        <div className="relative h-10 w-32 font-medium text-gray-700">
                                            {foodOption.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end">
                                        <button
                                            className="px-3 py-2 bg-red-800 mr-1 text-white font-semibold rounded"
                                            onClick={() =>
                                                handleDeleteFoodOption(
                                                    foodOption._id,
                                                    setShowUI,
                                                    setUpdateMealCountUI
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
        </div>
    );
}
