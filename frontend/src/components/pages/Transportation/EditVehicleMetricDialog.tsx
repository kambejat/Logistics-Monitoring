import React, { ChangeEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';


import { VehicleMetricsItem } from "./types";

interface EditVehicleMetricDialogProps {
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editMetric: VehicleMetricsItem | null;
  handleEditInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEditSubmit: () => void;
}


const EditVehicleMetricDialog: React.FC<EditVehicleMetricDialogProps> = ({
  editDialogOpen,
  setEditDialogOpen,
  editMetric,
  handleEditInputChange,
  handleEditSubmit
}) => {
  return (
    <Dialog className="dark:bg-gray-900/50" open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
      <DialogTitle className="dark:bg-gray-900 dark:text-white">Edit Vehicle Metric</DialogTitle>
      <DialogContent className="dark:bg-gray-900">
        <TextField
          label="Vehicle ID"
          variant="outlined"
          name="vehicle_id"
          value={editMetric?.vehicle_id || ''}
          onChange={handleEditInputChange}
          fullWidth
          size="small"
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
          margin="normal"
        />
        <TextField
          label="Fuel Consumption"
          variant="outlined"
          name="fuel_consumption"
          value={editMetric?.fuel_consumption || ''}
          onChange={handleEditInputChange}
          fullWidth
          size="small"
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
          margin="normal"
        />
        <TextField
          label="Vehicle Utilization"
          variant="outlined"
          name="vehicle_utilization"
          value={editMetric?.vehicle_utilization || ''}
          onChange={handleEditInputChange}
          fullWidth
          size="small"
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
          margin="normal"
        />
        <TextField
          label="Average Delivery Time"
          variant="outlined"
          name="average_delivery_time"
          value={editMetric?.average_delivery_time || ''}
          onChange={handleEditInputChange}
          fullWidth
          size="small"
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
          margin="normal"
        />
        <TextField
          label="Route Efficiency"
          variant="outlined"
          name="route_efficiency"
          value={editMetric?.route_efficiency || ''}
          onChange={handleEditInputChange}
          fullWidth
          size="small"
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
          margin="normal"
        />
        <TextField
          label="Notes"
          variant="outlined"
          name="notes"
          value={editMetric?.notes || ''}
          onChange={handleEditInputChange}
          fullWidth
          size="small"
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
          margin="normal"
        />
      </DialogContent>
      <DialogActions className="dark:bg-gray-900 dark:text-white">
        <Button className="dark:text-white" onClick={() => setEditDialogOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button className="dark:text-white" onClick={handleEditSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditVehicleMetricDialog;
