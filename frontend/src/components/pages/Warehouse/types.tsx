export interface TaskItem {
    id: number;
    task: string;
    start_time: string | null;
    end_time: string | null;
    status: string;
    notes: string;
  }