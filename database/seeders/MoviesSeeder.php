<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movies;

class MoviesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movies = [
            [
                'name' => 'The Dark Knight',
                'slug' => 'the-dark-knight',
                'category' => 'Action',
                'video_url' => 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
                'thumbnail_url' => 'http://m.media-amazon.com/images/I/91KkWf50SoL._AC_UF894,1000_QL80_.jpg',
                'rating' => 8.8,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'The Substance',
                'slug' => 'the-substance',
                'category' => 'Horror, Thriller',
                'video_url' => 'https://www.youtube.com/watch?v=LNlrGhBpYjc',
                'thumbnail_url' => 'https://m.media-amazon.com/images/S/pv-target-images/26e21fe9d2c0094db28d0dcb6b930d021e8a2180129182e854aaec3bbe9558f6.jpg',
                'rating' => 9.1,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rush Hour 3',
                'slug' => 'rush-hour-3',
                'category' => 'Action, Comedy',
                'video_url' => 'https://www.youtube.com/watch?v=OAVnOz7i-JA',
                'thumbnail_url' => 'https://m.media-amazon.com/images/M/MV5BMTA0Nzg5NjQ0MDBeQTJeQWpwZ15BbWU3MDE4Mzg5NDE@._V1_FMjpg_UX1000_.jpg',
                'rating' => 8.2,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Attack on Titan',
                'slug' => 'attack-on-titan',
                'category' => 'Action, Drama',
                'video_url' => 'https://www.youtube.com/watch?v=M_OauHnAFc8',
                'thumbnail_url' => 'https://i.kym-cdn.com/entries/icons/mobile/000/039/506/tr.jpg',
                'rating' => 7.9,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'The Avengers: Endgame',
                'slug' => 'the-avengers-endgame',
                'category' => 'Action, Adventure',
                'video_url' => 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
                'thumbnail_url' => 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg',
                'rating' => 8.4,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Movies::insert($movies);
    }
}
