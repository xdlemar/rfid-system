<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('deductions', function (Blueprint $table) {
            $table->id('DeductionID');
            $table->foreignId('PayrollID')->constrained('payroll_runs', 'PayrollID');
            $table->string('Description', 255);
            $table->decimal('Amount', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('deductions', function (Blueprint $table) {
            $table->dropForeign(['PayrollID']);
        });
        Schema::dropIfExists('deductions');
    }
};
