<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movies;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Admin\Movie\Store;
use App\Http\Requests\Admin\Movie\Update;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Movies/Index', [
            'movies' => Movies::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Movies/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Store $request)
    {
        $data = $request->validated();
        $data['thumbnail_url'] = $request->file('thumbnail_url')->store('movies/thumbnails', 'public');
        $data['slug'] = Str::slug($data['name']);

        Movies::create($data);

        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie created successfully',
            'type' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movies $movie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movies $movie)
    {
        return Inertia::render('Admin/Movies/Edit', [
            'movie' => $movie,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Update $request, Movies $movie)
    {
        $data = $request->validated();

        if ($request->file('thumbnail_url')) {
            $data['thumbnail_url'] = $request->file('thumbnail_url')->store('movies/thumbnails', 'public');
            Storage::disk('public')->delete($movie->thumbnail_url);
        } else {
            $data['thumbnail_url'] = $movie->thumbnail_url;
        }

        $movie->update($data);

        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie updated successfully',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movies $movie)
    {
        $movie->delete();

        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie deleted successfully',
            'type' => 'success',
        ]);
    }
}
