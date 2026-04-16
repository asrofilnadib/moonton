<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Movies;

class MovieController extends Controller
{
    public function show(Movies $movie) {
        return Inertia::render('User/Dashboard/Movie/show', [
            'movie' => $movie,
        ]);
    }
}
