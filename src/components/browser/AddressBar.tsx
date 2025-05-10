
import React, { useState } from 'react';
import { Search, Home, Translate, Incognito } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AddressBarProps {
  url: string;
  onNavigate: (url: string) => void;
  onHomeClick: () => void;
  onTranslateClick: () => void;
  onToggleIncognito: () => void;
  isIncognito: boolean;
}

const AddressBar: React.FC<AddressBarProps> = ({
  url,
  onNavigate,
  onHomeClick,
  onTranslateClick,
  onToggleIncognito,
  isIncognito
}) => {
  const [inputValue, setInputValue] = useState(url);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let processedUrl = inputValue.trim();
    
    // Simple URL processing
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      // If it looks like a domain name
      if (processedUrl.includes('.') && !processedUrl.includes(' ')) {
        processedUrl = 'https://' + processedUrl;
      } else {
        // Treat as a search query
        processedUrl = `https://www.google.com/search?q=${encodeURIComponent(processedUrl)}`;
      }
    }
    
    onNavigate(processedUrl);
  };

  return (
    <div className={cn(
      "flex items-center h-12 px-2 bg-girish-dark border-b border-girish-charcoal/50 transition-all",
      isFocused && "shadow-[0_0_8px_rgba(155,135,245,0.6)]"
    )}>
      <Button
        onClick={onHomeClick}
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-white mr-1"
      >
        <Home size={18} />
      </Button>
      
      <form onSubmit={handleSubmit} className="flex-1 px-2">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "search-bar pl-9",
              isIncognito && "border-purple-900/50 bg-purple-900/20"
            )}
            placeholder="Search Google or type a URL"
          />
        </div>
      </form>
      
      <div className="flex items-center">
        <Button
          onClick={onTranslateClick}
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <Translate size={18} />
        </Button>
        
        <Button
          onClick={onToggleIncognito}
          variant="ghost"
          size="icon"
          className={cn(
            "ml-1",
            isIncognito ? "text-girish-primary" : "text-gray-400 hover:text-white"
          )}
        >
          <Incognito size={18} />
        </Button>
      </div>
    </div>
  );
};

export default AddressBar;
