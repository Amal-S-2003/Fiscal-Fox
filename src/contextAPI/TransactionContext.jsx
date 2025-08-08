import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const TransactionContext = createContext();

const LOCAL_STORAGE_KEY = "user_transactions";

const getMonthYear = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
};

export const TransactionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load transactions from localStorage
  useEffect(() => {
    if (!user?.id) return;

    const storedData =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    const userTransactions = storedData[user.id] || [];
    setTransactions(userTransactions);
    setHasLoaded(true); // mark as loaded
  }, [user]);

  // Save to localStorage only after initial load
  useEffect(() => {
    if (!user?.id || !hasLoaded) return;

    const allData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    allData[user.id] = transactions;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allData));
  }, [transactions, user, hasLoaded]); // include hasLoaded

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: Date.now(), userId: user.id },
    ]);
  };

  // Edit an existing transaction
  const updateTransaction = (id, updatedData) => {
    try {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === id ? { ...tx, ...updatedData } : tx))
      );
      return true;
    } catch (error) {
      console.error("Error updating transaction:", error);
      return false;
    }
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    toast.success("Transaction deleted successfully!");
  };

  // Filtering
  const filterByType = (type) => transactions.filter((tx) => tx.type === type);
  const filterByCategory = (category) =>
    transactions.filter((tx) => tx.category === category);
  const filterByDateRange = (startDate, endDate) =>
    transactions.filter((tx) => {
      const d = new Date(tx.date);
      return d >= new Date(startDate) && d <= new Date(endDate);
    });

  // Sorting
  const sortByAmount = (asc = true) =>
    [...transactions].sort((a, b) =>
      asc ? a.amount - b.amount : b.amount - a.amount
    );
  const sortByDate = (asc = true) =>
    [...transactions].sort((a, b) =>
      asc
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  // Dashboard summaries
  const totalIncome = filterByType("Income").reduce(
    (sum, tx) => sum + tx.amount,
    0
  );
  const totalExpense = filterByType("Expense").reduce(
    (sum, tx) => sum + tx.amount,
    0
  );
  const currentBalance = totalIncome - totalExpense;

  // Monthly average calculations
  const monthMap = {};
  transactions.forEach((tx) => {
    const key = getMonthYear(tx.date);
    if (!monthMap[key]) monthMap[key] = [];
    monthMap[key].push(tx);
  });

  const incomeMonths = Object.values(monthMap).map((group) =>
    group
      .filter((tx) => tx.type === "Income")
      .reduce((sum, tx) => sum + tx.amount, 0)
  );
  const expenseMonths = Object.values(monthMap).map((group) =>
    group
      .filter((tx) => tx.type === "Expense")
      .reduce((sum, tx) => sum + tx.amount, 0)
  );

  const averageIncome = incomeMonths.length
    ? incomeMonths.reduce((a, b) => a + b, 0) / incomeMonths.length
    : 0;
  const averageExpense = expenseMonths.length
    ? expenseMonths.reduce((a, b) => a + b, 0) / expenseMonths.length
    : 0;

  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filterByType,
    filterByCategory,
    filterByDateRange,
    sortByAmount,
    sortByDate,
    totalIncome,
    totalExpense,
    currentBalance,
    averageIncome,
    averageExpense,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
