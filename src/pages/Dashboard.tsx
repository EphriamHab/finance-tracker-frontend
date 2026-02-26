/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useGetSummaryQuery, useGetTransactionsQuery } from "../app/api";
import { useGetCurrentUserQuery } from "../app/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import SummaryCards from "../components/SummaryCards";

export default function DashboardPage() {
  const {
    data: summary,
    isLoading: summaryLoading,
  } = useGetSummaryQuery({});
  const { data: user } = useGetCurrentUserQuery({});

  const username = user?.username || "User";
  const {
    data: recent,
    isLoading: transactionsLoading,
  } = useGetTransactionsQuery({ limit: 5 });

  const loading = summaryLoading || transactionsLoading;

  const chartData = useMemo(() => {
    if (!summary?.byCategory) return [];

    return summary.byCategory.map((item: any) => ({
      name: item.category,
      amount: item._sum?.amount || 0,
    }));
  }, [summary]);


  const handleExport = () => {
    if (!recent?.data?.length) return;

    const headers = ["Category", "Type", "Amount", "Date", "Description"];

    const rows = recent.data.map((item: any) => [
      item.category,
      item.type,
      item.amount,
      new Date(item.date).toLocaleDateString(),
      item.description || "",
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "transactions-report.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-w-0 space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold">
          Welcome Back {username.split(" ")[0]}!
        </h1>

        <button
          onClick={handleExport}
          disabled={!recent?.data?.length}
          className="w-fit bg-indigo-600 cursor-pointer text-white px-5 py-2.5 rounded-xl font-medium shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50"        >
          Export Report
        </button>
      </div>

      {loading && (
        <div className=" p-10 rounded-3xl flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
          <p className="text-slate-400 font-medium">
            Loading dashboard data...
          </p>
        </div>
      )}
      {!loading && (
        <>
          <SummaryCards data={summary} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <h3 className="font-bold text-lg mb-6">Cash Flow</h3>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fill="#6366f1"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Recent Activity</h3>
              </div>

              <div className="space-y-6">
                {recent?.data?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-xs shrink-0">
                        {item.category?.substring(0, 2).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="font-bold text-sm truncate">
                          {item.category}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`font-bold text-sm whitespace-nowrap ${item.type === "expense"
                        ? "text-red-600"
                        : "text-emerald-500"
                        }`}
                    >
                      {item.type === "expense" ? "-" : "+"}ETB
                      {item.amount?.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}