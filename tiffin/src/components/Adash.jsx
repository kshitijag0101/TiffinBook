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
            <div className="flex h-20 w-72 items-center justify-center bg-white rounded-2xl">
                <h1 className="pt-2 text-4xl font-medium text-center leading-snug font-serif text-gray-600">
                    DashBoard
                </h1>
            </div>
            <div className="flex flex-col md:flex-row">
                <AdminSidebar showUI={showUI} setShowUI={setShowUI} />
                <div className="w-full bg-gray-50 lg:w-[calc(100% - 280px)]">
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
