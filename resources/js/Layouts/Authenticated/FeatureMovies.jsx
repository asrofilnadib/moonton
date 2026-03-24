import { Link } from "@inertiajs/react";

export default function FeatureMovies({
    slug,
    name,
    genre,
    rating,
    thumbnail,
}) {
    return (
        <div className="relative overflow-hidden group mr-[30px] w-[520px] h-[340px]">
            <img
                src={thumbnail}
                className="object-cover rounded-[30px] w-full h-full"
                alt={name}
            />
            {/* Rating */}
            <div className="rating absolute top-0 left-0">
                <div className="p-[30px] flex items-center gap-1">
                    <img src="/icons/ic_star.svg" alt="star" />
                    <span className="text-sm font-medium text-white mt-1">
                        {rating.toFixed(1)}/5.0
                    </span>
                </div>
            </div>
            {/* Movie Details */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px]
                            rounded-br-[28px] flex justify-between items-center px-7 h-[130px]"
            >
                <div>
                    <div className="font-medium text-[22px] text-white">
                        {name}
                    </div>
                    <p className="mb-0 text-white text-sm font-light">
                        {genre}
                    </p>
                </div>
                <div className="translate-x-[100px] group-hover:translate-x-0 transition ease-in-out duration-500">
                    <img src="/icons/ic_play.svg" width="50" alt="play" />
                </div>
            </div>
            <Link href={route('prototype.movie.show', slug)} className="inset-0 absolute z-50"></Link>
        </div>
    );
}
