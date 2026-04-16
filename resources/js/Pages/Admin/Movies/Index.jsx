import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth }) {
    return (
        <Authenticated auth={auth}>
            <Head title="Movies" />
            <Link href={route("admin.dashboard.movie.create")}>
                <Button type="button" className="w-40 mb-8">Add Movie</Button>
            </Link>
        </Authenticated>
    )
}