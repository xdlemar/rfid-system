<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Prefetch Vite resources
        Vite::prefetch(concurrency: 3);

        // Share the logged-in user with all Inertia pages
        Inertia::share('auth', function () {
            return [
                'user' => Auth::user(),
            ];
        });
    }
}
