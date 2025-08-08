import { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../contextAPI/TransactionContext";
import {
  FaFilter,
  FaTags,
  FaSortAmountDown,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const TransactionsHistoryPage = () => {
  const { transactions, updateTransaction, deleteTransaction } =
    useContext(TransactionContext);

  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    sortBy: "",
    startDate: "",
    endDate: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    type: "",
    category: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    let temp = [...transactions];

    if (filters.type) temp = temp.filter((tx) => tx.type === filters.type);
    if (filters.category)
      temp = temp.filter((tx) => tx.category === filters.category);
    if (filters.startDate)
      temp = temp.filter(
        (tx) => new Date(tx.date) >= new Date(filters.startDate)
      );
    if (filters.endDate)
      temp = temp.filter(
        (tx) => new Date(tx.date) <= new Date(filters.endDate)
      );

    switch (filters.sortBy) {
      case "amount-asc":
        temp.sort((a, b) => a.amount - b.amount);
        break;
      case "amount-desc":
        temp.sort((a, b) => b.amount - a.amount);
        break;
      case "date-asc":
        temp.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        temp.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    setFiltered(temp);
  }, [filters, transactions]);

  const handleEdit = (tx) => {
    setEditingId(tx.id);
    setEditData({ ...tx });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const result = updateTransaction(editingId, {
      ...editData,
      amount: parseFloat(editData.amount),
    });
    if (result) {
      toast.success("Transaction updated successfully!");
    } else {
      toast.error("Failed to update transaction. Please try again.");
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => setEditingId(null);

  const allCategories = [...new Set(transactions.map((tx) => tx.category))];
  const incomeCategories = [
    "Salary",
    "Freelance",
    "Bonus",
    "Investment",
    "Gifts",
    "Rental Income",
    "Misc",
  ];
  const expenseCategories = [
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Health",
    "Travel",
    "Education",
    "Rent",
    "Shopping",
    "Misc",
  ];

  const categoryOptions =
    editData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 ">
      <div className="flex gap-5 flex-col md:flex-row">
        {/* Left Side Filters */}
        <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <FaFilter /> Filters
          </h3>

          <div className="space-y-4">
            {/* Type */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1  ">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full bg-white p-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1   flex items-center gap-1">
                <FaTags /> Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full bg-white p-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Categories</option>
                {allCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1   flex items-center gap-1">
                <FaSortAmountDown /> Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                }
                className="w-full bg-white p-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">None</option>
                <option value="amount-asc">Amount (Low to High)</option>
                <option value="amount-desc">Amount (High to Low)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="date-desc">Date (Newest First)</option>
              </select>
            </div>

            {/* Date Filters */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1   flex items-center gap-1">
                <FaCalendarAlt /> Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, startDate: e.target.value }))
                }
                className="w-full p-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1   flex items-center gap-1">
                <FaCalendarAlt /> End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full p-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Reset Filters */}
            <button
              onClick={() =>
                setFilters({
                  type: "",
                  category: "",
                  sortBy: "",
                  startDate: "",
                  endDate: "",
                })
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Right Side Transactions */}

        <div className="w-full md:w-2/3 bg-white  shadow-lg rounded-lg max-h-[80vh] overflow-y-auto ">
          <h2 className="text-2xl font-bold  text-center text-gray-700 sticky py-3 bg-gray-200 top-0  z-10">
            Transaction History
          </h2>

          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No transactions found.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200 px-5">
              {filtered.map((tx) => (
                <li key={tx.id} className="py-4">
                  {editingId === tx.id ? (
                    <form
                      onSubmit={handleEditSubmit}
                      className="space-y-4 bg-gray-50 p-4 rounded-md"
                    >
                      <div className="flex flex-wrap gap-3">
                        <input
                          type="number"
                          name="amount"
                          value={editData.amount}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-2 rounded-md w-full sm:w-[120px]"
                          placeholder="Amount"
                          required
                        />
                        <select
                          name="type"
                          value={editData.type}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-2 rounded-md w-full sm:w-[120px]"
                        >
                          <option value="Income">Income</option>
                          <option value="Expense">Expense</option>
                        </select>
                        <select
                          name="category"
                          value={editData.category}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-2 rounded-md w-full sm:w-[140px]"
                          required
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categoryOptions.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>

                        <input
                          type="date"
                          name="date"
                          value={editData.date}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-2 rounded-md w-full sm:w-[140px]"
                          required
                        />
                        <input
                          type="text"
                          name="description"
                          value={editData.description}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-2 rounded-md w-full"
                          placeholder="Description"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-semibold text-gray-800">
                          {tx.type} - ₹{tx.amount}
                        </p>
                        <p className="text-sm text-gray-600">
                          {tx.category} | {tx.date}
                        </p>
                        {tx.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            "{tx.description}"
                          </p>
                        )}
                      </div>
                      <div className="flex gap-4 mt-2 sm:mt-0 text-xl text-gray-600">
                        <button
                          onClick={() => handleEdit(tx)}
                          className="hover:text-blue-600 transition-colors duration-200"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="hover:text-red-600 transition-colors duration-200"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default TransactionsHistoryPage;
