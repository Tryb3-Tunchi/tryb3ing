import  { useState } from "react";
import {
  Search,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  
} from "lucide-react";
import { Card, CardContent } from "../../components/Card";
import { Input } from "../../components/Card";
// import { Button } from "../../components/Card";

interface Transaction {
  id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  accountType: string;
  status: "active" | "inactive";
  lastTransaction: string;
}

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Josh Leon",
      email: "new4mails@exdonuts.com",
      balance: 25000,
      accountType: "Investment",
      status: "active",
      lastTransaction: "2024-01-02",
    },
    {
      id: "2",
      name: "micheal phil",
      email: "perrycarter@exdonuts.com",
      balance: 10000,
      accountType: "Investment",
      status: "inactive",
      lastTransaction: "2024-01-02",
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleTransaction = (type: "credit" | "debit") => {
    if (!selectedUser || !amount || !description) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;

    const currentDate = new Date().toISOString();
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: selectedUser.id,
      type,
      amount: numAmount,
      description,
      date: currentDate.split("T")[0],
      status: "completed",
    };

    // Update transactions
    setTransactions((prev) => [newTransaction, ...prev]);

    // Update user balance
    setUsers(
      users.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            balance:
              type === "credit"
                ? user.balance + numAmount
                : user.balance - numAmount,
            lastTransaction: currentDate.split("T")[0],
          };
        }
        return user;
      })
    );

    // Reset form
    setAmount("");
    setDescription("");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userTransactions = transactions.filter(
    (t) => selectedUser && t.userId === selectedUser.id
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      {/* Previous dashboard code remains the same until the user details section */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">
          Admin Dashboard
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Users
                  </p>
                  <h3 className="text-2xl font-bold mt-1 dark:text-white">
                    {users.length}
                  </h3>
                </div>
                <Users className="text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active Accounts
                  </p>
                  <h3 className="text-2xl font-bold mt-1 dark:text-white">
                    {users.filter((u) => u.status === "active").length}
                  </h3>
                </div>
                <ArrowUpRight className="text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Balance
                  </p>
                  <h3 className="text-2xl font-bold mt-1 dark:text-white">
                    $
                    {users
                      .reduce((acc, user) => acc + user.balance, 0)
                      .toLocaleString()}
                  </h3>
                </div>
                <DollarSign className="text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User list section remains the same */}

          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      className="pl-10"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedUser?.id === user.id
                          ? "bg-blue-50 dark:bg-blue-900"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <p className="font-medium dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      className="pl-10"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedUser?.id === user.id
                          ? "bg-blue-50 dark:bg-blue-900"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <p className="font-medium dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Updated User Details and Transaction Management */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                {selectedUser ? (
                  <div>
                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                      Account Management
                    </h2>

                    {/* User Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Name
                        </p>
                        <p className="font-medium dark:text-white">
                          {selectedUser.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email
                        </p>
                        <p className="font-medium dark:text-white">
                          {selectedUser.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Current Balance
                        </p>
                        <p className="font-medium dark:text-white">
                          ${selectedUser.balance.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last Transaction
                        </p>
                        <p className="font-medium dark:text-white">
                          {selectedUser.lastTransaction}
                        </p>
                      </div>
                    </div>

                    {/* Transaction Form */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-white">
                          Amount
                        </label>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-white">
                          Description
                        </label>
                        <Input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter transaction description"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleTransaction("credit")}
                          className="flex items-center space-x-2"
                        >
                          <ArrowUpRight size={20} />
                          <span>Credit</span>
                        </button>
                        <button
                          onClick={() => handleTransaction("debit")}
                          className="flex items-center space-x-2"
                        >
                          <ArrowDownRight size={20} />
                          <span>Debit</span>
                        </button>
                      </div>
                    </div>

                    {/* Transaction History */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        Transaction History
                      </h3>
                      <div className="space-y-3">
                        {userTransactions.length > 0 ? (
                          userTransactions.map((transaction) => (
                            <div
                              key={transaction.id}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                {transaction.type === "credit" ? (
                                  <ArrowUpRight className="text-green-500" />
                                ) : (
                                  <ArrowDownRight className="text-red-500" />
                                )}
                                <div>
                                  <p className="font-medium dark:text-white">
                                    ${transaction.amount.toLocaleString()}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {transaction.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {transaction.date}
                                </p>
                                <p
                                  className={`text-sm ${
                                    transaction.status === "completed"
                                      ? "text-green-500"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  {transaction.status}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                            No transactions found
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                    Select a user to manage their account
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
