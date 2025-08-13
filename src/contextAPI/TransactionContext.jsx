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


  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
