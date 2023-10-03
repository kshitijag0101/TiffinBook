"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HandleGetCombos } from "@/api/UserAPI";

export default function Combos() {
    const [mealId, setSelectedmealId] = useState(null);
    const [combos, setCombos] = useState([]);

    useEffect(() => {
        const mealId = window.location.href.split("?")[1].split("=")[1];
        setSelectedmealId(mealId);
        const fetchCombos = async () => {
            const response = await HandleGetCombos();
            setCombos(response.combos);
        };
        fetchCombos();
    }, []);

    return (
        <section className="text-black bg-white body-font">
            <h1 className="text-center font-bold font-serif text-3xl bg-white py-3">
                Combos
            </h1>
            <div className="container px-5 pb-24 pt-10 mt-3">
                <div className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 gap-10 justify-left lg:ml-32 -my-4">
                    {combos.map((combo, i) => {
                        return (
                            <div
                                className="lg:w-full md:max-w-4xl p-4 mb-7 lg:mx-10 w-full"
                                key={i}
                            >
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <Image
                                        height={300}
                                        width={300}
                                        alt="ecommerce"
                                        className="object-cover object-center w-full h-full block rounded-xl"
                                        src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    />
                                </a>
                                <div className="flex justify-between mt-4">
                                    <div>
                                        <h3 className="text-xs tracking-widest title-font mb-1">
                                            COMBO
                                        </h3>
                                        <h2 className="title-font text-lg font-medium">
                                            {combo.name}
                                        </h2>
    
                                    </div>
                                    <div className="my-auto">
                                        <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-xl tracking-tighter text-white bg-or rounded-lg group">
                                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-do rounded-full group-hover:w-56 group-hover:h-56"></span>
                                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-or"></span>
                                            <span className="relative">
                                                <Link
                                                    href={`/Menu/combos/combo?mealpage=${mealId}&combo=${combo._id}`}
                                                >
                                                    Book Combo
                                                </Link>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
