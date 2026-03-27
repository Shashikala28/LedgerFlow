import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const COLORS = ["#9cc844ff", "#FA2C37", "#3ac04eff"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Balance", amount: totalBalance },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
