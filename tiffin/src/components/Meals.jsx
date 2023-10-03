"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HandleMenu, HandleDate } from "../api/UserAPI";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/showToast";

export default function Meals() {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const month = [
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [oddMeals, setOddMeals] = useState([]);
    const [evenMeals, setEvenMeals] = useState([]);
    const [weeks, setWeeks] = useState([]);
    const [menuPage, setMenuPage] = useState(0);
    const [menuId, setMenuId] = useState("");
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await HandleMenu();
                setMenus(response.menus);
                const res = await HandleDate(Date.now());
                const weekday = [];
                let odddays = ``,
                    evendays = ``;
                res.weeks.map((week, i) => {
                    const d1 = week.startDate.split("-");
                    const d2 = week.endDate.split("-");
                    if (i % 2 == 0) {
                        if (odddays !== ``) odddays += "& ";
                        odddays +=
                            d1[2] +
                            "-" +
                            d2[2] +
                            " " +
                            month[parseInt(d1[1]) - 1] +
                            " ";
                    } else {
                        if (evendays !== ``) evendays += "& ";
                        evendays +=
                            d1[2] +
                            "-" +
                            d2[2] +
                            " " +
                            month[parseInt(d1[1]) - 1] +
                            " ";
                    }
                });
                weekday.push(odddays);
                weekday.push(evendays);
                setWeeks(weekday);
            } catch (error) {
                showToast("Error fetching menu items", "fail");
            }
        };
        fetchMenuItems();
    }, []);

    useEffect(() => {
        if (menus.length > 0) {
            setOddMeals(menus[menuPage].oddWeek);
            setEvenMeals(menus[menuPage].evenWeek);
            setMenuId(menus[menuPage]._id);
        }
    }, [menus]);

    if (oddMeals.length === 0 || evenMeals.length === 0) {
        return (
            <section className="bg-white">
                <div className="flex justify-center h-screen my-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{
                            margin: "auto",
                            background: "#ffffff",
                            display: " block",
                            shapeRendering: "auto",
                        }}
                        width="200px"
                        height="200px"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="32"
                            strokeWidth="8"
                            stroke="#ed1725"
                            strokeDasharray="50.26548245743669 50.26548245743669"
                            fill="none"
                            strokeLinecap="round"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                dur="1s"
                                repeatCount="indefinite"
                                keyTimes="0;1"
                                values="0 50 50;360 50 50"
                            ></animateTransform>
                        </circle>
                        <circle
                            cx="50"
                            cy="50"
                            r="23"
                            strokeWidth="8"
                            stroke="#d31a14"
                            strokeDasharray="36.12831551628262 36.12831551628262"
                            strokeDashoffset="36.12831551628262"
                            fill="none"
                            strokeLinecap="round"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                dur="1s"
                                repeatCount="indefinite"
                                keyTimes="0;1"
                                values="0 50 50;-360 50 50"
                            ></animateTransform>
                        </circle>
                        {/* [ldio] generated by https://loading.io/*/}
                    </svg>
                </div>
            </section>
        );
    }

    return (
        <div className="bg-white pb-14 text-black h-fit">
            <ToastContainer />
            <div className="items-center justify-center text-center mx-auto">
                <div className="lg:flex lg:flex-cols flex flex-cols items-center justify-center text-center mx-auto py-3 bg-white">
                    {menus.map((menu, i) => {
                        return (
                            <div className="lg:mr-10" key={i}>
                                <button
                                    className={`relative inline-flex items-center justify-center lg:my-2 lg:px-10 lg:py-2 px-5 py-2 mx-4 overflow-hidden font-medium text-xl tracking-tighter text-white rounded-lg group ${
                                        menuPage === i ? "bg-do" : "bg-black"
                                    }`}
                                    onClick={() => setMenuPage(i)}
                                >
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-do rounded-full group-hover:w-56 group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                                    <span className="relative">
                                        {menu.name}
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className=" mt-10 lg:mx-44 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-x-10 grid grid-cols-1 gap-y-0">
                <div
                    className="bg-no-repeat lg:bg-cover bg-contain lg:pb-52 pb-48"
                    style={{
                        backgroundImage:
                            "url(https://img.freepik.com/free-vector/vintage-ornamental-frame-beige-background_53876-116244.jpg?w=360&t=st=1690355483~exp=1690356083~hmac=8d5ff9257d4cb20948a86b150b864a12184ad809b5e03c57993164c4d8dbefde)",
                        backgroundSize: "",
                    }}
                >
                    <div className="">
                        <h1 className="lg:mx-50  mx-24 mt-12 py-1 lg:mt-28 lg:py-1 text-center text-xl font-serif italic">
                            Week 1 & 3
                        </h1>
                        <div className="lg:mt-3 mt-3 text-center text-lg font-medium font-serif text-red-500 italic">
                            {weeks[0]}
                        </div>
                        {oddMeals.map((items, i) => {
                            return (
                                <div
                                    className="lg:mt-3 lg:px-16 mt-7 px-8"
                                    key={i}
                                >
                                    <div className="flex lg:text-lg text-xs font-bold">
                                        {weekdays[i]}:&nbsp;
                                        {items.products.map((prod, j) => {
                                            return (
                                                <p key={j}>
                                                    {" "}
                                                    {prod.name},&nbsp;
                                                </p>
                                            );
                                        })}
                                    </div>
                                    <div className="flex lg:text-lg text-xs font-normal italic">
                                        Substitute: &nbsp;
                                        {items.substitutes.map((sub, k) => {
                                            return <p key={k}> {sub.name} </p>;
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div
                    className="bg-no-repeat lg:bg-cover bg-contain lg:pb-52 pb-48"
                    style={{
                        backgroundImage:
                            "url(https://img.freepik.com/free-vector/vintage-ornamental-frame-beige-background_53876-116244.jpg?w=360&t=st=1690355483~exp=1690356083~hmac=8d5ff9257d4cb20948a86b150b864a12184ad809b5e03c57993164c4d8dbefde)",
                        backgroundSize: "",
                    }}
                >
                    <div className="">
                        <h1 className="lg:mx-50  mx-24 mt-12 py-1 lg:mt-28 lg:py-1 text-center text-xl font-serif italic">
                            Week 2 & 4
                        </h1>
                        <p className="lg:mt-3 mt-3 text-center text-lg font-medium font-serif text-red-500 italic">
                            {weeks[1]}
                        </p>
                        {evenMeals.map((items, i) => {
                            return (
                                <div
                                    className="lg:mt-3 lg:px-16 mt-7 px-8"
                                    key={i}
                                >
                                    <div className="flex lg:text-lg text-xs font-bold">
                                        {weekdays[i]}:&nbsp;
                                        {items.products.map((prod, j) => {
                                            return (
                                                <p key={j}>
                                                    {" "}
                                                    {prod.name},&nbsp;
                                                </p>
                                            );
                                        })}
                                    </div>
                                    <div className="flex lg:text-lg text-xs italic">
                                        Substitute: &nbsp;
                                        {items.substitutes.map((sub, k) => {
                                            return <p key={k}> {sub.name} </p>;
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="relative inline-flex items-center justify-center lg:py-3 py-3 lg:px-10 px-10 lg:mt-16 mb-2 overflow-hidden font-medium text-xl tracking-tighter text-white bg-or rounded-lg group">
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-do rounded-full group-hover:w-56 group-hover:h-56"></span>
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-or"></span>
                    <span className="relative">
                        <Link href={`/Menu/combos?mealId=${menuId}`}>
                            Book Meal
                        </Link>
                    </span>
                </button>
            </div>
        </div>
    );
}
