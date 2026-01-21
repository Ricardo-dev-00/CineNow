import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <div className="bg-secondary rounded-lg p-8 max-w-md text-center">
        <svg
          className="w-16 h-16 text-accent mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">Ops! Algo deu errado</h3>
        <p className="text-textSecondary mb-6">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
