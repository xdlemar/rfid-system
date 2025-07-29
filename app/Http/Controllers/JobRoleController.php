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

        JobRole::create($validated);
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $jobRole = JobRole::findOrFail($id);

        $validated = $request->validate([
            'RoleName' => 'required|string|max:100',
            'Description' => 'nullable|string',
            'SalaryRange' => 'nullable|numeric'
        ]);

        $jobRole->update($validated);
        return redirect()->back();
    }

    public function destroy($id)
    {
        $jobRole = JobRole::findOrFail($id);
        $jobRole->delete();
        return redirect()->back();
    }
}
