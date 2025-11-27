"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Bell, MoreHorizontal, X, ChevronRight, Trash2, MapPin } from 'lucide-react';

// --- Type Definitions ---
interface Location {
  name: string;
  type: 'INT' | 'EXT';
  appearance: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  hasNotification?: boolean;
  onClick: () => void;
}

// --- Utility Components ---

// Context Menu Dropdown (Simplified for this component)
const ContextMenuDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    className="absolute right-12 top-1/2 -translate-y-1/2 w-48 p-1 bg-zinc-800 shadow-2xl rounded-xl z-50"
    onMouseLeave={onClose}
  >
    <div className="flex flex-col gap-1">
      <button className="w-full px-3 py-2 bg-zinc-700 rounded-lg text-white text-sm font-medium text-left hover:bg-zinc-600 transition-colors">
        Edit Details
      </button>
      <button className="w-full px-3 py-2 text-red-400 text-sm font-medium text-left hover:bg-zinc-700/50 rounded-lg transition-colors">
        Delete
      </button>
    </div>
  </div>
);



// --- Modal Components ---

// 1. Location Sidebar View Modal (Based on "Set and Location Sidebar View.png")
const LocationSidebarModal: React.FC<{
  location: Location;
  onClose: () => void;
  onDeleteLocation: (name: string) => void;
}> = ({ location, onClose, onDeleteLocation }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex justify-end">
      {/* Sidebar Panel */}
      <div
        ref={modalRef}
        className="w-[360px] h-full bg-zinc-900 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-zinc-800">
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="text-white text-base font-medium">Edit Details</div>
          <button onClick={() => onDeleteLocation(location.name)} className="text-red-500 hover:text-red-400 transition-colors">
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Location Info */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-zinc-400">Set & Location</div>
            <h2 className="text-3xl font-semibold text-white">
              {location.name} <span className="text-lg text-zinc-500">{location.type}</span>
            </h2>
          </div>

          {/* Appearance List (Representing the scenes) */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-400">Appearance</h3>
            {/* Hardcoding scene list based on the image provided */}
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-zinc-400">1A</span>
                  <span className="text-sm font-medium text-white">INT KITCHEN SUNRISE</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Delete Confirmation Modal (Based on "Section 2.png" - Delete Location)
const DeleteLocationModal: React.FC<{
  locationName: string;
  onCancel: () => void;
  onDeleteConfirm: () => void;
}> = ({ locationName, onCancel, onDeleteConfirm }) => (
  <div className="fixed inset-0 bg-black/75 z-[110] flex items-center justify-center p-4">
    <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl w-full max-w-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">Delete Location?</h3>
        <button onClick={onCancel} className="text-zinc-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-zinc-400 text-sm mb-6">
        Are you sure you want to delete the location **"{locationName}"**? This will remove all tagged mentions in the script and cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-semibold rounded-lg text-white hover:bg-zinc-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onDeleteConfirm}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);


// --- Main Component ---

const SetsAndLocations: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('sets and locations');
  const [contextMenu, setContextMenu] = useState<number | null>(null);

  // State for Location data and Modals
  const [locationsData, setLocationsData] = useState<Location[]>([
    {
      name: 'Small Apartment',
      type: 'INT',
      appearance: '4 scenes'
    },
    {
      name: 'Beach',
      type: 'EXT',
      appearance: '4 scenes'
    },
    {
      name: 'Kitchen',
      type: 'INT',
      appearance: '4 scenes'
    },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);


  const handleOpenSidebar = (location: Location) => {
    setSelectedLocation(location);
    setIsSidebarOpen(true);
  };

  const handleDeleteLocation = (name: string) => {
    setLocationToDelete(name);
    setIsDeleteModalOpen(true);
    setIsSidebarOpen(false); // Close sidebar if delete is initiated from there
  };

  const handleConfirmDelete = () => {
    setLocationsData(prev => prev.filter(l => l.name !== locationToDelete));
    setIsDeleteModalOpen(false);
    setLocationToDelete(null);
  };

  return (
    <div className="w-full h-screen bg-zinc-950 flex overflow-hidden font-sans">
   

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
              <h1 className="text-white text-[42px] font-semibold leading-tight">Sets and Locations</h1>
            </div>

            {/* Locations Table */}
            <div className="flex flex-col gap-2">
              {/* Table Header */}
              <div className="px-3 py-1 rounded flex">
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Name</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">INT/EXT</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Appearance</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col gap-1">
                {locationsData.map((location, idx) => (
                  <div 
                    key={idx} 
                    className="relative cursor-pointer hover:bg-zinc-800 transition-colors rounded-lg"
                    onClick={() => handleOpenSidebar(location)} // Click to open sidebar
                  >
                    <div className="p-3 bg-zinc-800/50 rounded-lg flex items-center">
                      <div className="flex-1 p-2.5 flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-zinc-500"/>
                        <div className="text-white text-sm font-semibold flex-1">{location.name}</div>
                      </div>
                      <div className="flex-1 p-2.5 flex items-center">
                        <div className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                            location.type === 'INT' ? 'bg-blue-600/20 text-blue-400' : 'bg-green-600/20 text-green-400'
                        }`}>
                            {location.type}
                        </div>
                      </div>
                      <div className="flex-1 p-2.5 flex items-center">
                        <div className="text-zinc-400 text-sm flex-1">{location.appearance}</div>
                      </div>
                    </div>
                    
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-zinc-700/30 transition-colors z-10"
                      onClick={(e) => { e.stopPropagation(); setContextMenu(idx); }}
                    >
                      <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                    </button>
                    {contextMenu === idx && <ContextMenuDropdown onClose={() => setContextMenu(null)} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER MODALS */}
      {isSidebarOpen && selectedLocation && (
        <LocationSidebarModal
          location={selectedLocation}
          onClose={() => setIsSidebarOpen(false)}
          onDeleteLocation={handleDeleteLocation}
        />
      )}
      {isDeleteModalOpen && locationToDelete && (
        <DeleteLocationModal
          locationName={locationToDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDeleteConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default SetsAndLocations;