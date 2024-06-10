import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { TaskItem } from "../types";

interface WarehouseProps {
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  newTask: Partial<TaskItem>;
  handleInputChange: any;
  handleSubmit: () => void;
}

const AddForm: React.FC<WarehouseProps> = ({
  dialogOpen,
  setDialogOpen,
  newTask,
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
        <DialogTitle className="dark:bg-gray-900 dark:text-white">
          Add Task
        </DialogTitle>
        <DialogContent className="dark:bg-gray-900">
          <TextField
            name="task"
            label="Task"
            value={newTask.task}
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
            name="start_time"
            label="Start Time"
            type="datetime-local"
            value={newTask.start_time || ""}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
          <TextField
            name="end_time"
            label="End Time"
            type="datetime-local"
            value={newTask.end_time || ""}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            InputProps={{
              className: "dark:text-white",
            }}
            className="dark:bg-gray-700 dark:rounded-lg dark:text-white hover:dark:text-white"
            margin="normal"
          />
          <TextField
            name="status"
            label="Status"
            value={newTask.status}
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
            name="notes"
            label="Notes"
            value={newTask.notes}
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
