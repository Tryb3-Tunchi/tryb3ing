// components/Card.jsx
export const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white font-medium md:bg-slate-200 hover:bg-blue-100  transition-colors duration-200 rounded-lg shadow-lg ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-2 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-6  ${className}`}>{children}</div>
);

export const Button = ({ children, className = "" }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

export const Input = ({ className = "", ...props }) => (
  <input
    className={`px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none w-full ${className}`}
    {...props}
  />
);

export const Alert = ({ children, className = "" }) => (
  <div
    className={`p-4 rounded-lg border border-blue-200 bg-blue-50 ${className}`}
  >
    {children}
  </div>
);

export const AlertTitle = ({ children, className = "" }) => (
  <h5 className={`font-medium text-gray-900 mb-1 ${className}`}>{children}</h5>
);

export const AlertDescription = ({ children, className = "" }) => (
  <div className={`text-sm text-gray-600 ${className}`}>{children}</div>
);

// components/Dialog.tsx

export const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  // onOpenChange()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="relative w-full max-w-md mx-4"
        onClick={(e) => {
          e.stopPropagation();
          onOpenChange?.(true); //click outside to close the modal
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-xl p-6 ${className}`}>
    {children}
  </div>
);

export const DialogHeader = ({ children, className = "" }) => (
  <div className={`mb-6 ${className}`}>{children}</div>
);

export const DialogTitle = ({ children, className = "" }) => (
  <h5 className={`font-medium text-gray-900 text-xl text-center ${className}`}>
    {children}
  </h5>
);

// // components/Card.jsx
// export const Card = ({ children, className = "" }) => (
//   <div
//     className={`bg-white font-medium md:bg-blue-500 hover:bg-blue-100  transition-colors duration-200 rounded-lg shadow-lg ${className}`}
//   >
//     {children}
//   </div>
// );

// export const CardHeader = ({ children, className = "" }) => (
//   <div className={`p-6 pb-2 ${className}`}>{children}</div>
// );

// export const CardTitle = ({ children, className = "" }) => (
//   <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
// );

// export const CardContent = ({ children, className = "" }) => (
//   <div className={`p-6  ${className}`}>{children}</div>
// );

// export const Button = ({ children,onOpenChange, className = "" }) => (
//   <button
//   onClick={(e) => {
//     e.stopPropagation();
//     onOpenChange?.(true); //click outside to close the modal
//   }}
//     className={`px-4 py-2 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 ${className}`}
//   >
//     {children}
//   </button>
// );

// export const Input = ({ className = "", ...props }) => (
//   <input
//     className={`px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none w-full ${className}`}
//     {...props}
//   />
// );

// export const Alert = ({ children, className = "" }) => (
//   <div
//     className={`p-4 rounded-lg border border-blue-200 bg-blue-50 ${className}`}
//   >
//     {children}
//   </div>
// );

// export const AlertTitle = ({ children, className = "" }) => (
//   <h5 className={`font-medium text-gray-900 mb-1 ${className}`}>{children}</h5>
// );

// export const AlertDescription = ({ children, className = "" }) => (
//   <div className={`text-sm text-gray-600 ${className}`}>{children}</div>
// );
