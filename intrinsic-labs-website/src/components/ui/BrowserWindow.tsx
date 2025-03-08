import { FC, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string | number;
  label: string;
  content: ReactNode;
  favicon?: ReactNode; // Optional custom favicon
}

interface BrowserWindowProps {
  tabs: Tab[];
  initialTabId?: string | number;
  height?: string | number;
  className?: string;
  onChange?: (tabId: string | number) => void;
}

const BrowserWindow: FC<BrowserWindowProps> = ({
  tabs,
  initialTabId,
  height = '500px',
  className = '',
  onChange
}) => {
  const [activeTabId, setActiveTabId] = useState<string | number>(
    initialTabId || (tabs.length > 0 ? tabs[0].id : '')
  );

  const handleTabClick = (tabId: string | number) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // Get active tab
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

  // Default favicon if none is provided
  const defaultFavicon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className={`bg-neutral-100 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden shadow-xl ${className}`}>
      {/* Browser chrome/toolbar */}
      <div className="bg-neutral-100 px-4 py-2 border-b border-primary/20 flex items-center">
        {/* Traffic light buttons */}
        <div className="flex-shrink-0 flex space-x-2 mr-4 mb-1">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
        </div>
        
        {/* Browser tabs container with fade effect */}
        <div className="flex-1 relative overflow-hidden">
          {/* Scrollable tabs container - lower z-index */}
          <div className="overflow-x-scroll hide-scrollbar touch-pan-x relative z-0">
            <div className="flex items-end whitespace-nowrap">
              {/* Left spacer - ensures tabs don't start at the very edge */}
              <div className="w-4 flex-shrink-0"></div>
              
              {/* Tab items with spacing between them */}
              <div className="flex items-end">
                {tabs.map((tab, index) => (
                  <div key={tab.id} className="flex items-end">
                    {/* Tab */}
                    <div
                      className={`px-4 py-2 cursor-pointer transition-all duration-300 relative flex-shrink-0 group rounded-lg ${
                        activeTabId === tab.id 
                          ? 'bg-neutral-300 text-primary border-primary/20' 
                          : 'bg-transparent text-neutral-600 hover:bg-neutral-300 hover:text-primary'
                      }`}
                      onClick={() => handleTabClick(tab.id)}
                    >
                      {/* Tab content with favicon */}
                      <div className="flex items-center space-x-2 whitespace-nowrap">
                        {/* Favicon with circular background */}
                        <div className={`flex items-center justify-center w-5 h-5 rounded-full transition-colors duration-300 ${
                          activeTabId === tab.id 
                            ? 'bg-neutral-800' 
                            : 'bg-neutral-300 group-hover:bg-neutral-600'
                        }`}>
                          <span className={`flex-shrink-0 transition-colors duration-300 ${
                            activeTabId === tab.id 
                              ? 'text-secondary' 
                              : 'text-neutral-600 group-hover:text-secondary'
                          }`}>
                            {tab.favicon || defaultFavicon}
                          </span>
                        </div>
                        
                        {/* Tab label */}
                        <span className="text-sm font-light truncate max-w-[120px]">{tab.label}</span>
                      </div>
                    </div>
                    
                    {/* Divider - always render but animate opacity */}
                    {index < tabs.length - 1 && (
                      <div 
                        className="h-6 w-px bg-neutral-300 mx-0.5 self-center transition-opacity duration-300"
                        style={{ 
                          opacity: (activeTabId !== tab.id && activeTabId !== tabs[index + 1].id) ? 1 : 0 
                        }}
                      ></div>
                    )}
                  </div>
                ))}
                
                {/* Right spacer - placed inside the tab container to ensure it's part of the scrollable area */}
                <div className="w-4 flex-shrink-0"></div>
              </div>
            </div>
          </div>
          
          {/* Left fade gradient - higher z-index to overlay tabs */}
          {tabs.length > 2 && (
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-neutral-100 to-transparent pointer-events-none z-10"></div>
          )}
          
          {/* Right fade gradient - higher z-index to overlay tabs */}
          {tabs.length > 2 && (
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-neutral-100 to-transparent pointer-events-none z-10"></div>
          )}
        </div>
      </div>
      
      {/* Browser content - fixed height with scrolling */}
      <div 
        className="overflow-hidden bg-background" 
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8 h-full overflow-y-auto custom-scrollbar"
          >
            {activeTab.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrowserWindow; 