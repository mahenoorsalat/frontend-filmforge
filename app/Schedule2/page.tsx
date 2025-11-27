"use client"

import React, { useState } from 'react';
import { Menu, Bell, Calendar, Users, Film, MapPin, Clipboard, ChevronDown, Plus, X } from 'lucide-react';


// --- Modal Components ---

const ModalOverlay = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Overlay backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl w-full max-w-sm mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const AddLocationModal = ({ isOpen, onClose }) => (
  <ModalOverlay isOpen={isOpen} onClose={onClose} title="Add Location">
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="Location Name" 
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400" 
      />
      <input 
        type="text" 
        placeholder="Address" 
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400" 
      />
      <div className="text-xs text-zinc-500 pt-2">Location details, e.g., "1 INT Kitchen"</div>
      <button 
        onClick={onClose} 
        className="w-full mt-4 px-4 h-10 bg-cyan-400 text-black rounded-lg font-semibold text-sm hover:bg-cyan-300 transition"
      >
        Add Location
      </button>
    </div>
  </ModalOverlay>
);

const AddHospitalModal = ({ isOpen, onClose }) => (
  <ModalOverlay isOpen={isOpen} onClose={onClose} title="Add Nearest Hospital">
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="Hospital Name" 
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400" 
      />
      <input 
        type="text" 
        placeholder="Address" 
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400" 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400" 
      />
      <button 
        onClick={onClose} 
        className="w-full mt-4 px-4 h-10 bg-cyan-400 text-black rounded-lg font-semibold text-sm hover:bg-cyan-300 transition"
      >
        Add Location
      </button>
    </div>
  </ModalOverlay>
);

const AddParkingModal = ({ isOpen, onClose }) => (
  <ModalOverlay isOpen={isOpen} onClose={onClose} title="Add Parking">
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="Parking Address" 
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400" 
      />
      <textarea 
        placeholder="Entrance, directions, and notes..." 
        rows="3"
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400"
      ></textarea>
      <button 
        onClick={onClose} 
        className="w-full mt-4 px-4 h-10 bg-cyan-400 text-black rounded-lg font-semibold text-sm hover:bg-cyan-300 transition"
      >
        Add Parking
      </button>
    </div>
  </ModalOverlay>
);

const AddDepartmentModal = ({ isOpen, onClose }) => (
  <ModalOverlay isOpen={isOpen} onClose={onClose} title="Add Department Note">
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="Department Name (e.g., Costume, Props)" 
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400" 
      />
      <textarea 
        placeholder="Enter notes for this department..." 
        rows="4"
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:ring-cyan-400 focus:border-cyan-400"
      ></textarea>
      <button 
        onClick={onClose} 
        className="w-full mt-4 px-4 h-10 bg-cyan-400 text-black rounded-lg font-semibold text-sm hover:bg-cyan-300 transition"
      >
        Save Department
      </button>
    </div>
  </ModalOverlay>
);

// --- Helper Components from Original Code ---

const Table = ({ title, subtitle, headers, rows, footer }) => {
  // You might need to adjust Table to accept and pass through a click handler for 'Add Location' buttons
  // For simplicity, I'll update the CallSheetContent to inject the handlers.
  return (
    <div className="border border-zinc-300 rounded-md overflow-hidden">
      <div className="bg-white border-b border-zinc-200 px-3.5 py-2 flex gap-2">
        <span className="text-[10px] font-semibold">{title}</span>
        {subtitle && <span className="text-[10px] opacity-50">{subtitle}</span>}
      </div>
      <div className="bg-zinc-100 border-b border-zinc-300 px-2 py-1 flex">
        {headers.map((header, i) => (
          <div key={i} className={`p-2 text-[10px] font-medium text-zinc-600 ${i === 0 && headers.length > 3 ? 'w-17' : 'flex-1'}`}>
            {header}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} className="border-b border-zinc-200 px-2 py-2 flex items-center">
          {row.cols.map((col, j) => (
            <div key={j} className={`p-2 ${j === 0 && headers.length > 3 ? 'w-17' : 'flex-1'}`}>
              {col}
            </div>
          ))}
        </div>
      ))}
      {footer && <div className="border-t border-zinc-200 px-2 py-3">{footer}</div>}
    </div>
  );
};

const Badge = ({ children }) => {
  return (
    <div className="w-4 h-4 bg-zinc-300 rounded-full flex items-center justify-center">
      <span className="text-[10px] font-semibold">{children}</span>
    </div>
  );
};

// --- CallSheetContent Component (Updated to accept handlers) ---

const CallSheetContent = ({ 
  openLocationModal, 
  openHospitalModal, 
  openParkingModal, 
  openDepartmentModal 
}) => {
  return (
    <div className="flex flex-col gap-9 text-zinc-900">
      {/* Header */}
      <div className="flex gap-2">
        {/* Left Column */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div className="flex flex-col gap-0.5 mb-4">
            <div className="w-3.5 h-2.5 border-1.5 border-zinc-900 rounded"></div>
            <div className="w-3.5 h-2.5 bg-zinc-900 rounded"></div>
          </div>
          <div className="text-[11px] font-extrabold mb-4">FilmForge</div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-zinc-600 font-medium">Director</div>
              <div className="text-xs font-bold">James Gunn</div>
              <div className="text-xs">(123) 456-7899</div>
            </div>
            <div>
              <div className="text-xs text-zinc-600 font-medium">Producer</div>
              <div className="text-xs font-bold">Hugh Jackman</div>
              <div className="text-xs">(123) 456-7899</div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="flex-1 bg-zinc-200/40 border border-zinc-300 rounded p-8 flex flex-col justify-end items-center gap-6">
          <div className="text-center">
            <div className="text-sm font-bold mb-2">Project Odyssey</div>
            <div className="text-3xl font-bold text-zinc-300">00:00 AM</div>
          </div>
          <div className="text-xs opacity-60 text-center">Closed Set — No Smoking</div>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-3 flex flex-col justify-between items-end">
          <div className="text-right mb-4">
            <div className="text-[10px] opacity-60">Day 1 of 20</div>
            <div className="text-xs font-semibold">Wednesday 9 July 2025</div>
          </div>
          <div className="text-right">
            <div className="text-base font-bold text-zinc-400">-- °C <span className="text-xs">/ -- °C</span></div>
            <div className="text-[10px] text-zinc-600 max-w-[100px]">Add a location to auto-fill the weather.</div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="flex flex-col gap-3.5">
        {/* Location Table */}
        <Table
          title="Location"
          headers={['Set Location', 'Nearest Hospital', 'Parking']}
          rows={[
            {
              cols: [
                <div><div className="font-semibold text-[10px]">1 INT Kitchen</div><button onClick={openLocationModal} className="text-cyan-500 text-xs font-semibold mt-1">Add Location</button></div>,
                <button onClick={openHospitalModal} className="text-cyan-500 text-xs font-semibold flex items-center gap-1"><Plus className="w-3.5 h-3.5" />Add Location</button>,
                <button onClick={openParkingModal} className="text-cyan-500 text-xs font-semibold flex items-center gap-1"><Plus className="w-3.5 h-3.5" />Add Location</button>
              ]
            }
          ]}
        />

        {/* Schedule Table (unchanged) */}
        <Table
          title="Schedule"
          subtitle="Day 1 of 20"
          headers={['Start', 'Scene', 'Location', 'Cast', 'Est (H)']}
          rows={[
            {
              cols: [
                <span className="text-[10px] opacity-40">00:00 am</span>,
                <span className="text-[10px] font-semibold">1A. INT Kitchen - Day</span>,
                <span className="text-[10px]">123 Adventure Lane</span>,
                <div className="flex gap-1"><Badge>1</Badge><Badge>2</Badge></div>,
                <span className="text-[10px] opacity-40">Add Duration</span>
              ]
            },
            {
              cols: [
                <span className="text-[10px] opacity-40">00:00 am</span>,
                <span className="text-[10px] font-semibold">1B. INT Kitchen - Day</span>,
                <span className="text-[10px]">123 Adventure Lane</span>,
                <div className="flex gap-1"><Badge>1</Badge><Badge>2</Badge></div>,
                <span className="text-[10px] opacity-40">Add Duration</span>
              ]
            }
          ]}
        />

        {/* Talent Table (unchanged) */}
        <Table
          title="Talent"
          headers={['Talent', 'Character', 'Status', 'Pickup', 'Call Time', 'H/MU']}
          rows={[
            {
              cols: [
                <div className="flex items-center gap-2"><Badge>1</Badge><span className="text-[10px] font-semibold">Pedro Pascal</span></div>,
                <span className="text-[10px]">"Jamie"</span>,
                <span className="text-[10px]">SW</span>,
                <span className="text-[10px] opacity-40">00:00 am</span>,
                <span className="text-[10px] opacity-40">00:00 am</span>,
                <span className="text-[10px] opacity-40">00:00 am</span>
              ]
            },
            {
              cols: [
                <div className="flex items-center gap-2"><Badge>2</Badge><span className="text-[10px] font-semibold">Emily Blunt</span></div>,
                <span className="text-[10px]">"Lois"</span>,
                <span className="text-[10px]">SW</span>,
                <span className="text-[10px] opacity-40">00:00 am</span>,
                <span className="text-[10px] opacity-40">00:00 am</span>,
                <span className="text-[10px] opacity-40">00:00 am</span>
              ]
            }
          ]}
        />

        {/* Department Notes (Updated to use handler) */}
        <Table
          title="Department Notes"
          headers={['Department', 'Notes']}
          rows={[
            {
              cols: [
                <span className="text-[10px]">Props</span>,
                <span className="text-[10px]">Hanged clothes, Cellphone, Flashlight, Key, Metal flask</span>
              ]
            }
          ]}
          footer={
            <button onClick={openDepartmentModal} className="text-cyan-500 text-xs font-semibold flex items-center gap-1 p-3">
              <Plus className="w-3.5 h-3.5" />Add a Department
            </button>
          }
        />

        {/* Advance Schedule (unchanged) */}
        <Table
          title="Advance Schedule"
          subtitle="Day 2 of 20"
          headers={['Start', 'Scene', 'Location', 'Cast', 'Est (H)']}
          rows={[
            {
              cols: [
                <span className="text-[10px] opacity-40">00:00 am</span>,
                <span className="text-[10px] font-semibold">1A. INT Kitchen - Day</span>,
                <button className="text-cyan-500 text-xs font-semibold">Add Location</button>,
                <div className="flex gap-1"><Badge>1</Badge><Badge>2</Badge></div>,
                <span className="text-[10px] opacity-40">Add Duration</span>
              ]
            },
            {
              cols: [
                <span className="text-[10px] opacity-40">00:00 am</span>,
                <span className="text-[10px] font-semibold">1B. INT Kitchen - Day</span>,
                <button className="text-cyan-500 text-xs font-semibold">Add Location</button>,
                <div className="flex gap-1"><Badge>1</Badge><Badge>2</Badge></div>,
                <span className="text-[10px] opacity-40">Add Duration</span>
              ]
            }
          ]}
        />

        {/* Extras (unchanged) */}
        <Table
          title="Extras"
          headers={['Name', 'Character', 'Call Time']}
          rows={[
            {
              cols: [
                <span className="text-[10px] font-semibold">Erin Stockholm</span>,
                <span className="text-[10px]">"User"</span>,
                <span className="text-[10px] opacity-40">00:00 am</span>
              ]
            },
            {
              cols: [
                <span className="text-[10px] font-semibold">Sophia Martinez</span>,
                <span className="text-[10px]">"Guest"</span>,
                <span className="text-[10px] opacity-40">00:00 am</span>
              ]
            }
          ]}
        />

        {/* Note (unchanged) */}
        <div className="border border-zinc-300 rounded-md ">
          <div className="bg-white border-b border-zinc-200 px-3.5 py-2">
            <span className="text-[10px] font-semibold">Note</span>
          </div>
          <div className="p-4">
            <span className="text-[10px] text-zinc-400">Add a note you need to share with everyone</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component (Updated for State Management and Modals) ---

const page = () => {
  const [activeTab, setActiveTab] = useState('callsheets');
  
  // State for Modals
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isParkingModalOpen, setIsParkingModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);

  // Handlers
  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);
  
  const openHospitalModal = () => setIsHospitalModalOpen(true);
  const closeHospitalModal = () => setIsHospitalModalOpen(false);
  
  const openParkingModal = () => setIsParkingModalOpen(true);
  const closeParkingModal = () => setIsParkingModalOpen(false);
  
  const openDepartmentModal = () => setIsDepartmentModalOpen(true);
  const closeDepartmentModal = () => setIsDepartmentModalOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-white font-sans">
  

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top Bar (unchanged) */}
        <div className="px-2 py-2 bg-zinc-900 border-b border-zinc-800">
          <button className="flex items-center gap-2 px-3 h-9 rounded-lg hover:bg-zinc-800">
            <span className="text-sm font-semibold text-zinc-400">Untitled Project</span>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Header Section (unchanged) */}
        <div className="px-9 bg-zinc-900">
          <div className="pt-16 pb-0 max-w-md">
            <h1 className="text-5xl font-semibold mb-8">Scheduling</h1>
            <div className="flex items-center gap-5">
              <button className="flex flex-col items-center gap-3 pb-3">
                <span className="text-sm font-semibold text-zinc-400">Shooting Schedule</span>
                <div className="w-full h-1 bg-transparent rounded-full"></div>
              </button>
              <button className="flex flex-col items-center gap-3 pb-3">
                <span className="text-sm font-semibold text-zinc-400">Day-out-of-Days</span>
                <div className="w-full h-1 bg-transparent rounded-full"></div>
              </button>
              <button className="flex flex-col items-center gap-3 pb-3">
                <span className="text-sm font-semibold text-cyan-400">Call Sheets</span>
                <div className="w-full h-1 bg-cyan-400 rounded-full"></div>
              </button>
            </div>
          </div>
          <div className="border-t border-zinc-800"></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-zinc-900 p-2.5 ">
          <div className="bg-zinc-900 rounded-t-xl p-10 relative">
            {/* Date Header (unchanged) */}
            <div className="mb-8">
              <span className="text-zinc-400 font-semibold">Wednesday, 10 July 2025</span>
            </div>

            {/* Action Buttons (unchanged) */}
            <div className="absolute top-10 right-10 flex gap-3">
              <button className="px-3 h-9 bg-zinc-800 border border-zinc-700 rounded-lg font-semibold text-sm text-zinc-300 hover:bg-zinc-700">
                Preview
              </button>
              <button className="px-3 h-9 bg-cyan-400 text-black rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-cyan-300">
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Call Sheet - Pass modal handlers as props */}
            <div className="bg-zinc-100 rounded p-5.5 max-w-xl mx-auto shadow-2xl">
              <CallSheetContent 
                openLocationModal={openLocationModal}
                openHospitalModal={openHospitalModal}
                openParkingModal={openParkingModal}
                openDepartmentModal={openDepartmentModal}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Overlays - Rendered at the root level */}
      <AddLocationModal 
        isOpen={isLocationModalOpen} 
        onClose={closeLocationModal} 
      />
      <AddHospitalModal 
        isOpen={isHospitalModalOpen} 
        onClose={closeHospitalModal} 
      />
      <AddParkingModal 
        isOpen={isParkingModalOpen} 
        onClose={closeParkingModal} 
      />
      <AddDepartmentModal 
        isOpen={isDepartmentModalOpen} 
        onClose={closeDepartmentModal} 
      />
    </div>
  );
};

export default page;