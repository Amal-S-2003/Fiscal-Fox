import React, { useState, useContext } from "react";
import { TransactionContext } from "../contextAPI/TransactionContext";
import {
  FaArrowLeft,
  FaArrowRight,
  FaWallet,
  FaMoneyBillWave,
  FaChartPie,
  FaBalanceScale,
  FaPiggyBank,
  FaInfoCircle,
} from "react-icons/fa";

import Chart from "react-apexcharts";

const Dashboard = () => {
  const { transactions } = useContext(TransactionContext);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const incomeTransactions = filteredTransactions.filter(
    (t) => t.type === "Income"
  );
  const expenseTransactions = filteredTransactions.filter(
    (t) => t.type === "Expense"
  );

  const income = incomeTransactions.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );
  const expense = expenseTransactions.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );
  const balance = income - expense;

  // Filter all transactions for the current year
  const yearlyIncomeTransactions = transactions.filter(
    (t) => t.type === "Income" && new Date(t.date).getFullYear() === currentYear
  );

  const yearlyExpenseTransactions = transactions.filter(
    (t) =>
      t.type === "Expense" && new Date(t.date).getFullYear() === currentYear
  );

  //  Sum yearly income and expense
  const totalIncomeThisYear = yearlyIncomeTransactions.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );

  const totalExpenseThisYear = yearlyExpenseTransactions.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );

  //  Calculate averages over 12 months
  const averageIncome = (totalIncomeThisYear / 12).toFixed(2);
  const averageExpense = (totalExpenseThisYear / 12).toFixed(2);

  const chartData = {
    series: [income, expense],
    options: {
      labels: ["Income", "Expense"],
      colors: ["rgba(214, 115, 208, 1)", "#1cd4bcff"], 
      legend: { position: "bottom" },
      chart: {
        type: "pie",
        toolbar: { show: false },
      },
    },
  };

  const groupByCategory = (list) =>
    Object.entries(
      list.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
      }, {})
    );

  const incomeByCategory = groupByCategory(incomeTransactions);
  const expenseByCategory = groupByCategory(expenseTransactions);
console.log(incomeByCategory,"incomeByCategory");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevMonth}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={handleNextMonth}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaArrowRight />
          </button>
        </div>

        {income + expense === 0 ? (
          <p className="text-center text-gray-500 mt-20 text-lg font-medium">
            No transactions available for this month.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tile 1: Summary Panel */}

            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                  <FaBalanceScale className="text-blue-500" />
                  Financial Summary
                </h3>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <FaInfoCircle />
                  Overview of your this month finances
                </span>
              </div>

              {/* Income */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-500 text-lg" />
                  Total Income
                </span>
                <span className="text-lg font-semibold text-green-600">
                  ₹{income}
                </span>
              </div>

              {/* Expense */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <FaWallet className="text-red-500 text-lg" />
                  Total Expense
                </span>
                <span className="text-lg font-semibold text-red-600">
                  ₹{expense}
                </span>
              </div>

              {/* Balance */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <FaPiggyBank className="text-blue-600 text-lg" />
                  Remaining Balance
                </span>
                <span className="text-lg font-semibold text-blue-700">
                  ₹{balance}
                </span>
              </div>

              {/* Averages */}
              <div className="text-sm text-gray-600 pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span>
                    Avg Income Per Month{" "}
                    <span className="text-xs text-gray-400">
                      (Total Income / 12 months)
                    </span>
                  </span>
                  <span className="font-medium text-gray-800">
                    ₹{averageIncome}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>
                    Avg Expense Per Month{" "}
                    <span className="text-xs text-gray-400">
                      (Total Expense / 12 months)
                    </span>
                  </span>
                  <span className="font-medium text-gray-800">
                    ₹{averageExpense}
                  </span>
                </div>
              </div>
            </div>

            {/* Tile 2: Pie Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-center text-blue-600 mb-4">
                <FaChartPie className="inline mr-2" />
                Income vs Expense
              </h3>
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                height={250}
              />
            </div>

            {/* Tile 3: Expense by Category */}
            <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
              <h3 className="text-center font-semibold text-blue-600 mb-2">
                Expense by Category
              </h3>
              <Chart
                type="bar"
                height={250}
                series={[
                  {
                    name: "Expense",
                    data: expenseByCategory.map(([_, val]) => val),
                  },
                ]}
                options={{
                  chart: { id: "expenses" },
                  xaxis: {
                    categories: expenseByCategory.map(([cat]) => cat),
                  },
                  colors: ["#0ea5e9"], // blue
                  dataLabels: { enabled: false },
                }}
              />
            </div>

            {/* Tile 4: Income by Category */}
            <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
              <h3 className="text-center font-semibold text-blue-600 mb-2">
                Income by Category
              </h3>
              <Chart
                type="bar"
                height={250}
                series={[
                  {
                    name: "Income",
                    data: incomeByCategory.map(([_, val]) => val),
                  },
                ]}
                options={{
                  chart: { id: "income" },
                  xaxis: {
                    categories: incomeByCategory.map(([cat]) => cat),
                  },
                  colors: ["#af14ecff"], 
                  dataLabels: { enabled: false },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
