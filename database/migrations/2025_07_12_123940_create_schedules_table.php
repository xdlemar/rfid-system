<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id('ScheduleID');
            $table->unsignedBigInteger('EmployeeID');
            $table->unsignedBigInteger('ShiftID');
            $table->date('ScheduleDate');
            $table->timestamps();

            $table->foreign('EmployeeID')->references('EmployeeID')->on('employees')->onDelete('cascade');
            $table->foreign('ShiftID')->references('ShiftID')->on('shifts')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropForeign(['EmployeeID']);
            $table->dropForeign(['ShiftID']);
        });
        Schema::dropIfExists('schedules');
    }
};
