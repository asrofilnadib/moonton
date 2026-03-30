import Authenticated from "@/Layouts/Authenticated/Index";
import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/react";
import FeatureMovies from "@/Layouts/Authenticated/FeatureMovies";
import CardMovies from "@/Layouts/Authenticated/CardMovies";

export default function Index({ auth }) {
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
        <Authenticated auth={auth}>
            <Head title="Dashboard" />
            <div>
                <div className="font-semibold text-[22px] text-black mb-4">
                    Featured Movies
                </div>
                <div className="gap-[30px] __scroll-selector">
                    <Flickity options={flickityOptions}>
                        {[1, 2, 3, 4].map((i) => (
                            <FeatureMovies
                                key={i}
                                slug={`movie-${i}`}
                                name={`Movie ${i}`}
                                genre={`Genre ${i}`}
                                rating={4.5}
                                thumbnail={`/images/featured-${i % 2 === 0 ? "2" : "1"}.png`}
                            />
                        ))}
                    </Flickity>
                </div>
            </div>
            <div className="mt-[50px]">
                <div className="font-semibold text-[22px] text-black mb-4">
                    Browse
                </div>
                <div className="gap-[30px]">
                    <Flickity options={flickityOptions}>
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <CardMovies
                                key={i}
                                slug={`movie-${i}`}
                                name={`Movie ${i}`}
                                genre={`Genre ${i}`}
                                thumbnail={`/images/browse-${i % 2 === 0 ? "2" : "1"}.png`}
                            />
                        ))}
                    </Flickity>
                </div>
            </div>
        </Authenticated>
    );
}
