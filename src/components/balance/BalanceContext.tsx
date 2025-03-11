import { createContext, useState, useEffect, ReactNode } from "react";
import apiService from "../Api/apiService";

// Define the type for the balance object
interface Balance {
  id: number;
  amount: string; // String to match API response
  user?: number;
  currency?: string; // Optional, as it may not always be present
  [key: string]: any; // For additional properties
}

// Define the type for transaction/activity
export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  method?: string;
  cryptoType?: string;
  status: "processing" | "confirmed" | "completed";
  timestamp: Date;
}

// Define the type for the context value
interface BalanceContextType {
  balances: Balance[];
  balance: Balance | null;
  transactions: Transaction[];
  updateBalances: (newBalances: Balance[]) => void;
  refreshBalances: () => Promise<void>;
  createDeposit: (amount: number, method: string, cryptoType?: string) => Promise<any>;
  getRecentTransactions: () => Transaction[];
  isLoading: boolean;
  error: string | null;
}

// Create the context with a default value
export const BalanceContext = createContext<BalanceContextType>({
  balances: [],
  balance: null,
  transactions: [],
  updateBalances: () => {},
  refreshBalances: async () => {},
  createDeposit: async () => {},
  getRecentTransactions: () => [],
  isLoading: false,
  error: null,
});

// Define the type for the provider props
interface BalanceProviderProps {
  children: ReactNode;
}

// Create the provider component
export const BalanceProvider = ({ children }: BalanceProviderProps) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load transactions from localStorage on initialization
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions);
        // Convert string timestamps back to Date objects
        const formattedTransactions = parsedTransactions.map((tx: any) => ({
          ...tx,
          timestamp: new Date(tx.timestamp)
        }));
        setTransactions(formattedTransactions);
      } catch (err) {
        console.error("Failed to parse saved transactions:", err);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Function to update balances manually
  const updateBalances = (newBalances: Balance[]) => {
    setBalances(newBalances);
    if (newBalances.length > 0) {
      setBalance(newBalances[0]);
    }
  };

  // Function to refresh balances from the API
  const refreshBalances = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiService.getBalances();
      console.log("Balances from API:", data);

      // Ensure we have an array of balances with currency
      const processedBalances = Array.isArray(data) ? data : [data];

      // Add default currency if not present
      const balancesWithCurrency = processedBalances.map((balance) => ({
        ...balance,
        currency: balance.currency || "USD",
      }));

      setBalances(balancesWithCurrency);

      // Set the first balance as the current balance
      if (balancesWithCurrency.length > 0) {
        setBalance(balancesWithCurrency[0]);
      }
    } catch (err) {
      console.error("Failed to fetch balances:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Could not load account balances. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a deposit and update balances
  const createDeposit = async (amount: number, method: string, cryptoType?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create the deposit
      const depositResponse = await apiService.createDeposit(amount);

      // Generate a unique ID for this deposit
      const depositId = Math.random().toString(36).substring(2, 10).toUpperCase();

      // Create a new transaction record
      const newTransaction: Transaction = {
        id: depositId,
        type: "deposit",
        amount: amount,
        method: method,
        cryptoType: cryptoType,
        status: "processing",
        timestamp: new Date()
      };

      // Add to transactions list
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);

      // Refresh balances to get the updated balance
      await refreshBalances();

      // Return both the API response and the new transaction
      return { depositResponse, transaction: newTransaction };
    } catch (err) {
      console.error("Failed to create deposit:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Could not create deposit. Please try again later."
      );
      throw err; // Re-throw the error for handling in the component
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get recent transactions
  const getRecentTransactions = () => {
    // Filter out expired transactions (older than 6 hours)
    const validTransactions = transactions.filter(transaction => {
      const transactionTime = transaction.timestamp.getTime();
      const currentTime = new Date().getTime();
      return currentTime - transactionTime < 6 * 60 * 60 * 1000; // 6 hours
    });

    // Return sorted by timestamp (newest first)
    return validTransactions.sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
  };

  // Fetch balances on initial load
  useEffect(() => {
    refreshBalances();
  }, []);

  // Value to be provided by the context
  const value: BalanceContextType = {
    balances,
    balance,
    transactions,
    updateBalances,
    refreshBalances,
    createDeposit,
    getRecentTransactions,
    isLoading,
    error,
  };

  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
};

export default BalanceProvider;