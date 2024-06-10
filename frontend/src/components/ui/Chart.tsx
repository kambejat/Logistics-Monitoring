import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartProps {
  chartOptions: any;
  chartSeries: any[];
  chartType: string;
  chartCount?: number;
  chartLabel?: string;
  chartPercent?: number;
  className?: string;
}

const ApexChart: React.FC<ApexChartProps> = ({
  chartOptions,
  chartSeries,
  chartType,
  chartCount,
  chartLabel,
  chartPercent,
  className,
}) => {
  const [options, setOptions] = useState(chartOptions);
  const [series, setSeries] = useState(chartSeries);

  useEffect(() => {
    setOptions(chartOptions);
  }, [chartOptions]);

  useEffect(() => {
    setSeries(chartSeries);
  }, [chartSeries]);

  const isPositive = chartPercent && chartPercent > 0;

  return (
    <div className={`max-w-screen-lg mt-4 flex-1 w-full bg-white rounded-lg shadow-lg dark:bg-gray-800 p-4 md:p-6 ${className}`}>
      <div className="flex justify-between">
        <div>
          {chartCount && (
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
              {chartCount}
            </h5>
          )}
          {chartLabel && (
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {chartLabel}
            </p>
          )}
        </div>
        {chartPercent !== undefined && (
          <div className={`flex items-center px-2.5 py-0.5 text-base font-semibold text-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {chartPercent.toFixed(2)}%
            <svg
              className="w-3 h-3 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isPositive ? "M5 13V1m0 0L1 5m4-4 4 4" : "M5 1v12m0 0L1 9m4 4 4-4"}
              />
            </svg>
          </div>
        )}
      </div>
      <ReactApexChart  options={options} series={series} type={chartType} />
    </div>
  );
};

export default ApexChart;
