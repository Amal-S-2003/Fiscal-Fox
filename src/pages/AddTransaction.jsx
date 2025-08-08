import { useState, useContext } from "react";
import { TransactionContext } from "../contextAPI/TransactionContext";
import { AuthContext } from "../contextAPI/AuthContext";
import {
  FaMoneyBillAlt,
  FaListUl,
  FaCalendarAlt,
  FaFileAlt,
  FaPlus,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const incomeCategories = ["Salary", "Freelance", "Bonus", "Investment", "Gifts", "Rental Income", "Misc"];
const expenseCategories = ["Food", "Transport", "Utilities", "Entertainment", "Health", "Travel", "Education", "Rent", "Shopping", "Misc"];

const AddTransaction = () => {
  const { addTransaction } = useContext(TransactionContext);
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    amount: "",
    type: "Income",
    category: "",
    date: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, type, category, date } = formData;

    if (!amount.trim() || !type || !category || !date) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    const transaction = {
      ...formData,
      amount: parseFloat(amount),
    };

    addTransaction(transaction);
    resetForm();
    toast.success("Transaction added successfully!");
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      type: "Income",
      category: "",
      date: "",
      description: "",
    });
    setError("");
  };

  const categories = formData.type === "Income" ? incomeCategories : expenseCategories;

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10">
        Please log in to manage your transactions.
      </p>
    );
  }

  return (
  <div
  className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 py-10 bg-gray-100 bg-cover bg-center"
>
  <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl md:text-3xl font-bold text-center  mb-6">
          Add New Transaction
        </h2>

        {error && (
          <p className="text-center text-red-600 mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Amount */}
            <div className="relative">
              <FaMoneyBillAlt className="absolute top-3 left-4 text-gray-400" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-700 rounded-full focus:outline-none border border-gray-200 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Type */}
            <div className="relative">
              <FaListUl className="absolute top-3 left-4 text-gray-400" />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-700 rounded-full focus:outline-none border border-gray-200 focus:ring-2 focus:ring-blue-300"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Date */}
            <div className="relative">
              <FaCalendarAlt className="absolute top-3 left-4 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-700 rounded-full focus:outline-none border border-gray-200 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <MdCategory className="absolute top-3 left-4 text-gray-400" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-700 rounded-full focus:outline-none border border-gray-200 focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <FaFileAlt className="absolute top-3 left-4 text-gray-400" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Notes (optional)"
              rows={3}
              className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-700 rounded-xl focus:outline-none border border-gray-200 focus:ring-2 focus:ring-blue-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition"
            >
              <FaPlus /> Add Transaction
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddTransaction;
