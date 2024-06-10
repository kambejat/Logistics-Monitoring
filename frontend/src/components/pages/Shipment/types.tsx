export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "Admin" | "User" ; // Define appropriate roles
  }
  
  export interface Shipment {
    id: number;
    origin: string;
    destination: string;
    current_location: string;
    status: string;
    expected_delivery_date: string;
    actual_delivery_date: string;
    carrier_information: string;
    notes: string;
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
    is_archived: boolean;
    archived_by: number;
    un_archived_by: number;
    created_by_name: string; 
    updated_by_name: string;
  }
  