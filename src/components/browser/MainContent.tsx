
import React from 'react';
import HomeScreen from './HomeScreen';

interface MainContentProps {
  activeTabId: string;
  url: string;
  isLoading: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ activeTabId, url, isLoading }) => {
  // Show home screen when URL is empty or "about:home"
  const showHomeScreen = !url || url === 'about:home';
  
  return (
    <div className="flex-1 flex flex-col h-full bg-girish-darkest overflow-hidden">
      {showHomeScreen ? (
        <HomeScreen />
      ) : (
        <div className="flex-1 flex flex-col">
          {isLoading && (
            <div className="absolute top-[88px] left-0 h-1 bg-girish-primary/30 w-full overflow-hidden">
              <div className="h-full bg-girish-primary animate-pulse-glow w-1/3 absolute left-0 top-0" 
                   style={{animation: "loading 1.5s infinite linear"}}></div>
            </div>
          )}
          <div className="flex-1 flex items-center justify-center text-center p-8 text-gray-400">
            <div>
              <p className="text-lg mb-3">Simulation: Browser Content</p>
              <p className="text-sm opacity-70">URL: {url}</p>
              <div className="mt-6 p-4 border border-girish-charcoal/50 rounded-2xl">
                <p>In a real browser, web content would render here.</p>
                <p className="text-xs mt-2 opacity-70">This is a UI demonstration only.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
