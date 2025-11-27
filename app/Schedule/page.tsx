"use client"

import React, { useState } from 'react';
import { Calendar, Bell, Menu, Search, Plus, X, Check, ChevronDown } from 'lucide-react';

interface Scene {
  id: string;
  number: string;
  title: string;
  type: 'INT' | 'EXT';
  timeOfDay: 'Sunrise' | 'Morning' | 'Day' | 'Evening' | 'Night';
  isScheduled: boolean;
  scheduledDate?: string;
  characters?: number;
  props?: number;
  extras?: number;
}

// ----------------------------------------------------------------------
// 1. SCENE CARD COMPONENT (Draggable Source)
// ----------------------------------------------------------------------

const SceneCard = ({ scene, isSelected, onClick, onDragStart }: { scene: Scene; isSelected: boolean; onClick: () => void; onDragStart: (e: React.DragEvent) => void }) => {
  const getColorClass = () => {
    const time = scene.timeOfDay.toLowerCase();
    const type = scene.type.toLowerCase();
    
    if (time === 'sunrise' && type === 'int') return 'bg-[#FFEDD4] text-black';
    if (time === 'sunrise' && type === 'ext') return 'bg-[#FFD6A8] text-black';
    if (time === 'morning' && type === 'int') return 'bg-[#FCE7F3] text-black';
    if (time === 'morning' && type === 'ext') return 'bg-[#FCCEE8] text-black';
    if (time === 'day') return 'bg-[#FFDF20] text-black';
    if (time === 'night' && type === 'int') return 'bg-[#432DD7] text-white';
    if (time === 'night' && type === 'ext') return 'bg-[#007A55] text-white';
    if (time === 'evening' && type === 'ext') return 'bg-[#44403B] text-white';
    if (time === 'evening' && type === 'int') return 'bg-[#3F3F46] text-white';
    
    return 'bg-gray-700 text-white';
  };

  const colorClass = getColorClass();
  const isLight = colorClass.includes('text-black');

  return (
    <div 
      className={`h-9 px-1 pr-3 ${colorClass} rounded flex items-center gap-3 cursor-grab transition-all ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#18181B]' : ''
      }`}
      onClick={onClick}
      draggable="true" // Make the card draggable
      onDragStart={onDragStart} // Start the drag operation
    >
      <div className={`w-6 h-6 flex items-center justify-center ${isLight ? 'opacity-50' : 'opacity-50'}`}>
        {scene.isScheduled ? (
          <Check className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`text-sm font-semibold ${isLight ? 'opacity-50' : 'opacity-50'}`}>
          {scene.number}
        </span>
        <span className="text-sm font-semibold">
          {scene.type} {scene.title}
        </span>
      </div>
    </div>
  );
};

export default function FilmSchedulingApp() {
  const [scenes, setScenes] = useState<Scene[]>([
    { id: '1', number: '1A', title: 'Kitchen Sunrise', type: 'INT', timeOfDay: 'Sunrise', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '2', number: '1A', title: 'Kitchen Sunrise', type: 'EXT', timeOfDay: 'Sunrise', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '3', number: '1A', title: 'Kitchen Morning', type: 'INT', timeOfDay: 'Morning', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '4', number: '1A', title: 'Kitchen Morning', type: 'EXT', timeOfDay: 'Morning', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '5', number: '1A', title: 'Kitchen Day', type: 'EXT', timeOfDay: 'Day', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '6', number: '1A', title: 'Kitchen Night', type: 'INT', timeOfDay: 'Night', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '7', number: '1A', title: 'Kitchen Night', type: 'EXT', timeOfDay: 'Night', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '8', number: '1A', title: 'Kitchen Evening', type: 'EXT', timeOfDay: 'Evening', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '9', number: '1A', title: 'Kitchen Evening', type: 'INT', timeOfDay: 'Evening', isScheduled: false, characters: 1, props: 3, extras: 2 },
    { id: '10', number: '1A', title: 'Kitchen Evening', type: 'INT', timeOfDay: 'Evening', isScheduled: true, scheduledDate: '7 June', characters: 1, props: 3, extras: 2 },
    { id: '11', number: '1A', title: 'Kitchen Evening', type: 'INT', timeOfDay: 'Evening', isScheduled: true, scheduledDate: '8 June', characters: 1, props: 3, extras: 2 },
    { id: '12', number: '1A', title: 'Kitchen Evening', type: 'INT', timeOfDay: 'Evening', isScheduled: true, scheduledDate: '9 June', characters: 1, props: 3, extras: 2 },
    { id: '13', number: '1A', title: 'Kitchen Morning', type: 'EXT', timeOfDay: 'Night', isScheduled: true, scheduledDate: '10 June', characters: 1, props: 3, extras: 2 },
    { id: '14', number: '1A', title: 'Kitchen Evening', type: 'INT', timeOfDay: 'Evening', isScheduled: true, scheduledDate: '12 June', characters: 1, props: 3, extras: 2 },
  ]);

  const [filter, setFilter] = useState<'all' | 'unscheduled' | 'scheduled'>('unscheduled');
  const [selectedScenes, setSelectedScenes] = useState<Set<string>>(new Set());
  
  // ----------------------------------------------------------------------
  // 2. DRAG & DROP STATE
  // ----------------------------------------------------------------------
  const [dropTargetId, setDropTargetId] = useState<string | null>(null); // ID of the date/slot being hovered over
  const [isDragging, setIsDragging] = useState(false); // Global flag for drag state

  const DAYS = ['7 June', '8 June', '9 June', '10 June', '11 June', '12 June', '13 June', '14 June'];
  
  // --- Drag Handlers ---

  const handleDragStart = (e: React.DragEvent, sceneId: string) => {
    e.dataTransfer.setData("text/plain", sceneId);
    e.currentTarget.style.opacity = '0.4';
    setIsDragging(true);
  };
  
  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.style.opacity = '1';
    setIsDragging(false);
    setDropTargetId(null);
  };

  const handleDragOver = (e: React.DragEvent, date: string) => {
    e.preventDefault(); // Necessary to allow dropping
    setDropTargetId(date);
  };
  
  const handleDragLeave = () => {
      setDropTargetId(null);
  };

  // --- Drop Handler ---

  const handleDrop = (e: React.DragEvent, date: string) => {
    e.preventDefault();
    setDropTargetId(null);
    setIsDragging(false);
    
    const sceneId = e.dataTransfer.getData("text/plain");

    setScenes(prevScenes => {
        return prevScenes.map(scene => {
            if (scene.id === sceneId) {
                // Find the existing scheduled date and remove it from that day first
                const targetScene = prevScenes.find(s => s.id === sceneId);
                
                return {
                    ...scene,
                    isScheduled: true,
                    scheduledDate: date,
                };
            }
            return scene;
        });
    });
  };

  // ----------------------------------------------------------------------
  // 3. DATA PROCESSING
  // ----------------------------------------------------------------------
  
  const filteredScenes = scenes.filter(scene => {
    if (filter === 'all') return true;
    if (filter === 'unscheduled') return !scene.isScheduled;
    if (filter === 'scheduled') return scene.isScheduled;
    return true;
  });

  const scheduledCount = scenes.filter(s => s.isScheduled).length;
  const unscheduledCount = scenes.filter(s => !s.isScheduled).length;

  const toggleSceneSelection = (sceneId: string) => {
    setSelectedScenes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sceneId)) {
        newSet.delete(sceneId);
      } else {
        newSet.add(sceneId);
      }
      return newSet;
    });
  };

  const scheduleByDate = scenes
    .filter(s => s.isScheduled && s.scheduledDate)
    .reduce((acc, scene) => {
        const date = scene.scheduledDate!;
        if (!acc[date]) acc[date] = [];
        acc[date].push(scene);
        return acc;
    }, {} as Record<string, Scene[]>);


  const getDayOfWeek = (dateStr: string) => {
    const dayMap: Record<string, string> = {
        '7 June': 'Mon', '8 June': 'Tue', '9 June': 'Wed', '10 June': 'Thu', '11 June': 'Today', 
        '12 June': 'Sat', '13 June': 'Sun', '14 June': 'Mon'
    };
    return dayMap[dateStr] || dateStr;
  };

  // Hardcoded Break for 13 June to preserve the original structure
  const breakDays = {
      '13 June': { title: 'Break', isBreak: true, color: 'bg-gradient-to-r from-purple-600 to-blue-600' }
  };
  
  // ----------------------------------------------------------------------
  // 4. RENDERING JSX
  // ----------------------------------------------------------------------


  const renderScheduledScene = (scene: Scene) => {
      const getColorClass = () => {
        const time = scene.timeOfDay.toLowerCase();
        const type = scene.type.toLowerCase();
        
        // Use the same logic as SceneCard for coloring
        if (time === 'day') return 'bg-[#FFDF20] text-black';
        if (time === 'night' && type === 'ext') return 'bg-[#007A55] text-white';
        if (time === 'evening' && type === 'int') return 'bg-[#3F3F46] text-white';
        if (time === 'sunrise' && type === 'int') return 'bg-[#FFEDD4] text-black';
        if (time === 'sunrise' && type === 'ext') return 'bg-[#FFD6A8] text-black';
        
        // Fallback for other cases
        return 'bg-[#432DD7] text-white';
      };
      
      const colorClass = getColorClass();
      const isLight = colorClass.includes('text-black');
      const textColorClass = isLight ? 'text-black' : 'text-white';
      const opacityClass = isLight ? 'opacity-50' : 'opacity-50';

      return (
          <div key={scene.id} className={`p-3 rounded-lg flex items-center gap-3 mt-2 ${colorClass}`}>
            <Menu className={`w-6 h-6 ${opacityClass} ${textColorClass}`} />
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-semibold ${opacityClass} ${textColorClass}`}>
                {scene.number}
              </span>
              <span className={`text-sm font-semibold ${textColorClass}`}>
                {scene.type} {scene.title}
              </span>
            </div>
            <span className={`text-xs ${opacityClass} ml-auto ${textColorClass}`}>
              {scene.characters} Character • {scene.props} Props • {scene.extras} Extras
            </span>
          </div>
      );
  }

  return (
    <div className="w-full h-screen bg-[#09090B] flex overflow-hidden ">
      
 

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <div className="h-[52px] bg-[#18181B] border-b border-[#27272A] px-2 flex items-center">
          <button className="h-9 px-3 rounded-lg flex items-center gap-2 hover:bg-[#27272A]">
            <span className="text-[#9F9FA9] text-sm font-semibold">Untitled Project</span>
            <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
          </button>
        </div>

        {/* Title and Tabs */}
        <div className="px-9 pt-16 pb-8 bg-[#18181B]">
          <h1 className="text-white text-[42px] font-semibold mb-8">Scheduling</h1>
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-3">
              <span className="text-[#00BCFF] text-sm font-semibold">Shooting Schedule</span>
              <div className="w-full h-1 bg-[#00BCFF] rounded-full"></div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[#9F9FA9] text-sm font-semibold">Day-out-of-Days</span>
              <div className="w-full h-1 bg-transparent rounded-full"></div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[#9F9FA9] text-sm font-semibold">Call Sheets</span>
              <div className="w-full h-1 bg-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex bg-[#18181B]">
          {/* Scenes Sidebar */}
          <div className="w-[272px] border-r border-[#27272A] p-5 ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-base font-semibold">Scenes</h2>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#27272A]">
                    <Search className="w-4 h-4 text-[#9F9FA9]" />
                  </button>
                </div>
                
                <span className="text-sm font-medium text-[#9F9FA9]">
                    Drag scenes from the list and drop them into your schedule.
                </span>
                <span className="text-lg font-semibold text-white">
                    {unscheduledCount} scenes left
                </span>

                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setFilter('all')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-sm font-medium transition-colors ${
                      filter === 'all' 
                        ? 'bg-[#D4D4D8] text-black' 
                        : 'bg-[#27272A] text-[#9F9FA9] border border-[#27272A]'
                    }`}
                  >
                    <span>All</span>
                    <span className={filter === 'all' ? 'text-[#71717B]' : 'text-[#52525C]'}>
                      {scenes.length}
                    </span>
                  </button>
                  <button 
                    onClick={() => setFilter('unscheduled')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-sm font-semibold transition-colors ${
                      filter === 'unscheduled' 
                        ? 'bg-[#00BCFF]/20 text-[#00BCFF]' // Highlight unscheduled filter
                        : 'bg-[#27272A] text-[#9F9FA9] border border-[#27272A]'
                    }`}
                  >
                    <span>Unscheduled</span>
                    <span className={filter === 'unscheduled' ? 'text-[#00BCFF]' : 'text-[#52525C]'}>
                      {unscheduledCount}
                    </span>
                  </button>
                  <button 
                    onClick={() => setFilter('scheduled')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-sm font-medium transition-colors ${
                      filter === 'scheduled' 
                        ? 'bg-[#D4D4D8] text-black' 
                        : 'bg-[#27272A] text-[#9F9FA9] border border-[#27272A]'
                    }`}
                  >
                    <span>Scheduled</span>
                    <span className={filter === 'scheduled' ? 'text-[#71717B]' : 'text-[#52525C]'}>
                      {scheduledCount}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {filteredScenes.map(scene => (
                  <SceneCard 
                    key={scene.id} 
                    scene={scene} 
                    isSelected={selectedScenes.has(scene.id)}
                    onClick={() => toggleSceneSelection(scene.id)}
                    onDragStart={(e) => handleDragStart(e, scene.id)}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Schedule View */}
          <div className="flex-1 flex flex-col ">
            <div className="p-5 flex items-center justify-between border-b border-[#27272A]">
              <div className="w-[273px] h-9 px-4 rounded-xl border border-[#3F3F47] flex items-center gap-3">
                <Search className="w-4 h-4 text-[#D4D4D8]" />
                <span className="text-sm text-[#71717B]">Search</span>
              </div>
              <button className="h-9 px-3 bg-[#00BCFF] rounded-lg shadow-lg text-black text-sm font-semibold hover:bg-[#00A8E6]">
                Export
              </button>
            </div>

            <div className="flex-1 ">
              {DAYS.map(date => {
                const isDropTarget = dropTargetId === date;
                const scenesForDay = scheduleByDate[date] || [];
                const breakInfo = breakDays[date];

                return (
                  <div 
                    key={date} 
                    className={`border-b border-[#27272A] py-5 px-8 flex items-start gap-8 transition-colors ${
                      isDropTarget ? 'bg-[#27272A]' : ''
                    }`}
                    onDragOver={(e) => handleDragOver(e, date)}
                    onDrop={(e) => handleDrop(e, date)}
                    onDragLeave={handleDragLeave}
                  >
                    {/* Date Sidebar */}
                    <div className="flex flex-col gap-0.5 min-w-[60px] pt-1">
                      <span className="text-white text-sm font-semibold">{date}</span>
                      <span className="text-[#9F9FA9] text-xs">
                        {getDayOfWeek(date)}
                      </span>
                    </div>

                    {/* Schedule Content / Drop Zone */}
                    <div className="flex-1 min-h-[36px] flex flex-col gap-2">
                        {scenesForDay.map(renderScheduledScene)}

                        {breakInfo ? (
                            // Render Break (as seen in 13 June)
                            <div className={`p-3 ${breakInfo.color} rounded-lg flex items-center justify-center relative mt-2`}>
                              <span className="text-white text-base font-semibold">{breakInfo.title}</span>
                              <button className="absolute right-3 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10">
                                <X className="w-4 h-4 text-[#9F9FA9]" />
                              </button>
                            </div>
                        ) : isDropTarget ? (
                            // Drop State visual feedback
                            <div className="p-4 border-2 border-dashed border-[#1A6CFF] rounded-lg flex items-center justify-center h-full min-h-[50px] bg-[#1A6CFF]/10">
                                <span className="text-sm font-semibold text-[#1A6CFF]">Drop your scene here</span>
                            </div>
                        ) : scenesForDay.length === 0 ? (
                            // Empty day with Add Break button
                            <div className="flex justify-center mt-2">
                                <button className="h-9 px-3 rounded-lg flex items-center gap-2 hover:bg-[#27272A] text-[#9F9FA9]">
                                    <Plus className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Add Break</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}