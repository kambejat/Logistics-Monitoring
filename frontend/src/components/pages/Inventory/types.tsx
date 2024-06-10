export interface InventoryItem {
    id: number;
    location: string;
    quantity_on_hand: number;
    quantity_on_order: number;
    reorder_point: number;
    last_updated: string;
    notes: string;
  }