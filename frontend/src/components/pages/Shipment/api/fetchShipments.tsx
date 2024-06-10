import axios, { AxiosRequestConfig } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Shipment } from "../types";

type SetState<T> = Dispatch<SetStateAction<T>>;

const fetchShipments = async (
  config: AxiosRequestConfig,
  setShipments: SetState<Shipment[]>,
  setFilteredShipments: SetState<Shipment[]>,
  setChartOptions: SetState<any>, // Define appropriate types for chart options and series
  setChartSeries: SetState<any>,
  setOriginChartOptions: SetState<any>,
  setOriginChartSeries: SetState<any>,
  setDestinationChartOptions: SetState<any>,
  setDestinationChartSeries: SetState<any>,
  showArchived: boolean
) => {
  try {
    const response = await axios.get<Shipment[]>(
      "/api/v3/shipment-tracking/",
      config
    );
    const shipmentsWithId = response.data.map((shipment, index) => ({
      ...shipment,
      id: index + 1,
      created_by_name: `${shipment.created_by.first_name} ${shipment.created_by.last_name}`,
      updated_by_name: `${shipment.updated_by.first_name} ${shipment.updated_by.last_name}`,
    }));

    // Filter out archived shipments
    const activeShipments = showArchived
      ? shipmentsWithId
      : shipmentsWithId.filter((shipment) => !shipment.is_archived);

    // Set active shipments to state
    setShipments(activeShipments);
    setFilteredShipments(activeShipments);

    // Check if there are any active shipments
    if (activeShipments.length > 0) {
      // Get the current date
      const currentDate = new Date();

      // Calculate chart data for status
      const statusCounts = activeShipments.reduce((acc: any, shipment: any) => {
        // Check if the actual delivery date is after the current date
        const isActive = new Date(shipment.actual_delivery_date) > currentDate;

        // Determine the status label based on isActive
        const statusLabel = isActive ? "Active" : "Not Active";

        acc[statusLabel] = (acc[statusLabel] || 0) + 1;
        return acc;
      }, {});

      const statusChartOptions = {
        chart: {
          type: "pie",
        },
        labels: Object.keys(statusCounts),
      };

      const statusChartSeries = Object.values(statusCounts);

      setChartOptions(statusChartOptions);
      setChartSeries(statusChartSeries);

      // Calculate chart data for origins and destinations
      const originCounts = activeShipments.reduce((acc: any, shipment) => {
        acc[shipment.origin] = (acc[shipment.origin] || 0) + 1;
        return acc;
      }, {});

      const destinationCounts = activeShipments.reduce((acc: any, shipment) => {
        acc[shipment.destination] = (acc[shipment.destination] || 0) + 1;
        return acc;
      }, {});

      const originChartOptions = {
        chart: {
          type: "bar",
        },
        xaxis: {
          // Label for x-axis of origin chart
          categories: Object.keys(originCounts),
          title: {
            text: "Origin",
          },
        },
        yaxis: {
          // Label for y-axis of origin chart
          title: {
            text: "Count",
          },
        },
      };

      const destinationChartOptions = {
        chart: {
          type: "bar",
        },
        xaxis: {
          // Label for x-axis of destination chart
          categories: Object.keys(destinationCounts),
          title: {
            text: "Destination",
          },
        },
        yaxis: {
          // Label for y-axis of destination chart
          title: {
            text: "Count",
          },
        },
      };

      const originChartSeries = [
        {
          name: "Origin",
          data: Object.values(originCounts),
        },
      ];

      const destinationChartSeries = [
        {
          name: "Destination",
          data: Object.values(destinationCounts),
        },
      ];

      setOriginChartOptions(originChartOptions);
      setOriginChartSeries(originChartSeries);

      setDestinationChartOptions(destinationChartOptions);
      setDestinationChartSeries(destinationChartSeries);
    } else {
      // No active shipments, clear chart data
      setChartOptions({});
      setChartSeries([]);
      setOriginChartOptions({});
      setOriginChartSeries([]);
      setDestinationChartOptions({});
      setDestinationChartSeries([]);
    }
  } catch (error) {
    console.error("Error fetching shipments:", error);
  }
};

export default fetchShipments;
