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

interface EditProps {
  editDialogOpen: boolean;
  setEditDialogOpen: (value: boolean) => void;
  editTask: Partial<TaskItem> | null;
  handleEditInputChange: any;
  handleEditSubmit: () => void;
}

const EditForm: React.FC<EditProps> = ({
  editDialogOpen,
  setEditDialogOpen,
  editTask,
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
          Edit Task
        </DialogTitle>
        <DialogContent className="dark:bg-gray-900">
          <TextField
            name="task"
            label="Task"
            value={editTask?.task || ""}
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
            name="start_time"
            label="Start Time"
            type="datetime-local"
            value={editTask?.start_time || ""}
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
            name="end_time"
            label="End Time"
            type="datetime-local"
            value={editTask?.end_time || ""}
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
            name="status"
            label="Status"
            value={editTask?.status || ""}
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
            name="notes"
            label="Notes"
            value={editTask?.notes || ""}
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
