"use client"

import React, { useState } from 'react';
// --- UPDATED IMPORTS: Added Settings and LogOut ---
import { 
  LayoutGrid, Bell, FileText, Calendar, DollarSign, Image, Users, 
  MapPin, Package, ChevronDown, Menu, LucideIcon, AlertTriangle, Settings, LogOut 
} from 'lucide-react';
// Import Next.js routing components
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define the two possible widths for Tailwind
const SIDEBAR_WIDTH_FULL = '262px'; // Changed to string for calculation
const SIDEBAR_WIDTH_COLLAPSED = '72px'; // Changed to string for calculation
const NOTIFICATION_DRAWER_WIDTH = '380px'; // New constant for the fixed drawer width

// Define the shape of the props for the NavLink component
interface NavLinkProps {
  icon: LucideIcon; // Icon is a Lucide component/type
  text: string;
  href: string; // Add href for the route
  hasNotification?: boolean;
}

export default function Sidebar() {
  // State to manage the open/closed status of the sidebar. 
  const [isExpanded, setIsExpanded] = useState(true);
  // NEW STATE: For Modals/Overlays
  const [showNotificationsOverlay, setShowNotificationsOverlay] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  
  const pathname = usePathname(); // Get current path

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Handlers for Modals/Overlays
  const handleToggleNotifications = () => {
    if (showSignOutModal) setShowSignOutModal(false); // Close other modal
    setShowNotificationsOverlay(prev => !prev);
  };
  
  const handleToggleSignOut = () => {
    if (showNotificationsOverlay) setShowNotificationsOverlay(false); // Close other modal
    setShowSignOutModal(prev => !prev);
  };

  // Determine the current width value
  const sidebarWidthValue = isExpanded ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_COLLAPSED;

  // 1. Notification Overlay Component (Fixed-width drawer that slides out over main content)
 const NotificationOverlay: React.FC = () => {
    
    // Renders the overlay only if the state is true
    if (!showNotificationsOverlay) return null;

    // Hardcoded notifications data
    const notifications = [
      {
        id: 1,
        title: "Keep Your Budget Up to Date",
        description: "New SAG rates have been released. Review and update your budget to stay accurate.",
        time: "2 hours ago",
        type: "alert",
      },
      {
        id: 2,
        title: "Shanaya Kapoor’s daily rate increased.",
        description: "+$7,500 increase in Above the line budget",
        time: "2 hours ago",
        type: "activity",
      },
      {
        id: 3,
        title: "“Grip Department” added to Below the line",
        description: "+$3,500 increase in budget",
        time: "2 hours ago",
        type: "activity",
      },
      // You can add more here if needed
    ];

    return (
        <div 
            className="fixed inset-0 z-40"
            onClick={handleToggleNotifications} // Click anywhere on the screen to close
        >
            {/* The Notification Modal Container, positioned relative to the top-left of the main content (right of sidebar) */}
            <div 
                // Styles based on the UI provided: 329px wide, dark background, rounded, shadow
                className="absolute top-4 left-4 bg-[#27272A] shadow-xl rounded-xl overflow-hidden flex flex-col"
                style={{ 
                    // Calculate left position (Sidebar width + margin)
                    left: `calc(${sidebarWidthValue} + 20px)`,
                    top: '20px', // A small offset from the top
                    width: '329px', 
                    // Height is flexible but capped by screen size/content
                    maxHeight: 'calc(100vh - 40px)', 
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)'
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Header Section */}
                <div className="flex justify-between items-center px-5 py-4 shrink-0">
                    <div className="text-white text-base font-semibold">Notifications</div>
                    {/* Placeholder for the close button if needed, although the backdrop covers it */}
                </div>
                
                {/* Separator Line */}
                <div className="w-full border-t border-[#3F3F47] mb-3 shrink-0" />

                {/* Notification List (Scrollable) */}
                <div className="flex flex-col gap-3 overflow-y-auto px-2 pb-4">
                  {notifications.map((notif) => (
                    <div 
                        key={notif.id}
                        className="flex justify-start items-start gap-3 p-2 mx-2 bg-[#27272A] rounded-lg cursor-pointer hover:bg-[#3F3F47] transition-colors"
                        // Added border for "alert" type to match the image style near "Keep Your Budget Up to Date"
                        style={{ border: notif.type === 'alert' ? '1px solid #FF6467' : 'none' }}
                    >
                        {/* Icon Placeholder (Wider for illustration) */}
                        <div className={`w-10 h-10 p-2 rounded-full flex-shrink-0 flex items-center justify-center 
                            ${notif.type === 'alert' ? 'bg-[#53535C]' : 'bg-[#3F3F47]'}`}
                        >
                            <AlertTriangle className='w-5 h-5 text-zinc-400' />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="text-white text-sm font-semibold">{notif.title}</div>
                            <div className="text-[#9F9FA9] text-xs">{notif.description}</div>
                            <div className="text-[#71717B] text-xs mt-1">{notif.time}</div>
                        </div>
                    </div>
                  ))}

                  {/* Empty state filler if needed to push content down for scrolling effect */}
                  <div className="h-4"></div>
                </div>
            </div>
        </div>
    );
  };
  
 // 2. Sign Out Modal Component (dropdown inside sidebar, near profile)
  const SignOutModal: React.FC = () => {
    
    // Renders the modal only if the state is true
    if (!showSignOutModal) return null;

    return (
        <div 
            // Positioned absolutely inside the relative sidebar container
            className={`absolute bottom-20 ${isExpanded ? 'left-5 right-5' : 'left-1 right-1'} bg-zinc-800 p-2 rounded-xl shadow-2xl z-30`}
        >
            <div className="flex flex-col gap-1">
             
                
                {/* Sign Out - Separated by border, with icon and red color */}
                <button 
                    onClick={() => { console.log('Signing out...'); handleToggleSignOut(); /* Implement actual sign out logic */ }} 
                    className="flex items-center gap-2 text-sm text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 mt-1 pt-3"
                >
                    <LogOut className="w-4 h-4 text-red-400" />
                    Sign Out
                </button>
            </div>
        </div>
    );
  };


  // Custom component for a navigation link
  const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, text, href, hasNotification = false }) => {
    const isActive = href === '/' 
        ? pathname === href 
        : pathname.startsWith(href) && href !== '/';

    // Special handling for the Notifications link to open the overlay instead of navigating
    if (text === "Notifications") {
        return (
            <button
                onClick={handleToggleNotifications}
                // Use the overlay state to determine the active style for the button
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-200 
                  ${showNotificationsOverlay ? 'bg-[#27272A]' : 'hover:bg-zinc-900'}
                `}
            >
                <div className="relative flex-shrink-0">
                  <Icon className={`w-[18px] h-[18px] ${showNotificationsOverlay ? 'text-zinc-100' : 'text-zinc-500'}`} />
                  {hasNotification && (
                    <div className="absolute -top-1 -right-1 w-[7px] h-[7px] bg-[#FB2C36] rounded-full" />
                  )}
                </div>
                {/* Only render text if expanded */}
                {isExpanded && <span className={`text-sm font-medium ${showNotificationsOverlay ? 'text-zinc-100' : 'text-zinc-500'}`}>{text}</span>}
            </button>
        );
    }

    return (
      <Link 
        href={href}
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
      </Link>
    );
  };

  return (
    <>
      <div 
        // Set position relative for the SignOutModal
        className={`relative
          flex flex-col justify-between p-5 h-full border-r border-zinc-800 
          bg-[#09090B] transition-all duration-300 ease-in-out flex-shrink-0 
          w-[${sidebarWidthValue}]
        `}
      >
        
        {/* Sign Out Modal is positioned absolutely within this relative container */}
        <SignOutModal />

        <div className="flex flex-col flex-grow"> 
          
          {/* Logo / Header */}
          <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} pl-1 mb-8`}>
            {/* Logo Brand Icon */}
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

          {/* Navigation */}
          <div className="flex flex-col gap-6 mb-auto"> 
            
            {/* Main Nav */}
            <div className="flex flex-col gap-1">
              <NavLink icon={LayoutGrid} text="Dashboard" href="/projecthome" />
              {/* This NavLink now opens the overlay */}
              <NavLink icon={Bell} text="Notifications" href="/notifications" hasNotification={true} />
            </div>

            {/* Workflow Section */}
            <div className="flex flex-col gap-2">
              {isExpanded && (
                <div className="px-3 py-1">
                  <span className="text-[10px] font-medium text-[#52525C] tracking-[1.3px]">WORKFLOW</span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <NavLink icon={FileText} text="Script breakdown" href="/script" />
                <NavLink icon={Calendar} text="Scheduling" href="/Schedule" />
                <NavLink icon={DollarSign} text="Budgeting" href="/Budgeting" />
                <NavLink icon={Image} text="Storyboarding" href="/StoryBoarding" />
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
                <NavLink icon={Users} text="Crew" href="/Crew" />
                <NavLink icon={Users} text="Characters" href="/Character" /> 
                <NavLink icon={MapPin} text="Sets and Locations" href="/Location" />
                <NavLink icon={Package} text="Production Elements" href="/Production" />
              </div>
            </div>
          </div>
        </div>

        {/* User Profile (The button now triggers the sign out modal) */}
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
          {/* Button to toggle the Sign Out Modal */}
          <button 
            onClick={handleToggleSignOut}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-700 flex-shrink-0"
          >
            <ChevronDown className={`w-4 h-4 text-[#9F9FA9] transition-transform duration-200 ${showSignOutModal ? 'rotate-180' : 'rotate-0'}`} />
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
      {/* Notification Overlay renders outside the sidebar div, fixed to the viewport */}
      <NotificationOverlay />
    </>
  );
}