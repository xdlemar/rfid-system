<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $primaryKey = 'EmployeeID'; // Custom PK
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'FirstName',
        'LastName',
        'Email',
        'Phone',
        'DateOfBirth',
        'HireDate',
        'JobRoleID',
        'Status',
    ];

    public function jobRole()
    {
        return $this->belongsTo(JobRole::class, 'JobRoleID');
    }
}

