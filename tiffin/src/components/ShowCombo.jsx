import { HandleDeleteCombo } from "@/api/UserAPI";

const handleDeleteCombo = async (comboId, setShowUI, setUpdateComboUI) => {
    await HandleDeleteCombo(comboId, setShowUI, setUpdateComboUI);
};

export default function ShowCombo({ combos, setShowUI, setUpdateComboUI }) {
    return (
        <div className="shadow-md m-5">
            <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                Combos
            </h2>
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                    <tr className="text-lg">
                        <th
                            scope="col"
                            className="pl-6 pr-2 py-4 font-medium text-gray-900"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        >
                            Description
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        >
                            Prices
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        ></th>
                    </tr>
                </thead>
                {combos.map((combo, i) => {
                    return (
                        <tbody
                            key={i}
                            className="divide-y divide-gray-100 border-t border-gray-100"
                        >
                            <tr className="hover:bg-gray-50">
                                <td className="pl-6 pr-2 py-4 font-normal">
                                    <div className="relative h-10 w-20 font-medium text-gray-700">
                                        {combo.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-normal">
                                    <div className="relative w-48 font-medium text-gray-400">
                                        {combo.description}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {combo.mealCounts.map(
                                            (mealCount, j) => {
                                                return (
                                                    <div
                                                        key={j}
                                                        className="grid grid-cols-2"
                                                    >
                                                        <div>
                                                            {
                                                                mealCount
                                                                    .mealCount
                                                                    .count
                                                            }{" "}
                                                            {"Meals"}
                                                        </div>
                                                        <div>
                                                            $ {mealCount.price}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex justify-end">
                                    <button
                                        className="px-3 py-2 bg-red-800 mr-1 text-white font-semibold rounded"
                                        onClick={() =>
                                            handleDeleteCombo(
                                                combo._id,
                                                setShowUI,
                                                setUpdateComboUI
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
