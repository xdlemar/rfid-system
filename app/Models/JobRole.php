<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobRole extends Model
{
    use HasFactory;

    protected $primaryKey = 'JobRoleID'; 
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'RoleName',
        'Description',
        'SalaryRange',
        'DailyRate',      
        'HourlyRate',     
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'JobRoleID');
    }
}
