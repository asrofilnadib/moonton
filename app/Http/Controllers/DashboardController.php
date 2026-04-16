<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Movies;

class DashboardController extends Controller
{
    public function index()
    {
        $featureMovies = Movies::where('is_featured', true)->get();
        $browseMovies = Movies::all();


        return Inertia('User/Dashboard/Index', [
            'featureMovies' => $featureMovies,
            'browseMovies' => $browseMovies,
        ]);
    }
}
