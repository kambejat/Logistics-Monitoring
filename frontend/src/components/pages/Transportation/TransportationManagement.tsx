import React, { useState, useEffect, ChangeEvent } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import useAuth from "../../context/useAuth";
import { Navigate } from "react-router-dom";
import { VehicleMetricsItem } from "./types";
import EditVehicleMetricDialog from "./EditVehicleMetricDialog";
import AddVehicleMetricDialog from "./AddVehicleMetricDialog";

const initialMetrics: VehicleMetricsItem[] = [];

const TransportationManagement: React.FC = () => {
  const [metrics, setMetrics] = useState<VehicleMetricsItem[]>(initialMetrics);
  const [filteredMetrics, setFilteredMetrics] =
    useState<VehicleMetricsItem[]>(initialMetrics);
  const [newMetric, setNewMetric] = useState<any>({
    vehicle_id: "",
    fuel_consumption: "",
    vehicle_utilization: "",
    average_delivery_time: "",
    route_efficiency: "",
    notes: "",
  });
  const [editMetric, setEditMetric] = useState<
    Partial<VehicleMetricsItem> | any | null
  >(null);
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
    { field: "vehicle_id", headerName: "Vehicle ID", width: 150 },
    { field: "fuel_consumption", headerName: "Fuel Consumption", width: 180 },
    {
      field: "vehicle_utilization",
      headerName: "Vehicle Utilization",
      width: 180,
    },
    {
      field: "average_delivery_time",
      headerName: "Average Delivery Time",
      width: 180,
    },
    { field: "route_efficiency", headerName: "Route Efficiency", width: 150 },
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
  const fetchingMetrics = async () => {
    // Fetch metrics here if needed
    try {
      const response = await axios.get<VehicleMetricsItem[]>(
        "/api/v6/transportation-efficiency/",
        config
      );

      setMetrics(response.data);
    } catch (error) {
      toast.error(`Error fetching metrics: ${error}`);
    }
  };

  useEffect(() => {
    fetchingMetrics();
  }, []);

  useEffect(() => {
    const filteredMetrics = metrics
      .map((metric) => ({
        ...metric,
        vehicle_id: metric.vehicle_id.toString(), // Convert vehicle_id to string
      }))
      .filter((metric) => {
        const vehicleId = metric.vehicle_id.toLowerCase();
        const query = searchQuery.toLowerCase();
        return vehicleId.includes(query);
      });

    setFilteredMetrics(filteredMetrics);
  }, [searchQuery, metrics]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMetric({ ...newMetric, [name]: value });
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editMetric) {
      const { name, value } = e.target;
      setEditMetric({ ...editMetric, [name]: value });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<VehicleMetricsItem>(
        "/api/v6/transportation-efficiency/",
        newMetric,
        config
      );
      setMetrics([...metrics, response.data]);
      setNewMetric({
        vehicle_id: null,
        fuel_consumption: null,
        vehicle_utilization: null,
        average_delivery_time: null,
        route_efficiency: null,
        notes: "",
      });
      toast.success("Successfully added!");
      fetchingMetrics();
      setDialogOpen(false);
    } catch (error) {
      toast.error(`Error submitting metric: ${error}`);
    }
  };

  const handleEditClick = (item: VehicleMetricsItem) => {
    setEditMetric(item);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (editMetric && editMetric.id) {
      try {
        await axios.put<VehicleMetricsItem>(
          `/api/v6/transportation-efficiency/${editMetric.id}/`,
          editMetric,
          config
        );
        fetchingMetrics();
        toast.success("Updated successfully!");
        setEditDialogOpen(false);
      } catch (error) {
        console.error("Error editing metric:", error);
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
            Add Metric
          </Button>
        </div>
      </div>
      <AddVehicleMetricDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        newMetric={newMetric}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <EditVehicleMetricDialog
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        editMetric={editMetric}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
      />

      <div className="flex-1 h-[420px] mt-2">
        <DataGrid sx={{ m: 1 }} className="dark:text-white shadow-lg dark:bg-gray-800 dark:shadow-sm"  rows={filteredMetrics} columns={columns} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default TransportationManagement;
