<?php

use App\Models\Movies;
use App\Models\User;
use Database\Seeders\RoleTableSeeder;
use Inertia\Testing\AssertableInertia;

it('shows movie page with video url for inertia', function () {
    $this->seed(RoleTableSeeder::class);

    $user = User::factory()->create();
    $user->assignRole('user');

    $videoUrl = 'https://www.youtube.com/watch?v=LNlrGhBpYjc';

    $movie = Movies::query()->create([
        'name' => 'The Substance',
        'slug' => 'the-substance',
        'category' => 'Horror',
        'video_url' => $videoUrl,
        'thumbnail_url' => 'https://example.com/thumb.jpg',
        'rating' => 9.1,
        'is_featured' => true,
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('user.dashboard.movie.show', ['movie' => $movie->slug]));

    $response->assertSuccessful();

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('User/Dashboard/Movie/show')
        ->has('movie', fn (AssertableInertia $props) => $props
            ->where('slug', 'the-substance')
            ->where('video_url', $videoUrl)
            ->etc()
        ));
});
