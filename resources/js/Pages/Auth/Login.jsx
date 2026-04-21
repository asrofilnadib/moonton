import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import InputError from "@/Components/InputError";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            preserveScroll: true,
        });
    };

    const errorList = Object.entries(errors).filter(([, msg]) => Boolean(msg));

    return (
        <>
            <Head title="Login" />
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

                        {status && (
                            <div className="mb-4 rounded-lg border border-green-500/40 bg-green-950/40 px-4 py-3 text-sm text-green-200">
                                {status}
                            </div>
                        )}

                        {errorList.length > 0 && (
                            <div
                                className="mb-4 rounded-lg border border-red-500/50 bg-red-950/50 px-4 py-3 text-sm text-red-200"
                                role="alert"
                            >
                                <p className="font-medium text-red-100">
                                    Gagal masuk — cek detail di bawah
                                </p>
                                <ul className="mt-2 list-inside list-disc space-y-1 text-red-200/90">
                                    {errorList.map(([field, message]) => (
                                        <li key={field}>
                                            <span className="capitalize">
                                                {field.replaceAll("_", " ")}
                                            </span>
                                            : {message}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form className="w-[370px]" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <InputLabel
                                        forInput="email"
                                        value="Email Address"
                                        className="mb-2"
                                    />
                                    <TextInput
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        isFocused={true}
                                        autoComplete="username"
                                        placeholder="Email Address"
                                        className="input-primary-dark"
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        forInput="password"
                                        value="Password"
                                        className="mb-2"
                                    />
                                    <TextInput
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData(
                                                "password",
                                                e.target.value,
                                            )
                                        }
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        className="input-primary-dark"
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="grid space-y-[14px] mt-[30px]">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    processing={processing}
                                >
                                    <span className="text-base font-semibold">
                                        Start Watching
                                    </span>
                                </Button>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-center text-sm text-gray-400 underline hover:text-white"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                                <Link href={route("prototype.register")}>
                                    <Button
                                        type="button"
                                        variant="light-outline"
                                        className="w-full"
                                    >
                                        <span className="text-base">
                                            Create New Account
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
