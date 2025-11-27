"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Calendar, FileText, Home, Users, ChevronDown, Menu, Search, X, Package, MapPin } from 'lucide-react';

// Hardcoded sample data for scene 1A, based on the images
const SCENE_1A_DATA = {
  title: "INT DAY",
  slug: "1A",
  sceneDescription: "INT. MODERN KITCHEN - DAY",
  elements: {
    schedule: [{ date: "Sep 1, Monday", time: "Add Time" }],
    characters: [
      { name: "Jamie", isExtra: false },
      { name: "System V.O", isExtra: false },
      { name: "Users", isExtra: true },
      { name: "Other Users", isExtra: true },
    ],
    props: ["Desk", "Laptop", "Book"],
    location: "INT. KITCHEN",
  },
  script: `INT. SMALL APARTMENT - DAY

Dim light spills from a desk lamp. Books are scattered. A laptop glows.
JAMIE (mid-20s, thoughtful) stares at the screen, frustrated.

(muttering)                     JAMIE
I'm done. I can't keep 
pretending this is working.

The screen glitches, then shifts. A clean interface appears. A soft chime.

                                SYSTEM (V.O.)
Ready to learn your way?

Jamie pauses. Clicks.

INT. DREAMLIKE MONTAGE - VARIOUS

Quick flashes: Jamie watching videos, scribbling notes, smiling as progress bars tick forward. Other USERS appear, laughing, learning, growing

INT. SMALL APARTMENT - NIGHT

Dim light spills from a desk lamp. Books are scattered. A laptop glows.
JAMIE (mid-20s, thoughtful) stares at the screen, frustrated.

(muttering)                     JAMIE
I'm done. I can't keep 
pretending this is working.

The screen glitches, then shifts. A clean interface appears. A soft chime.
`,
};


export default function ScriptBreakdownApp() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTimeFilter, setShowTimeFilter] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);
  const [activeDatePicker, setActiveDatePicker] = useState(null); 
  // ⬅️ NEW STATE: Manages the open/closed state and data for the Scene Sidebar
  const [selectedSceneData, setSelectedSceneData] = useState(null); 

  const timeFilterButtonRef = useRef(null);
  const sortByButtonRef = useRef(null);
  const datePickerRef = useRef(null);
  
  // Ref for the sidebar to handle outside clicks/locking content
  const sceneSidebarRef = useRef(null); 


  // --- Scene Sidebar Components (Integrated) ---

  const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="border-b border-[#27272A] pb-3 mb-3">
        <button
          className="w-full flex justify-between items-center text-left text-zinc-300 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm font-semibold">{title}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
        {isOpen && <div className="mt-3 text-sm text-[#9F9FA9]">{children}</div>}
      </div>
    );
  };

  const SceneSidebar = ({ sceneData, onClose }) => {
    const [activeSidebarTab, setActiveSidebarTab] = useState<'Elements' | 'Script'>('Elements');

    // Destructure data for clarity
    const { slug, elements, script, sceneDescription } = sceneData;

    const renderElements = () => (
      <div className="p-4 overflow-y-auto">
        <CollapsibleSection title="Shooting Schedule">
          <div className="bg-[#18181B] p-3 rounded-lg flex justify-between items-center mb-2">
            <span className="text-sm">{elements.schedule[0].date}</span>
            <button className="text-xs text-[#1A6CFF] font-medium">Add Time</button>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Characters">
          {elements.characters.filter(c => !c.isExtra).map((char) => (
            <div key={char.name} className="flex justify-between items-center mb-2">
              <span>{char.name}</span>
              <button className="text-xs text-[#1A6CFF] hover:underline">Assign Cast</button>
            </div>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Extras">
          {elements.characters.filter(c => c.isExtra).map((char) => (
            <div key={char.name} className="flex justify-between items-center mb-2">
              <span>{char.name}</span>
              <button className="text-xs text-[#1A6CFF] hover:underline">Assign Cast</button>
            </div>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Props">
          {elements.props.map((prop) => (
            <div key={prop} className="mb-2">
              <span>{prop}</span>
            </div>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Location">
          <div className="mb-2">
            <span>{elements.location}</span>
          </div>
        </CollapsibleSection>
      </div>
    );

    const renderScript = () => (
      <div className="p-4 overflow-y-auto whitespace-pre-wrap font-mono text-xs text-[#9F9FA9] select-text">
        {script}
      </div>
    );

    return (
      <div ref={sceneSidebarRef} className="fixed top-0 right-0 h-full w-[350px] bg-[#18181B] z-40 flex flex-col shadow-2xl transition-transform duration-300">
        <div className="p-4 border-b border-[#27272A] flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white">{sceneDescription.split(' - ')[0]}</h2>
            <p className="text-sm text-[#9F9FA9]">
              <span className="font-semibold text-white">{slug}</span> • {sceneDescription.split(' - ')[1]}
            </p>
          </div>
          <button onClick={onClose} className="text-[#9F9FA9] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-[#27272A] p-0">
          <button
            className={`flex-1 py-3 text-sm font-semibold ${activeSidebarTab === 'Elements' ? 'text-white border-b-2 border-[#1A6CFF]' : 'text-[#9F9FA9] hover:text-white'}`}
            onClick={() => setActiveSidebarTab('Elements')}
          >
            Elements
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold ${activeSidebarTab === 'Script' ? 'text-white border-b-2 border-[#1A6CFF]' : 'text-[#9F9FA9] hover:text-white'}`}
            onClick={() => setActiveSidebarTab('Script')}
          >
            Script
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeSidebarTab === 'Elements' ? renderElements() : renderScript()}
        </div>
      </div>
    );
  };


  // --- Dropdown/Modal Components (Existing) ---

  const TimeFilterDropdown = ({ onClose, selectedRef }) => (
    <div
      ref={selectedRef}
      className="absolute z-30 mt-3 right-0 w-48 p-2 bg-[#18181B] rounded-xl shadow-2xl border border-[#3F3F47]"
    >
      <span className="text-[#9F9FA9] text-xs font-semibold px-3 py-1 block mb-1 uppercase">Time of Day</span>
      {['All', 'Day', 'Afternoon', 'Evening', 'Night'].map((time) => (
        <button
          key={time}
          onClick={() => { console.log('Time filter selected:', time); onClose(); }}
          className={`w-full text-left px-3 py-2 text-sm text-white rounded-lg transition-colors
            ${time === 'All' ? 'bg-[#00BCFF]/20 text-[#00BCFF]' : 'hover:bg-[#27272A]'}
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );

  const SortByDropdown = ({ onClose, selectedRef }) => (
    <div
      ref={selectedRef}
      className="absolute z-30 mt-3 right-0 w-48 p-2 bg-[#18181B] rounded-xl shadow-2xl border border-[#3F3F47]"
    >
      <span className="text-[#9F9FA9] text-xs font-semibold px-3 py-1 block mb-1 uppercase">Shooting Day</span>
      {['Closest First', 'Farthest First', 'Default Order'].map((sort) => (
        <button
          key={sort}
          onClick={() => { console.log('Sort selected:', sort); onClose(); }}
          className={`w-full text-left px-3 py-2 text-sm text-white rounded-lg transition-colors
            ${sort === 'Closest First' ? 'bg-[#00BCFF]/20 text-[#00BCFF]' : 'hover:bg-[#27272A]'}
          `}
        >
          {sort}
        </button>
      ))}
    </div>
  );
  
  const DatePickerComponent = ({ onClose, position }) => {
    // Hardcoded to July 2025 for demonstration, matching the image
    const month = 'July 2025';
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const days = [];
    
    // Add empty leading cells (July 1, 2025 is a Tuesday)
    for (let i = 0; i < 1; i++) days.push(<div key={`empty-${i}`} className="w-9 h-9"></div>); 
    
    // Add day cells for July (31 days)
    for (let day = 1; day <= 31; day++) {
      const isSelected = day === 13; // Highlight 13th as per the image
      days.push(
        <button
          key={day}
          onClick={() => { console.log('Date selected:', `${month} ${day}`); onClose(); }}
          className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-colors
            ${isSelected ? 'bg-[#00BCFF] text-white' : 'text-[#D4D4D8] hover:bg-[#27272A]'}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div
        ref={datePickerRef}
        className="fixed z-50 bg-[#18181B] p-4 rounded-xl shadow-2xl border border-[#3F3F47] w-[310px]"
        style={{
          // Position 10px below the button that opened it
          top: position.bottom + 10,
          left: position.left,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button className="text-white hover:text-[#00BCFF] transition-colors p-1 rounded-full"><ChevronDown className="w-4 h-4 rotate-90" /></button>
          <span className="text-white text-base font-semibold">{month}</span>
          <button className="text-white hover:text-[#00BCFF] transition-colors p-1 rounded-full"><ChevronDown className="w-4 h-4 -rotate-90" /></button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <span key={day} className="text-[#9F9FA9] text-xs font-semibold w-9 h-6 flex items-center justify-center">
              {day}
            </span>
          ))}
          {days}
        </div>
      </div>
    );
  };

  // --- Data (Existing) ---

  const statsCards = [
    { label: 'Total Scenes', value: '43', hasSubValue: false },
    { label: 'Tagged Scenes', value: '13', subValue: '/ 43' },
    { label: 'Characters', value: '15', hasSubValue: false },
    { label: 'Extras', value: '7', hasSubValue: false },
    { label: 'Props', value: '20', hasSubValue: false },
    { label: 'Sets and Locations', value: '9', hasSubValue: false },
  ];

  const sceneData = [
    { no: '1A', description: 'INT. MODERN KITCHEN - DAY', characters: 'Jamie, SYSTEM (V.O.)', extras: 'User, Various Users', props: 'Desk, Books, Laptop, Coffee Mug', schedule: '24 June 2025', data: SCENE_1A_DATA }, // ⬅️ Added data for Sidebar
    { no: '2B', description: 'EXT. CITY STREET - NIGHT', characters: 'Detective Rick, Suspect X', extras: 'Passersby, Cops', props: 'Pistol, Raincoat', schedule: null, data: null },
    { no: '3C', description: 'INT. WAREHOUSE - DAY', characters: 'The Boss', extras: 'Thugs', props: 'Crates, Chains', schedule: null, data: null },
    { no: '4D', description: 'EXT. FOREST CLEARING - SUNSET', characters: 'Ella, The Wanderer', extras: '', props: 'Map, Lantern', schedule: '13 July 2025', data: null },
    { no: '5E', description: 'INT. HOSPITAL ROOM - DAY', characters: 'Dr. Lee, Patient Zero', extras: 'Nurses', props: 'IV Drip, Monitor', schedule: null, data: null },
    { no: '6F', description: 'INT. CAR - NIGHT', characters: 'Maria, Driver', extras: '', props: 'GPS, Wallet', schedule: null, data: null },
  ];

  // --- Handlers & Effects ---
  
  // Effect to close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close filters/sort
      if (timeFilterButtonRef.current && !timeFilterButtonRef.current.contains(event.target)) {
        setShowTimeFilter(false);
      }
      if (sortByButtonRef.current && !sortByButtonRef.current.contains(event.target)) {
        setShowSortBy(false);
      }
      // Close date picker
      if (activeDatePicker && datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setActiveDatePicker(null);
      }
      if (selectedSceneData && sceneSidebarRef.current && !sceneSidebarRef.current.contains(event.target)) {
  
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDatePicker, selectedSceneData]);


  const handleDatePickerOpen = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    if (activeDatePicker && activeDatePicker.index === index) {
      setActiveDatePicker(null);
    } else {
      setActiveDatePicker({ index, bottom: rect.bottom, left: rect.left });
    }
  };

  const handleSceneSelect = (scene) => {
    if (scene.data) {
      setSelectedSceneData(scene.data);
    } else {
      // Optional: Show a message or a default view if no data is available
      console.log(`No detailed data for scene ${scene.no}`);
    }
  };

  // ⬅️ NEW HANDLER: Closes the Scene Sidebar
  const handleSceneClose = () => {
    setSelectedSceneData(null);
  };


  const mainContentMargin = selectedSceneData ? 'ml-[350px]' : 'ml-0';

  return (
    <div className="flex h-screen w-full bg-[#09090B] font-inter overflow-hidden">
      
      {/* ⬅️ Scene Sidebar (Always fixed at the start) */}
      {selectedSceneData && (
        <SceneSidebar 
          sceneData={selectedSceneData} 
          onClose={handleSceneClose} 
        />
      )}


      {/* Main Content - Shifts right when the Scene Sidebar is open */}
      <div className={`flex-1 p-[10px] transition-all duration-300 `}>
        <div className="h-full bg-[#18181B] rounded-xl relative overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="p-2 bg-[#18181B] border-b border-[#27272A] flex items-center">
            <button className="h-9 px-3 rounded-[10px] flex items-center gap-2 hover:bg-[#27272A] transition-colors">
              <span className="text-[#9F9FA9] text-sm font-semibold">Untitled Project</span>
              <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            
            {/* Title and Tabs */}
            <div className="px-9 pt-16 pb-[33px]">
              <h1 className="text-white text-[42px] font-semibold leading-[54.6px] mb-[33px]">
                Script Breakdown
              </h1>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => setActiveTab('script')}
                  className="flex flex-col items-center gap-3 group"
                >
                  <span className={`text-sm font-semibold ${activeTab === 'script' ? 'text-[#00BCFF]' : 'text-[#9F9FA9] group-hover:text-white'}`}>
                    Script
                  </span>
                  <div className={`h-1 w-full rounded-xl ${activeTab === 'script' ? 'bg-[#00BCFF]' : 'opacity-0'}`} />
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="flex flex-col items-center gap-3 group"
                >
                  <span className={`text-sm font-semibold ${activeTab === 'overview' ? 'text-[#00BCFF]' : 'text-[#9F9FA9] group-hover:text-white'}`}>
                    Overview
                  </span>
                  <div className={`h-1 w-full rounded-xl ${activeTab === 'overview' ? 'bg-[#00BCFF]' : 'opacity-0'}`} />
                </button>
              </div>
            </div>

            {/* Stats Cards (Existing) */}
            <div className="px-9 mb-8 grid grid-cols-6 gap-4">
              <div className="col-span-2 p-4 rounded-xl border border-[#3F3F47] flex items-stretch gap-8">
                <div className="flex-1 flex flex-col justify-between">
                  <span className="text-[#9F9FA9] text-sm">Total Scenes</span>
                  <span className="text-white text-[32px] font-semibold">43</span>
                </div>
                <div className="w-px bg-[#27272A]" />
                <div className="flex-1 flex flex-col justify-between">
                  <span className="text-[#9F9FA9] text-sm">Tagged Scenes</span>
                  <div className="flex items-end gap-[6px]">
                    <span className="text-white text-[32px] font-semibold leading-none">13</span>
                    <span className="text-[#9F9FA9] text-sm pb-1">/ 43</span>
                  </div>
                </div>
              </div>

              {statsCards.slice(2).map((card, index) => (
                <div key={index} className="p-4 rounded-xl border border-[#3F3F47] flex flex-col justify-between">
                  <span className="text-[#9F9FA9] text-sm">{card.label}</span>
                  <span className="text-white text-[32px] font-semibold">{card.value}</span>
                </div>
              ))}
            </div>

            {/* Scenes Section (Existing) */}
            <div className="px-9 pb-12">
              {/* Section Header (Filter/Sort Buttons - Existing) */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-white text-2xl font-semibold">Scenes</h2>
                <div className="flex items-center gap-4">
                  
                  {/* Time Filter */}
                  <div className="relative">
                    <button 
                      ref={timeFilterButtonRef}
                      onClick={() => {
                        setShowTimeFilter(!showTimeFilter);
                        setShowSortBy(false);
                      }}
                      className="h-11 px-4 rounded-xl border border-[#3F3F47] shadow-lg flex items-center gap-3 bg-[#18181B] hover:bg-[#27272A] transition-colors"
                    >
                      <span className="text-[#D4D4D8] text-base font-semibold">Time: All</span>
                      <ChevronDown className="w-6 h-6 text-[#D4D4D8]" />
                    </button>
                    {showTimeFilter && (
                      <TimeFilterDropdown 
                        onClose={() => setShowTimeFilter(false)} 
                        selectedRef={timeFilterButtonRef} 
                      />
                    )}
                  </div>

                  {/* Sort By */}
                  <div className="relative">
                    <button 
                      ref={sortByButtonRef}
                      onClick={() => {
                        setShowSortBy(!showSortBy);
                        setShowTimeFilter(false);
                      }}
                      className="h-11 px-4 rounded-xl border border-[#3F3F47] shadow-lg flex items-center gap-3 bg-[#18181B] hover:bg-[#27272A] transition-colors"
                    >
                      <span className="text-[#D4D4D8] text-base font-semibold">Sort By</span>
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    {showSortBy && (
                      <SortByDropdown 
                        onClose={() => setShowSortBy(false)} 
                        selectedRef={sortByButtonRef} 
                      />
                    )}
                  </div>

                  {/* Search Input */}
                  <div className="w-[295px] h-11 px-4 rounded-xl border border-[#3F3F47] bg-[#18181B] flex items-center gap-3">
                    <Search className="w-5 h-5 text-[#D4D4D8]" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="flex-1 bg-transparent text-[#D4D4D8] text-base font-semibold outline-none placeholder:text-[#D4D4D8]"
                    />
                  </div>
                </div>
              </div>

              {/* Table Header (Existing) */}
              <div className="px-3 py-1 rounded flex items-start mb-1 min-w-[1200px]">
                <div className="w-[87px] p-[10px] flex items-center justify-center">
                  <span className="text-[#71717B] text-sm font-semibold">No.</span>
                </div>
                <div className="w-[197px] p-[10px] flex items-center justify-center">
                  <span className="text-[#71717B] text-sm font-semibold">Scene Description</span>
                </div>
                <div className="w-[230px] p-[10px] flex items-center justify-center">
                  <span className="text-[#71717B] text-sm font-semibold">Characters</span>
                </div>
                <div className="w-[230px] p-[10px] flex items-center justify-center">
                  <span className="text-[#71717B] text-sm font-semibold">Extras</span>
                </div>
                <div className="w-[230px] p-[10px] flex items-center justify-center">
                  <span className="text-[#71717B] text-sm font-semibold">Props</span>
                </div>
                <div className="flex-1 p-[10px] flex items-center justify-center">
                  <span className="text-[#71717B] text-sm font-semibold">Schedule</span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col gap-1">
                {sceneData.map((scene, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-[#27272A]/60 hover:bg-[#27272A] rounded flex items-start min-w-[1200px] transition-colors cursor-pointer" // ⬅️ Added cursor-pointer
                    onClick={() => handleSceneSelect(scene)} // ⬅️ Added click handler to trigger sidebar
                  >
                    <div className="w-[87px] p-[10px] flex items-center justify-center">
                      <span className="text-[#FAFAFA] text-sm font-semibold">{scene.no}</span>
                    </div>
                    {/* The Scene Description 'box' is now the trigger */}
                    <div className="w-[197px] p-[10px] flex items-center justify-center">
                      <span className="text-[#FAFAFA] text-sm font-semibold">{scene.description}</span>
                    </div>
                    <div className="w-[230px] p-[10px] flex items-center justify-center">
                      <span className="text-[#9F9FA9] text-sm">{scene.characters}</span>
                    </div>
                    <div className="w-[230px] p-[10px] flex items-center justify-center">
                      <span className="text-[#9F9FA9] text-sm">{scene.extras}</span>
                    </div>
                    <div className="w-[230px] p-[10px] flex items-center justify-center">
                      <span className="text-[#9F9FA9] text-sm">{scene.props}</span>
                    </div>
                    
                    {/* Schedule Column (with Date Picker Trigger - Existing) */}
                    <div className="flex-1 p-[10px] flex items-center justify-start relative" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={(e) => handleDatePickerOpen(index, e)}
                        className={`h-9 px-3 rounded-[10px] border shadow-lg flex items-center gap-2 transition-all 
                          ${activeDatePicker && activeDatePicker.index === index 
                            ? 'border-[#00BCFF] bg-[#00BCFF]/10 text-[#00BCFF]' 
                            : 'border-[#3F3F47] bg-[#18181B] text-[#D4D4D8] hover:bg-[#27272A]'}`
                        }
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="text-[12px] font-semibold">
                          {scene.schedule || 'Set Shooting Day'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Date Picker Modal (Renders globally if active - Existing) */}
      {activeDatePicker && (
        <DatePickerComponent 
          onClose={() => setActiveDatePicker(null)} 
          position={activeDatePicker}
        />
      )}
    </div>
  );
}