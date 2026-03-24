import { Link, Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";

export default function Register() {
    return (
        <>
            <Head title="Sign Up" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
                {/* Background Image Container */}
                <div className="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>

                {/* Form Content Container */}
                <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px] justify-center lg:justify-start">
                    <div className="w-full max-w-[370px]">
                        <img src="/images/moonton-white.svg" alt="Moonton Logo" />
                        
                        <div className="my-[70px]">
                            <div className="font-semibold text-[26px] mb-3">
                                Create New Account
                            </div>
                            <p className="text-base text-[#767676] leading-7">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                        </div>

                        <form>
                            <div className="flex flex-col gap-6">
                                {/* Name */}
                                <div>
                                    <InputLabel forInput="name" value="Full Name" className="mb-2" />
                                    <TextInput
                                        type="text"
                                        name="name"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <InputLabel forInput="email" value="Email Address" className="mb-2" />
                                    <TextInput
                                        type="email"
                                        name="email"
                                        placeholder="Your email address"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <InputLabel forInput="password" value="Password" className="mb-2" />
                                    <TextInput
                                        type="password"
                                        name="password"
                                        placeholder="Your password"
                                        required
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <InputLabel forInput="password_confirmation" value="Confirm Password" className="mb-2" />
                                    <TextInput
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terms & Conditions (Optional but recommended to be neat) */}
                            <div className="flex items-center gap-3 mt-6">
                                <Checkbox name="terms" id="terms" />
                                <InputLabel forInput="terms" value="I agree to the terms and conditions" className="text-sm" />
                            </div>

                            <div className="grid space-y-[14px] mt-[30px]">
                                <Link href={route("prototype.dashboard")}>
                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="w-full"
                                    >
                                        <span className="text-base font-semibold">
                                            Sign Up
                                        </span>
                                    </Button>
                                </Link>
                                <Link href={route("prototype.login")}>
                                    <Button
                                        type="button"
                                        variant="light-outline"
                                        className="w-full"
                                    >
                                        <span className="text-base">
                                            Already have an account? Log in
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
