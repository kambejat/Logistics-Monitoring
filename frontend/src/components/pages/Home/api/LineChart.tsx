import React, { useState, useEffect } from "react";
import { fetchData, FetchDataConfig, InventoryData } from "./fetchLine";
import ApexChart from "../../../ui/Chart";
import { toast } from "react-toastify";

interface LineChartProps {
  config: FetchDataConfig;
}

interface ChartData {
  x: number;
  y: number;
}

const LineChart: React.FC<LineChartProps> = ({ config }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "line-chart",
      type: "line",
      height: 350,
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Date",
        
      },
      
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
      
    },
    dataLabels: {
      enabled: false,
    },
    cssClass: "dark:text-white"
  });

  const [chartSeries, setChartSeries] = useState<{ name: string; data: ChartData[] }[]>([
    {
      name: "Quantity On Hand",
      data: [],
    },
  ]);

  const [chartCount, setChartCount] = useState<number>(0);
  const [chartPercent, setChartPercent] = useState<number>(0);

  useEffect(() => {
    fetchData(config)
      .then((data: InventoryData[]) => {
        const aggregatedData: { [date: string]: number } = {};
        data.forEach((item) => {
          const date = new Date(item.last_updated).toISOString().split("T")[0];
          if (!aggregatedData[date]) {
            aggregatedData[date] = 0;
          }
          aggregatedData[date] += item.quantity_on_hand;
        });

        const seriesData: ChartData[] = Object.entries(aggregatedData)
          .map(([date, count]) => ({
            x: new Date(date).getTime(),
            y: count,
          }))
          .sort((a, b) => a.x - b.x); // Sort by date

        setChartSeries([{ name: "Quantity On Hand", data: seriesData }]);
        setChartCount(seriesData.length);

        // Calculate the percentage change based on the previous day
        if (seriesData.length > 1) {
          const prevDay = seriesData[seriesData.length - 2].y;
          const currDay = seriesData[seriesData.length - 1].y;
          const percentChange = ((currDay - prevDay) / prevDay) * 100;
          setChartPercent(percentChange);
        } else {
          setChartPercent(0); // If there's not enough data to compare, set percent change to 0
        }
      })
      .catch((error) => {
        toast.error(`Error fetching data: ${error.message}`);
      });
  }, [config]);

  return (
    <div className="flex-1 dark:text-white">
      <ApexChart
        chartCount={chartCount}
        chartPercent={chartPercent}
        chartLabel={"Inventory Count"}
        chartOptions={chartOptions}
        chartSeries={chartSeries}
        chartType="line"
      />
    </div>
  );
};

export default LineChart;
