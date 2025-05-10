
import React, { useState, useEffect } from 'react';
import TabBar from './TabBar';
import AddressBar from './AddressBar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import StatusBar from './StatusBar';
import { useToast } from "@/hooks/use-toast";

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create a new tab object
const createNewTab = (url = 'about:home', title = 'New Tab') => ({
  id: generateId(),
  url,
  title,
  favicon: '' // In a real browser, this would be fetched from the site
});

const BrowserUI: React.FC = () => {
  const { toast } = useToast();
  const [tabs, setTabs] = useState([createNewTab()]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>(null);
  const [isIncognito, setIsIncognito] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the current active tab
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

  // Handle new tab creation
  const handleNewTab = () => {
    const newTab = createNewTab();
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    toast({
      title: "New Tab Created",
      description: "Tab opened successfully.",
    });
  };

  // Handle tab closure
  const handleTabClose = (tabId: string) => {
    if (tabs.length <= 1) {
      // Don't close the last tab, create a new empty one instead
      const newTab = createNewTab();
      setTabs([newTab]);
      setActiveTabId(newTab.id);
      return;
    }
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    // If we're closing the active tab, switch to another tab
    if (tabId === activeTabId) {
      setActiveTabId(newTabs[0].id);
    }
  };

  // Handle tab switching
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
  };

  // Handle navigation within a tab
  const handleNavigate = (url: string) => {
    setIsLoading(true);
    
    // Update the current tab's URL and title
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, url, title: url.replace(/^https?:\/\//, '').split('/')[0] } 
          : tab
      )
    );
    
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Handle sidebar item clicks
  const handleSidebarItemClick = (itemId: string) => {
    setActiveSidebarItem(activeSidebarItem === itemId ? null : itemId);
    
    // Show a toast for demonstration
    toast({
      title: `${itemId.charAt(0).toUpperCase() + itemId.slice(1)} Panel`,
      description: `${itemId.charAt(0).toUpperCase() + itemId.slice(1)} panel would open here in a full browser.`,
    });
  };

  // Handle home button click
  const handleHomeClick = () => {
    handleNavigate('about:home');
  };

  // Handle translate button click
  const handleTranslateClick = () => {
    toast({
      title: "Translation",
      description: "Page translation would be offered here in a full browser.",
    });
  };

  // Handle incognito mode toggle
  const handleToggleIncognito = () => {
    setIsIncognito(!isIncognito);
    toast({
      title: isIncognito ? "Normal Mode" : "Incognito Mode",
      description: isIncognito ? "Exited incognito mode." : "Entered incognito mode. Your browsing history won't be saved.",
    });
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+T: New tab
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        handleNewTab();
      }
      // Ctrl+W: Close tab
      else if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        handleTabClose(activeTabId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTabId, tabs]);

  return (
    <div className={`h-screen flex flex-col ${isIncognito ? 'incognito-mode' : ''}`}>
      <TabBar 
        tabs={tabs}
        activeTabId={activeTabId}
        onNewTab={handleNewTab}
        onTabClose={handleTabClose}
        onTabChange={handleTabChange}
      />
      
      <AddressBar
        url={activeTab.url}
        onNavigate={handleNavigate}
        onHomeClick={handleHomeClick}
        onTranslateClick={handleTranslateClick}
        onToggleIncognito={handleToggleIncognito}
        isIncognito={isIncognito}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onItemClick={handleSidebarItemClick}
          activeItem={activeSidebarItem}
        />
        
        <MainContent
          activeTabId={activeTabId}
          url={activeTab.url}
          isLoading={isLoading}
        />
      </div>
      
      <StatusBar 
        status={isLoading ? "Loading..." : activeTab.url}
        isIncognito={isIncognito}
      />
    </div>
  );
};

export default BrowserUI;
