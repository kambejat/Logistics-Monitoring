import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import LoginPage from "./components/pages/Login";
import PrivateRoute from "./components/context/PrivateRoute";
import useAuth from "./components/context/useAuth";
import Sidebar from "./components/ui/Sidebar";
import MenuContent from "./components/pages/Home/MenuContent";
import Navbar from "./components/ui/Navbar";
import Registration from "./components/pages/Registration";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

const App: React.FC = () => {
  const [user] = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(1);
  const navigate = useNavigate();

  const handleTabChange = (tabNumber: number) => {
    if (activeTab !== tabNumber) {
      setActiveTab(tabNumber);
      navigate(`/dashboard/${tabNumber}/1`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route  path="/register" element={<Registration  />}/>
        <Route
          path="/dashboard/:activeTab/:subMenuTab"
          element={
            <PrivateRoute>
              {user ? (
                <>
                  <Navbar toggleSidebar={toggleSidebar} handleTabChange={handleTabChange} />

                  <Sidebar
                    handleTabChange={handleTabChange}
                    activeTab={activeTab}
                    isSidebarOpen={isSidebarOpen}
                  />

                  <main className="  dark:bg-gray-900 bg-gray-50/50 sm:ml-64">
                    <div className="p-2 border dark:bg-gray-900 shadow-sm border-solid rounded-lg dark:border-gray-700 mt-14">
                      <MenuContent
                        activeTab={activeTab}
                      />
                    </div>
                  </main>
                </>
              ) : null}
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
