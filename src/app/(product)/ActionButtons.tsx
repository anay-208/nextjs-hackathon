"use client";

import { Button } from "@/components/ui/button";
import {
  createCategory,
  createTransaction,
  getCategories,
  getRecentSimilarTransactions,
  getTransactionsByTimeRange,
  setBudget,
} from "../api/finance/actions";

export default function ActionButton() {
  const categoryId = "cat_01JRJ3DV9B71DTZ747E7697C9S";

  const handleCreateTransaction = async () => {
    const response = await createTransaction({
      label: "Something cool",
      amount: 100,
      type: "income",
      category_id: categoryId,
    });
    console.log("Transaction Created:", response);
  };

  const handleCreateCategory = async () => {
    const response = await createCategory({
      label: "Test Category",
      budget: 500,
    });
    console.log("Category Created:", response);
  };

  const handleSetBudget = async () => {
    const response = await setBudget({
      categoryId: categoryId,
      budget: 1000,
    });
    console.log("Budget Set:", response);
  };

  const handleGetTransactions = async () => {
    const response = await getTransactionsByTimeRange(
      { startDate: "2023-01-01", endDate: "2026-12-31" },
      { type: "income" },
    );
    console.log("Transactions:", response);
  };

  const handleGetCategories = async () => {
    const response = await getCategories();
    console.log("Categories:", response);
  };

  const handleGetSimilarTransactions = async () => {
    const response = await getRecentSimilarTransactions({
      amount: 95,
      days: 30,
    });
    console.log("Similar Transactions:", response);
  };

  return (
    <div>
      <Button onClick={handleCreateTransaction}>Create Transaction</Button>
      <Button onClick={handleCreateCategory}>Create Category</Button>
      <Button onClick={handleSetBudget}>Set Budget</Button>
      <Button onClick={handleGetTransactions}>Get Transactions</Button>
      <Button onClick={handleGetCategories}>Get Categories</Button>
      <Button onClick={handleGetSimilarTransactions}>
        Get Similar Transactions
      </Button>
    </div>
  );
}
