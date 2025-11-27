"use client"
import React, { useState } from 'react';
import { Bell, Calendar, FileText, Home, Users, ChevronDown, ChevronLeft, ChevronRight, Plus, Filter, Menu, Trash2, Settings, MoreVertical } from 'lucide-react';

const FilterModal = ({ onClose }) => (
    <div className="absolute z-30 right-0 top-full mt-2 w-[140px] bg-[#27272A] border border-[#3F3F47] rounded-xl shadow-xl p-1">
        <div className="px-3 py-2 text-[#9F9FA9] text-xs font-semibold uppercase">
            BY TAGS
        </div>
        <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#3F3F47] rounded-lg transition-colors" onClick={onClose}>
            High to Low
        </button>
        <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#3F3F47] rounded-lg transition-colors" onClick={onClose}>
            Low to High
        </button>
    </div>
);

const CalendarModal = ({ onClose }) => {
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    // Hardcoded dates for July 2025 display
    const dates = [
        null, null, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28,
        29, 30, 31, null, null, null, null
    ];
    
    return (
        <div className="w-[265px] bg-[#141414] border border-[#27272A] rounded-2xl shadow-2xl p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button className="w-6 h-6 flex items-center justify-center text-[#9F9FA9] hover:bg-[#27272A] rounded-full">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-white font-semibold">July 2025</span>
                <button className="w-6 h-6 flex items-center justify-center text-[#9F9FA9] hover:bg-[#27272A] rounded-full">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Days of the week */}
            <div className="grid grid-cols-7 text-xs font-medium text-[#71717B] mb-2">
                {days.map(d => <div key={d} className="text-center">{d}</div>)}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-1">
                {dates.map((date, index) => (
                    <button
                        key={index}
                        // date === 13 is selected based on the image
                        className={`
                            text-sm text-center font-medium w-8 h-8 flex items-center justify-center rounded-full transition-colors
                            ${date === 13 ? 'bg-[#00BCFF] text-black font-bold' : 'text-[#FAFAFA] hover:bg-[#27272A]'}
                            ${!date && 'opacity-0 pointer-events-none'}
                        `}
                        onClick={date ? onClose : undefined} // Close on selection
                    >
                        {date}
                    </button>
                ))}
            </div>
        </div>
    );
};

const EditTagMenu = ({ tagName, onEdit, onDelete, onClose }) => (
    <div className="absolute z-40 right-10 top-0 w-[140px] bg-[#27272A] rounded-xl shadow-xl p-1 text-sm overflow-hidden border border-[#3F3F47]">
        <button 
            className="w-full text-left px-3 py-2 text-white hover:bg-[#3F3F47] rounded-lg transition-colors"
            onClick={() => { onEdit(tagName); onClose(); }}
        >
            Edit Tag
        </button>
        <button 
            className="w-full text-left px-3 py-2 text-[#FF6347] hover:bg-[#3F3F47] rounded-lg transition-colors"
            onClick={() => { onDelete(tagName); onClose(); }}
        >
            Delete
        </button>
    </div>
);

const DeleteConfirmationModal = ({ tagName, onClose, onConfirmDelete }) => (
    // Overlay and Modal Container
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#1A1A1D] rounded-xl p-6 shadow-2xl flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <h2 className="text-white text-xl font-semibold">Delete Location?</h2>
                <button onClick={onClose} className="text-[#9F9FA9] hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            
            <p className="text-sm text-[#D4D4D8]">
                Are you sure you want to delete the location **“{tagName}”**? This will remove all tagged mentions in the script and cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="h-9 px-4 text-sm font-semibold text-[#D4D4D8] bg-[#27272A] rounded-[10px] hover:bg-[#3F3F47] transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirmDelete(tagName)}
                    className="h-9 px-4 text-sm font-semibold text-white bg-[#FF6347] rounded-[10px] hover:bg-[#E05B40] transition-colors"
                >
                    Yes, Delete
                </button>
            </div>
        </div>
    </div>
);


// --- CORE UI COMPONENTS ---

// Component for a single Tag Element row
const TagElementRow = ({ label, elements, onElementKebabClick, elementKebabOpenFor }) => {
    const isDropdown = label === 'Location' || label === 'Characters' || label === 'Extras' || label === 'Props';

    return (
        <div className="flex flex-col gap-[6px]">
            {/* Category Header */}
            <div className="flex items-center justify-between py-1">
                <span className="text-[#9F9FA9] text-sm font-medium">{label}</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#27272A] transition-colors">
                    <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
                </button>
            </div>
            
            {/* Sub-elements */}
            {elements.map((el, index) => (
                <div 
                    key={index} 
                    className="flex items-center justify-between h-9 px-3 bg-[#27272A] rounded-xl relative"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: el.color }} />
                        <span className="text-sm font-medium text-[#FAFAFA]">{el.name}</span>
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => onElementKebabClick(el.name)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#3F3F47] transition-colors"
                        >
                            <MoreVertical className="w-4 h-4 text-[#71717B]" />
                        </button>
                        {/* Render Edit Menu if this element is the one clicked */}
                        {elementKebabOpenFor === el.name && (
                            <EditTagMenu 
                                tagName={el.name}
                                onEdit={() => console.log(`Editing ${el.name}`)}
                                onDelete={() => onElementKebabClick(el.name, true)} // Pass true to open delete modal
                                onClose={() => onElementKebabClick(null)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Right Sidebar Content for the 'Tags' State
const TaggedElementsList = ({ showDeleteModalFor, setShowDeleteModalFor }) => {
    // State to manage which element's Kebab menu is open
    const [showEditMenuFor, setShowEditMenuFor] = useState(null);

    const taggedData = [
        { 
            label: 'Location', 
            elements: [
                { name: 'Small Apartment', color: '#FDC700' },
                { name: 'INT', color: '#00BCFF' },
            ] 
        },
        { 
            label: 'Characters', 
            elements: [
                { name: 'Jamie', color: '#FF7F50' },
                { name: 'SYSTEM (V.O.)', color: '#B0C4DE' },
            ] 
        },
        { 
            label: 'Extras', 
            elements: [
                { name: 'Users', color: '#9370DB' },
                { name: 'Other Users', color: '#DA70D6' },
            ] 
        },
        { 
            label: 'Props', 
            elements: [
                { name: 'Desk', color: '#A0522D' },
                { name: 'Books', color: '#5F9EA0' },
                { name: 'Laptop', color: '#778899' },
            ] 
        },
    ];

    const handleElementKebabClick = (tagName, openDeleteModal = false) => {
        // If clicking on the same tag or forcing the delete modal open
        if (openDeleteModal) {
            setShowEditMenuFor(null); // Close the edit menu
            setShowDeleteModalFor(tagName); // Open delete modal
        } else {
            setShowEditMenuFor(showEditMenuFor === tagName ? null : tagName);
        }
    };

    const handleConfirmDelete = (tagName) => {
        // Here you would implement the actual deletion logic
        console.log(`Confirmed deletion of ${tagName}`);
        setShowDeleteModalFor(null);
    };

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between h-9 mb-4">
                <h2 className="text-white text-base font-semibold">Tag Elements</h2>
                <div className="flex items-center gap-2">
                    {/* The checkbox/mark as done indicator */}
                    <div className="w-5 h-5 bg-[#00BCFF] border border-[#3F3F47] rounded-md flex items-center justify-center">
                        <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <span className="text-white text-sm opacity-80">Mark as done</span>
                </div>
            </div>

            {/* Tagged Elements List */}
            <div className="flex flex-col gap-4">
                {taggedData.map((data) => (
                    <div key={data.label} className="border-b border-[#27272A] pb-4 last:border-b-0">
                        <TagElementRow
                            label={data.label}
                            elements={data.elements}
                            onElementKebabClick={handleElementKebabClick}
                            elementKebabOpenFor={showEditMenuFor}
                        />
                    </div>
                ))}
                
                {/* Additional Tag Element Row (New Tag Placeholder) */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-[#9F9FA9] text-sm">New Tag</span>
                    <button className="w-9 h-9 flex items-center justify-center rounded-[10px] hover:bg-[#27272A] transition-colors">
                        <Plus className="w-4 h-4 text-[#9F9FA9]" />
                    </button>
                </div>
            </div>
            
            {/* Delete Confirmation Modal Overlay */}
            {showDeleteModalFor && (
                <DeleteConfirmationModal
                    tagName={showDeleteModalFor}
                    onClose={() => setShowDeleteModalFor(null)}
                    onConfirmDelete={handleConfirmDelete}
                />
            )}
        </>
    );
};


// Right Sidebar Content for the 'Empty' State
const EmptyTagElements = ({ onAddElements }) => (
    <>
        {/* Header (Same as TaggedElementsList for consistency) */}
        <div className="flex items-center justify-between h-9">
            <h2 className="text-white text-base font-semibold">Tag Elements</h2>
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#27272A] border border-[#3F3F47] rounded-md" />
                <span className="text-white text-sm opacity-80">Mark as done</span>
            </div>
        </div>

        {/* Auto Add Card */}
        <div className="bg-[#052F4A] rounded-2xl p-5 pr-12 flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-3">
                <div className="w-4 h-4 bg-[#00BCFF]" />
                <h3 className="text-white text-base font-semibold leading-5">
                    Auto Add elements from your script
                </h3>
            </div>
            <button 
                onClick={onAddElements} // <--- This sets elementsAdded to true
                className="h-9 px-3 bg-[#00BCFF] shadow-lg rounded-[10px] flex items-center gap-2 hover:bg-[#00A8E6] transition-colors"
            >
                <Plus className="w-4 h-4 text-black" />
                <span className="text-black text-sm font-semibold">Add Elements</span>
            </button>
        </div>

        {/* Element Categories Dropdowns (Empty State) */}
        <div className="flex flex-col gap-4 mt-4">
            {['Location', 'Characters', 'Extras', 'Props'].map((category) => (
                <div key={category} className="flex items-center justify-between">
                    <span className="text-[#9F9FA9] text-sm">{category}</span>
                    <button className="w-9 h-9 flex items-center justify-center rounded-[10px] hover:bg-[#27272A] transition-colors">
                        <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
                    </button>
                </div>
            ))}
        </div>
    </>
);

export default function ScriptBreakdownApp() {
    const [selectedScene, setSelectedScene] = useState('1A');
    const [activeTab, setActiveTab] = useState('script');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    
    // FIX 1: Initialize to 'false' to start in the Empty state.
    const [elementsAdded, setElementsAdded] = useState(false); 
    
    // State for the delete confirmation modal
    const [showDeleteModalFor, setShowDeleteModalFor] = useState(null);

    const scenes = [
        // Fix the elements count to use the actual state for scene 1A
        { id: '1A', name: 'INT KITCHEN DAY', elements: elementsAdded ? 2 : 0, color: '#FDC700' }, 
        { id: '1B', name: 'INT KITCHEN DAY', elements: 0, color: '#FDC700' },
        { id: '2A', name: 'EXT PARK EVENING', elements: 1, color: '#FDC700' },
        { id: '2B', name: 'INT OFFICE NIGHT', elements: 0, color: '#FDC700' },
        { id: '3', name: 'EXT CAFE MORNING', elements: 1, color: '#FDC700' },
        { id: '4', name: 'INT LIVING ROOM AFTERNOON', elements: 0, color: '#FDC700' },
        { id: '6', name: 'EXT BEACH SUNSET', elements: 1, color: '#FDC700' },
        { id: '7A', name: 'INT GARAGE NIGHT', elements: 0, color: '#FDC700' },
        { id: '7B', name: 'EXT ROOFTOP MIDDAY', elements: 1, color: '#FDC700' },
    ];

    const filters = ['All', 'Day', 'Afternoon', 'Evening', 'Night'];

    return (
        <div className="overflow-hidden flex h-screen w-full bg-[#09090B]">
        

            {/* Main Content */}
            <div className="overflow-auto flex-1 p-[10px]">
                <div className="h-full bg-[#18181B] rounded-xl relative flex flex-col">
                    {/* Header */}
                    <div className="p-2 bg-[#18181B] border-b border-[#27272A] flex items-center shrink-0">
                       
                        <button className="h-9 px-3 rounded-[10px] flex items-center gap-2 hover:bg-[#27272A] transition-colors">
                            <span className="text-[#9F9FA9] text-sm font-semibold">Untitled Project</span>
                            <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col min-h-0">
                        {/* Title and Tabs */}
                        <div className="px-9 pt-10 pb-[33px] shrink-0">
                            <h1 className="text-white text-[42px] font-semibold leading-[54.6px] mb-[33px]">
                                Script Breakdown
                            </h1>
                            <div className="flex items-center gap-5">
                                <button
                                    onClick={() => setActiveTab('script')}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <span className={`text-sm font-semibold ${activeTab === 'script' ? 'text-[#00BCFF]' : 'text-[#9F9FA9]'}`}>
                                        Script
                                    </span>
                                    <div className={`h-1 w-full rounded-xl ${activeTab === 'script' ? 'bg-[#00BCFF]' : 'bg-transparent'}`} />
                                </button>
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <span className={`text-sm font-semibold ${activeTab === 'overview' ? 'text-[#00BCFF]' : 'text-[#9F9FA9]'}`}>
                                        Overview
                                    </span>
                                    <div className={`h-1 w-full rounded-xl ${activeTab === 'overview' ? 'bg-[#00BCFF]' : 'bg-transparent'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#27272A] shrink-0" />

                        {/* Three Column Layout */}
                        <div className="flex-1 flex  min-h-0 bg-[#18181B]">
                            
                            {/* Left Sidebar - Scenes List */}
                            <div className="w-[302px] flex flex-col border-r border-[#27272A] bg-[#18181B] shrink-0">
                                <div className="flex-1  p-5 pr-0">
                                    <div className="flex flex-col gap-8">
                                        {/* Scenes Header */}
                                        <div className="flex flex-col gap-4 pr-5">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-white text-base font-semibold">Scenes</h2>
                                                <div className="flex items-center gap-[2px]">
                                                    {/* Search Button */}
                                                    <button className="w-9 h-9 flex items-center justify-center rounded-[10px] hover:bg-[#27272A] transition-colors">
                                                        {/* Search SVG */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-4 h-4 text-[#9F9FA9]"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="2"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                                                            />
                                                        </svg>
                                                    </button>


                                                    {/* Up/Down Arrow Button */}
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setShowFilterModal(!showFilterModal)}
                                                            className="w-9 h-9 flex items-center justify-center rounded-[10px] hover:bg-[#27272A] transition-colors"
                                                        >
                                                            {/* Up + Down arrows SVG */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-4 h-4 text-[#9F9FA9]"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l-4 4h8l-4-4z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l4-4H8l4 4z" />
                                                            </svg>
                                                        </button>

                                                        {showFilterModal && (
                                                            <div className="absolute top-full mt-2 right-0 z-50">
                                                                <FilterModal onClose={() => setShowFilterModal(false)} />
                                                            </div>
                                                        )}
                                                    </div>


                                                </div>
                                            </div>

                                            {/* Filter Chips */}
                                            <div className="flex flex-wrap gap-2">
                                                {filters.map((filter) => (
                                                    <button
                                                        key={filter}
                                                        className={`px-[10px] py-[6px] rounded-xl flex items-center gap-[10px] transition-colors ${
                                                             filter === 'All'
                                                                ? 'bg-[#D4D4D8]'
                                                                : 'bg-[#27272A] border border-[#27272A] hover:border-[#3F3F47]'
                                                        }`}
                                                    >
                                                        <span className={`text-sm font-semibold ${filter === 'All' ? 'text-black' : 'text-[#9F9FA9]'}`}>
                                                            {filter}
                                                        </span>
                                                        <span className={`text-sm font-semibold ${filter === 'All' ? 'text-[#71717B]' : 'text-[#52525C]'}`}>
                                                            60
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Scenes List */}
                                        <div className="flex flex-col gap-2 pr-3">
                                            {scenes.map((scene) => (
                                                <button
                                                    key={scene.id}
                                                    onClick={() => setSelectedScene(scene.id)}
                                                    className={`p-3 rounded-lg flex items-center justify-between transition-colors ${
                                                         selectedScene === scene.id
                                                            ? 'bg-[#27272A] border border-[#FDC700]'
                                                            : 'bg-[#18181B] hover:bg-[#27272A]'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: scene.color }} />
                                                        <div className="flex items-center gap-[6px]">
                                                            <span className={`text-sm ${selectedScene === scene.id ? 'text-[#71717B]' : 'text-[#52525C]'}`}>
                                                                {scene.id}
                                                            </span>
                                                            <span className={`text-sm ${selectedScene === scene.id ? 'text-[#FAFAFA]' : 'text-[#71717B]'}`}>
                                                                {scene.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                                            <path d="M8 1L10.5 6L16 7L12 11L13 16L8 13.5L3 16L4 11L0 7L5.5 6L8 1Z" 
                                                                fill={selectedScene === scene.id ? '#FAFAFA' : '#71717B'} />
                                                        </svg>
                                                        <span className={`text-sm w-[18px] text-center ${selectedScene === scene.id ? 'text-[#FAFAFA] font-medium' : 'text-[#71717B]'}`}>
                                                            {scene.elements}
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Center - Script Content */}
                            <div className="flex-1 flex flex-col min-w-0 bg-[#18181B] shrink-0">
                                
                                {/* Fixed Header Section */}
                                <div className="p-5 border-b border-[#27272A] shrink-0">
                                    <div className="flex flex-col gap-[10px]">
                                        <div className="flex items-start justify-between">
                                            <div className="flex flex-col gap-[6px]">
                                                <h2 className="text-[#FAFAFA] text-xl font-semibold">Kitchen Day</h2>
                                                <div className="flex items-center gap-[6px] relative">
                                                    <span className="text-[#FAFAFA] text-base opacity-60">1A •</span>
                                                    <span className="text-[#FDC700] text-base">INT DAY</span>
                                                    <span className="text-[#FAFAFA] text-base opacity-60">•</span>

                                                    <button 
                                                        onClick={() => setShowCalendarModal(!showCalendarModal)}
                                                        className="h-9 px-3 rounded-[10px] flex items-center gap-2 hover:bg-[#27272A] transition-colors"
                                                    >
                                                        <Calendar className="w-4 h-4 text-[#9F9FA9]" />
                                                        <span className="text-[#9F9FA9] text-sm font-semibold">Set Shooting Day</span>
                                                    </button>

                                                    {showCalendarModal && (
                                                        <div className="absolute top-full mt-2 right-0 z-50">
                                                            <CalendarModal onClose={() => setShowCalendarModal(false)} />
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="flex items-center">
                                                <button className="w-9 h-9 flex items-center justify-center rounded-[10px] hover:bg-[#27272A] transition-colors opacity-50">
                                                    <ChevronLeft className="w-4 h-4 text-[#52525C]" />
                                                </button>
                                                <button className="w-9 h-9 flex items-center justify-center rounded-[10px] hover:bg-[#27272A] transition-colors">
                                                    <ChevronRight className="w-4 h-4 text-[#9F9FA9]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scrollable Script Canvas */}
                                <div className="flex-1 relative  flex items-center justify-center bg-[#141414] p-8">
                                    {/* The Paper */}
                                    <div className="w-full max-w-[585px] h-full  bg-white rounded shadow-2xl flex flex-col">
                                        {/* Paper Content - Scrollable internally */}
                                        <div className=" p-14 bg-white flex-1 custom-scrollbar">
                                            <div className="text-black  text-sm font-mono opacity-80 leading-4 space-y-4">
                                                <p>INT. SMALL APARTMENT – DAY</p>
                                                <p className="mt-4">
                                                    Dim light spills from a desk lamp. Books are scattered. A laptop glows.<br />
                                                    JAMIE (mid-20s, thoughtful) stares at the screen, frustrated.
                                                </p>
                                                <p className="text-center mt-4">JAMIE</p>
                                                <p className="text-center italic">(muttering)</p>
                                                <p className="ml-8">I'm done. I can't keep pretending this is working.</p>
                                                <p className="mt-4">
                                                    The screen glitches, then shifts. A clean interface appears. A soft chime.
                                                </p>
                                                <p className="text-center mt-4">SYSTEM (V.O.)</p>
                                                <p className="ml-8">Ready to learn your way?</p>
                                                <p className="mt-4">Jamie pauses. Clicks.</p>
                                                <p className="mt-4">INT. DREAMLIKE MONTAGE – VARIOUS</p>
                                                <p className="mt-4">
                                                    Quick flashes: Jamie watching videos, scribbling notes, smiling as progress bars tick forward.<br />
                                                    Other USERS appear, laughing, learning, growing
                                                </p>
                                                <p className="mt-8">INT. SMALL APARTMENT – NIGHT</p>
                                                <p className="mt-4">
                                                    Dim light spills from a desk lamp. Books are scattered. A laptop glows.<br />
                                                    JAMIE (mid-20s, thoughtful) stares at the screen, frustrated.
                                                </p>
                                                {/* Extra content to demonstrate scrolling */}
                                                    <p className="text-center mt-4">JAMIE</p>
                                                    <p className="ml-8">This actually works.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar - Tag Elements */}
                            <div className="w-[285px] border-l border-[#27272A] flex flex-col bg-[#18181B] ">
                                <div className="flex-1 p-5 ">
                                    {/* FIX 2: Reverse the conditional rendering for the requested flow */}
                                    {!elementsAdded ? (
                                        <EmptyTagElements onAddElements={() => setElementsAdded(true)} />
                                    ) : (
                                        <TaggedElementsList 
                                            showDeleteModalFor={showDeleteModalFor} 
                                            setShowDeleteModalFor={setShowDeleteModalFor} 
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}