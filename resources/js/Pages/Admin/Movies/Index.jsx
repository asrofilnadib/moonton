import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import { Head, Link, router } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, flash, movies }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this movie?")) {
            router.delete(route("admin.dashboard.movie.destroy", id));
        }
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Movies" />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-black">Movie List</h1>
                <Link href={route("admin.dashboard.movie.create")}>
                    <Button type="button" className="w-40">
                        Add Movie
                    </Button>
                </Link>
            </div>

            {flash?.message && <FlashMessage message={flash.message} />}

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-[#F1F1F1]">
                                <th className="pb-4 font-semibold text-sm text-gray-1">
                                    Image
                                </th>
                                <th className="pb-4 font-semibold text-sm text-gray-1">
                                    Name
                                </th>
                                <th className="pb-4 font-semibold text-sm text-gray-1">
                                    Category
                                </th>
                                <th className="pb-4 font-semibold text-sm text-gray-1">
                                    Rating
                                </th>
                                <th
                                    className="pb-4 font-semibold text-sm text-gray-1 text-center"
                                    colSpan={2}
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => (
                                <tr
                                    key={movie.id}
                                    className="border-b border-[#F1F1F1] last:border-0"
                                >
                                    <td className="py-4">
                                        <img
                                            src={
                                                movie.thumbnail_url.startsWith(
                                                    "http",
                                                )
                                                    ? movie.thumbnail_url
                                                    : `/storage/${movie.thumbnail_url}`
                                            }
                                            alt={movie.name}
                                            className="w-20 rounded-xl object-cover aspect-video"
                                        />
                                    </td>
                                    <td className="py-4 font-medium text-black">
                                        {movie.name}
                                    </td>
                                    <td className="py-4 text-gray-1">
                                        {movie.category}
                                    </td>
                                    <td className="py-4 text-black font-semibold">
                                        {movie.rating.toFixed(1)} / 10.0
                                    </td>
                                    <td className="py-4 text-center w-24">
                                        <Link
                                            href={route(
                                                "admin.dashboard.movie.edit",
                                                movie.id,
                                            )}
                                            className="text-alerange font-semibold hover:underline"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td className="py-4 text-center w-24">
                                        <button
                                            onClick={() =>
                                                handleDelete(movie.id)
                                            }
                                            className="text-red-500 font-semibold hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {movies.length === 0 && (
                        <div className="text-center py-10 text-gray-1">
                            No movies found.
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}

