<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\JobRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with('jobRole')->latest()->get();
        $jobRoles = JobRole::all();

        return Inertia::render('Admin/ManageEmployees', [
            'employees' => $employees,
            'jobRoles' => $jobRoles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Email' => 'required|email|unique:employees,Email|unique:users,email',
            'Phone' => 'nullable|string|max:20',
            'DateOfBirth' => 'nullable|date',
            'HireDate' => 'required|date',
            'JobRoleID' => 'required|exists:job_roles,JobRoleID',
            'Password' => 'required|string|min:6',
        ]);

        // Create user account
        $user = User::create([
            'name' => $validated['FirstName'] . ' ' . $validated['LastName'],
            'email' => $validated['Email'],
            'password' => Hash::make($validated['Password']),
            'role' => 'employee',
        ]);

        // Create employee record
        Employee::create([
            'FirstName' => $validated['FirstName'],
            'LastName' => $validated['LastName'],
            'Email' => $validated['Email'],
            'Phone' => $validated['Phone'],
            'DateOfBirth' => $validated['DateOfBirth'],
            'HireDate' => $validated['HireDate'],
            'JobRoleID' => $validated['JobRoleID'],
            'Status' => 'active',
            'user_id' => $user->id,
        ]);

        return redirect()->back()->with('success', 'Employee added successfully.');
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Phone' => 'nullable|string|max:20',
            'DateOfBirth' => 'nullable|date',
            'HireDate' => 'required|date',
            'JobRoleID' => 'required|exists:job_roles,JobRoleID',
            'Status' => 'required|in:active,inactive,terminated'
        ]);

        $employee->update($validated);

        return redirect()->back()->with('success', 'Employee updated successfully.');
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return redirect()->back()->with('success', 'Employee deleted successfully.');
    }
}
