import { CiBadgeDollar } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import {LuPackage2 } from "react-icons/lu";
export default function OrderList() {
    return (
        <div className=" bg-gray-100 h-full flex flex-col">
            <div className="flex mt-10 flex-row">
            <div className="border bg-white ml-28 w-1/4 h-20 shadow-2xl rounded justify-left">
                <span className="flex gap-6">
                <CiBadgeDollar className="h-10 w-10 my-5 ml-5 bg-[#FFD700] text-white border rounded-3xl"/>
                <span className="flex flex-col text-gray-600">
                    <span className="mb-1 mt-4 font-medium font-serif text-sm">Total Earnings :</span>
                    <span className="pb-2 text-lg font-bold font-serif">1900000</span>
                </span>
                </span>
                
            </div>
            <div className="border bg-white w-1/4 ml-11 mr-10 h-20 shadow-2xl rounded justify-start">
                <span className="flex gap-6">
                    <span className="rounded-3xl h-10 w-10 ml-5 mt-5  bg-green-600"><FaCartShopping  className="h-6 w-6 ml-2 mt-2   text-white" /></span>
                    <span className="flex flex-col text-gray-600">
                    <span className="mb-1 mt-4 font-medium font-serif text-sm">Total Orders :</span>
                    <span className="pb-2 text-lg font-bold font-serif">9000</span>
                </span>
                </span>
            </div>
            <div className="border bg-white w-1/4 h-20 shadow-2xl rounded justify-start">
            <span className="flex gap-6">
                    <span className="rounded-3xl h-10 w-10 ml-5 mt-5  bg-blue-400"><LuPackage2 className="h-6 w-6 ml-2 mt-2   text-white" /></span>
                    <span className="flex flex-col text-gray-600">
                    <span className="mb-1 mt-4 font-medium font-serif text-sm">Orders Delivered :</span>
                    <span className="pb-2 text-lg font-bold font-serif">1100</span>
                </span>
                </span>
            </div>
            </div>
            <div className="mt-5 flex flex-row ">
            <div className="border ml-28 bg-white w-[54%] h-96 shadow-2xl rounded justify-start">
                <div className="pt-80">hi</div>
            </div>
            <div className="border bg-white w-1/4 h-96 ml-10 shadow-2xl rounded justify-start">
                <div className="pt-80">hi</div>
            </div>
            </div>
           
            <div
                className=" h-50 w-[83%] mt-4 mr-28 mb-5 ml-28  bg-white shadow-2xl rounded-xl
                              relative z-10 border border-rounded-sm"
            >
                <div className="flex flex-row h-10 my-4  pl-10 ">
                    <span className="flex gap-3"><span className="rounded-3xl h-10 w-10 ml-5   bg-green-600"><FaCartShopping  className="h-6 w-6 ml-2 mt-2   text-white" /></span>
                    <p className="pr-16 text-xl m-2 font-medium leading-snug font-serif text-gray-600">
                        Today&apos;s Order List
                    </p></span>
                
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
