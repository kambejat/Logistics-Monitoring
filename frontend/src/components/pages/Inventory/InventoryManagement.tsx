import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useAuth from "../../context/useAuth";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { InventoryItem } from "./types";
import AddForm from "./forms/AddForm";
import EditForm from "./forms/EditForm";

const initialInventory: InventoryItem[] = [];

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [filteredInventory, setFilteredInventory] =
    useState<InventoryItem[]>(initialInventory);
  const [newInventory, setNewInventory] = useState<Partial<InventoryItem>>({
    location: "",
    quantity_on_hand: 0,
    quantity_on_order: 0,
    reorder_point: 0,
    notes: "",
  });
  const [editInventory, setEditInventory] =
    useState<Partial<InventoryItem> | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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
    { field: "location", headerName: "Location", width: 150 },
    { field: "quantity_on_hand", headerName: "Quantity on Hand", width: 180 },
    { field: "quantity_on_order", headerName: "Quantity on Order", width: 180 },
    { field: "reorder_point", headerName: "Reorder Point", width: 120 },
    { field: "last_updated", headerName: "Last Updated", width: 180 },
    { field: "notes", headerName: "Notes", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          size="small"
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
    fetchInventory();
  }, []);

  useEffect(() => {
    setFilteredInventory(
      inventory.filter((item) =>
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, inventory]);

  const fetchInventory = async () => {
    try {
      const response = await axios.get<InventoryItem[]>(
        "/api/v2/inventory-monitoring/",
        config
      );
      setInventory(response.data);
    } catch (error: any) {
      toast.error(`Error fetching inventory: ${error.data.message}`);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInventory({ ...newInventory, [name]: value });
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editInventory) {
      const { name, value } = e.target;
      setEditInventory({ ...editInventory, [name]: value });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/v2/inventory-monitoring/", newInventory, config);
      fetchInventory();
      setNewInventory({
        location: "",
        quantity_on_hand: 0,
        quantity_on_order: 0,
        reorder_point: 0,
        notes: "",
      });
      toast.success("Inventory has been updated");
      setDialogOpen(false);
    } catch (error) {
      toast.error(`Error adding inventory: ${error}`);
    }
  };

  const handleEditClick = (item: InventoryItem) => {
    setEditInventory(item);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (editInventory && editInventory.id) {
      try {
        await axios.put(
          `/api/v2/inventory-monitoring/${editInventory.id}/`,
          editInventory,
          config
        );
        fetchInventory();
        setEditDialogOpen(false);
        toast.success("Inventory has been updated");
      } catch (error) {
        toast.error(`Error updating inventory: ${error}`);
      }
    }
  };

  return (
    <div className="flex-1 h-screen">
      <div className="mb-1 justify-between flex">
        <div className="flex-1  dark:text-white m-2">
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
            Add Inventory
          </Button>
        </div>
      </div>

      <AddForm
        newInventory={newInventory}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <EditForm
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        editInventory={editInventory}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
      />

      <div className="flex-1 h-[440px] sm:max-h-screen mt-4">
        <DataGrid
          className="dark:text-white shadow-lg dark:bg-gray-800 dark:shadow-sm"
          rows={filteredInventory}
          columns={columns}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default InventoryManagement;
