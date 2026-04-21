<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\SubscriptionPlanController;
use App\Http\Controllers\Admin\MovieController as AdminMovieController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::redirect('/', '/login');

Route::middleware(['auth', 'role:user'])->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::get('movie/{movie:slug}', [MovieController::class, 'show'])->name('movie.show')->middleware('checkUserSubscription:true');
    
    Route::get('subscription-plan', [SubscriptionPlanController::class, 'index'])->name('subscriptionPlan.index')->middleware('checkUserSubscription:false');
    Route::post('subscription-plan/{subscriptionPlan}/user-subscribe', [SubscriptionPlanController::class, 'userSubscribe'])->name('subscriptionPlan.userSubscribe')->middleware('checkUserSubscription:false');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.dashboard.')->group(function () {
    Route::post('movie/restore/{movie}', [AdminMovieController::class, 'restore'])->name('movie.restore');
    Route::resource('movie', AdminMovieController::class);
});

Route::post('midtrans/notification', [SubscriptionPlanController::class, 'midtransCallback'])->name('midtrans.callback');

Route::get('/admin', function () {
    return 'Hi Admin';
})->middleware(['auth', 'role:admin'])->name('admin');

Route::get('/user', function () {
    return 'Hi User';
})->middleware(['auth', 'role:user'])->name('user');

Route::prefix('prototype')->name('prototype.')->group(function () {
    Route::get('login', function () {
        return Inertia::render('Prototype/Login');
    })->name('login');
    
    Route::get('register', function () {
        return Inertia::render('Prototype/Register');
    })->name('register');

    Route::get('dashboard', function () {
        return Inertia::render('Prototype/Dashboard');
    })->name('dashboard');

    Route::get('subscription', function () {
        return Inertia::render('Prototype/SubscriptionPlan');
    })->name('subscription.plan');

    Route::get('movie/{slug}', function ($slug) {
        return Inertia::render('Prototype/MovieShow', [
            'slug' => $slug,
        ]);
    })->name('movie.show');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
