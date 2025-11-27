"use client"

import React, { useState, useCallback } from 'react';
import { ChevronDown, Bell, MoreHorizontal, X } from 'lucide-react';

// --- Overlay Component (The 'Prop Sidebar View') ---

interface Appearance {
  id: string;
  scene: string;
}

interface PropDetail {
  name: string;
  category: string;
  image: string;
  appearances: Appearance[];
}

interface PropDetailOverlayProps {
  prop: PropDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropDetailOverlay: React.FC<PropDetailOverlayProps> = ({ prop, isOpen, onClose }) => {
  // Return null if not open or no prop data
  if (!isOpen || !prop) return null;

  // The list of appearances shown in the image is repeated, so we use the prop.appearances list.
  const appearanceItems = prop.appearances.length > 0 ? prop.appearances : [
    { id: '1A', scene: 'INT KITCHEN SUNRISE' },
    { id: '1A', scene: 'INT KITCHEN SUNRISE' },
    { id: '1A', scene: 'INT KITCHEN SUNRISE' },
    { id: '1A', scene: 'INT KITCHEN SUNRISE' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Semi-transparent dark overlay background */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <div 
        className={`absolute top-0 right-0 h-full w-96 bg-zinc-900 shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-zinc-800">
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <button className="text-zinc-400 text-sm font-medium hover:text-white transition-colors">
            Edit Image
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-900/50 transition-colors"
            aria-label="Delete"
          >
            <div className="w-4 h-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
          </button>
        </div>

        {/* Prop Details Section */}
        <div className="p-4 flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <img 
              className="w-16 h-16 rounded object-cover flex-shrink-0 border border-zinc-700" 
              src={prop.image} 
              alt={prop.name} 
            />
            <div>
              <div className="text-zinc-400 text-sm">Prop</div>
              <h2 className="text-white text-3xl font-bold mt-1">{prop.name}</h2>
            </div>
          </div>
          
          <div className="text-zinc-400 text-sm font-medium">Appearance</div>
          
          {/* Appearances List */}
          <div className="flex flex-col gap-2 overflow-y-auto">
            {appearanceItems.map((item, index) => (
              <div key={index} className="h-14 px-3 bg-zinc-800 rounded-xl flex items-center justify-between cursor-pointer hover:bg-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-base text-zinc-400 font-semibold">{item.id}</div>
                  <div className="text-base text-white font-medium">{item.scene}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-500 rotate-270" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const initialElements = [
  { 
    name: 'Desk', 
    category: 'Prop',
    appearances: [
      { id: '1A', scene: 'INT KITCHEN SUNRISE' }, 
      { id: '2B', scene: 'EXT CITY NIGHT' }, 
      { id: '3C', scene: 'INT OFFICE DAY' },
      { id: '1A', scene: 'INT KITCHEN SUNRISE' },
    ],
    image: 'https://via.placeholder.com/69x69/3F3F46/9CA3AF?text=Desk',
    fullImage: 'https://via.placeholder.com/64x64/D2B48C/000000?text=Desk+Prop' // Placeholder for the overlay image
  },
  { 
    name: 'Laptop', 
    category: 'Prop',
    appearances: [
      { id: '4D', scene: 'INT CAFE DAY' }, 
      { id: '5E', scene: 'EXT PARK SUNSET' }
    ],
    image: 'https://via.placeholder.com/69x69/3F3F46/9CA3AF?text=Laptop',
    fullImage: 'https://via.placeholder.com/64x64/000000/FFFFFF?text=Laptop+Prop'
  },
  { 
    name: 'Book', 
    category: 'Prop',
    appearances: [
      { id: '6F', scene: 'INT LIBRARY' }, 
      { id: '7G', scene: 'EXT GARDEN' }
    ],
    image: 'https://via.placeholder.com/69x69/3F3F46/9CA3AF?text=Book',
    fullImage: 'https://via.placeholder.com/64x64/8B4513/FFFFFF?text=Book+Prop'
  },
];

type Element = typeof initialElements[0] & { appearances: Appearance[] };

const ProductionElements: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('production elements');
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState<Element | null>(null);
  
  const elements = initialElements; // Use the richer data structure

  // Handler to open the overlay with selected element's details
  const handleOpenOverlay = useCallback((element: Element) => {
    setSelectedProp(element);
    setIsOverlayOpen(true);
    setContextMenu(null); // Close context menu if open
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setIsOverlayOpen(false);
    // You might want to keep selectedProp data or clear it: setSelectedProp(null);
  }, []);



  const ContextMenuDropdown: React.FC<{ onClose: () => void, onEdit: () => void }> = ({ onClose, onEdit }) => (
    <div 
      className="absolute top-full right-0 mt-1 w-48 p-1 bg-zinc-800 shadow-2xl rounded-xl z-50"
      onMouseLeave={onClose}
    >
      <div className="flex flex-col gap-1">
        <button className="w-full px-3 py-2 text-zinc-400 text-sm font-medium text-left hover:bg-zinc-700/50 rounded-lg transition-colors">
          View Details
        </button>
        <button 
          className="w-full px-3 py-2 bg-zinc-700 rounded-lg text-white text-sm font-medium text-left hover:bg-zinc-600 transition-colors"
          onClick={onEdit}
        >
          Edit Image
        </button>
        <button className="w-full px-3 py-2 text-red-400 text-sm font-medium text-left hover:bg-zinc-700/50 rounded-lg transition-colors">
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-zinc-950 flex overflow-hidden">
    

      {/* Main Content */}
      <div className="flex-1 p-2.5 flex flex-col gap-2.5">
        <div className="flex-1 bg-zinc-900 rounded-xl overflow-hidden relative">
          {/* Top Bar */}
          <div className="w-full p-2 bg-zinc-900 border-b border-zinc-800 flex items-center">
            <button className="h-9 px-3 rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors">
              <div className="text-zinc-400 text-sm font-semibold">Untitled Project</div>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          {/* Content Area */}
          <div className="absolute top-14 left-9 right-9 bottom-0 overflow-y-auto">
            {/* Title */}
            <div className="pt-16 pb-8">
              <h1 className="text-white text-[42px] font-semibold leading-tight">Production Elements</h1>
            </div>

            {/* Elements Grid */}
            <div className="grid grid-cols-3 gap-4 pb-20">
              {elements.map((element, idx) => (
                <div key={idx} className="relative">
                  <div className="p-5 bg-zinc-800/50 rounded-lg flex items-center gap-4">
                    <img 
                      className="w-[69px] h-[69px] rounded object-cover flex-shrink-0" 
                      src={element.image}
                      alt={element.name}
                    />
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="text-white text-base font-semibold">{element.name}</div>
                      <div className="text-zinc-500 text-sm font-medium">{element.appearances.length} appearances</div>
                    </div>
                    <button 
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                        contextMenu === idx ? 'bg-zinc-700/30' : 'hover:bg-zinc-700/30'
                      }`}
                      onMouseEnter={() => setContextMenu(idx)}
                      // On click/tap, open the overlay for the element
                      onClick={() => handleOpenOverlay({...element, image: element.fullImage})}
                    >
                      <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                  {contextMenu === idx && (
                    <ContextMenuDropdown 
                      onClose={() => setContextMenu(null)}
                      onEdit={() => handleOpenOverlay({...element, image: element.fullImage})} // Use Edit as another way to open
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay Rendered Here */}
      <PropDetailOverlay 
        prop={selectedProp ? {
          name: selectedProp.name,
          category: selectedProp.category,
          image: selectedProp.fullImage,
          appearances: selectedProp.appearances,
        } : null}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </div>
  );
};

export default ProductionElements;