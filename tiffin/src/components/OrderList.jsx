export default function OrderList() {
    return (
        <div className=" flex flex-col mt-10 justify-center items-center">
            <div
                className=" h-50 min-w-min max-w-xs ml-20 mt-4 mr-10 mb-5 justify-center items-center  bg-white shadow-2xl rounded-xl
                              relative z-10 border border-rounded-sm"
            >
                <div className="flex flex-row h-10 my-4  pl-10 justify-center items-center">
                    <p className="mr-72 pr-16 text-xl font-medium leading-snug font-serif text-gray-600">
                        Today&apos;s Order List
                    </p>
                    <button
                        type="submit"
                        className="absolute right-8 inline-block ml-5 py-2 px-2 text-xl font-medium text-center bg-or hover:bg-do
                                                                    rounded-lg transition duration-200 text-white"
                    >
                        Download
                    </button>
                </div>
                <table className="border-separate border-spacing-10 border-t-2">
                    <thead className="text-gray-600 border-spacing-20">
                        <tr className="border-b-2">
                            <th className="whitespace-nowrap" scope="col">
                                Order Id
                            </th>
                            <th className="whitespace-nowrap">
                                Ordered Product
                            </th>
                            <th className="whitespace-nowrap">Contact No.</th>
                            <th className="whitespace-nowrap">Address</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        <tr className="border-b-2">
                            <td className="whitespace-nowrap">Order Id</td>
                            <td className="whitespace-nowrap">
                                Ordered Product{" "}
                            </td>
                            <td className="whitespace-nowrap">Contact No.</td>
                            <td className="whitespace-nowrap">Address</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                className="h-50 min-w-min max-w-xs ml-12 mt-10 justify-center items-center  bg-white shadow-xl rounded-xl
                              relative z-10 border border-rounded-sm"
            >
                <div>
                    <p className="w-full text-4xl font-medium text-center leading-snug font-serif text-gray-600"></p>
                </div>
                <div className="flex justify-around mt-4 h-10 my-4 pl-10">
                    <div>
                        <p
                            className="bg-white pt-0 pr-2 pb-0 pl-1 -mt-3 mr-0 mb-0 ml-1 font-medium text-gray-600
                                    absolute"
                        >
                            Start Date
                        </p>
                        <input
                            type="date"
                            placeholder=""
                            className="border border-gray-400 focus:outline-none
                                    focus:border-black mt-2 mb-2 mr-4 text-base text-black block bg-white rounded-md"
                        ></input>
                    </div>
                    <div>
                        <p
                            className="bg-white pt-0 pr-2 pb-0 pl-1 -mt-3 mr-0 mb-0 ml-1 font-medium text-gray-600
                                    absolute"
                        >
                            End Date
                        </p>
                        <input
                            type="date"
                            placeholder=""
                            className="border border-gray-400 focus:outline-none
                                    focus:border-black mt-2 mb-2 mr-4 text-base text-black block bg-white rounded-md"
                        ></input>
                    </div>
                    <button
                        type="submit"
                        className="inline-block pl-2 pr-2 pt-1 pb-1 text-xl font-medium text-center bg-or hover:bg-do
                                                                    rounded-lg transition duration-200 text-white"
                    >
                        Download
                    </button>
                </div>
                <table className="border-separate border-spacing-10 border-t-2">
                    <thead className="text-gray-600 border-spacing-20">
                        <tr className="border-b-2">
                            <th className="whitespace-nowrap" scope="col">
                                Order Id
                            </th>
                            <th className="whitespace-nowrap">
                                Ordered Product
                            </th>
                            <th className="whitespace-nowrap">Contact No.</th>
                            <th className="whitespace-nowrap">Address</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        <tr className="border-b-2">
                            <td className="whitespace-nowrap">Order Id</td>
                            <td className="whitespace-nowrap">
                                Ordered Product{" "}
                            </td>
                            <td className="whitespace-nowrap">Contact No.</td>
                            <td className="whitespace-nowrap">Address</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
