import React from "react";
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg">All Expenses</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base mr-1" />
          Download
        </button>
      </div>

      {/* Expenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
