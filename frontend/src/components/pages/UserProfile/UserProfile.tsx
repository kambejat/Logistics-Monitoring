import React, { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../../context/useAuth";
import Modal from "../../ui/Modal";
import EditForm from "./EditForm";
import ConfirmationModal from "../../ui/ComfirmationModal";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const UserProfile: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const authContext = useContext(AuthContext);
  const [user, token] = useAuth();

  if (!authContext) {
    return null; // or return a fallback UI
  }

  const { logoutUser } = authContext;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDeleteUser = async () => {
    try {
      // Send a request to the backend to delete the user
      await axios.delete(`/api/v1/users/${user.user_id}/`, config);
      toast.success("User deleted successfully");
      logoutUser();
    } catch (error: any) {
      toast.error(`Error deleting user: ${error.data.message}`);
    } finally {
      setIsConfirmationOpen(false);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        <div className="flex justify-end px-4 pt-4 absolute top-0 right-0">
          <button
            id="dropdownButton"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            aria-expanded={isDropdownOpen ? "true" : "false"}
            onClick={handleDropdownToggle}
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
        </div>

        {/* <!-- Dropdown menu --> */}
        <div
          ref={dropdownRef}
          id="dropdown"
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } absolute mt-8 mr-8 right-0 top-0  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transform transition duration-300 ease-in-out`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a
                onClick={toggleModal}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </a>
            </li>

            <li>
              <a
                onClick={() => setIsConfirmationOpen(!isConfirmationOpen)}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>

        {isOpen && (
          <Modal
            isOpen={isOpen}
            Content={
              <>
                <EditForm user={user} token={token} setIsOpen={setIsOpen} />
              </>
            }
            toggleModal={handleClose}
          />
        )}

        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleDeleteUser}
        />

        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={user.image_url}
            alt="Profile Not Provided"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.first_name} {user.last_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
