import { Link } from "@inertiajs/react";

export default function CardMovies({
    slug,
    name,
    genre,
    thumbnail,
}) {
    return (
        <div className="relative group overflow-hidden mr-[30px] w-[250px] h-[340px]">
            <img
                src={thumbnail}
                className="object-cover rounded-[30px] w-full h-full"
                alt={name}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px] rounded-br-[28px]">
                <div className="px-7 pb-7">
                    <div className="font-medium text-xl text-white">
                        {name}
                    </div>
                    <p className="mb-0 text-gray-300 text-base mt-[10px]">
                        {genre}
                    </p>
                </div>
            </div>
            <div
                className="absolute top-1/2 left-1/2 -translate-y-[500px] group-hover:-translate-y-1/2
                    -translate-x-1/2 z-20 transition ease-in-out duration-500"
            >
                <img
                    src="/icons/ic_play.svg"
                    width="50"
                    alt="Play Icon"
                />
            </div>
            <Link
                href={route('user.dashboard.movie.show', slug)}
                className="inset-0 absolute z-50"
            ></Link>
        </div>
    );
}
