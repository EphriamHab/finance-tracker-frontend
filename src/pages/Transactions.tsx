/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
} from "../app/api";
import { Trash2, Edit3, Plus, ChevronLeft, ChevronRight, Loader2, Edit } from "lucide-react";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });
  const [deleteTransaction] = useDeleteTransactionMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; category: string } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleEdit = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (transaction: any) => {
    setDeleteConfirm({ id: transaction.id, category: transaction.category });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    setDeletingId(deleteConfirm.id);
    try {
      await deleteTransaction(deleteConfirm.id).unwrap();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    } finally {
      setDeletingId(null);
      setDeleteConfirm(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
          <p className="text-sm text-slate-400 font-medium">
            Review and manage your financial history
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-indigo-600 cursor-pointer text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all w-fit justify-center"
        >
          <Plus size={18} /> Add Transaction
        </button>

      </div>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 sm:items-end">

        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-400 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
            setPage(1);
          }}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-all"
        >
          Clear
        </button>

      </div>
      <div className="block md:hidden space-y-3">
        {data?.data?.map((t: any) => (
          <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-slate-50 p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  {t.category.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className="font-bold text-slate-700 block">{t.category}</span>
                  <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-black uppercase mt-1 ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                    {t.type}
                  </span>
                </div>
              </div>
              <div className={`font-black text-sm ${t.type === 'income' ? 'text-emerald-500' : 'text-slate-700'
                }`}>
                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleEdit(t)}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                title="Edit"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => handleDeleteClick(t)}
                disabled={deletingId === t.id}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all disabled:opacity-50"
                title="Delete"
              >
                {deletingId === t.id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block bg-white rounded-4xl shadow-sm border border-slate-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data?.data?.map((t: any) => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {t.description.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-700">{t.description}</span>
                  </div>
                </td>
                    <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {t.category.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-700">{t.category}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                    {t.type}
                  </span>
                </td>
                <td className={`px-8 py-5 text-right font-black text-sm ${t.type === 'income' ? 'text-emerald-500' : 'text-slate-700'
                  }`}>
                  {t.type === 'income' ? '+' : '-'}ETB {t.amount.toLocaleString()}
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(t)}
                      className="p-2 text-slate-400 cursor-pointer hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(t)}
                      disabled={deletingId === t.id}
                      className="p-2 text-slate-400 cursor-pointer hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === t.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-400">
            Showing Page <span className="text-indigo-600">{data?.page || 1}</span> of {data?.totalPages || 1}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={page === (data?.totalPages || 1)}
              onClick={() => setPage(p => p + 1)}
              className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Confirm Deletion</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete the transaction for{' '}
              <span className="font-semibold">{deleteConfirm.category}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-sm cursor-pointer font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                disabled={deletingId === deleteConfirm.id}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletingId === deleteConfirm.id}
                className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {deletingId === deleteConfirm.id ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={selectedTransaction}
        />
      )}
    </div>
  );
}