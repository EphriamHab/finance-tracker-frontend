/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
} from "../app/api";
import { toast } from "react-toastify";

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

    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (initialData) {
            setForm({
                description: initialData.description,
                category: initialData.category,
                type: initialData.type,
                amount: initialData.amount.toString(),
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

        setErrors({});
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors: any = {};

        if (!form.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!form.category.trim()) {
            newErrors.category = "Category is required";
        }

        if (!form.amount || Number(form.amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (!form.date) {
            newErrors.date = "Date is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        const payload = {
            ...form,
            amount: Number(form.amount),
        };

        try {
            if (initialData) {
                await updateTransaction({
                    id: initialData.id,
                    ...payload,
                }).unwrap();

                toast.success("Transaction updated successfully");
            } else {
                await createTransaction(payload).unwrap();

                toast.success("Transaction created successfully");
            }

            onClose();
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
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
                        <div>
                            <input
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Description"
                                className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-100"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                value={form.category}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        category: e.target.value,
                                    })
                                }
                                placeholder="Category"
                                className="w-full px-4 py-3 bg-slate-50 rounded-xl"
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm">
                                    {errors.category}
                                </p>
                            )}
                        </div>
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

                            <div>
                                <input
                                    type="number"
                                    value={form.amount}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            amount: e.target.value,
                                        })
                                    }
                                    placeholder="Amount"
                                    className="px-4 py-3 bg-slate-50 rounded-xl w-full"
                                />
                                {errors.amount && (
                                    <p className="text-red-500 text-sm">
                                        {errors.amount}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-slate-50 rounded-xl"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm">
                                    {errors.date}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {isCreating || isUpdating
                                ? "Saving..."
                                : initialData
                                    ? "Save Changes"
                                    : "Create Transaction"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}