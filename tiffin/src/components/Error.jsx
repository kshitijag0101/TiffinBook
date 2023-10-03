import Link from "next/link";

export default function Error() {
    return (
        <section className="text-white bg-pe pt-24 h-screen body-font">
            <div className="container w-full">
                <div className="mx-auto max-w-[400px] text-center">
                    <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                        404
                    </h2>
                    <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                        Oops! That page can&apos;t be found
                    </h4>
                    <p className="mb-8 text-lg text-gray-400">
                        The page you are looking for it maybe deleted
                    </p>
                    <button className="relative inline-flex items-center justify-center mt-5 px-6 py-4 overflow-hidden font-medium text-xl tracking-tighter text-white bg-or rounded-lg group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-do rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-or"></span>
                        <span className="relative">
                            <Link href="/">Go to Home</Link>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
