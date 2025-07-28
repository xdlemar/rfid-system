<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id('EmployeeID');
            $table->string('FirstName', 50);
            $table->string('LastName', 50);
            $table->string('Email', 100)->unique();
            $table->string('Phone', 20);
            $table->date('DateOfBirth');
            $table->date('HireDate');
            $table->foreignId('JobRoleID')->constrained('job_roles', 'JobRoleID');
            $table->enum('Status', ['Active', 'Inactive', 'Terminated'])->default('Active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropForeign(['JobRoleID']);
        });
        Schema::dropIfExists('employees');
    }
};