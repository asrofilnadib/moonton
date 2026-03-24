import { Head } from "@inertiajs/react";
import Flickity from "react-flickity-component";
import Authenticated from "@/Layouts/Authenticated/Index";
import FeatureMovies from "@/Layouts/Authenticated/FeatureMovies";
import PropTypes from "prop-types";

PropTypes.FeatureMovies = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number,
};

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
                            <FeatureMovies key={i} slug={`/movies/${i}`} name={`Movie ${i}`} genre={`Genre ${i}`} rating={4.5} thumbnail={`/images/featured-${i % 2 === 0 ? "2" : "1"}.png`} />
                        ))}
                    </Flickity>
                </div>
            </div>
        </Authenticated>
    );
}
