
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  BookmarkIcon,
  History,
  Download,
  Settings,
  Search,
  Cast,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItem = {
  id: string;
  icon: React.ElementType;
  label: string;
};

interface SidebarProps {
  onItemClick: (id: string) => void;
  activeItem: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick, activeItem }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const sidebarItems: SidebarItem[] = [
    { id: 'bookmarks', icon: BookmarkIcon, label: 'Bookmarks' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'downloads', icon: Download, label: 'Downloads' },
    { id: 'extensions', icon: Search, label: 'Extensions' },
    { id: 'cast', icon: Cast, label: 'Cast' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div 
      className={cn(
        "h-full bg-girish-dark border-r border-girish-charcoal/50 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 py-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start mb-1 transition-colors",
              collapsed ? "px-4" : "px-4",
              activeItem === item.id 
                ? "bg-girish-primary/20 text-girish-primary" 
                : "text-gray-400 hover:text-white hover:bg-girish-charcoal/30"
            )}
            onClick={() => onItemClick(item.id)}
          >
            <item.icon size={20} className={cn("min-w-5", !collapsed && "mr-3")} />
            {!collapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="self-end mb-4 mr-2 text-gray-400 hover:text-white"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </Button>
    </div>
  );
};

export default Sidebar;
