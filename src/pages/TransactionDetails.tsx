import { useParams, useNavigate } from "react-router-dom";
import { useGetTransactionQuery } from "../app/api";
import { ArrowLeft, Loader2 } from "lucide-react";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: transaction, isLoading } = useGetTransactionQuery(id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="p-6 text-center text-slate-500">
        Transaction not found
      </div>
    );
  }

  const isIncome = transaction.type === "income";

  return (
    <div className=" mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {transaction.category}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {transaction.description}
            </p>
          </div>

          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
              isIncome
                ? "bg-emerald-100 text-emerald-600"
                : "bg-rose-100 text-rose-600"
            }`}
          >
            {transaction.type}
          </span>
        </div>

        <div className="mt-6">
          <p className="text-sm text-slate-400">Amount</p>
          <p
            className={`text-3xl font-bold mt-1 ${
              isIncome ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isIncome ? "+" : "-"} ETB{" "}
            {transaction.amount.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Transaction Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-400">Transaction ID</p>
            <p className="font-medium break-all">
              {transaction.id}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Date</p>
            <p className="font-medium">
              {new Date(transaction.date).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Created At</p>
            <p className="font-medium">
              {new Date(transaction.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-400">User ID</p>
            <p className="font-medium break-all">
              {transaction.userId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;