"use client"

import React, { useState } from 'react';
// Import LucideIcon type for prop typing
import { 
  LayoutGrid, Bell, FileText, Calendar, DollarSign, Image, Users, 
  MapPin, Package, ChevronDown, Menu, LucideIcon 
} from 'lucide-react';

// Define the two possible widths for Tailwind
const SIDEBAR_WIDTH_FULL = 'w-[262px]';
const SIDEBAR_WIDTH_COLLAPSED = 'w-[72px]'; // A width to hold just the icons

// Define the shape of the props for the NavLink component
interface NavLinkProps {
  icon: LucideIcon; // Icon is a Lucide component/type
  text: string;
  isActive?: boolean;
  hasNotification?: boolean;
}

export default function Sidebar() {
  // State to manage the open/closed status of the sidebar. 
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine the current width class
  const sidebarWidthClass = isExpanded ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_COLLAPSED;

  // Custom component for a navigation link
  // Use the defined NavLinkProps interface for typing
  const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, text, isActive = false, hasNotification = false }) => (
    <button 
      // ACTION: Reduced padding from py-3 to **py-2** for a smaller link size
      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-200 
        ${isActive ? 'bg-[#27272A]' : 'hover:bg-zinc-900'}
      `}
    >
      <div className="relative flex-shrink-0">
        <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-zinc-100' : 'text-zinc-500'}`} />
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-[7px] h-[7px] bg-[#FB2C36] rounded-full" />
        )}
      </div>
      {/* Only render text if expanded */}
      {isExpanded && <span className={`text-sm font-medium ${isActive ? 'text-zinc-100' : 'text-zinc-500'}`}>{text}</span>}
    </button>
  );

  return (
    <>
      <div 
        className={`
          flex flex-col justify-between p-5 h-full border-r border-zinc-800 
          bg-[#09090B] transition-all duration-300 ease-in-out flex-shrink-0 
          ${sidebarWidthClass}
        `}
      >
        {/* ACTION: Added **flex-grow** to the content wrapper to push the profile to the bottom. 
           Removed the unnecessary 'gap-9' as it interfered with the spacing. */}
        <div className="flex flex-col **flex-grow**"> 
          
          {/* Logo / Header (Always stays at the top) */}
          <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} pl-1 mb-8`}>
            {/* Logo Brand Icon (always visible) */}
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
                <div className="flex flex-col gap-[1.73px]">
                    <div className="h-2 w-3 rounded border-[2.59px] border-[#9D9D9D]" />
                    <div className="h-2 w-3 rounded bg-[#9D9D9D]" />
                </div>
            </div>
            
            {/* Hamburger Button to toggle state */}
            <button 
              onClick={toggleSidebar}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-800"
            >
              <Menu className="w-4 h-4 text-zinc-500" />
            </button>
          </div>

          {/* Navigation (Will take up all remaining space above the profile) */}
          <div className="flex flex-col gap-6 **mb-auto**"> 
            
            {/* Main Nav */}
            <div className="flex flex-col gap-1">
              <NavLink icon={LayoutGrid} text="Dashboard" isActive={true} />
              <NavLink icon={Bell} text="Notifications" hasNotification={true} />
            </div>

            {/* Workflow Section */}
            <div className="flex flex-col gap-2">
              {isExpanded && (
                <div className="px-3 py-1">
                  <span className="text-[10px] font-medium text-[#52525C] tracking-[1.3px]">WORKFLOW</span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <NavLink icon={FileText} text="Script breakdown" />
                <NavLink icon={Calendar} text="Scheduling" />
                <NavLink icon={DollarSign} text="Budgeting" />
                <NavLink icon={Image} text="Storyboarding" />
              </div>
            </div>

            {/* Manage Section */}
            <div className="flex flex-col gap-2">
              {isExpanded && (
                <div className="px-3 py-1">
                  <span className="text-[10px] font-medium text-[#52525C] tracking-[1.3px]">MANAGE</span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <NavLink icon={Users} text="Crew" />
                <NavLink icon={Users} text="Characters" /> 
                <NavLink icon={MapPin} text="Sets and Locations" />
                <NavLink icon={Package} text="Production Elements" />
              </div>
            </div>
          </div>
        </div>

        {/* User Profile (Will be pushed to the very bottom by flex-grow on the content wrapper) */}
        {/* Added **mt-4** for a small visual separation from the navigation list */}
        <div className={`mt-4 flex items-center justify-between p-2 bg-[#27272A] rounded-xl transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="flex items-center gap-2">
            <div className="w-[34px] h-[34px] bg-[#FE9A00] rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-black text-xl font-semibold">J</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">John Doe</span>
              <span className="text-xs text-white/30">johndoe@gmail.com</span>
            </div>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-700 flex-shrink-0">
            <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
          </button>
        </div>
        
        {/* Collapsed User Icon (Collapsed View) */}
        {!isExpanded && (
            <div className="mt-4 flex items-center justify-center p-2 bg-[#27272A] rounded-xl">
              <div className="w-[34px] h-[34px] bg-[#FE9A00] rounded-md flex items-center justify-center">
                <span className="text-black text-xl font-semibold">J</span>
              </div>
            </div>
        )}

      </div>
    </>
  );
}