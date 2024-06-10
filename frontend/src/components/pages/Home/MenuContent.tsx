import React from "react";
import Dashboard from "./Dashboard";
import ShipmentTable from "../Shipment/Shipment";
import InventoryManagement from "../Inventory/InventoryManagement";
import SupplierManagement from "../Supplier/SupplierManagement";
import WarehouseManagement from "../Warehouse/WarehouseManagement";
import TransportationManagement from "../Transportation/TransportationManagement";
import UserProfile from "../UserProfile/UserProfile";

interface MenuContentProps {
  activeTab: number;
}

const MenuContent: React.FC<MenuContentProps> = ({
  activeTab
}) => {
  const renderContent = () => {
    if (activeTab === 1) {
      return (
        <>
          <Dashboard />
        </>
      );
    } else if (activeTab === 2) {
      return (
        <div className="flex flex-col justify-center p-2 space-y-4">
          <ShipmentTable />
        </div>
      );
    } else if (activeTab === 3) {
      return (
        <div className="flex flex-col justify-center p-2 space-y-4">
          <InventoryManagement />
        </div>
      );
    } else if (activeTab === 4) {
      return (
        <div className="flex flex-col justify-center p-2 space-y-4">
          <SupplierManagement />
        </div>
      );
    } else if (activeTab === 5) {
      return (
        <div className="flex flex-col justify-center p-2 space-y-4">
          <WarehouseManagement />
        </div>
      );
    } else if (activeTab === 6) {
      return (
        <div className="flex flex-col justify-center p-2 space-y-4">
          <TransportationManagement />
        </div>
      );
    } else if (activeTab === 7) {
      return (
        <div className="flex flex-col h-screen justify-center p-2 space-y-4">
          <UserProfile />
        </div>
      );
    }
    return null;
  };

  return renderContent();
};

export default MenuContent;
