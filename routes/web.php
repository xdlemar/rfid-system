<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\JobRoleController;


Route::get('/', function () {
    return redirect()->route('login');
});

// Optional fallback dashboard (can be removed if not used)
Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    $role = auth()->user()->role;

    if ($role === 'admin') {
        return redirect()->route('admin.dashboard');
    } elseif ($role === 'employee') {
        return redirect()->route('employee.dashboard');
    }

    return redirect('/'); // fallback
})->name('dashboard');


Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Role-based dashboards using controllers
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/employee/dashboard', [EmployeeController::class, 'dashboard'])->name('employee.dashboard');
});

// routes/web.php



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/manage-employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/manage-roles', [JobRoleController::class, 'index'])->name('jobroles.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/jobroles', [JobRoleController::class, 'index'])->name('jobroles.index');
    Route::post('/admin/jobroles', [JobRoleController::class, 'store'])->name('jobroles.store');
    Route::put('/admin/jobroles/{id}', [JobRoleController::class, 'update'])->name('jobroles.update');
    Route::delete('/admin/jobroles/{id}', [JobRoleController::class, 'destroy'])->name('jobroles.destroy');
});


require __DIR__.'/auth.php';
