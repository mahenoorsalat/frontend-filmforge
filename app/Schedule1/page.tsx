"use client"

import React, { useState } from 'react';
import { Calendar, Bell, Menu, Search, ChevronDown } from 'lucide-react';


type ViewType = 'scenes' | 'talent';
type TabType = 'shooting' | 'dayOut' | 'callSheets';

interface WorkPeriod {
  startDate: number; // column index (0-5 for dates)
  endDate: number;
  type: 'start' | 'work' | 'finish';
}

interface Scene {
  id: string;
  number: string;
  title: string;
  workPeriods: WorkPeriod[];
}

interface Talent {
  id: string;
  name: string;
  workPeriods: WorkPeriod[];
}

const scenes: Scene[] = [
  { id: '1', number: '1A', title: 'INT KITCHEN EVENING', workPeriods: [{ startDate: 0, endDate: 3, type: 'work' }] },
  { id: '2', number: '1B', title: 'INT LIVING ROOM DAY', workPeriods: [{ startDate: 1, endDate: 3, type: 'work' }] },
  { id: '3', number: '1C', title: 'EXT PARK AFTERNOON', workPeriods: [{ startDate: 0, endDate: 3, type: 'work' }] },
  { id: '4', number: '1D', title: 'INT OFFICE MORNING', workPeriods: [{ startDate: 2, endDate: 3, type: 'work' }] },
  { id: '5', number: '1E', title: 'EXT BEACH SUNSET', workPeriods: [{ startDate: 2, endDate: 3, type: 'work' }] },
  { id: '6', number: '1F', title: 'INT CLASSROOM NOON', workPeriods: [{ startDate: 0, endDate: 3, type: 'work' }] },
  { id: '7', number: '1G', title: 'EXT CITY STREET NIGHT', workPeriods: [{ startDate: 2, endDate: 3, type: 'work' }] },
];

const talents: Talent[] = [
  { id: '1', name: 'Dianne Russell', workPeriods: [{ startDate: 1, endDate: 3, type: 'work' }] },
  { id: '2', name: 'Annette Black', workPeriods: [{ startDate: 1, endDate: 3, type: 'work' }] },
  { id: '3', name: 'Cody Fisher', workPeriods: [{ startDate: 0, endDate: 3, type: 'work' }] },
  { id: '4', name: 'Kristin Watson', workPeriods: [{ startDate: 0, endDate: 3, type: 'work' }] },
  { id: '5', name: 'Cameron Williamson', workPeriods: [{ startDate: 2, endDate: 3, type: 'work' }] },
  { id: '6', name: 'Courtney Henry', workPeriods: [{ startDate: 0, endDate: 3, type: 'work' }] },
  { id: '7', name: 'Arlene McCoy', workPeriods: [{ startDate: 4, endDate: 3, type: 'work' }] },
];

const dates = [
  { day: 'Tue', date: '8 June', isToday: false },
  { day: 'Wed', date: '9 June', isToday: false },
  { day: 'Thu', date: '10 June', isToday: false },
  { day: 'Today', date: '11 June', isToday: true },
  { day: 'Sat', date: '12 June', isToday: false },
  { day: 'Sun', date: '13 June', isToday: false },
];

const TimelineDots = ({ workPeriods }: { workPeriods: WorkPeriod[] }) => {
  const period = workPeriods[0];
  if (!period) return null;

  const getLeftPosition = (index: number) => {
    return index * 25; // 25% per column
  };

  return (
    <div className="absolute flex items-center" style={{ left: `${getLeftPosition(period.startDate)}%`, width: `${(period.endDate - period.startDate + 1) * 25}%` }}>
      <div className="relative w-full flex items-center justify-between px-3">
        {/* Gradient Line */}
        <div 
          className="absolute h-0.5 left-3 right-3 top-1/2 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, #FFDF20 0%, #DFC2FE 33%, #DFC2FE 67%, #05DF72 100%)'
          }}
        />
        
        {/* Start Dot */}
        <div className="w-3 h-3 bg-[#FFDF20] rounded-full z-10" />
        
        {/* Middle Dots */}
        <div className="w-3 h-3 bg-[#212124] rounded-full border-[3px] border-[#DFC2FE] z-10" />
        <div className="w-3 h-3 bg-[#212124] rounded-full border-[3px] border-[#DFC2FE] z-10" />
        
        {/* End Dot */}
        <div className="w-3 h-3 bg-[#05DF72] rounded-full z-10" />
      </div>
    </div>
  );
};

export default function FilmSchedulingApp() {
  const [activeTab, setActiveTab] = useState<TabType>('dayOut');
  const [viewType, setViewType] = useState<ViewType>('scenes');

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
        <div className="px-9 pt-16 pb-8 bg-[#18181B] border-b border-[#27272A]">
          <h1 className="text-white text-[42px] font-semibold mb-8">Scheduling</h1>
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setActiveTab('shooting')}
              className="flex flex-col items-center gap-3"
            >
              <span className={`text-sm font-semibold ${activeTab === 'shooting' ? 'text-[#00BCFF]' : 'text-[#9F9FA9]'}`}>
                Shooting Schedule
              </span>
              <div className={`w-full h-1 rounded-full ${activeTab === 'shooting' ? 'bg-[#00BCFF]' : 'opacity-0'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('dayOut')}
              className="flex flex-col items-center gap-3"
            >
              <span className={`text-sm font-semibold ${activeTab === 'dayOut' ? 'text-[#00BCFF]' : 'text-[#9F9FA9]'}`}>
                Day-out-of-Days
              </span>
              <div className={`w-full h-1 rounded-full ${activeTab === 'dayOut' ? 'bg-[#00BCFF]' : 'opacity-0'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('callSheets')}
              className="flex flex-col items-center gap-3"
            >
              <span className={`text-sm font-semibold ${activeTab === 'callSheets' ? 'text-[#00BCFF]' : 'text-[#9F9FA9]'}`}>
                Call Sheets
              </span>
              <div className={`w-full h-1 rounded-full ${activeTab === 'callSheets' ? 'bg-[#00BCFF]' : 'opacity-0'}`} />
            </button>
          </div>
        </div>

        {/* View Toggle and Today Button */}
        <div className="px-9 py-5 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between">
          <div className="p-1 bg-[#27272A] rounded-2xl flex items-center gap-2">
            <button 
              onClick={() => setViewType('scenes')}
              className={`px-2.5 py-1.5 rounded-xl text-sm font-semibold transition-colors ${
                viewType === 'scenes' 
                  ? 'bg-[#D4D4D8] text-black' 
                  : 'bg-transparent text-[#9F9FA9]'
              }`}
            >
              Scenes
            </button>
            <button 
              onClick={() => setViewType('talent')}
              className={`px-2.5 py-1.5 rounded-xl text-sm font-semibold transition-colors ${
                viewType === 'talent' 
                  ? 'bg-[#D4D4D8] text-black' 
                  : 'bg-transparent text-[#9F9FA9]'
              }`}
            >
              Talent
            </button>
          </div>
          <button className="h-9 px-3 rounded-lg border border-[#3F3F47] shadow-lg text-[#D4D4D8] text-sm font-semibold hover:bg-[#27272A]">
            Today
          </button>
        </div>

        {/* Timeline Grid */}
        <div className="flex-1  bg-[#18181B]">
          <div className="flex min-w-max">
            {/* Left Column - Labels */}
            <div className="flex-shrink-0 w-[256px] border-r border-[#27272A]">
              <div className="py-3.5 px-5 border-b border-[#27272A]">
                <div className="flex items-center justify-between">
                  <span className="text-[#9F9FA9] text-sm font-semibold">
                    {viewType === 'scenes' ? 'Scenes' : 'Talent'}
                  </span>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#27272A]">
                    <Search className="w-4 h-4 text-[#9F9FA9]" />
                  </button>
                </div>
              </div>
              
              {viewType === 'scenes' ? (
                scenes.map((scene) => (
                  <div key={scene.id} className="py-5 px-9 border-b border-[#27272A]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#71717B] text-sm font-semibold">{scene.number}</span>
                      <span className="text-white text-sm font-semibold">{scene.title}</span>
                    </div>
                  </div>
                ))
              ) : (
                talents.map((talent) => (
                  <div key={talent.id} className="py-5 px-9 border-b border-[#27272A]">
                    <span className="text-white text-sm font-semibold">{talent.name}</span>
                  </div>
                ))
              )}
            </div>

          {/* Main Timeline Wrapper */}
<div className="relative flex flex-1 ">
  
  {/* Timeline Cells */}
  <div className="flex flex-1">
    {dates.map((date, index) => (
      <div key={index} className="w-[164px] border-r border-[#27272A] flex-shrink-0">
        
        {/* Date Header */}
        <div className="p-4 border-b border-[#27272A] flex flex-col items-center gap-0.5">
          <span className={`text-xs font-semibold ${date.isToday ? 'text-[#FF6467]' : 'text-[#71717B]'}`}>
            {date.day}
          </span>
          <span className={`text-sm font-semibold ${date.isToday ? 'text-white' : 'text-[#9F9FA9]'}`}>
            {date.date}
          </span>
        </div>

        {/* Timeline Cells */}
        {(viewType === "scenes" ? scenes : talents).map((item) => (
          <div key={item.id} className="h-[60px] border-b border-[#27272A]" />
        ))}
      </div>
    ))}
  </div>

  {/* ABSOLUTE OVERLAY */}
  <div className="absolute top-[106px]  pointer-events-none"
       style={{ width: `calc(164px * ${dates.length})` }}>

    {(viewType === 'scenes' ? scenes : talents).map((item) => (
      <div key={item.id} className="relative h-[60px]">
        <TimelineDots workPeriods={item.workPeriods} />
      </div>
    ))}

  </div>
</div>
 </div>
        </div>

        {/* Legend Footer */}
        <div className="h-[53px] px-9 py-3.5 bg-[#27272A] shadow-[0px_-4px_12px_rgba(24,24,27,0.74)] flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#FFDF20] rounded-lg" />
            <div className="text-xs">
              <span className="text-[#D4D4D8] font-medium">Start Work </span>
              <span className="text-[#71717B] font-medium">(SW)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#FDA5D5] rounded-lg" />
            <div className="text-xs">
              <span className="text-[#D4D4D8] font-medium">Work </span>
              <span className="text-[#71717B] font-medium">(W)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#05DF72] rounded-lg" />
            <div className="text-xs">
              <span className="text-[#D4D4D8] font-medium">Work Finish </span>
              <span className="text-[#71717B] font-medium">(WF)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}