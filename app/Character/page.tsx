

"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Bell, Menu, MoreHorizontal, UserPlus, X, ChevronRight, Trash2 } from 'lucide-react';

// --- Utility Components ---

// Context Menu Dropdown (Re-used from original code)
const ContextMenuDropdown = ({ onClose }) => (
  <div
    className="absolute right-12 top-1/2 -translate-y-1/2 w-48 p-1 bg-zinc-800 shadow-2xl rounded-xl z-50"
    onMouseLeave={onClose}
  >
    <div className="flex flex-col gap-1">
      <button className="w-full px-3 py-2 bg-zinc-700 rounded-lg text-white text-sm font-medium text-left hover:bg-zinc-600 transition-colors">
        Edit Image
      </button>
      <button className="w-full px-3 py-2 text-red-400 text-sm font-medium text-left hover:bg-zinc-700/50 rounded-lg transition-colors">
        Delete
      </button>
    </div>
  </div>
);



// --- Modal Components ---

// 1. Character Sidebar View Modal (Based on "Character Sidebar View (4).png")
const CharacterSidebarModal = ({ character, onClose, onDeleteCharacter }) => {
  const modalRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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
          <div className="text-white text-base font-medium">Edit Image</div>
          <button onClick={() => onDeleteCharacter(character.name)} className="text-red-500 hover:text-red-400 transition-colors">
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Character Info */}
          <div className="flex items-center gap-4">
            <img
              className="w-16 h-16 rounded-lg object-cover"
              src="https://via.placeholder.com/64x64/3F3F46/9CA3AF?text=CH" // Placeholder image for Jamie
              alt={character.name}
            />
            <div className="flex flex-col">
              <div className="text-sm text-zinc-400">Character</div>
              <h2 className="text-3xl font-semibold text-white">{character.name}</h2>
            </div>
          </div>

          {/* Talent */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-400">Talent</h3>
            <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
              <span className="text-lg font-medium text-white">{character.talent}</span>
              <button className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors">
                Unassign
              </button>
            </div>
          </div>

          {/* Appearance List (Representing the scenes) */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-400">Appearance</h3>
            {/* The provided image shows four identical scene tags. Hardcoding to reflect that structure. */}
            {Array(4).fill().map((_, index) => (
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

// 2. Delete Confirmation Modal (Based on "Section 2.png" - focusing on Character Delete)
const DeleteCharacterModal = ({ characterName, onCancel, onDeleteConfirm }) => (
  <div className="fixed inset-0 bg-black/75 z-[110] flex items-center justify-center">
    <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl w-full max-w-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">Delete Character?</h3>
        <button onClick={onCancel} className="text-zinc-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-zinc-400 text-sm mb-6">
        Are you sure you want to delete the character **"{characterName}"**? This will remove all tagged mentions in the script and cannot be undone.
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

const CharactersExtras = () => {
  const [selectedTab, setSelectedTab] = useState('characters');
  const [contextMenu, setContextMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState(null);

  const [charactersData, setCharactersData] = useState([
    {
      name: 'Jamie',
      talent: 'Pedro Pascal',
      appearance: '40% • 12 scenes',
      totalCost: '$ 10,920',
      hasImage: true
    },
    {
      name: 'SYSTEM (V.O.)',
      talent: null,
      appearance: '40% • 12 scenes',
      totalCost: '--',
      hasImage: true
    },
  ]);

  const extras = [
    {
      name: 'User',
      talent: null,
      appearance: '40% • 12 scenes',
      totalCost: '--',
      hasImage: true
    },
    {
      name: 'Other User',
      talent: null,
      appearance: '40% • 12 scenes',
      totalCost: '--',
      hasImage: true
    },
  ];

  // Logic to open the sidebar for a character
  const handleOpenSidebar = (character) => {
    setSelectedCharacter(character);
    setIsSidebarOpen(true);
  };

  // Logic to open the delete confirmation modal
  const handleDeleteCharacter = (name) => {
    setCharacterToDelete(name);
    setIsDeleteModalOpen(true);
    setIsSidebarOpen(false); // Close sidebar if delete is initiated from there
  };

  // Logic to confirm and execute deletion
  const handleConfirmDelete = () => {
    setCharactersData(prev => prev.filter(c => c.name !== characterToDelete));
    setIsDeleteModalOpen(false);
    setCharacterToDelete(null);
  };

  return (
    <div className="w-full h-screen bg-zinc-950 flex overflow-hidden">
    

      {/* Main Content */}
      <div className="flex-1 p-2.5 flex flex-col gap-2.5">
        <div className="flex-1 bg-zinc-900 rounded-xl overflow-hidden relative">
          {/* Top Bar (Placeholder) */}
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
              <h1 className="text-white text-[42px] font-semibold leading-tight">Characters & Extras</h1>
            </div>

            {/* Characters Section */}
            <div className="mb-10 flex flex-col gap-2">
              <div className="flex justify-start items-center gap-2 mb-4">
                <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors">
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </button>
                <h2 className="text-white text-xl font-semibold">Characters</h2>
                <span className="text-zinc-600 text-sm">{charactersData.length}</span>
              </div>

              {/* Table Header */}
              <div className="px-3 py-1 rounded flex">
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Name</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Talent</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Appearance</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Total Cost</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col gap-1">
                {charactersData.map((character, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-800/50 rounded-lg flex items-center relative cursor-pointer hover:bg-zinc-800 transition-colors"
                    onClick={() => handleOpenSidebar(character)} // Click to open sidebar
                  >
                    <div className="flex-1 p-2.5 flex items-center gap-3">
                      <img
                        className="w-9 h-9 rounded object-cover"
                        src="https://via.placeholder.com/35x35/3F3F46/9CA3AF?text=CH"
                        alt={character.name}
                      />
                      <div className="text-white text-sm font-semibold flex-1">{character.name}</div>
                    </div>
                    <div className="flex-1 p-2.5 flex items-center">
                      {character.talent ? (
                        <div className="text-zinc-400 text-sm flex-1">{character.talent}</div>
                      ) : (
                        <button className="h-9 px-3 rounded-lg flex items-center gap-2 hover:bg-zinc-700/50 transition-colors">
                          <UserPlus className="w-4 h-4 text-zinc-400" />
                          <span className="text-zinc-400 text-sm font-semibold">Assign Talent</span>
                        </button>
                      )}
                    </div>
                    <div className="flex-1 p-2.5 flex items-center">
                      <div className="text-zinc-400 text-sm flex-1">{character.appearance}</div>
                    </div>
                    <div className="flex-1 p-2.5 flex items-center">
                      <div className="text-zinc-400 text-sm flex-1">{character.totalCost}</div>
                    </div>
                    {/* Menu Button (Clicking the row handles the main action, menu is for extras) */}
                    <button
                      className="absolute right-3 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-zinc-700/30 transition-colors z-10"
                      onClick={(e) => { e.stopPropagation(); setContextMenu(`char-${idx}`); }} // Stop propagation to prevent sidebar opening
                    >
                      <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                    </button>
                    {contextMenu === `char-${idx}` && <ContextMenuDropdown onClose={() => setContextMenu(null)} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Extras Section (Retained structure from original code) */}
            <div className="mb-10 flex flex-col gap-2">
              <div className="flex justify-start items-center gap-2 mb-4">
                <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors">
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </button>
                <h2 className="text-white text-xl font-semibold">Extras</h2>
                <span className="text-zinc-600 text-sm">4</span>
              </div>

              {/* Table Header */}
              <div className="px-3 py-1 rounded flex">
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Name</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Talent</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Appearance</div>
                </div>
                <div className="flex-1 p-2.5">
                  <div className="text-zinc-500 text-sm font-semibold leading-6">Total Cost</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col gap-1">
                {extras.map((extra, idx) => (
                  <div key={idx} className="p-3 bg-zinc-800/50 rounded-lg flex items-center relative">
                    <div className="flex-1 p-2.5 flex items-center gap-3">
                      <img
                        className="w-9 h-9 rounded object-cover"
                        src="https://via.placeholder.com/35x35/3F3F46/9CA3AF?text=EX"
                        alt={extra.name}
                      />
                      <div className="text-white text-sm font-semibold flex-1">{extra.name}</div>
                    </div>
                    <div className="flex-1 p-2.5 flex items-center">
                      <button className="h-9 px-3 rounded-lg flex items-center gap-2 hover:bg-zinc-700/50 transition-colors">
                        <UserPlus className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-400 text-sm font-semibold">Assign Talent</span>
                      </button>
                    </div>
                    <div className="flex-1 p-2.5 flex items-center">
                      <div className="text-zinc-400 text-sm flex-1">{extra.appearance}</div>
                    </div>
                    <div className="flex-1 p-2.5 flex items-center">
                      <div className="text-zinc-400 text-sm flex-1">{extra.totalCost}</div>
                    </div>
                    <button
                      className={`absolute right-3 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        contextMenu === `extra-${idx}` ? 'bg-zinc-700/30' : 'hover:bg-zinc-700/30'
                      }`}
                      onMouseEnter={() => setContextMenu(`extra-${idx}`)}
                      onClick={(e) => { e.stopPropagation(); setContextMenu(`extra-${idx}`); }}
                    >
                      <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                    </button>
                    {contextMenu === `extra-${idx}` && <ContextMenuDropdown onClose={() => setContextMenu(null)} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER MODALS */}
      {isSidebarOpen && selectedCharacter && (
        <CharacterSidebarModal
          character={selectedCharacter}
          onClose={() => setIsSidebarOpen(false)}
          onDeleteCharacter={handleDeleteCharacter}
        />
      )}
      {isDeleteModalOpen && characterToDelete && (
        <DeleteCharacterModal
          characterName={characterToDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDeleteConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default CharactersExtras;