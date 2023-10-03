import { HandleDeleteMenu } from "@/api/UserAPI";

const handleDeleteMenu = async (mealCountId, setShowUI, setUpdateMenuUI) => {
    await HandleDeleteMenu(mealCountId, setShowUI, setUpdateMenuUI);
};

export default function ShowMenu({ menus, setShowUI, setUpdateMenuUI }) {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="shadow-md m-5">
            <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                Menus
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
                            Even Weeks
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        >
                            Odd Weeks
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium text-gray-900"
                        ></th>
                    </tr>
                </thead>
                {menus.map((menu, i) => {
                    return (
                        <tbody
                            key={i}
                            className="divide-y divide-gray-100 border-t border-gray-100"
                        >
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-normal text-gray-900">
                                    <div className="relative h-10 w-30 font-medium text-gray-700">
                                        {menu.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {menu.evenWeek.map((meal, j) => {
                                            return (
                                                <div key={j}>
                                                    {weekdays[j]}
                                                    {": "}
                                                    {meal.name}{" "}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-400">
                                        {menu.oddWeek.map((meal, j) => {
                                            return (
                                                <div key={j}>
                                                    {weekdays[j]}
                                                    {": "}
                                                    {meal.name}{" "}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex justify-end">
                                    <button
                                        className="px-3 py-2 bg-red-800 mr-1 text-white font-semibold rounded"
                                        onClick={() =>
                                            handleDeleteMenu(
                                                menu._id,
                                                setShowUI,
                                                setUpdateMenuUI
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
