<?php

namespace App\Http\Controllers;

use App\Models\JobRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobRoleController extends Controller
{
    public function index()
    {
        $jobRoles = JobRole::latest()->get();
        return Inertia::render('Admin/ManageJobRoles', [
            'jobRoles' => $jobRoles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'RoleName' => 'required|string|max:100',
            'Description' => 'nullable|string',
            'SalaryRange' => 'nullable|numeric'
        ]);

        // Auto calculate daily and hourly rates
        $salary = $validated['SalaryRange'] ?? 0;
        $dailyRate = $salary / 22;
        $hourlyRate = $dailyRate / 8;

        JobRole::create([
            'RoleName' => $validated['RoleName'],
            'Description' => $validated['Description'] ?? null,
            'SalaryRange' => $salary,
            'DailyRate' => round($dailyRate, 2),
            'HourlyRate' => round($hourlyRate, 2),
        ]);

        return redirect()->back()->with('success', 'Job role added successfully.');
    }

    public function update(Request $request, $id)
    {
        $jobRole = JobRole::findOrFail($id);

        $validated = $request->validate([
            'RoleName' => 'required|string|max:100',
            'Description' => 'nullable|string',
            'SalaryRange' => 'nullable|numeric'
        ]);

        // Auto calculate daily and hourly rates
        $salary = $validated['SalaryRange'] ?? 0;
        $dailyRate = $salary / 22;
        $hourlyRate = $dailyRate / 8;

        $jobRole->update([
            'RoleName' => $validated['RoleName'],
            'Description' => $validated['Description'] ?? null,
            'SalaryRange' => $salary,
            'DailyRate' => round($dailyRate, 2),
            'HourlyRate' => round($hourlyRate, 2),
        ]);

        return redirect()->back()->with('success', 'Job role updated successfully.');
    }

    public function destroy($id)
    {
        $jobRole = JobRole::findOrFail($id);
        $jobRole->delete();
        return redirect()->back();
    }
}
