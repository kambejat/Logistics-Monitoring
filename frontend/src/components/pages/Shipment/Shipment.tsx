// src/ShipmentTable.tsx
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Archive } from "@mui/icons-material";
import axios from "axios";
import useAuth from "../../context/useAuth";
import ApexChart from "../../ui/Chart";
import ShipmentForm from "./ShipmentForm";
import { Shipment } from "./types";
import fetchShipments from "./api/fetchShipments";
import { Navigate } from "react-router-dom";

const initialShipments: Shipment[] = [];

const ShipmentManagement: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [open, setOpen] = useState(false);
  const [currentShipment, setCurrentShipment] = useState<Shipment | null | any>(
    null
  );
  const [user, token] = useAuth();
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState<number[]>([]);
  const [originChartOptions, setOriginChartOptions] = useState({});
  const [originChartSeries, setOriginChartSeries] = useState<number[]>([]);
  const [destinationChartOptions, setDestinationChartOptions] = useState({});
  const [destinationChartSeries, setDestinationChartSeries] = useState<
    number[]
  >([]);
  const [showArchived, setShowArchived] = useState(false);

  if (!user) {
    return <Navigate to={'/login'} />    
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getShipments = () => {
    fetchShipments(
      config,
      setShipments,
      setFilteredShipments,
      setChartOptions,
      setChartSeries,
      setOriginChartOptions,
      setOriginChartSeries,
      setDestinationChartOptions,
      setDestinationChartSeries,
      showArchived
    );
  };
  useEffect(() => {
    getShipments();
  }, [showArchived]);

  const handleAdd = () => {
    setCurrentShipment(null);
    getShipments();
    setOpen(true);
  };

  const handleEdit = (shipment: Shipment) => {
    setCurrentShipment(shipment);
    setOpen(true);
  };

  const handleArchive = async (id: number) => {
    const updatedShipments = shipments
      .map((shipment) =>
        shipment.id === id ? { ...shipment, is_archived: true } : shipment
      )
      .filter((shipment) => !shipment.is_archived);

    setShipments(updatedShipments);
    await axios.patch(
      `/api/v3/shipment-tracking/${id}/`,
      { is_archived: true },
      config
    );
    getShipments();
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentShipment(null);
  };

  const handleSave = async () => {
    if (currentShipment) {
      if (currentShipment.id) {
        await axios.put(
          `/api/v3/shipment-tracking/${currentShipment.id}/`,
          currentShipment,
          config
        );
      } else {
        await axios.post("/api/v3/shipment-tracking/", currentShipment, config);
      }
      getShipments();
    }
    setOpen(false);
    setCurrentShipment(null);
  };

  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };

  const columns: GridColDef[] = [
    { field: "origin", headerName: "Origin", width: 120 },
    { field: "destination", headerName: "Destination", width: 120 },
    { field: "current_location", headerName: "Current Location", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      valueGetter: (params) =>
        params.row.status === "Active" ? "Active" : "Not Active",
    },
    {
      field: "expected_delivery_date",
      headerName: "Expected Delivery Date",
      width: 200,
    },
    {
      field: "actual_delivery_date",
      headerName: "Actual Delivery Date",
      width: 200,
    },
    {
      field: "carrier_information",
      headerName: "Carrier Information",
      width: 200,
    },
    { field: "notes", headerName: "Notes", width: 200 },
    { field: "created_by_name", headerName: "Created By", width: 150 },
    { field: "updated_by_name", headerName: "Updated By", width: 150 },
    { field: "created_at", headerName: "Created At", width: 200 },
    { field: "updated_at", headerName: "Updated At", width: 200 },
    { field: "is_archived", headerName: "Archived", width: 100 },
    { field: "archived_by", headerName: "Archived By", width: 150 },
    { field: "un_archived_by", headerName: "Un-archived By", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <div>
          <IconButton className="dark:text-white" color="primary" onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton
            color="secondary"
            className="dark:text-white" 
            onClick={() => handleArchive(params.row.id)}
          >
            <Archive />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 h-screen">
      <div className="mb-1 justify-end flex">
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Shipment
        </Button>
        <Button
            variant="contained"
            color="primary"
            onClick={toggleArchived}
            style={{ marginLeft: 4 }}
          >
            {showArchived ? "Hide Archived" : "Show Archived"}
          </Button>
      </div>
      <div className="flex-1 mt-4 h-[300px]">
        <DataGrid className="dark:text-white shadow-lg dark:bg-gray-800 dark:shadow-lg"  rows={filteredShipments} columns={columns} />
      </div>

      <ShipmentForm
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        currentShipment={currentShipment}
        setCurrentShipment={setCurrentShipment}
      />
      <ApexChart
        chartOptions={chartOptions}
        chartSeries={chartSeries}
        chartType="pie"
      />
      <ApexChart
        chartOptions={originChartOptions}
        chartSeries={originChartSeries}
        chartType="bar"
      />
      <ApexChart
        chartOptions={destinationChartOptions}
        chartSeries={destinationChartSeries}
        chartType="bar"
      />
    </div>
  );
};

export default ShipmentManagement;
