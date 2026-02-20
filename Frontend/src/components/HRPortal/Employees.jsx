
import API_BASE_URL from "../../api.config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, UserPlus, Calendar } from "lucide-react";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("employeeToken");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`${API_BASE_URL}/api/hr/employees`, config);
            setEmployees(res.data);
        } catch (err) {
            console.error("Failed to fetch employees", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = (emp, readOnly) => {
        setSelectedEmployee(emp);
        setIsReadOnly(readOnly);
        setIsEditModalOpen(true);
    };

    const deleteEmployee = async (id) => {
        if (window.confirm("Are you sure you want to remove this employee?")) {
            try {
                const token = localStorage.getItem("employeeToken");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`${API_BASE_URL}/api/hr/employees/${id}`, config);
                setEmployees(employees.filter(emp => emp._id !== id));
            } catch (err) {
                alert("Error deleting employee");
            }
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Employee Directory</h1>
                    <p className="text-gray-500">Manage your workforce and view details.</p>
                </div>
                <div className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Current Staff</p>
                        <p className="text-2xl font-bold text-gray-800">{employees.length}</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition-colors shadow-sm">
                        <UserPlus size={20} />
                    </button>
                </div>
            </div>

            {/* Employee Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Tenure</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No employees found. Add one to get started.</td>
                                </tr>
                            ) : employees.map((emp) => (
                                <tr key={emp._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="font-bold text-gray-800">{emp.name}</p>
                                                <p className="text-xs text-gray-400">{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">{emp.department}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">
                                        {emp.role}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex items-center gap-1"><Calendar size={14} className="text-gray-400" />{emp.yearsWorked || '0'} Yrs</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleAction(emp, true)} className="text-gray-500 hover:text-blue-600 font-medium text-xs  decoration-2" title="View Details">
                                                View
                                            </button>
                                            <button onClick={() => handleAction(emp, false)} className="text-gray-500 hover:text-amber-600 font-medium text-xs decoration-2" title="Edit Employee">
                                                Edit
                                            </button>
                                            <button onClick={() => deleteEmployee(emp._id)} className="text-gray-500 hover:text-red-600 font-medium text-xs decoration-2" title="Delete">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdded={fetchEmployees} />

            {selectedEmployee && (
                <EditEmployeeModal
                    isOpen={isEditModalOpen}
                    onClose={() => { setIsEditModalOpen(false); setSelectedEmployee(null); }}
                    onUpdated={fetchEmployees}
                    employee={selectedEmployee}
                    isReadOnly={isReadOnly}
                />
            )}
        </div>
    );
}
