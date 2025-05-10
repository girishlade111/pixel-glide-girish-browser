
import React from 'react';

interface StatusBarProps {
  status?: string;
  isIncognito: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ status, isIncognito }) => {
  return (
    <div className="h-6 px-4 flex items-center justify-between text-xs text-gray-400 bg-girish-dark border-t border-girish-charcoal/50">
      <div className="flex-1">
        {status && <span>{status}</span>}
      </div>
      
      <div className="flex items-center space-x-4">
        {isIncognito && (
          <span className="text-girish-primary">Incognito Mode Active</span>
        )}
        <span>Memory: Optimized</span>
        <span>GPU: Accelerated</span>
      </div>
    </div>
  );
};

export default StatusBar;
