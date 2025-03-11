import React, { useState, useEffect, useRef } from "react";
import { X, AlertTriangle, Check, Info } from "lucide-react";

// Wallet icons
const WALLET_ICONS = {
  metamask: "/icons/metamask.svg",
  trustwallet: "/icons/trustwallet.svg",
  walletconnect: "/icons/walletconnect.svg",
  coinbase: "/icons/coinbase.svg",
  phantom: "/icons/phantom.svg",
};

interface WalletProviderProps {
  id: string;
  name: string;
  icon: string;
  disabled?: boolean;
  onConnect: () => Promise<void>;
}

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnected: (walletAddress: string, walletType: string) => void;
  isVerified: boolean;
}

// Simplified wallet provider component
const WalletProvider: React.FC<WalletProviderProps> = ({
  name,
  icon,
  disabled,
  onConnect,
}) => {
  return (
    <button
      onClick={onConnect}
      disabled={disabled}
      className={`w-full flex items-center p-3 border rounded-lg transition-colors mb-2 ${
        disabled
          ? "bg-gray-100 cursor-not-allowed opacity-60"
          : "hover:bg-gray-50"
      }`}
    >
      <img src={icon} alt={name} className="w-8 h-8 mr-3" />
      <div className="text-left">
        <h3 className="font-bold">{name}</h3>
        {disabled && (
          <p className="text-xs text-amber-600">Verification required</p>
        )}
      </div>
    </button>
  );
};

// Main wallet connect modal component
const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
  onWalletConnected,
  isVerified,
}) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset states when modal is opened
  useEffect(() => {
    if (isOpen) {
      setConnecting(null);
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Connect to real wallet (to be implemented)
  const connectToRealWallet = async (walletType: string): Promise<string> => {
    setConnecting(walletType);
    setError(null);
    if (!isVerified) {
      throw new Error("Verification required");
    }

    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw new Error("Wallet integration pending");
  };

  // Handle wallet connection
  const handleConnect = async (walletType: string) => {
    try {
      setConnecting(walletType);
      setError(null);

      if (!isVerified) {
        throw new Error("Complete verification first");
      }

      const walletAddress = await connectToRealWallet(walletType);
      setSuccess(true);
      setConnecting(null);
      onWalletConnected(walletAddress, walletType);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setConnecting(null);
      setError(err instanceof Error ? err.message : `Connection failed`);
    }
  };

  if (!isOpen) return null;

  const walletProviders = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: WALLET_ICONS.metamask,
      disabled: !isVerified,
      onConnect: () => handleConnect("metamask"),
    },
    {
      id: "trustwallet",
      name: "Trust Wallet",
      icon: WALLET_ICONS.trustwallet,
      disabled: !isVerified,
      onConnect: () => handleConnect("trustwallet"),
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: WALLET_ICONS.walletconnect,
      disabled: !isVerified,
      onConnect: () => handleConnect("walletconnect"),
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: WALLET_ICONS.coinbase,
      disabled: !isVerified,
      onConnect: () => handleConnect("coinbase"),
    },
    {
      id: "phantom",
      name: "Phantom",
      icon: WALLET_ICONS.phantom,
      disabled: !isVerified,
      onConnect: () => handleConnect("phantom"),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-96 flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-bold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-3 overflow-y-auto flex-grow">
          {!isVerified && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3 flex items-start">
              <Info className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-amber-700 text-sm">
                Verification required before connecting wallet.
              </p>
            </div>
          )}

          {success ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-1">Wallet Connected</h3>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3 flex items-start">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          ) : connecting ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-3"></div>
              <h3 className="text-lg font-bold mb-1">Connecting...</h3>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-sm mb-3">
                Connect your existing wallet. Only connect wallets you own.
              </p>

              <div className="space-y-2">
                {walletProviders.map((provider) => (
                  <WalletProvider key={provider.id} {...provider} />
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                By connecting, you agree to our Terms of Service.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Main hook to be exported
const useWalletConnect = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<{
    address: string;
    type: string;
  } | null>(null);
  const [isVerified] = useState(false);

  const openWalletModal = () => setModalOpen(true);
  const closeWalletModal = () => setModalOpen(false);

  const handleWalletConnected = (address: string, type: string) => {
    setConnectedWallet({ address, type });
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
  };

  return {
    isModalOpen,
    connectedWallet,
    isVerified,
    openWalletModal,
    closeWalletModal,
    handleWalletConnected,
    disconnectWallet,
    WalletConnectModal: () => (
      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={closeWalletModal}
        onWalletConnected={handleWalletConnected}
        isVerified={isVerified}
      />
    ),
  };
};

export default useWalletConnect;
