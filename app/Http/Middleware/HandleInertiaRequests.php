<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Illuminate\Support\Facades\Session;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'activePlan' => $this->activePlan(),
            ],
            'flash' => [
                'message' => Session::get('message'),
                'type' => Session::get('type'),
            ],
        ];
    }

    private function activePlan()
    {
        $user = Auth::user();
        if (! $user) {
            return null;
        }

        $activePlan = $user->lastActiveSubscription()->with('subscriptionPlan')->first();

        if (! $activePlan) {
            return null;
        }

        $startDate = Carbon::parse($activePlan->created_at)->startOfDay();
        $expiredDate = Carbon::parse($activePlan->expired_at)->startOfDay();
        $now = Carbon::now()->startOfDay();

        // Total hari periode: tanggal mulai → tanggal habis (pakai created_at, bukan updated_at)
        $activeDays = max(1, (int) $startDate->diffInDays($expiredDate));
        // Berapa hari sudah lewat sejak mulai (untuk progress bar = terpakai)
        $elapsedDays = (int) min($activeDays, max(0, $startDate->diffInDays($now, false)));
        // Sisa hari dari sekarang → expired
        $remainingDays = (int) max(0, $now->diffInDays($expiredDate, false));

        return [
            'name' => $activePlan->subscriptionPlan->name,
            'active_days' => $activeDays,
            'remaining_days' => $remainingDays,
            'elapsed_days' => $elapsedDays,
        ];
    }
}
