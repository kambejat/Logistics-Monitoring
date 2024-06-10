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

interface InventoryProps {
  newInventory: Partial<InventoryItem>;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  handleInputChange: any;
  handleSubmit: () => void;
}

const AddForm: React.FC<InventoryProps> = ({
  newInventory,
  dialogOpen,
  setDialogOpen,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <>
      <Dialog
        className="dark:bg-gray-900/50"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle className="dark:text-white dark:bg-gray-900">
          Add Inventory
        </DialogTitle>
        <DialogContent className="dark:bg-gray-900">
          <TextField
            name="location"
            label="Location"
            value={newInventory.location}
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
            name="quantity_on_hand"
            label="Quantity on Hand"
            value={newInventory.quantity_on_hand}
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
            name="quantity_on_order"
            label="Quantity on Order"
            value={newInventory.quantity_on_order}
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
            name="reorder_point"
            label="Reorder Point"
            value={newInventory.reorder_point}
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
            name="last_updated"
            label="Last Updated"
            value={newInventory.last_updated}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
          <TextField
            name="notes"
            label="Notes"
            value={newInventory.notes}
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
        <DialogActions className="dark:bg-gray-900">
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
