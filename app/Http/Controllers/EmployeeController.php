<?php


namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\JobRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Employee/Dashboard');
    }

    public function index()
    {
        $employees = Employee::with('jobRole')->latest()->get();
        $jobRoles = JobRole::all();

        return Inertia::render('Admin/ManageEmployees', [
            'employees' => $employees,
            'jobRoles' => $jobRoles,
        ]);
    }
}
