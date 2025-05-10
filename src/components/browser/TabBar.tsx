
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

interface TabBarProps {
  onNewTab: () => void;
  onTabClose: (id: string) => void;
  onTabChange: (id: string) => void;
  tabs: Tab[];
  activeTabId: string;
}

const TabBar: React.FC<TabBarProps> = ({ 
  onNewTab, 
  onTabClose, 
  onTabChange, 
  tabs, 
  activeTabId 
}) => {
  return (
    <div className="flex items-center bg-girish-darkest border-b border-girish-charcoal/50 h-10">
      <div className="flex-1 flex items-center overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center h-10 px-3 min-w-36 max-w-56 border-r border-girish-charcoal/30",
              tab.id === activeTabId ? "tab-active" : "tab-inactive"
            )}
          >
            {tab.favicon && (
              <img src={tab.favicon} alt="" className="w-4 h-4 mr-2" />
            )}
            <span className="truncate flex-1">{tab.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="ml-2 p-1 hover:bg-girish-charcoal/50 rounded-full"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      <Button
        onClick={onNewTab}
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none hover:bg-girish-primary/20 text-gray-400 hover:text-white"
      >
        <Plus size={18} />
      </Button>
    </div>
  );
};

export default TabBar;
