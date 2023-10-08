import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiClipboardDocumentList } from "react-icons/hi2";

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
                    className={`flex justify-between py-4 px-6 text-xl hover:text-red-800 font-bold ${
                        orders === true ? "text-red-800" : "text-black"
                    }`}
                    onClick={handleShowOrderClick}
                >
                    Orders{" "}
                    {orders === true ? (
                        <IoIosArrowUp className="mt-1" />
                    ) : (
                        <IoIosArrowDown className="mt-1" />
                    )}
                </div>
                {orders && (
                    <div
                        className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold flex gap-3 ${
                            showUI === "orderlist"
                                ? "text-red-800"
                                : "text-black"
                        }`}
                        onClick={handleOrderListClick}
                    >
                        <HiClipboardDocumentList className="mt-1" />
                        Orders List
                    </div>
                )}
                <div
                    className={`flex justify-between py-4 px-6  text-xl hover:text-red-800 font-bold ${
                        addItems === true ? "text-red-800" : "text-black"
                    }`}
                    onClick={handleAddItemsClick}
                >
                    Add Items{" "}
                    {addItems === true ? (
                        <IoIosArrowUp className="mt-1" />
                    ) : (
                        <IoIosArrowDown className="mt-1" />
                    )}
                </div>
                {addItems && (
                    <div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "addproduct"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddProductClick}
                        >
                            Prdouct
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "addmeal"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddMealClick}
                        >
                            Meal
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "addmenu"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddMenuClick}
                        >
                            Menu
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "addcombo"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddComboClick}
                        >
                            Combo
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "addmealcount"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleAddMealCountClick}
                        >
                            Meal Count
                        </div>
                    </div>
                )}
                <div
                    className={`flex justify-between py-4 px-6  text-xl hover:text-red-800 font-bold ${
                        modifyItems === true ? "text-red-800" : "text-black"
                    }`}
                    onClick={handleModifyItemsClick}
                >
                    Modify Items{" "}
                    {modifyItems === true ? (
                        <IoIosArrowUp className="mt-1" />
                    ) : (
                        <IoIosArrowDown className="mt-1" />
                    )}
                </div>
                {modifyItems && (
                    <div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "showproduct"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowProductClick}
                        >
                            Products
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "showmeal"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowMealClick}
                        >
                            Meals
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "showmenu"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowMenuClick}
                        >
                            Menus
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "showcombo"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowComboClick}
                        >
                            Combos
                        </div>
                        <div
                            className={`py-2 text-xl text-left px-12 hover:text-red-800 font-semibold ${
                                showUI === "showmealcount"
                                    ? "text-red-800"
                                    : "text-black"
                            }`}
                            onClick={handleShowMealCountClick}
                        >
                            Meal Counts
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
