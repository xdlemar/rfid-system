<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('attendance_records', function (Blueprint $table) {
            $table->id('RecordID');
            $table->foreignId('EmployeeID')->constrained('employees', 'EmployeeID');
            $table->date('Date');
            $table->time('CheckInTime');
            $table->time('CheckOutTime')->nullable();
            $table->enum('Status', ['Present', 'Absent', 'Late', 'On Leave'])->default('Present');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('attendance_records', function (Blueprint $table) {
            $table->dropForeign(['EmployeeID']);
        });
        Schema::dropIfExists('attendance_records');
    }
};