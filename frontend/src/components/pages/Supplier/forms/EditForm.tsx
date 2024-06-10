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
  editDialogOpen: boolean;
  setEditDialogOpen: (value: boolean) => void;
  editSupplier: Partial<SupplierItem> | null;
  handleEditInputChange: any;
  handleEditSubmit: () => void;
}

const EditForm: React.FC<SupplierProps> = ({
  editDialogOpen,
  setEditDialogOpen,
  editSupplier,
  handleEditInputChange,
  handleEditSubmit,
}) => {
  return (
    <>
      <Dialog
        className="dark:bg-gray-900/50"
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      >
        <DialogTitle className="dark:text-white dark:bg-gray-900">
          Edit Supplier
        </DialogTitle>
        <DialogContent className="dark:bg-gray-900">
          <TextField
            name="supplier_name"
            label="Supplier Name"
            value={editSupplier?.supplier_name || ""}
            onChange={handleEditInputChange}
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
            value={editSupplier?.order_volume || ""}
            onChange={handleEditInputChange}
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
            value={editSupplier?.on_time_delivery_rate || ""}
            onChange={handleEditInputChange}
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
            value={editSupplier?.quality_metrics || ""}
            onChange={handleEditInputChange}
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
            value={editSupplier?.lead_times || ""}
            onChange={handleEditInputChange}
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
            value={editSupplier?.notes || ""}
            onChange={handleEditInputChange}
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            InputLabelProps={{ className: "dark:text-white" }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
        </DialogContent>
        <DialogActions className="dark:bg-gray-900">
          <Button
            className="dark:text-white"
            onClick={() => setEditDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            className="dark:text-white"
            onClick={handleEditSubmit}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditForm;
