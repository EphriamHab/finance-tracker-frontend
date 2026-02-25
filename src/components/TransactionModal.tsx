/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
} from "../app/api";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

export default function TransactionModal({
    isOpen,
    onClose,
    initialData,
}: Props) {
    const [createTransaction, { isLoading: isCreating }] =
        useCreateTransactionMutation();
    const [updateTransaction, { isLoading: isUpdating }] =
        useUpdateTransactionMutation();

    const [form, setForm] = useState({
        description: "",
        category: "",
        type: "expense",
        amount: "",
        date: new Date().toISOString().split("T")[0],
    });
    useEffect(() => {
        if (initialData) {
            setForm({
                description: initialData.description,
                category: initialData.category,
                type: initialData.type,
                amount: initialData.amount,
                date: new Date(initialData.date).toISOString().split("T")[0],
            });
        } else {
            setForm({
                description: "",
                category: "",
                type: "expense",
                amount: "",
                date: new Date().toISOString().split("T")[0],
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            amount: Number(form.amount),
        };

        if (initialData) {
            await updateTransaction({ id: initialData.id, ...payload });
        } else {
            await createTransaction(payload);
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in duration-200">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold">
                            {initialData ? "Edit Transaction" : "New Transaction"}
                        </h2>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-slate-100 transition"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                            placeholder="Description"
                            className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-100"
                        />
                        <input
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                            placeholder="Category"
                            className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-100"
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <select
                                value={form.type}
                                onChange={(e) =>
                                    setForm({ ...form, type: e.target.value })
                                }
                                className="px-4 py-3 bg-slate-50 rounded-xl"
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>

                            <input
                                type="number"
                                value={form.amount}
                                onChange={(e) =>
                                    setForm({ ...form, amount: e.target.value })
                                }
                                placeholder="Amount"
                                className="px-4 py-3 bg-slate-50 rounded-xl"
                                required
                            />
                        </div>

                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                                setForm({ ...form, date: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-slate-50 rounded-xl"
                            required
                        />

                        <button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {initialData ? "Save Changes" : "Create Transaction"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}