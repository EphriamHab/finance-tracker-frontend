/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function SummaryCards({ data }: any) {
  const cards = [
    {
      title: "Total Income",
      value: data?.totalIncome,
      icon: <TrendingUp size={24} />,
      gradient:
        "bg-gradient-to-br from-emerald-500 to-emerald-700",
    },
    {
      title: "Total Expense",
      value: data?.totalExpenses,
      icon: <TrendingDown size={24} />,
      gradient:
        "bg-gradient-to-br from-red-500 to-red-700",
    },
    {
      title: "Balance",
      value: data?.balance,
      icon: <Wallet size={24} />,
      gradient:
        "bg-gradient-to-br from-indigo-500 to-indigo-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.gradient} text-white p-6 rounded-3xl shadow-xl 
          hover:scale-105 transition-transform duration-300`}
        >
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium opacity-90">
              {card.title}
            </p>

            <div className="bg-white/20 p-2 rounded-xl">
              {card.icon}
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-4">
            ETB{" "}
            {Number(card.value || 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
      ))}
    </div>
  );
}