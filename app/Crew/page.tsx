"use client"

import React, { useState } from 'react';
import { ChevronDown, Plus, X, Menu, Bell, Pencil } from 'lucide-react';

// --- Type Definitions ---
interface TalentMember {
  name: string;
  character: string;
  rate: string;
  role: string;
  days: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// --- Common Modal Component ---
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Overlay: bg-zinc-950/70 provides a dark, slightly translucent background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-zinc-900 rounded-xl shadow-2xl w-full max-w-lg p-6 flex flex-col gap-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal Body */}
        {children}
      </div>
    </div>
  );
};

// --- Add Talent Modal ---
const AddTalentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Talent">
      <div className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Name" 
          className="p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          defaultValue="Pedro Pascal"
        />
        <select
          className="p-3 rounded-lg bg-zinc-800 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          defaultValue="Jamie"
        >
          <option value="Jamie" className="bg-zinc-800">Jamie</option>
          <option value="Character 2" className="bg-zinc-800">Character 2</option>
        </select>
        <select
          className="p-3 rounded-lg bg-zinc-800 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled className="bg-zinc-800">Select Option (Role Category)</option>
          <option value="Lead Role" className="bg-zinc-800">Lead Role</option>
          <option value="Supporting Role" className="bg-zinc-800">Supporting Role</option>
        </select>

        <div className="flex gap-4">
          <select
            className="flex-1 p-3 rounded-lg bg-zinc-800 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled className="bg-zinc-800">Select Option (Union affiliations or SAG)</option>
            <option value="SAG Union" className="bg-zinc-800">SAG Union</option>
            <option value="Non-Union" className="bg-zinc-800">Non-Union</option>
          </select>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500">$</span>
            <input 
              type="text" 
              placeholder="Daily Rate" 
              className="w-full p-3 pl-6 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
        <button 
          onClick={onClose} 
          className="px-4 py-2 rounded-lg text-zinc-300 font-semibold hover:bg-zinc-800 transition"
        >
          Cancel
        </button>
        <button 
          onClick={onClose} 
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

// --- Add Producer Modal ---
const AddProducerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Producer">
      <div className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Name" 
          className="p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          defaultValue="Ben Affleck"
        />
        <input 
          type="text" 
          placeholder="Contact Details" 
          className="p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          defaultValue="(123) 456-7899"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
        <button onClick={onClose} className="px-4 py-2 rounded-lg text-zinc-300 font-semibold hover:bg-zinc-800 transition">
          Cancel
        </button>
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
          Create
        </button>
      </div>
    </Modal>
  );
};

// --- Add Director Modal ---
const AddDirectorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Director">
      <div className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Name" 
          className="p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          defaultValue="David Fincher"
        />
        <input 
          type="text" 
          placeholder="Contact Details" 
          className="p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          defaultValue="(123) 456-7899"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
        <button onClick={onClose} className="px-4 py-2 rounded-lg text-zinc-300 font-semibold hover:bg-zinc-800 transition">
          Cancel
        </button>
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
          Create
        </button>
      </div>
    </Modal>
  );
};

// --- Main Crew Management Component ---
const CrewManagement = () => {
  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);
  const [isProducerModalOpen, setIsProducerModalOpen] = useState(false);
  const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);

  const talentMembers: TalentMember[] = [
    { name: 'Pedro Pascal', character: 'Jamie', rate: '$780', role: 'Lead Role • SAG Union', days: '14 days' },
    { name: 'Ana De Armes', character: 'SYSTEM (V.O.)', rate: '$780', role: 'Lead Role • SAG Union', days: '14 days' },
    { name: 'Tom Hiddleston', character: 'John', rate: '$780', role: 'Lead Role • SAG Union', days: '14 days' },
    { name: 'Jon Hamm', character: 'Hamy', rate: '$780', role: 'Lead Role • SAG Union', days: '14 days' },
  ];

  const producers = ['Ben Affleck', 'Ben Stiller'];
  const directors = ['Steven Spielberg'];

  return (
    <div className="w-full h-screen bg-zinc-950 flex overflow-hidden">
      {/* Sidebar (Empty in provided code, kept for structure) */}
      
      {/* Main Content */}
      <div className="flex-1 p-2.5 flex flex-col gap-2.5">
        <div className="flex-1 bg-zinc-900 rounded-xl overflow-hidden relative">
          
          {/* Top Bar (Simplified to focus on Crew Management context) */}
          <div className="w-full p-2 bg-zinc-900 border-b border-zinc-800 flex items-center">
            <button className="h-9 px-3 rounded-lg flex items-center gap-2 hover:bg-zinc-800">
              <div className="text-zinc-400 text-sm font-semibold">Untitled Project</div>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          {/* Content Area */}
          <div className="absolute top-14 left-9 right-9 bottom-0 overflow-y-auto">
            {/* Title */}
            <div className="pt-16 pb-8">
              <h1 className="text-white text-[42px] font-semibold leading-tight">Crew</h1>
            </div>

            {/* Talent Section */}
            <div className="mb-10 flex flex-col gap-2">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-zinc-800">
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </button>
                    <h2 className="text-white text-xl font-semibold">Talent</h2>
                  </div>
                  <span className="text-zinc-600 text-sm">{talentMembers.length} members</span>
                </div>
                <button 
                  onClick={() => setIsTalentModalOpen(true)}
                  className="h-9 px-3 rounded-lg border border-zinc-700 shadow-sm flex items-center gap-2 hover:bg-zinc-800"
                >
                  <Plus className="w-4 h-4 text-zinc-300" />
                  <span className="text-zinc-300 text-sm font-semibold">Add Talent</span>
                </button>
              </div>

              {/* Table Header */}
              <div className="px-3 py-1 rounded flex">
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold">Name</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold">Character</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold">Per Day Rate</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold">Working Days</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col gap-1">
                {talentMembers.map((member, idx) => (
                  <div key={idx} className="p-3 bg-zinc-800/50 rounded-lg flex hover:bg-zinc-800 transition cursor-pointer group">
                    <div className="flex-1 p-2.5 flex items-center">
                      <div className="text-white text-sm font-semibold">{member.name}</div>
                    </div>
                    <div className="flex-1 p-2.5 flex items-center">
                      <div className="text-zinc-400 text-sm">{member.character}</div>
                    </div>
                    <div className="flex-1 p-2.5 flex flex-col justify-center gap-2">
                      <div className="text-zinc-400 text-sm">{member.rate}</div>
                      <div className="text-zinc-500 text-xs">{member.role}</div>
                    </div>
                    <div className="flex-1 p-2.5 flex items-center justify-between">
                      <div className="text-zinc-400 text-sm">{member.days}</div>
                      {/* Edit Icon on Hover (Simulating the Crew Options image) */}
                      <button className="h-7 w-7 rounded-full flex items-center justify-center bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Pencil className="w-3.5 h-3.5 text-zinc-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Producers Section */}
            <div className="mb-10 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-zinc-800">
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </button>
                    <h2 className="text-white text-xl font-semibold">Producers</h2>
                  </div>
                  <span className="text-zinc-600 text-sm">{producers.length} members</span>
                </div>
                <button 
                  onClick={() => setIsProducerModalOpen(true)}
                  className="h-9 px-3 rounded-lg border border-zinc-700 shadow-sm flex items-center gap-2 hover:bg-zinc-800"
                >
                  <Plus className="w-4 h-4 text-zinc-300" />
                  <span className="text-zinc-300 text-sm font-semibold">Add Producer</span>
                </button>
              </div>

              <div className="flex gap-4">
                {producers.map((producer, idx) => (
                  <div 
                    key={idx} 
                    className="w-[165px] h-[165px] px-5 bg-zinc-800/50 rounded-lg flex flex-col justify-center items-center gap-2 relative group hover:bg-zinc-800 transition cursor-pointer"
                  >
                    <div className="text-white text-base font-semibold text-center">{producer}</div>
                     {/* Edit Icon (Simulating the Crew Options image) */}
                     <button className="absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Pencil className="w-3.5 h-3.5 text-zinc-300" />
                      </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Directors Section */}
            <div className="mb-10 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-zinc-800">
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </button>
                    <h2 className="text-white text-xl font-semibold">Directors</h2>
                  </div>
                  <span className="text-zinc-600 text-sm">{directors.length} members</span>
                </div>
                <button 
                  onClick={() => setIsDirectorModalOpen(true)}
                  className="h-9 px-3 rounded-lg border border-zinc-700 shadow-sm flex items-center gap-2 hover:bg-zinc-800"
                >
                  <Plus className="w-4 h-4 text-zinc-300" />
                  <span className="text-zinc-300 text-sm font-semibold">Add Director</span>
                </button>
              </div>

              <div className="flex gap-4">
                {directors.map((director, idx) => (
                  <div 
                    key={idx} 
                    className="w-[165px] h-[165px] px-5 bg-zinc-800/50 rounded-lg flex flex-col justify-center items-center gap-2 relative group hover:bg-zinc-800 transition cursor-pointer"
                  >
                    <div className="text-white text-base font-semibold text-center">{director}</div>
                    {/* Edit Icon (Simulating the Crew Options image) */}
                    <button className="absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Pencil className="w-3.5 h-3.5 text-zinc-300" />
                      </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals placed at the end of the component to render on top */}
      <AddTalentModal isOpen={isTalentModalOpen} onClose={() => setIsTalentModalOpen(false)} />
      <AddProducerModal isOpen={isProducerModalOpen} onClose={() => setIsProducerModalOpen(false)} />
      <AddDirectorModal isOpen={isDirectorModalOpen} onClose={() => setIsDirectorModalOpen(false)} />
    </div>
  );
};

export default CrewManagement;