<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

use App\Models\SubscriptionPlans;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Subscription/Index', [
            'subscriptionPlans' => SubscriptionPlans::all(),
        ]);
    }

    public function userSubscribe(SubscriptionPlans $subscriptionPlan) 
    {
        return $subscriptionPlan;
    }
}
