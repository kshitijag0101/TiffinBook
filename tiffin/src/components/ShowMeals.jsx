import { HandleDeleteMeal } from "@/api/UserAPI";

const handleDeleteMeal = async (mealId, setShowUI, setUpdateMealUI) => {
    await HandleDeleteMeal(mealId, setShowUI, setUpdateMealUI);
};

export default function ShowMeal({ meals, setShowUI, setUpdateMealUI }) {
    return (
        <div className="shadow-md m-5">
            <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                Meals
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
                            Products
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        >
                            Substitutes
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        >
                            AddOns
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        ></th>
                    </tr>
                </thead>
                {meals.map((meal, i) => {
                    return (
                        <tbody
                            key={i}
                            className="divide-y divide-gray-100 border-t border-gray-100"
                        >
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-normal text-gray-900">
                                    <div className="relative h-10 w-30 font-medium text-gray-700">
                                        {meal.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {meal.products.map((prod, j) => {
                                            return (
                                                <div key={j}>
                                                    {prod.name}{" "}
                                                    {j ===
                                                    meal.products.length - 1
                                                        ? ""
                                                        : ","}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {meal.substitutes.map((sub, j) => {
                                            return (
                                                <div key={j}>
                                                    {sub.name}{" "}
                                                    {j ===
                                                    meal.substitutes.length - 1
                                                        ? ""
                                                        : ","}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {meal.addons.map((addon, j) => {
                                            return (
                                                <div key={j}>
                                                    {addon.name}{" "}
                                                    {j ===
                                                    meal.addons.length - 1
                                                        ? ""
                                                        : ","}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </td>

                                <td className="px-6 py-4 flex justify-end">
                                    <button
                                        className="px-3 py-2 bg-red-800 mr-1 text-white font-semibold rounded"
                                        onClick={() =>
                                            handleDeleteMeal(
                                                meal._id,
                                                setShowUI,
                                                setUpdateMealUI
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
