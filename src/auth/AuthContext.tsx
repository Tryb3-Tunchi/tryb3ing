import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  sign: () => void;
  logout: () => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Initialize state from localStorage on mount
    const token = localStorage.getItem("token");
    return token ? true : false; // Check for token in localStorage
  });

  // Check token on mount and refresh
  useEffect(() => {
    // Check token on mount
    const token = localStorage.getItem("token");

    // If there's a valid token in localStorage, remain logged in
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const sign = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, sign, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
