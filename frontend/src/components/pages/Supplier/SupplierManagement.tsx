import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useAuth from "../../context/useAuth";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SupplierItem } from "./types";
import AddForm from "./forms/AddForm";
import EditForm from "./forms/EditForm";

const initialSupplier: SupplierItem[] = [];

const SupplierManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(initialSupplier);
  const [newSupplier, setNewSupplier] = useState<Partial<SupplierItem>>({
    supplier_name: "",
    order_volume: null,
    on_time_delivery_rate: null,
    quality_metrics: "",
    lead_times: null,
    notes: "",
  });
  const [editSupplier, setEditSupplier] =
    useState<Partial<SupplierItem> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
    { field: "supplier_name", headerName: "Supplier Name", width: 150 },
    { field: "order_volume", headerName: "Order Volume", width: 150 },
    {
      field: "on_time_delivery_rate",
      headerName: "On-Time Delivery Rate",
      width: 180,
    },
    { field: "quality_metrics", headerName: "Quality Metrics", width: 150 },
    { field: "lead_times", headerName: "Lead Times", width: 150 },
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
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get<SupplierItem[]>(
        "/api/v4/supplier-performance/",
        config
      );
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editSupplier) {
      const { name, value } = e.target;
      setEditSupplier({ ...editSupplier, [name]: value });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/v4/supplier-performance/", newSupplier, config);
      fetchSuppliers();
      setNewSupplier({
        supplier_name: "",
        order_volume: null,
        on_time_delivery_rate: null,
        quality_metrics: "",
        lead_times: null,
        notes: "",
      });
      toast.success("Supplier has been added");
      setDialogOpen(false);
    } catch (error) {
      toast.error(`Error adding supplier: ${error}`);
    }
  };

  const handleEditClick = (item: SupplierItem) => {
    setEditSupplier(item);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (editSupplier && editSupplier.id) {
      try {
        await axios.put(
          `/api/v4/supplier-performance/${editSupplier.id}/`,
          editSupplier,
          config
        );
        fetchSuppliers();
        setEditDialogOpen(false);
        toast.success("Supplier has been updated");
      } catch (error) {
        toast.error(`Error updating supplier: ${error}`);
      }
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 h-screen">
      <div className="mb-1 justify-between flex">
        <div className="flex-1 m-2">
          <TextField
            label="Search"
            value={searchTerm}
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
            Add Supplier
          </Button>
        </div>
      </div>

      <AddForm
        newSupplier={newSupplier}
        dialogOpen={dialogOpen}
        handleInputChange={handleInputChange}
        setDialogOpen={setDialogOpen}
        handleSubmit={handleSubmit}
      />

      <EditForm
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        editSupplier={editSupplier}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
      />
      <div className="flex-1 h-[420px] mt-4">
        <DataGrid
          className="dark:text-white shadow-lg dark:bg-gray-800 dark:shadow-sm"
          rows={filteredSuppliers}
          columns={columns}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SupplierManagement;
