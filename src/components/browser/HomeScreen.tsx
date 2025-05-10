
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomeScreenProps {
  onNavigate?: (url: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    if (onNavigate) {
      onNavigate(searchUrl);
    } else {
      console.log("Search URL:", searchUrl);
    }
  };
  
  // Mock data for frequently visited sites
  const frequentSites = [
    { name: "YouTube", url: "https://youtube.com", icon: "🎬" },
    { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
    { name: "GitHub", url: "https://github.com", icon: "🐙" },
    { name: "Reddit", url: "https://reddit.com", icon: "🤖" },
    { name: "Netflix", url: "https://netflix.com", icon: "🍿" },
    { name: "Spotify", url: "https://spotify.com", icon: "🎵" },
    { name: "Amazon", url: "https://amazon.com", icon: "🛒" },
    { name: "Wikipedia", url: "https://wikipedia.org", icon: "📚" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full bg-gradient-to-b from-girish-dark to-girish-darkest">
      <div className="max-w-3xl w-full px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-girish-primary to-girish-vivid bg-clip-text text-transparent">
            GIRISH BROWSER
          </h1>
          <p className="text-gray-400">Elevate Your Web Experience</p>
        </div>
        
        <form onSubmit={handleSearch} className="mb-12 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Google or type a URL"
              className="search-bar pl-12 text-lg h-14 shadow-lg"
              autoFocus
            />
          </div>
        </form>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {frequentSites.map((site) => (
            <Button
              key={site.name}
              variant="ghost"
              className="flex flex-col items-center p-4 h-auto rounded-2xl border border-girish-charcoal/40 
                         hover:border-girish-primary/70 hover:bg-girish-primary/10 group transition-all"
              onClick={() => onNavigate && onNavigate(site.url)}
            >
              <div className="text-2xl mb-2">{site.icon}</div>
              <span className="text-sm text-gray-300 group-hover:text-white">{site.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            className="text-sm text-gray-400 border-girish-charcoal/40"
            onClick={() => console.log("Sign in clicked")}
          >
            Sign in to sync your data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
