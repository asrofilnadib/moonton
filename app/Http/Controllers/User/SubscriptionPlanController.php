<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlans;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SubscriptionPlanController extends Controller
{
    public function __construct()
    {
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = false;
        \Midtrans\Config::$is3ds = false;
    }

    private function getSnapToken($params)
    {
        return \Midtrans\Snap::getSnapToken($params);
    }

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
            'payment_status' => 'pending',
        ];

        $userSubscription = UserSubscription::create($data);

        $snapToken = $this->getSnapToken([
            'transaction_details' => [
                'order_id' => $userSubscription->id.'-'.Str::random(),
                'gross_amount' => $userSubscription->price,
            ],
        ]);

        $userSubscription->update([
            'snap_token' => $snapToken,
        ]);

        return Inertia::render('User/Subscription/Index', [
            'userSubscription' => $userSubscription,
            'subscriptionPlans' => SubscriptionPlans::all(),
        ]);
    }

    public function midtransCallback(Request $request)
    {
        $notif = new \Midtrans\Notification;

        $transaction_status = $notif->transaction_status;
        $fraud = $notif->fraud_status;

        $transaction_id = explode('-', $notif->order_id)[0];
        $userSubscription = UserSubscription::find($transaction_id);

        if ($transaction_status == 'capture') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'challenge'
                $userSubscription->payment_status = 'pending';
            } elseif ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'success'
                $userSubscription->payment_status = 'paid';
                $userSubscription->expired_at = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
            }
        } elseif ($transaction_status == 'cancel') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            } elseif ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            }
        } elseif ($transaction_status == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = 'failed';
        } elseif ($transaction_status == 'settlement') {
            // TODO set payment status in merchant's database to 'Settlement'
            $userSubscription->payment_status = 'paid';
            $userSubscription->expired_at = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
        } elseif ($transaction_status == 'pending') {
            // TODO set payment status in merchant's database to 'Pending'
            $userSubscription->payment_status = 'pending';
        } elseif ($transaction_status == 'expire') {
            // TODO set payment status in merchant's database to 'expire'
            $userSubscription->payment_status = 'failed';
        }

        $userSubscription->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Payment success',
        ]);
    }
}
