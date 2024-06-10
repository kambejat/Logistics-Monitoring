import React, { useState, useEffect, ChangeEvent } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import { TaskItem } from "./types";
import useAuth from "../../context/useAuth";
import { Navigate } from "react-router-dom";
import AddForm from "./forms/AddForm";
import EditForm from "./forms/EditForm";

const initialTasks: TaskItem[] = [];

const WarehouseManagement: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>(initialTasks);
  const [newTask, setNewTask] = useState<Partial<TaskItem>>({
    task: "",
    start_time: null,
    end_time: null,
    status: "",
    notes: "",
  });
  const [editTask, setEditTask] = useState<Partial<TaskItem> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [user, token] = useAuth();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const columns: GridColDef[] = [
    { field: "task", headerName: "Task", width: 150 },
    { field: "start_time", headerName: "Start Time", width: 180 },
    { field: "end_time", headerName: "End Time", width: 180 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "notes", headerName: "Notes", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [searchQuery, tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<TaskItem[]>(
        "/api/v5/warehouse-operations/",
        config
      );
      const tasksWithId = response.data.map((task, index) => ({
        ...task,
        id: index + 1,
      }));
      setTasks(tasksWithId);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const filterTasks = () => {
    const filtered = tasks.filter(
      (task) =>
        task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.status &&
          task.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.notes &&
          task.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredTasks(filtered);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editTask) {
      const { name, value } = e.target;
      setEditTask({ ...editTask, [name]: value });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/v5/warehouse-operations/", newTask, config);
      fetchTasks();
      setNewTask({
        task: "",
        start_time: null,
        end_time: null,
        status: "",
        notes: "",
      });
      toast.success("Task has been added");
      setDialogOpen(false);
    } catch (error) {
      toast.error(`Error adding task: ${error}`);
    }
  };

  const handleEditClick = (item: TaskItem) => {
    setEditTask(item);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (editTask && editTask.id) {
      try {
        await axios.put(
          `/api/v5/warehouse-operations/${editTask.id}/`,
          editTask,
          config
        );
        fetchTasks();
        setEditDialogOpen(false);
        toast.success("Task has been updated");
      } catch (error) {
        toast.error(`Error updating task: ${error}`);
      }
    }
  };

  return (
    <div className="flex-1 h-screen">
      <div className="mb-1 justify-end flex">
        <div className="flex-1 m-2">
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon className="dark:text-white" />
                  </IconButton>
                </InputAdornment>
              ),
              className: "dark:text-white",
            }}
            InputLabelProps={{ className: "dark:text-white" }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white" // Add hover class
            fullWidth
            size="small"
          />
        </div>
        <div className="m-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            Add Task
          </Button>
        </div>
      </div>

      <AddForm
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <EditForm
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        editTask={editTask}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
      />

      <div className="flex-1 h-[420px] mt-4">
        <DataGrid
          className="dark:text-white shadow-lg dark:bg-gray-800 dark:shadow-sm"
          rows={filteredTasks}
          columns={columns}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default WarehouseManagement;
