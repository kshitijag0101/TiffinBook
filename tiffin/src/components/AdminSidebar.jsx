import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { BsCardChecklist } from "react-icons/bs";
import { TbLayoutGridAdd } from "react-icons/tb";
import { FaProductHunt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";

export default function AdminSidebar({ showUI, setShowUI }) {
    const [orders, setShowOrders] = useState(true);
    const [addItems, setAddItems] = useState(false);
    const [modifyItems, setModifyItems] = useState(false);

    const handleOrderListClick = () => {
        setShowUI("orderlist");
    };

    const handleAddProductClick = () => {
        setShowUI("addproduct");
    };

    const handleAddMealClick = () => {
        setShowUI("addmeal");
    };

    const handleAddMenuClick = () => {
        setShowUI("addmenu");
    };

    const handleAddComboClick = () => {
        setShowUI("addcombo");
    };

    const handleAddMealCountClick = () => {
        setShowUI("addmealcount");
    };

    const handleShowProductClick = () => {
        setShowUI("showproduct");
    };

    const handleShowMealClick = () => {
        setShowUI("showmeal");
    };

    const handleShowComboClick = () => {
        setShowUI("showcombo");
    };

    const handleShowMealCountClick = () => {
        setShowUI("showmealcount");
    };

    const handleShowMenuClick = () => {
        setShowUI("showmenu");
    };

    const handleShowOrderClick = () => {
        orders === true ? setShowOrders(false) : setShowOrders(true);
    };

    const handleAddItemsClick = () => {
        addItems === true ? setAddItems(false) : setAddItems(true);
    };

    const handleModifyItemsClick = () => {
        modifyItems === true ? setModifyItems(false) : setModifyItems(true);
    };

    return (
        <div className="border-r-2 border-t-2 min-h-screen">
            <div className="mx-auto text-center">
                <div
                    className={`flex gap-4 py-4 px-6 text-xl hover:text-red-800 font-bold ${
                        orders === true ? "text-red-800" : "text-black"
                    }`}
                    onClick={handleShowOrderClick}
                >
                    <HiClipboardDocumentList className="mt-1" />

                    <div className="flex justify-between">
                        Orders{" "}
                        {orders === true ? (
                            <IoIosArrowUp className="mt-1 ml-20" />
                        ) : (
                            <IoIosArrowDown className="mt-1 ml-20" />
                        )}
                    </div>
                </div>
                {orders && (
                    <div
                        className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                            showUI === "orderlist"
                                ? "text-red-800"
                                : "text-black"
                        }`}
                        onClick={handleOrderListClick}
                    >
                        <BsCardChecklist className="mt-1" />
                        Orders List
                    </div>
                )}
                <div
                    className={`flex gap-4 py-4 px-6 text-xl hover:text-red-800 font-bold ${
                        addItems === true ? "text-red-800" : "text-black"
                    }`}
                    onClick={handleAddItemsClick}
                >
                    <TbLayoutGridAdd className="mt-1" />
                    <div className="flex justify-between">
                        <div>Add Items </div>
                        <div>
                            {addItems === true ? (
                                <IoIosArrowUp className="mt-1 ml-12" />
                            ) : (
                                <IoIosArrowDown className="mt-1 ml-12" />
                            )}
                        </div>
                    </div>
                </div>
                {addItems && (
                    <div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "addproduct"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddProductClick}
                        >
                            <FaProductHunt className="mt-1" />
                            Prdouct
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "addmeal"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddMealClick}
                        >
                            <GiMeal className="mt-1" />
                            Meal
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "addmenu"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddMenuClick}
                        >
                            <BiSolidFoodMenu className="mt-1" />
                            Menu
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "addcombo"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddComboClick}
                        >
                            <MdFastfood className="mt-1" />
                            Combo
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "addmealcount"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddMealCountClick}
                        >
                            <FaCalendarDays className="mt-1" />
                            Meal Count
                        </div>
                    </div>
                )}
                <div
                    className={`flex gap-4 py-4 px-6  text-xl hover:text-red-800 font-bold ${
                        modifyItems === true ? "text-red-800" : "text-black"
                    }`}
                    onClick={handleModifyItemsClick}
                >
                    <AiFillEdit className="mt-1" />
                    <div className="flex justify-between">
                        Modify Items{" "}
                        {modifyItems === true ? (
                            <IoIosArrowUp className="mt-1 ml-5" />
                        ) : (
                            <IoIosArrowDown className="mt-1 ml-5" />
                        )}
                    </div>
                </div>
                {modifyItems && (
                    <div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "showproduct"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowProductClick}
                        >
                            <FaProductHunt className="mt-1" />
                            Products
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "showmeal"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowMealClick}
                        >
                            <GiMeal className="mt-1" />
                            Meals
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "showmenu"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowMenuClick}
                        >
                            <BiSolidFoodMenu className="mt-1" />
                            Menus
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "showcombo"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowComboClick}
                        >
                            <MdFastfood className="mt-1" />
                            Combos
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-4 ${
                                showUI === "showmealcount"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowMealCountClick}
                        >
                            <FaCalendarDays className="mt-1" />
                            Meal Counts
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
