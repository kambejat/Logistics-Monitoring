import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';

interface SidebarProps {
  activeTab: number;
  isSidebarOpen: boolean;
  handleTabChange: (tabNumber: number) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  isSidebarOpen,
  handleTabChange,
}) => {
  const authContext = useContext(AuthContext);

  // Perform null check to ensure authContext exists
  if (!authContext) {
    return null; // or return a fallback UI
  }

  // Define a CSS class for the active tab
  const activeTabClass = "border-l-4 dark:border-blue-700 border-blue-700 bg-gray-300 dark:bg-gray-700/50 dark:text-white"; // Adjust the border color and width as needed

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 shadow-lg border-r dark:border-none w-64 pt-14 h-screen bg-white transition-transform ${
        isSidebarOpen ? "-translate-x-full sm:translate-x-0" : ""
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to={`/dashboard/${activeTab}/1`}
              onClick={() => handleTabChange(1)}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 1 ? activeTabClass : "" // Apply activeTabClass if activeTab is 1
              }`}
            >
              <DashboardIcon className="w-5 h-5 text-black transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white dark:text-white" />
              <span className="ms-3 ">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to={`/dashboard/${activeTab}/1`}
              onClick={() => handleTabChange(2)}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 2 ? activeTabClass : "" // Apply activeTabClass if activeTab is 2
              }`}
            >
              <LocalShippingIcon className="w-5 h-5 text-black transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white dark:text-white" />
              <span className="ms-3 ">Shipments</span>
            </Link>
          </li>

          <li>
            <Link
              to={`/dashboard/${activeTab}/1`}
              onClick={() => handleTabChange(3)}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 3 ? activeTabClass : "" // Apply activeTabClass if activeTab is 2
              }`}
            >
              <InventoryIcon className="w-5 h-5 text-black transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white dark:text-white" />
              <span className="ms-3 ">Inventory</span>
            </Link>
          </li>

          <li>
            <Link
              to={`/dashboard/${activeTab}/1`}
              onClick={() => handleTabChange(4)}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 4 ? activeTabClass : "" // Apply activeTabClass if activeTab is 2
              }`}
            >
              <LocalGroceryStoreIcon className="w-5 h-5 text-black transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white dark:text-white" />
              <span className="ms-3 ">Supplier</span>
            </Link>
          </li>

          <li>
            <Link
              to={`/dashboard/${activeTab}/1`}
              onClick={() => handleTabChange(5)}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 5 ? activeTabClass : "" // Apply activeTabClass if activeTab is 2
              }`}
            >
              <WarehouseIcon className="w-5 h-5 text-black transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white dark:text-white" />
              <span className="ms-3 ">Warehouse</span>
            </Link>
          </li>

          <li>
            <Link
              to={`/dashboard/${activeTab}/1`}
              onClick={() => handleTabChange(6)}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 6 ? activeTabClass : "" // Apply activeTabClass if activeTab is 2
              }`}
            >
              <EmojiTransportationIcon className="w-5 h-5 text-black transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white dark:text-white" />
              <span className="ms-3 ">Transportation</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
