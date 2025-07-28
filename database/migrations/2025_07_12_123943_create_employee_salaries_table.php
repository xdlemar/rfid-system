<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employee_salaries', function (Blueprint $table) {
            $table->id('SalaryID');
            $table->foreignId('EmployeeID')->constrained('employees', 'EmployeeID');
            $table->foreignId('PayrollID')->constrained('payroll_runs', 'PayrollID');
            $table->decimal('SalaryAmount', 10, 2);
            $table->decimal('DailyRate', 10, 2)->nullable();
            $table->decimal('HourlyRate', 10, 2)->nullable();
            $table->integer('TotalDaysPresent')->nullable();
            $table->decimal('TotalHoursWorked', 5, 2)->nullable();
            $table->decimal('CalculatedSalary', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('employee_salaries', function (Blueprint $table) {
            $table->dropForeign(['EmployeeID']);
            $table->dropForeign(['PayrollID']);
        });
        Schema::dropIfExists('employee_salaries');
    }
};