import { HandleRevokeRole } from "@/api/UserAPI";

const handleRevokeRole = async (userId, setShowUI, setUpdateUserInfo) => {
    await HandleRevokeRole(userId, setShowUI, setUpdateUserInfo);
};

export default function ShowAdmin({
    usersDetails,
    setShowUI,
    setUpdateUserInfo,
}) {
    return (
        <div className="shadow-md m-5">
            <div className="mb-10">
                <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                    Admin
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
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Phone No
                            </th>
                        </tr>
                    </thead>
                    {usersDetails.admins.map((user, i) => {
                        return (
                            <tbody
                                key={i}
                                className="divide-y divide-gray-100 border-t border-gray-100"
                            >
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-normal text-gray-900">
                                        <div className="relative font-medium text-gray-700">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-400">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-400">
                                            {user.phone}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
            <div className="mb-10">
                <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                    Menu Editors
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
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Phone No
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            ></th>
                        </tr>
                    </thead>
                    {usersDetails.menuEditors.map((user, i) => {
                        return (
                            <tbody
                                key={i}
                                className="divide-y divide-gray-100 border-t border-gray-100"
                            >
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-normal text-gray-900">
                                        <div className="relative font-medium text-gray-700">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-400">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-400">
                                            {user.phone}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 flex justify-end">
                                        <button
                                            className="px-3 py-2 bg-red-800 mr-1 text-white font-semibold rounded"
                                            onClick={() =>
                                                handleRevokeRole(
                                                    user._id,
                                                    setShowUI,
                                                    setUpdateUserInfo
                                                )
                                            }
                                        >
                                            <span className="text-center text-base">
                                                Remove
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
            <div className="mb-10">
                <h2 className="text-gray-800 font-semibold text-center text-3xl py-2 mb-2">
                    Order Viewers
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
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Phone No
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            ></th>
                        </tr>
                    </thead>
                    {usersDetails.orderViewers.map((user, i) => {
                        return (
                            <tbody
                                key={i}
                                className="divide-y divide-gray-100 border-t border-gray-100"
                            >
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-normal text-gray-900">
                                        <div className="relative font-medium text-gray-700">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-400">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-400">
                                            {user.phone}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 flex justify-end">
                                        <button
                                            className="px-3 py-2 bg-red-800 mr-1 text-white font-semibold rounded"
                                            onClick={() =>
                                                handleRevokeRole(
                                                    user._id,
                                                    setShowUI,
                                                    setUpdateUserInfo
                                                )
                                            }
                                        >
                                            <span className="text-center text-base">
                                                Remove
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
