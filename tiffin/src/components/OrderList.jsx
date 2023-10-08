export default function OrderList() {
    return (
        <div className=" flex flex-col mt-10">
            <div className="flex flex-row">
            <div className="border bg-white ml-28 w-1/4 h-20 shadow-2xl rounded justify-left">
                <span>hi</span>
            </div>
            <div className="border bg-white w-1/4 ml-11 mr-10 h-20 shadow-2xl rounded justify-start">
                <span>hi</span>
            </div>
            <div className="border bg-white w-1/4 h-20 shadow-2xl rounded justify-start">
                <span>hi</span>
            </div>
            </div>
            <div className="mt-5 flex flex-row ">
            <div className="border ml-28 bg-white w-[54%] h-96 shadow-2xl rounded justify-start">
                <span>hi</span>
            </div>
            <div className="border bg-white w-1/4 h-96 ml-10 shadow-2xl rounded justify-start">
                <span>hi</span>
            </div>
            </div>
           
            <div
                className=" h-50 w-[83%] mt-4 mr-28 mb-5 ml-28  bg-white shadow-2xl rounded-xl
                              relative z-10 border border-rounded-sm"
            >
                <div className="flex flex-row h-10 my-4  pl-10 ">
                    <p className="pr-16 text-xl font-medium leading-snug font-serif text-gray-600">
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
                <table className="w-full border-separate border-spacing-10 border-t-2">
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
