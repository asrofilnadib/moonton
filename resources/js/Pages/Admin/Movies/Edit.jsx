import Authenticated from "@/Layouts/Authenticated/Index";
import ValidationErrors from "@/Components/ValidationErrors";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, movie }) {
    const { data, setData, post, processing, errors } = useForm({
        ...movie,
        thumbnail_url: null,
        _method: "PUT",
    });

    const handleOnChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox"
                ? e.target.checked
                : e.target.type === "file"
                  ? e.target.files[0]
                  : e.target.value,
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.dashboard.movie.update", movie.id));
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Edit Movie" />
            <h1 className="text-2xl font-bold mb-4">Edit Movie: {movie.name}</h1>
            <hr className="mb-4" />
            <ValidationErrors errors={errors} />
            <form onSubmit={submit} className="max-w-[400px]">
                <div className="flex flex-col gap-6">
                    <div>
                        <InputLabel forInput="name" value="Name" />
                        <TextInput
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleOnChange}
                            placeholder="Enter movie name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel forInput="category" value="Category" />
                        <TextInput
                            type="text"
                            name="category"
                            value={data.category}
                            onChange={handleOnChange}
                            placeholder="Enter category"
                        />
                        <InputError
                            message={errors.category}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel forInput="video_url" value="Video URL" />
                        <TextInput
                            type="text"
                            name="video_url"
                            value={data.video_url}
                            onChange={handleOnChange}
                            placeholder="Enter video url"
                        />
                        <InputError
                            message={errors.video_url}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value="Current Thumbnail" />
                        <img
                            src={
                                movie.thumbnail_url.startsWith("http")
                                    ? movie.thumbnail_url
                                    : `/storage/${movie.thumbnail_url}`
                            }
                            alt={movie.name}
                            className="w-40 rounded-xl object-cover aspect-video"
                        />
                    </div>
                    <div>
                        <InputLabel
                            forInput="thumbnail_url"
                            value="New Thumbnail (Optional)"
                        />
                        <TextInput
                            type="file"
                            name="thumbnail_url"
                            onChange={handleOnChange}
                            placeholder="Upload new thumbnail"
                        />
                        <InputError
                            message={errors.thumbnail_url}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel forInput="rating" value="Rating" />
                        <TextInput
                            type="number"
                            name="rating"
                            value={data.rating}
                            onChange={handleOnChange}
                            placeholder="Enter rating"
                            step="0.1"
                        />
                        <InputError message={errors.rating} className="mt-2" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            name="is_featured"
                            checked={data.is_featured}
                            onChange={handleOnChange}
                        />
                        <InputLabel
                            forInput="is_featured"
                            value="Is Featured"
                        />
                    </div>
                </div>
                <div className="mt-10">
                    <Button
                        type="submit"
                        variant="primary"
                        processing={processing}
                    >
                        Update Movie
                    </Button>
                </div>
            </form>
        </Authenticated>
    );
}
