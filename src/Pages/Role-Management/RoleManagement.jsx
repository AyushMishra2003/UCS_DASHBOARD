import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayouts";
import { useDispatch, useSelector } from "react-redux";
import { addOperatorRole, deleteOperatorRole, editOperatorRole, getOperatorRole } from "../../Redux/Slices/OperaotSlice";

const RoleManagement = () => {
  const dispatch = useDispatch();
  const { role, loading, error } = useSelector((state) => state.operator);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [editRoleId, setEditRoleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 5;

  useEffect(() => {
    dispatch(getOperatorRole());
  }, [dispatch]);

  const handleAddRole = async () => {
    if (!roleName.trim()) return;

    const data = { title: roleName };
    let response;

    if (editRoleId) {
      response = await dispatch(editOperatorRole({ data, editRoleId }));
    } else {
      response = await dispatch(addOperatorRole(data));
    }

    if (response?.payload?.success) {
      setRoleName("");
      setEditRoleId(null);
      setIsModalOpen(false);
      dispatch(getOperatorRole());
    }
  };

  const handleUpdateRole = (role, id) => {
    setRoleName(role);
    setEditRoleId(id);
    setIsModalOpen(true);
  };

  const handleDeleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    const response = await dispatch(deleteOperatorRole(id));
    if (response?.payload?.success) {
      dispatch(getOperatorRole());
    }
  };

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = role?.slice(indexOfFirstRole, indexOfLastRole);

  const totalPages = Math.ceil((role?.length || 0) / rolesPerPage);

  return (
    <HomeLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Role Management</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditRoleId(null);
            setRoleName("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
        >
          + Add Role
        </button>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Role Name</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Updated At</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="text-center text-red-500 py-4">{error}</td>
                </tr>
              ) : (
                currentRoles?.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <td className="py-3 px-6">{item.title}</td>
                    <td className="py-3 px-6">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-6">{new Date(item.updatedAt).toLocaleDateString()}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleUpdateRole(item.title, item._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRole(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="text-gray-700 px-4 py-2">Page {currentPage} of {totalPages}</span>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {editRoleId ? "Edit Role" : "Add Role"}
            </h3>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditRoleId(null);
                  setRoleName("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddRole}
              >
                {editRoleId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
};

export default RoleManagement;
