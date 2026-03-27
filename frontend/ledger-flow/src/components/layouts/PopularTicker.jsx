import React from "react";

export default function PopularTicker({ items }) {
  return (
    <div className="bg-white shadow-sm border-b py-3 px-4 overflow-x-auto">
      <div className="flex gap-6 min-w-max">
        {items.map((item) => {
          const isUp = item.change > 0;
          const isDown = item.change < 0;

          return (
            <div
              key={item.name}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <span className="text-gray-900">{item.name}</span>

              {/* Arrow */}
              <span
                className={`${
                  isUp
                    ? "text-green-600"
                    : isDown
                      ? "text-red-600"
                      : "text-gray-600"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "="}
              </span>

              {/* Percentage */}
              <span
                className={`${
                  isUp
                    ? "text-green-600"
                    : isDown
                      ? "text-red-600"
                      : "text-gray-600"
                }`}
              >
                {item.change > 0 ? "+" : ""}
                {item.change}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
