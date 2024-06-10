import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface ShipmentFormProps {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
  currentShipment: any;
  setCurrentShipment: (shipment: any) => void;
}

const ShipmentForm: React.FC<ShipmentFormProps> = ({
  open,
  handleClose,
  handleSave,
  currentShipment,
  setCurrentShipment,
}) => {
  return (
    <Dialog className="dark:bg-gray-900/50" open={open} onClose={handleClose}>
      <DialogTitle className="dark:bg-gray-900 dark:text-white">
        {currentShipment && currentShipment.id
          ? "Edit Shipment"
          : "Add Shipment"}
      </DialogTitle>
      <DialogContent className="dark:bg-gray-900">
        <TextField
          margin="dense"
          label="Origin"
          fullWidth
          value={currentShipment ? currentShipment.origin : ""}
          onChange={(e) =>
            setCurrentShipment({ ...currentShipment, origin: e.target.value })
          }
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
        />
        <TextField
          margin="dense"
          label="Destination"
          fullWidth
          value={currentShipment ? currentShipment.destination : ""}
          onChange={(e) =>
            setCurrentShipment({
              ...currentShipment,
              destination: e.target.value,
            })
          }
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
        />
        <TextField
          margin="dense"
          label="Current Location"
          fullWidth
          value={currentShipment ? currentShipment.current_location : ""}
          onChange={(e) =>
            setCurrentShipment({
              ...currentShipment,
              current_location: e.target.value,
            })
          }
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
        />
        <TextField
          margin="dense"
          label="Status"
          fullWidth
          select
          SelectProps={{ native: true }}
          InputLabelProps={{
            shrink: true,
          }}
          value={currentShipment ? currentShipment.status : ""}
          onChange={(e) =>
            setCurrentShipment({ ...currentShipment, status: e.target.value })
          }
          InputProps={{
            className: "dark:text-white"
          }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="not active">Not Active</option>
        </TextField>
        <TextField
          margin="dense"
          label="Expected Delivery Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={currentShipment ? currentShipment.expected_delivery_date : ""}
          onChange={(e) =>
            setCurrentShipment({
              ...currentShipment,
              expected_delivery_date: e.target.value,
            })
          }
          InputProps={{
            className: "dark:text-white"
          }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
        />
        <TextField
          margin="dense"
          label="Actual Delivery Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={
            currentShipment ? currentShipment.actual_delivery_date || "" : ""
          }
          onChange={(e) =>
            setCurrentShipment({
              ...currentShipment,
              actual_delivery_date: e.target.value,
            })
          }
          InputProps={{
            className: "dark:text-white"
          }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
        />
        <TextField
          margin="dense"
          label="Carrier Information"
          fullWidth
          value={currentShipment ? currentShipment.carrier_information : ""}
          onChange={(e) =>
            setCurrentShipment({
              ...currentShipment,
              carrier_information: e.target.value,
            })
          }
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
        />
        <TextField
          margin="dense"
          label="Notes"
          fullWidth
          multiline
          rows={4}
          value={currentShipment ? currentShipment.notes || "" : ""}
          onChange={(e) =>
            setCurrentShipment({ ...currentShipment, notes: e.target.value })
          }
          InputProps={{
            className: "dark:text-white"
          }}
          InputLabelProps={{ className: "dark:text-white" }}
          className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
        />
      </DialogContent>
      <DialogActions className="dark:bg-gray-900">
        <Button className="dark:text-white" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button className="dark:text-white" onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShipmentForm;
