import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function ManageJobRoles({ auth, jobRoles }) {
    const [showModal, setShowModal] = useState(false);
    const [editingJobRole, setEditingJobRole] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        reset,
        errors,
        processing,
    } = useForm({
        JobRoleID: '',
        RoleName: '',
        Description: '',
        SalaryRange: '',
    });

    const openModal = (jobRole = null) => {
        reset();
        if (jobRole) {
            setData({
                JobRoleID: jobRole.JobRoleID,
                RoleName: jobRole.RoleName,
                Description: jobRole.Description || '',
                SalaryRange: jobRole.SalaryRange || '',
            });
            setEditingJobRole(jobRole);
        } else {
            setEditingJobRole(null);
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingJobRole) {
            put(route('jobroles.update', editingJobRole.JobRoleID), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('jobroles.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Job Roles</h2>}>
            <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-semibold">Job Roles</h3>
                        <PrimaryButton onClick={() => openModal()}>+ Add Role</PrimaryButton>
                    </div>

                    <table className="w-full text-left border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Role Name</th>
                                <th className="p-2">Description</th>
                                <th className="p-2">Salary Range</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobRoles.map((role) => (
                                <tr key={role.JobRoleID} className="border-t">
                                    <td className="p-2">{role.RoleName}</td>
                                    <td className="p-2">{role.Description}</td>
                                    <td className="p-2">₱ {Number(role.SalaryRange).toLocaleString()}</td>
                                    <td className="p-2 flex gap-2">
                                        <SecondaryButton onClick={() => openModal(role)}>Edit</SecondaryButton>
                                        {/* You can add delete button here later */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {editingJobRole ? 'Edit Job Role' : 'Add Job Role'}
                    </h2>

                    <div>
                        <InputLabel htmlFor="RoleName" value="Role Name" />
                        <TextInput
                            id="RoleName"
                            value={data.RoleName}
                            onChange={(e) => setData('RoleName', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.RoleName} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="Description" value="Description" />
                        <TextInput
                            id="Description"
                            value={data.Description}
                            onChange={(e) => setData('Description', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.Description} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="SalaryRange" value="Salary Range (₱)" />
                        <TextInput
                            id="SalaryRange"
                            type="number"
                            value={data.SalaryRange}
                            onChange={(e) => setData('SalaryRange', e.target.value)}
                            className="mt-1 block w-full"
                            step="0.01"
                        />
                        <InputError message={errors.SalaryRange} className="mt-2" />
                    </div>

                    <div className="flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>
                            {editingJobRole ? 'Update' : 'Save'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
