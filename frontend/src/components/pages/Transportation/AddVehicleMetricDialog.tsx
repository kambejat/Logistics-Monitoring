import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { VehicleMetricsItem } from './types';

interface AddVehicleMetricDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMetric: VehicleMetricsItem;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}


const AddVehicleMetricDialog: React.FC<AddVehicleMetricDialogProps> = ({
  dialogOpen,
  setDialogOpen,
  newMetric,
  handleInputChange,
  handleSubmit
}) => {
  return (
    <Dialog className="dark:bg-gray-900/50" open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle className="dark:bg-gray-900 dark:text-white">Add Vehicle Metric</DialogTitle>
      <DialogContent className="dark:bg-gray-900">
        <TextField
          label="Vehicle ID"
          variant="outlined"
          name="vehicle_id"
          value={newMetric.vehicle_id}
          onChange={handleInputChange}
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
          value={newMetric.fuel_consumption}
          onChange={handleInputChange}
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
          value={newMetric.vehicle_utilization}
          onChange={handleInputChange}
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
          value={newMetric.average_delivery_time}
          onChange={handleInputChange}
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
          value={newMetric.route_efficiency}
          onChange={handleInputChange}
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
          value={newMetric.notes}
          onChange={handleInputChange}
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
        <Button className="dark:text-white"  onClick={() => setDialogOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button className="dark:text-white"  onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVehicleMetricDialog;
