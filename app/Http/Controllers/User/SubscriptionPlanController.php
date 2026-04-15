<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlans;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        $data = [
            'user_id' => Auth::user()->id,
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            'expired_at' => Carbon::now()->addMonths($subscriptionPlan->active_period_in_months),
            'payment_status' => 'paid',
        ];

        UserSubscription::create($data);

        return redirect()->route('user.dashboard.index')->with('success', 'Subscription plan purchased successfully');
    }
}
