import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Wallet icons - in a real implementation you would import actual icons
// For this example we'll use placeholders
const WALLET_ICONS = {
  metamask: '/icons/metamask.svg',
  trustwallet: '/icons/trustwallet.svg',
  walletconnect: '/icons/walletconnect.svg',
  coinbase: '/icons/coinbase.svg',
  phantom: '/icons/phantom.svg',
  brave: '/icons/brave.svg',
};

interface WalletProviderProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  onConnect: () => Promise<void>;
}

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnected: (walletAddress: string, walletType: string) => void;
}

// Simulated Web3 connector function - replace with actual implementation
const connectToWallet = async (walletType: string): Promise<string> => {
  // In a real implementation, this would use ethers.js, web3.js, or similar libraries
  // to actually connect to the specified wallet
  
  console.log(`Connecting to ${walletType}...`);
  
  // Simulate connection delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // This would normally come from the actual wallet connection
  const mockAddress = `0x${Array.from({length: 40}, () => 
    Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
  return mockAddress;
};

// Individual wallet provider component
const WalletProvider: React.FC<WalletProviderProps> = ({ id, name, icon, description, onConnect }) => {
  return (
    <button 
      onClick={onConnect}
      className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors mb-2"
    >
      <img src={icon} alt={name} className="w-10 h-10 mr-4" />
      <div className="text-left">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
};

// Main wallet connect modal component
const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose, onWalletConnected }) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Reset states when modal is opened
  useEffect(() => {
    if (isOpen) {
      setConnecting(null);
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);
  
  // Handle wallet connection
  const handleConnect = async (walletType: string) => {
    try {
      setConnecting(walletType);
      setError(null);
      
      const walletAddress = await connectToWallet(walletType);
      
      setSuccess(true);
      setConnecting(null);
      
      // Notify parent component of successful connection
      onWalletConnected(walletAddress, walletType);
      
      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      setConnecting(null);
      setError(`Failed to connect to ${walletType}. Please try again.`);
      console.error("Wallet connection error:", err);
    }
  };
  
  // If modal is not open, don't render anything
  if (!isOpen) return null;
  
  const walletProviders = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: WALLET_ICONS.metamask,
      description: 'Connect to your MetaMask wallet',
      onConnect: () => handleConnect('metamask')
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      icon: WALLET_ICONS.trustwallet,
      description: 'Connect to your Trust Wallet',
      onConnect: () => handleConnect('trustwallet')
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: WALLET_ICONS.walletconnect, 
      description: 'Connect to multiple wallet types',
      onConnect: () => handleConnect('walletconnect')
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: WALLET_ICONS.coinbase,
      description: 'Connect to your Coinbase Wallet',
      onConnect: () => handleConnect('coinbase')
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: WALLET_ICONS.phantom,
      description: 'Connect to your Phantom wallet',
      onConnect: () => handleConnect('phantom')
    }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Connect Wallet</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-4">
          {success ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wallet Connected</h3>
              <p className="text-center text-gray-600">Your wallet has been successfully connected.</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-600">{error}</p>
            </div>
          ) : connecting ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Connecting...</h3>
              <p className="text-center text-gray-600">Please approve the connection in your wallet.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Connect with one of our available wallet providers or create a new one.
              </p>
              
              <div className="space-y-2">
                {walletProviders.map(provider => (
                  <WalletProvider key={provider.id} {...provider} />
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Main component to be exported and used in DashboardNav
const useWalletConnect = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<{
    address: string;
    type: string;
  } | null>(null);
  
  // Open wallet connect modal
  const openWalletModal = () => {
    setModalOpen(true);
  };
  
  // Close wallet connect modal
  const closeWalletModal = () => {
    setModalOpen(false);
  };
  
  // Handle successful wallet connection
  const handleWalletConnected = (address: string, type: string) => {
    setConnectedWallet({ address, type });
    
    // Here you could dispatch to a global state or use React Context
    // to make the wallet information available throughout the app
    
    console.log(`Wallet connected: ${type} - ${address}`);
  };
  
  // Disconnect wallet
  const disconnectWallet = () => {
    setConnectedWallet(null);
    console.log("Wallet disconnected");
  };
  
  return {
    isModalOpen,
    connectedWallet,
    openWalletModal,
    closeWalletModal,
    handleWalletConnected,
    disconnectWallet,
    WalletConnectModal: () => (
      <WalletConnectModal 
        isOpen={isModalOpen} 
        onClose={closeWalletModal} 
        onWalletConnected={handleWalletConnected}
      />
    )
  };
};

export default useWalletConnect;