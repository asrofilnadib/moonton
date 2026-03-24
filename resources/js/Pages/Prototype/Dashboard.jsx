import Authenticated from "@/Layouts/Authenticated/Index";
import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };

    return (
        <Authenticated>
            <Head title="Dashboard" />
            <div>
                <div className="font-semibold text-[22px] text-black mb-4">
                    Featured Movies
                </div>
                <div className="gap-[30px] __scroll-selector">
                    <Flickity options={flickityOptions}>
                        {[1, 2, 3, 4].map((i) => (
                            <div className="relative overflow-hidden group mr-[30px] w-[520px] h-[340px]" key={i}>
                                <img
                                    src={`/images/featured-${i % 2 === 0 ? '2' : '1'}.png`}
                                    className="object-cover rounded-[30px] w-full h-full"
                                    alt=""
                                />
                                {/* Rating */}
                                <div className="rating absolute top-0 left-0">
                                    <div className="p-[30px] flex items-center gap-1">
                                        <img src="/images/ic_star.svg" alt="" />
                                        <span className="text-sm font-medium text-white mt-1">
                                            4.5/5.0
                                        </span>
                                    </div>
                                </div>
                                {/* Movie Details */}
                                <div
                                    className="absolute bottom-0 h-[100px] left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px]
                                rounded-br-[28px] flex justify-between items-center px-7 h-[130px]"
                                >
                                    <div>
                                        <div className="font-medium text-[22px] text-white">
                                            The Batman in Love
                                        </div>
                                        <p className="mb-0 text-white text-sm font-light">
                                            Action • Horror
                                        </p>
                                    </div>
                                    <div className="translate-x-[100px] group-hover:translate-x-0 transition ease-in-out duration-500">
                                        <img
                                            src="/images/ic_play.svg"
                                            width="50"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <a
                                    href="#!"
                                    className="inset-0 absolute z-50"
                                ></a>
                            </div>
                        ))}
                    </Flickity>
                </div>
            </div>
        </Authenticated>
    );
}
