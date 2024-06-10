import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../context/useAuth";
import { Navigate } from "react-router-dom";
import Card from "../../ui/Card";
import LineChart from "./api/LineChart";

const Dashboard: React.FC = () => {
  const [shipments, setShipments] = useState<any[]>([]);
  const [avgRateMonthly, setAvgRateMonthly] = useState<number>(0);
  const [avgRateYearly, setAvgRateYearly] = useState<number>(0);
  const [totalShipments, setTotalShipments] = useState<number>(0);
  const [user, token] = useAuth();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v3/shipment-tracking/", config);
      const data = response.data;

      // Calculate the total number of shipments
      const total = data.length;
      shipments.map((shipment) => shipment)


      // Calculate the average shipment rate per month
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
      const monthlyShipments = data.filter((shipment: any) => {
        const deliveryDate = new Date(shipment.actual_delivery_date);
        return deliveryDate.getMonth() + 1 === currentMonth;
      }).length;
      const avgMonthlyRate = (monthlyShipments / total) * 100;

      // Calculate the average shipment rate per year
      const yearlyShipments = data.filter((shipment: any) => {
        const deliveryDate = new Date(shipment.actual_delivery_date);
        return deliveryDate.getFullYear() === now.getFullYear();
      }).length;
      const avgYearlyRate = (yearlyShipments / total) * 100;

      // Update state with the calculated metrics
      setShipments(data);
      setTotalShipments(total);
      setAvgRateMonthly(avgMonthlyRate);
      setAvgRateYearly(avgYearlyRate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the REST API

    fetchData();
  }, []); // Fetch data only once when component mounts

  return (
    <div className="flex-1 justify-center dark:bg-gray-900 bg-gray-50/50 p-8 space-y-1">
      <div className="sm:flex sm:space-x-4">
        <Card title="Number of Shipments" value={totalShipments} />
        <Card
          title="Avg. Shipments Rate Monthly"
          value={`${avgRateMonthly.toFixed(2)}%`}
        />
        <Card
          title="Avg. Shipments Rate Yearly"
          value={`${avgRateYearly.toFixed(2)}%`}
        />
      </div>
      <div className="sm:flex sm:space-x-4">
        <LineChart config={config} />
      </div>
    </div>
  );
};

export default Dashboard;
