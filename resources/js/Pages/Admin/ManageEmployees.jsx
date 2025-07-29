import React, { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

export default function ManageEmployees({ auth, employees, jobRoles }) {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { data, setData, reset, post, put, delete: destroy, processing, errors } = useForm({
    FirstName: "",
    LastName: "",
    Phone: "",
    DateOfBirth: "",
    HireDate: "",
    JobRoleID: "",
    Email: "",
    Password: "",
  });

  const openModal = (employee = null) => {
    reset();
    if (employee) {
      setIsEdit(true);
      setEditingId(employee.EmployeeID);
      setData({
        FirstName: employee.FirstName,
        LastName: employee.LastName,
        Phone: employee.Phone,
        DateOfBirth: employee.DateOfBirth,
        HireDate: employee.HireDate,
        JobRoleID: employee.JobRoleID,
        Email: employee.Email,
        Password: "", // Blank for edit
      });
    } else {
      setIsEdit(false);
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    reset();
    setShowModal(false);
    setIsEdit(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route("employees.update", editingId), {
        preserveScroll: true,
        onSuccess: closeModal,
      });
    } else {
      post(route("employees.store"), {
        preserveScroll: true,
        onSuccess: closeModal,
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This employee will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(route("employees.destroy", id), {
          preserveScroll: true,
        });
      }
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Manage Employees" />

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage Employees</h2>
          <Button onClick={() => openModal()}>Add Employee</Button>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.EmployeeID} className="border-t">
                  <td className="p-3">{emp.FirstName} {emp.LastName}</td>
                  <td className="p-3">{emp.Phone}</td>
                  <td className="p-3">{emp.job_role?.RoleName || "-"}</td>
                      <td className="p-3">
        {emp.job_role?.SalaryRange
          ? `₱ ${Number(emp.job_role.SalaryRange).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
          : "-"}
      </td>
                  <td className="p-3 capitalize">{emp.Status}</td>
                  <td className="p-3 flex gap-2">
                    <Button size="sm" onClick={() => openModal(emp)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(emp.EmployeeID)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-2xl w-full">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit Employee" : "Add Employee"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              {/* Section 1: Employee Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input value={data.FirstName} onChange={e => setData("FirstName", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input value={data.LastName} onChange={e => setData("LastName", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input value={data.Phone} onChange={e => setData("Phone", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input type="date" value={data.DateOfBirth} onChange={e => setData("DateOfBirth", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Hire Date</label>
                  <Input type="date" value={data.HireDate} onChange={e => setData("HireDate", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Job Role</label>
                  <select
                    className="w-full border rounded p-2"
                    value={data.JobRoleID}
                    onChange={e => setData("JobRoleID", e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {jobRoles.map(role => (
                      <option key={role.JobRoleID} value={role.JobRoleID}>{role.RoleName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-6" />

              {/* Section 2: Account Info */}
              <h3 className="text-lg font-semibold mb-2">Employee Account</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" value={data.Email} onChange={e => setData("Email", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" value={data.Password} onChange={e => setData("Password", e.target.value)} />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={processing}>{isEdit ? "Update" : "Add"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AuthenticatedLayout>
  );
}
