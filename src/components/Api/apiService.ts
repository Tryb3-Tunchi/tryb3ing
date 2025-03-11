// apiService.ts

// Define types for API responses and requests
interface AuthTokens {
  access_token: string;
  refresh_token: string;
  method: string;
}

interface UserData {
  email: string;
  password: string;
  [key: string]: any; // For additional user data
}

interface Balance {
  id: number;
  amount: string; // String since API returns decimal as string
  user?: number;
  currency?: string; // Optional, we'll add this client-side
  [key: string]: any;
}

interface BalanceResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Balance[];
  id?: number;
  amount?: string;
  user?: number;
}

interface Deposit {
  id?: number;
  amount: string;
  status?: string;
  timestamp?: string;
  user?: number;
  [key: string]: any;
}

interface DepositsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Deposit[];
}

interface Withdrawal {
  id?: number;
  amount: string;
  status?: string;
  timestamp?: string;
  user?: number;
  [key: string]: any;
}

interface WithdrawalsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Withdrawal[];
}

interface WithdrawalRequestData {
  amount: string;
  method: string | undefined;
  status: string;
  destination_address?: string;
  account_number?: string;
  routing_number?: string;
}

interface ApiError {
  message: string;
  [key: string]: any;
}

class ApiService {
  private readonly API_URL: string = "https://brokerapp.pythonanywhere.com";
  private token: string | null;
  private refreshToken: string | null;

  constructor() {
    this.token = localStorage.getItem("token") || null;
    this.refreshToken = localStorage.getItem("refreshToken") || null;
  }

  // Helper method to get headers with authentication
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `JWT ${this.token}`;
    }

    return headers;
  }

  // Helper method to handle responses
  private async handleResponse<T>(
    response: Response,
    requestInit: RequestInit,
    retryCount: number = 0 // Track retry attempts
  ): Promise<T> {
    if (!response.ok) {
      if (response.status === 401 && retryCount < 1) {
        console.log("Attempting to refresh token...");
        const refreshed = await this.refreshAuthToken();
        if (refreshed) {
          console.log("Token refreshed. Retrying request...");
          // Retry the original request with the new token
          const retryResponse = await fetch(response.url, {
            ...requestInit,
            headers: this.getHeaders(),
          });

          return this.handleResponse<T>(
            retryResponse,
            requestInit,
            retryCount + 1
          );
        } else {
          console.log("Token refresh failed. Logging out...");
          this.logout();
          throw new Error("Loading...reload or log in.");
        }
      }

      let errorMessage = "API request failed";
      try {
        const error = (await response.json()) as ApiError;
        errorMessage = error.message || errorMessage;
      } catch (e) {
        // If response can't be parsed as JSON
      }
      throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
  }

  // Helper method for making fetch requests
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.API_URL}${endpoint}`;
    const headers = this.getHeaders();

    // Remove body for GET/HEAD requests
    if (options.method === "GET" || options.method === "HEAD") {
      delete options.body;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return this.handleResponse<T>(response, options, 0); // Start with retryCount = 0
  }

  // Logout method
  public async logout(): Promise<any> {
    try {
      const result = await fetch(`${this.API_URL}/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${this.token}`, // Explicitly add token
        },
        body: JSON.stringify({
          refresh_token: this.refreshToken, // Include refresh token
        }),
      });

      // If the request is successful or results in a 401 (token invalid)
      // We consider this a successful logout
      if (result.ok || result.status === 401) {
        // Clear tokens and local storage
        this.token = null;
        this.refreshToken = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        return { success: true };
      } else {
        // For other error statuses
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);

      // Always clear tokens, even if logout request fails
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      throw error;
    }
  }

  // Refresh auth token
  public async refreshAuthToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${this.API_URL}/auth/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: this.refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = (await response.json()) as AuthTokens;
      this.token = data.access_token;
      localStorage.setItem("token", data.access_token);

      return true;
    } catch (error) {
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return false;
    }
  }

  // Authentication Methods
  public async signup(userData: UserData): Promise<any> {
    return this.fetch<any>("/auth/signup/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  public async resendOtp(email: string): Promise<any> {
    return this.fetch<any>("/auth/signup/resend-otp/", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  public async verifyOtp(email: string, otp: string): Promise<any> {
    return this.fetch<any>("/auth/signup/verify-otp/", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }

  public async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthTokens> {
    const response = await this.fetch<AuthTokens>("/auth/login/", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.access_token && response.refresh_token) {
      this.token = response.access_token;
      this.refreshToken = response.refresh_token;
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);
    }

    return response;
  }

  // Password Change Methods
  public async requestPasswordChange(email: string): Promise<any> {
    return this.fetch<any>("/auth/password-change/request-password-change/", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  public async resendPasswordChangeOtp(email: string): Promise<any> {
    return this.fetch<any>("/auth/password-change/resend-otp/", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  public async verifyPasswordChange(email: string, otp: string): Promise<any> {
    return this.fetch<any>("/auth/password-change/verify-password-change/", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }

  // Forgot Password Methods
  public async requestForgotPassword(email: string): Promise<any> {
    return this.fetch<any>("/auth/forgot-password/request-forgot-password/", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  public async resendForgotPasswordOtp(email: string): Promise<any> {
    return this.fetch<any>("/auth/forgot-password/resend-otp/", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  public async verifyForgotPasswordOtp(
    email: string,
    otp: string
  ): Promise<any> {
    return this.fetch<any>("/auth/forgot-password/verify-otp/", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }

  public async setNewPassword(
    email: string,
    newPassword: string
  ): Promise<any> {
    return this.fetch<any>("/auth/forgot-password/set-new-password/", {
      method: "POST",
      body: JSON.stringify({ email, new_password: newPassword }),
    });
  }

  // Balance Methods
  public async getBalances(): Promise<Balance[]> {
    try {
      const response = await this.fetch<BalanceResponse>("/api/balance/");

      // Handle both formats: single object or array in results
      if (response.results) {
        return response.results;
      } else if (response.id !== undefined && response.amount !== undefined) {
        // Format the single balance object to include currency
        const balance: Balance = {
          id: response.id,
          amount: response.amount,
          user: response.user,
          currency: "USD", // Default currency
        };
        return [balance];
      } else {
        // If we have a different format (e.g. a direct balance object)
        // that matches our Balance interface, return it as an array
        return [response as unknown as Balance];
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
      throw error;
    }
  }

  // Get current user balance - returns the first balance or null if none exists
  public async getCurrentBalance(): Promise<Balance | null> {
    try {
      const balances = await this.getBalances();
      if (balances && balances.length > 0) {
        return balances[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching current balance:", error);
      throw error;
    }
  }

  // Get current balance amount as number
  public async getCurrentBalanceAmount(): Promise<number> {
    const balance = await this.getCurrentBalance();
    if (balance && balance.amount) {
      return parseFloat(balance.amount);
    }
    return 0;
  }

  // Get specific balance by ID
  public async getBalance(id: number): Promise<Balance> {
    return this.fetch<Balance>(`/api/balance/${id}/`);
  }

  // Deposits Methods
  public async getDeposits(): Promise<Deposit[]> {
    const response = await this.fetch<DepositsResponse>("/api/deposits/");
    return response.results;
  }

  public async getDeposit(id: number): Promise<Deposit> {
    return this.fetch<Deposit>(`/api/deposits/${id}/`);
  }

  public async createDeposit(amount: number): Promise<Deposit> {
    return this.fetch<Deposit>("/api/deposits/", {
      method: "POST",
      body: JSON.stringify({ amount: amount.toString() }),
    });
  }

  public async updateDeposit(
    id: number,
    depositData: Partial<Deposit>
  ): Promise<Deposit> {
    return this.fetch<Deposit>(`/api/deposits/${id}/`, {
      method: "PUT",
      body: JSON.stringify(depositData),
    });
  }

  public async partialUpdateDeposit(
    id: number,
    depositData: Partial<Deposit>
  ): Promise<Deposit> {
    return this.fetch<Deposit>(`/api/deposits/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(depositData),
    });
  }

  public async deleteDeposit(id: number): Promise<void> {
    return this.fetch<void>(`/api/deposits/${id}/`, {
      method: "DELETE",
    });
  }

  // Withdrawals Methods
  public async getWithdrawals(): Promise<Withdrawal[]> {
    const response = await this.fetch<WithdrawalsResponse>("/api/withdrawals/");
    return response.results;
  }

  public async getWithdrawal(id: number): Promise<Withdrawal> {
    return this.fetch<Withdrawal>(`/api/withdrawals/${id}/`);
  }

  public async createWithdrawal(data: WithdrawalRequestData): Promise<any> {
    return this.fetch("/api/withdrawals/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async updateWithdrawal(
    id: number,
    withdrawalData: Partial<Withdrawal>
  ): Promise<Withdrawal> {
    return this.fetch<Withdrawal>(`/api/withdrawals/${id}/`, {
      method: "PUT",
      body: JSON.stringify(withdrawalData),
    });
  }

  public async partialUpdateWithdrawal(
    id: number,
    withdrawalData: Partial<Withdrawal>
  ): Promise<Withdrawal> {
    return this.fetch<Withdrawal>(`/api/withdrawals/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(withdrawalData),
    });
  }

  public async deleteWithdrawal(id: number): Promise<void> {
    return this.fetch<void>(`/api/withdrawals/${id}/`, {
      method: "DELETE",
    });
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService;
