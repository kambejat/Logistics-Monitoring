import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { InventoryItem } from "./types";

interface EditFormProps {
  editDialogOpen: boolean;
  setEditDialogOpen: (value: boolean) => void;
  editInventory: Partial<InventoryItem> | null; 
  handleEditInputChange: any;
  handleEditSubmit: () => void;
}

const EditForm: React.FC<EditFormProps> = ({
  editDialogOpen,
  setEditDialogOpen,
  editInventory,
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
        <DialogTitle className="dark:bg-gray-900 dark:text-white">
          Edit Inventory
        </DialogTitle>
        <DialogContent className="dark:bg-gray-900">
          <TextField
            name="location"
            label="Location"
            value={editInventory?.location || ""}
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
            name="quantity_on_hand"
            label="Quantity on Hand"
            value={editInventory?.quantity_on_hand || 0}
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
            name="quantity_on_order"
            label="Quantity on Order"
            value={editInventory?.quantity_on_order || 0}
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
            name="reorder_point"
            label="Reorder Point"
            value={editInventory?.reorder_point || 0}
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
            name="last_updated"
            label="Last Updated"
            value={editInventory?.last_updated || ""}
            onChange={handleEditInputChange}
            type="date"
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
            value={editInventory?.notes || ""}
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
        <DialogActions className="dark:bg-gray-900 dark:text-white">
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
