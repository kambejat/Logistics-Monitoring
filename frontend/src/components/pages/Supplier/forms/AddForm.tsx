import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { SupplierItem } from "../types";

interface SupplierProps {
  newSupplier: Partial<SupplierItem>;
  dialogOpen: boolean;
  handleInputChange: any;
  setDialogOpen: (value: boolean) => void;
  handleSubmit: () => void;
}

const AddForm: React.FC<SupplierProps> = ({
  newSupplier,
  dialogOpen,
  handleInputChange,
  setDialogOpen,
  handleSubmit,
}) => {
  return (
    <>
      <Dialog
        className="dark:bg-gray-900/50"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle className="dark:bg-gray-900 dark:text-white">
          Add Supplier
        </DialogTitle>
        <DialogContent className="dark:bg-gray-900 dark:text-white">
          <TextField
            name="supplier_name"
            label="Supplier Name"
            value={newSupplier.supplier_name}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            InputLabelProps={{ className: "dark:text-white" }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
          <TextField
            name="order_volume"
            label="Order Volume"
            value={newSupplier.order_volume || ""}
            onChange={handleInputChange}
            type="number"
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            InputLabelProps={{ className: "dark:text-white" }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
          <TextField
            name="on_time_delivery_rate"
            label="On-Time Delivery Rate"
            value={newSupplier.on_time_delivery_rate || ""}
            onChange={handleInputChange}
            type="number"
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            InputLabelProps={{ className: "dark:text-white" }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
          <TextField
            name="quality_metrics"
            label="Quality Metrics"
            value={newSupplier.quality_metrics}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            InputLabelProps={{ className: "dark:text-white" }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
          <TextField
            name="lead_times"
            label="Lead Times"
            value={newSupplier.lead_times || ""}
            onChange={handleInputChange}
            type="number"
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            InputLabelProps={{ className: "dark:text-white" }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
          <TextField
            name="notes"
            label="Notes"
            value={newSupplier.notes}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            InputLabelProps={{ className: "dark:text-white" }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
        </DialogContent>
        <DialogActions className="dark:bg-gray-900 dark:text-white">
          <Button
            className="dark:text-white"
            onClick={() => setDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            className="dark:text-white"
            onClick={handleSubmit}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddForm;
