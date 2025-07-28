<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('job_roles', function (Blueprint $table) {
            $table->id('JobRoleID');
            $table->string('RoleName', 100);
            $table->text('Description')->nullable();
            $table->decimal('SalaryRange', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_roles');
    }
};