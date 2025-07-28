<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('timesheets', function (Blueprint $table) {
            $table->id('TimesheetID');
            $table->foreignId('EmployeeID')->constrained('employees', 'EmployeeID');
            $table->foreignId('ScheduleID')->constrained('schedules', 'ScheduleID');
            $table->decimal('HoursWorked', 5, 2);
            $table->timestamp('SubmissionDate')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('timesheets', function (Blueprint $table) {
            $table->dropForeign(['EmployeeID']);
            $table->dropForeign(['ScheduleID']);
        });
        Schema::dropIfExists('timesheets');
    }
};