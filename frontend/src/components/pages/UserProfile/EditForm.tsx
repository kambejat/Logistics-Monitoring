import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  image_url: string;
  password: string;
}

interface EditFormProps {
  user: Partial<User>;
  token: any;
  setIsOpen: any;
}

const EditForm: React.FC<EditFormProps> = ({ user, token, setIsOpen }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    image_url: user.image_url,
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Filter out fields with empty values and exclude password and image_url
    const updatedData: any = Object.entries(formData)
      .filter(([key, value]) => {
        // Exclude password and image_url if empty
        if (key === "password" || key === "image_url") {
          return value !== "";
        }
        // Include other fields if not empty
        return value !== "";
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    try {
      // Make Axios PUT request
      const response = await axios.put(
        `/api/v1/users/${user.user_id}/`,
        updatedData,
        config
      );

      toast.success(response.data.first_name + " " + response.data.last_name);
      setIsOpen(false);
    } catch (error: any) {
      // Handle error
      toast.error(`Error updating user data: ${error.data.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Edit User
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="border rounded-lg px-3 py-2 w-full dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="file"
            id="imageUrl"
            name="image_url"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditForm;
