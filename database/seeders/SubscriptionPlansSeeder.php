<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlans;

use function Pest\Laravel\json;

class SubscriptionPlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subscriptionPlans = [
            [
                'name' => 'Basic',
                'price' => 299000,
                'active_period_in_months' => 3,
                'features' => json_encode([
                    "Unlock 10 basic movies",
                    "Up to 3 users",
                    "Support 24/7 ready",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Premium',
                'price' => 799000,
                'active_period_in_months' => 6,
                'features' => json_encode([
                    "Unlock 100 premium movies",
                    "High quality video",
                    "Up to 20 users",
                    "Downloadable content",
                    "Priority support",
                    "Exclusive content",
                    "Offline Mode",
                    "Support 24/7 ready",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        SubscriptionPlans::insert($subscriptionPlans);
    }
}
