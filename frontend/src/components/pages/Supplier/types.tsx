export interface SupplierItem {
  id: number;
  supplier_name: string;
  order_volume: number | null;
  on_time_delivery_rate: number | null;
  quality_metrics: string;
  lead_times: number | null;
  notes: string;
}
