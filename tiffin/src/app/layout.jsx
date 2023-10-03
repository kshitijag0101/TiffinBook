"use client";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { Provider } from "../context/authentication";
import Loading from "./loading";
import { useState } from "react";
import Login from "@/components/Login";

export default function RootLayout({ children }) {
    return (
        <Provider>
            <html lang="en">
                <head>
                    <title>Tiffin Service</title>
                </head>
                <body>
                    <Header />
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                    <Footer />
                </body>
            </html>
        </Provider>
    );
}
