import Authenticated from "@/Layouts/Authenticated/Index";
import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/react";
import FeatureMovies from "@/Layouts/Authenticated/FeatureMovies";
import CardMovies from "@/Layouts/Authenticated/CardMovies";

export default function Index({ auth, featureMovies, browseMovies }) {
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
                        {featureMovies.map((featuredMovie) => (
                            <FeatureMovies
                                key={featuredMovie.id}
                                slug={featuredMovie.slug}
                                name={featuredMovie.name}
                                genre={featuredMovie.category}
                                rating={featuredMovie.rating}
                                thumbnail={featuredMovie.thumbnail_url}
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
                        {browseMovies.map((browseMovie) => (
                            <CardMovies
                                key={browseMovie.id}
                                slug={browseMovie.slug}
                                name={browseMovie.name}
                                genre={browseMovie.category}
                                thumbnail={browseMovie.thumbnail_url}
                            />
                        ))}
                    </Flickity>
                </div>
            </div>
        </Authenticated>
    );
}
