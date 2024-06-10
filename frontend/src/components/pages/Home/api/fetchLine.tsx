import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define the type for the response data
export interface InventoryData {
  id: number;
  location: string;
  quantity_on_hand: number;
  quantity_on_order: number;
  reorder_point: number;
  last_updated: string;
  notes: string;
  updated_by: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}

// Define the type for the config prop
export type FetchDataConfig = AxiosRequestConfig;

// Define the return type of the fetchData function
export type FetchDataResult = InventoryData[];

export const fetchData = async (config: FetchDataConfig): Promise<FetchDataResult> => {
  try {
    const response: AxiosResponse<FetchDataResult> = await axios.get("/api/v2/inventory-monitoring/", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
