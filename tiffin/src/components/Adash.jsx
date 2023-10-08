import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
    HandleGetProducts,
    HandleGetMeals,
    HandleGetMealCounts,
    HandleGetFoodOptions,
    HandleGetCombos,
    HandleMenu,
} from "@/api/UserAPI";
import { RxDashboard } from "react-icons/rx";
import { showToast } from "@/utils/showToast";
import AddProduct from "./AddProduct";
import AddMeal from "./AddMeal";
import AddMenu from "./AddMenu";
import AddCombo from "./AddCombo";
import OrderList from "./OrderList";
import AddMealCount from "./AddMealCount";
import AdminSidebar from "./AdminSidebar";
import ShowProduct from "./ShowProducts";
import ShowMeal from "./ShowMeals";
import ShowCombo from "./ShowCombo";
import ShowMealCount from "./ShowMealCount";
import ShowMenu from "./ShowMenu";

export default function Adash() {
    const [showUI, setShowUI] = useState("orderlist");
    const [products, setProducts] = useState([]);
    const [meals, setMeals] = useState([]);
    const [mealCounts, setMealCounts] = useState([]);
    const [foodOptions, setFoodOptions] = useState([]);
    const [combos, setCombos] = useState([]);
    const [menus, setMenus] = useState([]);
    const [updateProductUI, setUpdateProductUI] = useState(false);
    const [updateMealUI, setUpdateMealUI] = useState(false);
    const [updateMenuUI, setUpdateMenuUI] = useState(false);
    const [updateComboUI, setUpdateComboUI] = useState(false);
    const [updateMealCountUI, setUpdateMealCountUI] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await HandleMenu();
            setMenus(response.menus);
        };
        fetchMenu();
    }, [updateMenuUI]);

    useEffect(() => {
        const fetchMeals = async () => {
            const res = await HandleGetMeals();
            setMeals(res.meals);
        };
        fetchMeals();
    }, [updateMealUI]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await HandleGetProducts();
            setProducts(response.products);
        };
        fetchProducts();
    }, [updateProductUI]);

    useEffect(() => {
        const fetchMealCounts = async () => {
            const mealCountResponse = await HandleGetMealCounts();
            setMealCounts(mealCountResponse.mealCounts);
        };
        fetchMealCounts();
    }, [updateMealCountUI]);

    useEffect(() => {
        const fetchCombos = async () => {
            const combosResponse = await HandleGetCombos();
            setCombos(combosResponse.combos);
        };
        fetchCombos();
    }, [updateComboUI]);

    useEffect(() => {
        const fetchfoodOptions = async () => {
            const foodOptionsResponse = await HandleGetFoodOptions();
            setFoodOptions(foodOptionsResponse.foodOptions);
        };
        fetchfoodOptions();
    }, [updateMealCountUI]);

    return (
        <div className="bg-white text-black">
            <ToastContainer />
            <hr className="" />

            <div className="flex flex-col md:flex-row">
                <div className="w-80">
                    <h1 className="py-2 px-4 text-4xl border-r-2 leading-snug font-serif text-black flex gap-4">
                        <RxDashboard className="text-red-800 mt-2" />
                        <span className="font-serif text-sm">
                            <span className="font-bold text-2xl text-red-800 italic">
                                Admin
                            </span>{" "}
                            <br />
                            <span className="pl-1">DashBoard</span>
                        </span>
                    </h1>

                    <AdminSidebar showUI={showUI} setShowUI={setShowUI} />
                </div>

                <div className="w-full mt-4 lg:w-[calc(100% - 280px)] md:pl-20">
                    {showUI === "orderlist" && <OrderList />}
                    {showUI === "addproduct" && (
                        <AddProduct setUpdateProductUI={setUpdateProductUI} />
                    )}
                    {showUI === "addmeal" && (
                        <AddMeal
                            products={products}
                            setShowUI={setShowUI}
                            setUpdateMealUI={setUpdateMealUI}
                        />
                    )}
                    {showUI === "addmenu" && (
                        <AddMenu
                            meals={meals}
                            setShowUI={setShowUI}
                            setUpdateMenuUI={setUpdateMenuUI}
                        />
                    )}
                    {showUI === "addcombo" && (
                        <AddCombo
                            mealCounts={mealCounts}
                            setShowUI={setShowUI}
                            setUpdateComboUI={setUpdateComboUI}
                        />
                    )}
                    {showUI === "addmealcount" && (
                        <AddMealCount
                            setUpdateMealCountUI={setUpdateMealCountUI}
                        />
                    )}
                    {showUI === "showproduct" && (
                        <ShowProduct
                            products={products}
                            setShowUI={setShowUI}
                            setUpdateProductUI={setUpdateProductUI}
                        />
                    )}
                    {showUI === "showmeal" && (
                        <ShowMeal
                            meals={meals}
                            setShowUI={setShowUI}
                            setUpdateMealUI={setUpdateMealUI}
                        />
                    )}
                    {showUI === "showcombo" && (
                        <ShowCombo
                            combos={combos}
                            setShowUI={setShowUI}
                            setUpdateComboUI={setUpdateComboUI}
                        />
                    )}
                    {showUI === "showmealcount" && (
                        <ShowMealCount
                            mealCounts={mealCounts}
                            foodOptions={foodOptions}
                            setShowUI={setShowUI}
                            setUpdateMealCountUI={setUpdateMealCountUI}
                        />
                    )}
                    {showUI === "showmenu" && (
                        <ShowMenu
                            menus={menus}
                            setShowUI={setShowUI}
                            setUpdateMealCountUI={setUpdateMealCountUI}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
