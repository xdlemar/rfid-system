import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function EmployeeDashboard({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Employee Dashboard" />
      <div className="p-6 text-gray-900 text-2xl font-bold">Welcome, EMPLOYEE!</div>
    </AuthenticatedLayout>
  );
}
