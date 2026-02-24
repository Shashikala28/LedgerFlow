import React from "react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuUtensils,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";

  const amt = Number(amount);
  const formatted = Number.isFinite(amt) ? amt.toLocaleString() : amount;

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-sm font-semibold">
              {type === "income" ? "+" : "-"} {formatted}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
