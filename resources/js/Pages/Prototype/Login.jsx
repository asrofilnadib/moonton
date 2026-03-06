import { Head, Link } from "@inertiajs/react";

export default function Login() {
    return (
        <>
            <Head title="Sign Up" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
                <div className="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>
                <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                    <div>
                        <img src="/images/moonton-white.svg" alt="" />
                        <div className="my-[70px]">
                            <div className="font-semibold text-[26px] mb-3">
                                Welcome Back
                            </div>
                            <p className="text-base text-[#767676] leading-7">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                        </div>
                        <form className="w-[370px]">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="grid space-y-[14px] mt-[30px]">
                                <Link href="/">
                                    <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        <span className="text-base font-semibold">
                                            Start Watching
                                        </span>
                                    </button>
                                </Link>
                                <Link href="/">
                                    <button
                                        type="button"
                                        className="w-full text-white bg-transparent border border-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        <span className="text-base">
                                            Create New Account
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
