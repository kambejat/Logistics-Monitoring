import React from "react";

interface CardProps {
  title: string;
  value: string | number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="inline-block align-bottom dark:bg-gray-900 bg-white rounded-lg text-left overflow-hidden shadow-lg transform transition-all mb-2 w-full sm:w-1/3">
      <div className="bg-white dark:bg-gray-800 p-3">
        <div className="sm:flex sm:items-start">
          <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
            <h3 className="text-sm leading-6 font-medium text-blue-400 dark:text-white">{title}</h3>
            <p className="text-3xl font-bold text-blue dark:text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
