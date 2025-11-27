"use client"

import React, { useState } from 'react';

// --- Icon Components ---

const MenuIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4.5H2C1.5 4.5 1 4.9 1 5.5V12.5C1 13.1 1.5 13.5 2 13.5H16C16.5 13.5 17 13.1 17 12.5V5.5C17 4.9 16.5 4.5 16 4.5Z" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 1.5V7.5M12.5 1.5V7.5" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BellIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.0625 1.40625C14.0625 8.1325 14.0625 15.375 14.0625 15.375C14.0625 15.375 3.9375 15.1581 3.9375 15.1581C3.9375 15.1581 3.9375 8.1325 3.9375 1.40625" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.0625 1.40625H3.9375" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.0625 15.375H3.9375" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="15.5" cy="4" r="3.5" fill="#FB2C36"/>
    </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 5.5L8 10L12.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 3.5L6 8L10.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.5 12H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PaintbrushIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-black' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0001 2.5C14.192 2.5 16.3314 3.37703 17.9109 4.95651C19.4904 6.53599 20.3674 8.67537 20.3674 10.8674C20.3674 13.0594 19.4904 15.1988 17.9109 16.7783C16.3314 18.3577 14.192 19.2348 12.0001 19.2348C9.80808 19.2348 7.6687 18.3577 6.08922 16.7783C4.50974 15.1988 3.63271 13.0594 3.63271 10.8674C3.63271 8.67537 4.50974 6.53599 6.08922 4.95651C7.6687 3.37703 9.80808 2.5 12.0001 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19.23V21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-red-500' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 7H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const UsersIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 15V13.75C1.5 12.5511 1.97411 11.4027 2.81802 10.5588C3.66193 9.71488 4.81031 9.24077 6 9.24077H12C13.1897 9.24077 14.3381 9.71488 15.182 10.5588C16.0259 11.4027 16.5 12.5511 16.5 13.75V15" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="4.875" r="3.375" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ImageIconPlaceholder: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-zinc-600' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
        <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


// --- State Types ---
type FrameView = 'FramesEmpty' | 'FramesEditor' | 'FramesGrid';
type ElementView = 'ElementsCharacter' | 'ElementsProp';

interface AppState {
    activeTab: 'Frames' | 'Elements';
    frameView: FrameView;
    elementView: ElementView;
    selectedElement: string; // 'Jamie', 'SYSTEM (V.O.)', 'Desk', 'Books', 'Laptop'
}





const ElementItem: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
    <div 
        onClick={onClick}
        className={`px-4 py-3 cursor-pointer rounded-lg transition-colors ${active ? 'bg-zinc-700 text-white font-semibold' : 'text-zinc-300 hover:bg-zinc-800'}`}
    >
        {label}
    </div>
);

const ViewElementsPanel: React.FC<{ 
    elementView: ElementView; 
    selectedElement: string; 
    setSelectedElement: (el: string) => void 
}> = ({ elementView, selectedElement, setSelectedElement }) => {
    
    const isCharacterView = selectedElement === 'Jamie' || selectedElement === 'SYSTEM (V.O.)';

    return (
        <div className="flex h-full overflow-hidden">
            {/* Left Sidebar: Element Categories */}
            <div className="w-64 border-r border-zinc-800 py-6 overflow-y-auto">
                {/* Characters */}
                <div className="px-4 mb-6">
                    <div className="flex justify-between items-center text-zinc-400 text-sm font-semibold mb-2">
                        <span>CHARACTERS</span>
                        <ChevronDownIcon className='w-4 h-4' />
                    </div>
                    <div className="space-y-1">
                        <ElementItem label="Jamie" active={selectedElement === 'Jamie'} onClick={() => setSelectedElement('Jamie')} />
                        <ElementItem label="SYSTEM (V.O.)" active={selectedElement === 'SYSTEM (V.O.)'} onClick={() => setSelectedElement('SYSTEM (V.O.)')} />
                    </div>
                </div>

                {/* Extras */}
                <div className="px-4 mb-6">
                    <div className="flex justify-between items-center text-zinc-400 text-sm font-semibold mb-2">
                        <span>EXTRAS</span>
                        <ChevronDownIcon className='w-4 h-4' />
                    </div>
                    <div className="space-y-1">
                        <ElementItem label="Users" active={false} onClick={() => {}} />
                        <ElementItem label="other Users" active={false} onClick={() => {}} />
                    </div>
                </div>

                {/* Props */}
                <div className="px-4">
                    <div className="flex justify-between items-center text-zinc-400 text-sm font-semibold mb-2">
                        <span>PROPS</span>
                        <ChevronDownIcon className='w-4 h-4' />
                    </div>
                    <div className="space-y-1">
                        <ElementItem label="Desk" active={selectedElement === 'Desk'} onClick={() => setSelectedElement('Desk')} />
                        <ElementItem label="Books" active={selectedElement === 'Books'} onClick={() => setSelectedElement('Books')} />
                        <ElementItem label="Laptop" active={selectedElement === 'Laptop'} onClick={() => setSelectedElement('Laptop')} />
                    </div>
                </div>
            </div>

            {/* Right Content: Element Detail Editor */}
            <div className="flex-1 p-8 overflow-y-auto">
                <h2 className="text-3xl font-semibold text-white mb-8">{selectedElement}</h2>
                
                {isCharacterView ? (
                    // --- Character Element View (Script-Onboarding (4).png) ---
                    <div className="max-w-xl space-y-6">
                        <div className="p-4 bg-zinc-800 rounded-xl space-y-4">
                            <textarea 
                                className="w-full bg-transparent text-zinc-300 resize-none h-20 outline-none placeholder-zinc-500" 
                                defaultValue="Stylish young man in a vibrant blue jacket and checkered shirt sitting in a sunny field, with a striking blue sky in the background."
                            />
                            <div className="flex space-x-3">
                                <button className="flex items-center text-zinc-400 text-sm font-semibold hover:text-white">
                                    <PlusIcon className='w-4 h-4 mr-1' /> Add Reference
                                </button>
                                <button className="px-4 py-2 bg-sky-500 text-black text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors">
                                    Generate Image
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-zinc-400 font-semibold">Generations</h3>
                            <p className="text-zinc-500 text-sm">Scene generations will use these elements. Any changes you make will update instantly across scenes.</p>
                            <div className="flex space-x-3">
                                {/* Character Images */}
                                <div className="relative">
                                    <img src="https://placehold.co/120x150/00FFFF/000000.png?text=Character+1" alt="Character Ref 1" className="w-28 h-36 object-cover rounded-lg border-2 border-green-400" />
                                    <div className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">✓</div>
                                </div>
                                <img src="https://placehold.co/120x150/333/FFF.png?text=Character+2" alt="Character Ref 2" className="w-28 h-36 object-cover rounded-lg" />
                                <img src="https://placehold.co/120x150/111/FFF.png?text=Character+3" alt="Character Ref 3" className="w-28 h-36 object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>
                ) : (
                    // --- Prop Element View (Script-Onboarding (5).png) ---
                    <div className="max-w-xl space-y-6">
                         <div className="p-4 bg-zinc-800 rounded-xl space-y-4">
                            <textarea 
                                className="w-full bg-transparent text-zinc-300 resize-none h-20 outline-none placeholder-zinc-500" 
                                defaultValue="Elegant, dark green marble side table with a sculptural teardrop base and smooth round top, perfect for modern minimalist interiors."
                            />
                            <div className="flex space-x-3 items-center">
                                <div className="flex space-x-2">
                                    {/* Reference Chips */}
                                    <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-lg p-1">
                                        <img src="https://placehold.co/40x40/008000/FFF.png?text=Ref" alt="Reference 1" className="w-8 h-8 object-cover rounded-md mr-2" />
                                        <span className="text-zinc-400 text-xs mr-2">Green-Marble.jpg</span>
                                        <XIcon className='w-3 h-3 text-zinc-500 cursor-pointer' />
                                    </div>
                                     <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-lg p-1">
                                        <img src="https://placehold.co/40x40/A0522D/FFF.png?text=Ref" alt="Reference 2" className="w-8 h-8 object-cover rounded-md mr-2" />
                                        <span className="text-zinc-400 text-xs mr-2">Stone and Wo.jpg</span>
                                        <XIcon className='w-3 h-3 text-zinc-500 cursor-pointer' />
                                    </div>
                                </div>
                                <button className="flex items-center text-zinc-400 text-sm font-semibold hover:text-white">
                                    <PlusIcon className='w-4 h-4 mr-1' /> Add Reference
                                </button>
                                <button className="px-4 py-2 bg-sky-500 text-black text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors">
                                    Generate Image
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-zinc-400 font-semibold">Generations</h3>
                            <p className="text-zinc-500 text-sm">Scene generations will use these elements. Any changes you make will update instantly across scenes.</p>
                            <div className="flex space-x-3">
                                {/* Prop Images */}
                                <div className="relative">
                                    <img src="https://placehold.co/150x150/B0C4DE/000.png?text=Prop+1" alt="Prop Ref 1" className="w-36 h-36 object-cover rounded-lg border-2 border-green-400" />
                                    <div className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">✓</div>
                                </div>
                                <img src="https://placehold.co/150x150/333/FFF.png?text=Prop+2" alt="Prop Ref 2" className="w-36 h-36 object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Views for Frames Tab ---

// 1. Initial Empty View (Script-Onboarding.png)
const ViewFramesEmpty: React.FC<{ onGenerate: () => void }> = ({ onGenerate }) => (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 overflow-y-auto">
        <div className="w-full max-w-xl flex flex-col items-center space-y-8">
            <div className="text-pink-300 text-4xl font-semibold flex items-center space-x-3">
                <span className='text-5xl'>✨</span>
                <h2>Visualize frames with AI</h2>
            </div>
            <p className="text-zinc-400 text-base max-w-sm">
                Use AI to create visual frames based on the script content.
            </p>

            {/* AI Settings */}
            <div className="flex space-x-4 w-full max-w-md justify-center">
                {/* Image Style */}
                <div className="flex flex-col space-y-1 w-1/2">
                    <div className="flex justify-between items-center h-10 px-3 border border-zinc-700 rounded-lg bg-zinc-800">
                        <span className="text-zinc-300 text-sm font-semibold">Doodle</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                    <label className="text-zinc-400 text-xs text-left">Image Style</label>
                </div>
                {/* Framing */}
                <div className="flex flex-col space-y-1 w-1/2">
                    <div className="flex justify-between items-center h-10 px-3 border border-zinc-700 rounded-lg bg-zinc-800">
                        <span className="text-zinc-300 text-sm font-semibold">Wide shot</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                    <label className="text-zinc-400 text-xs text-left">Framing</label>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-8 pt-4 items-center">
                <button 
                    onClick={onGenerate}
                    className="flex items-center px-6 py-3 bg-pink-500 text-black text-lg font-bold rounded-xl hover:bg-pink-400 transition-colors shadow-lg"
                >
                    <PaintbrushIcon className='w-6 h-6 mr-3 text-black' />
                    <span>Generate Frames</span>
                </button>
                <button 
                    onClick={onGenerate} // Using the same action to simulate progressing
                    className="flex items-center text-zinc-400 text-base font-semibold hover:text-white transition-colors"
                >
                    <span>Start Without AI</span>
                    <ChevronRightIcon className='w-4 h-4 ml-1 text-zinc-400' />
                </button>
            </div>
        </div>
    </div>
);


// 2. Editor/Grid View (Script-Onboarding (1), (2), (3).jpg)

// Component to handle individual frame logic and settings
const FrameEditorCard: React.FC<{ frameNumber: number, hasImage: boolean }> = ({ frameNumber, hasImage }) => {
    
    // Placeholder image URL from the designs
    const imageUrl = "https://placehold.co/257x144/1C1C1F/D4D4D8.png?text=Frame"; 

    return (
        <div className="bg-zinc-800/50 p-3 rounded-xl border border-zinc-800">
            {/* Frame Image/Placeholder */}
            <div className={`relative w-full aspect-video rounded-lg overflow-hidden ${hasImage ? '' : 'border border-zinc-700 flex items-center justify-center'}`}>
                {hasImage ? (
                    <img src={imageUrl} alt={`Frame ${frameNumber}`} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                         <ImageIconPlaceholder className='w-8 h-8 text-zinc-700' />
                    </div>
                )}
            </div>

            {/* Frame Settings */}
            <div className="mt-3 space-y-3">
                <div className="space-y-1">
                    <label className="text-zinc-400 text-xs">Character</label>
                    <div className="flex justify-between items-center h-8 px-3 border border-zinc-700 rounded-lg">
                        <span className="text-zinc-300 text-sm font-semibold">Jamie</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-zinc-400 text-xs">Background</label>
                    <div className="flex justify-between items-center h-8 px-3 border border-zinc-700 rounded-lg">
                        <span className="text-zinc-300 text-sm font-semibold">Nature</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-zinc-400 text-xs">Image Style</label>
                    <div className="flex justify-between items-center h-8 px-3 border border-zinc-700 rounded-lg">
                        <span className="text-zinc-300 text-sm font-semibold">Realistic</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-zinc-400 text-xs">Framing</label>
                    <div className="flex justify-between items-center h-8 px-3 border border-zinc-700 rounded-lg">
                        <span className="text-zinc-300 text-sm font-semibold">Wide shot</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-zinc-400 text-xs">Tag A</label>
                    <div className="flex justify-between items-center h-8 px-3 border border-zinc-700 rounded-lg">
                        <span className="text-zinc-500 text-sm font-semibold">Select an option</span>
                        <ChevronDownIcon className="text-zinc-500 w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
                <button className="flex-1 py-2 bg-sky-500 text-black text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors">
                    {hasImage ? 'Regenerate Image' : 'Generate Image'}
                </button>
                <button className="p-2 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors">
                    <TrashIcon className='w-4 h-4 text-zinc-400' />
                </button>
            </div>
        </div>
    );
};

const NotesPanel: React.FC = () => (
    <div className="w-80 border-l border-zinc-800 p-6 flex flex-col space-y-6 flex-shrink-0 overflow-y-auto bg-zinc-900/50">
        <div className="flex space-x-4 border-b border-zinc-800 pb-2">
            <span className="text-white font-semibold cursor-pointer hover:text-sky-500">Notes</span>
            <span className="text-zinc-400 font-semibold cursor-pointer hover:text-white">Script</span>
        </div>

        {/* Note Input */}
        <div className="p-4 bg-zinc-800 rounded-lg space-y-4">
            <textarea className="w-full bg-transparent text-zinc-400 resize-none h-16 outline-none" placeholder="Jot down any extra details or reminders..." />
            <button className="px-4 py-2 bg-zinc-700 text-zinc-400 text-sm font-semibold rounded-lg">
                Add Note
            </button>
        </div>

        {/* Note List (Simplified) */}
        <div className="space-y-4">
            <div className="border-b border-zinc-800 pb-3">
                <p className="text-white text-sm">Natural light only, coming from the left. Add background chatter for a livelier cafe scene</p>
                <span className="text-zinc-500 text-xs">11:20 AM • 2d ago</span>
            </div>
            <div className="border-b border-zinc-800 pb-3">
                <p className="text-white text-sm">Use warm lighting to create a cozy feel</p>
                <span className="text-zinc-500 text-xs">11:20 AM • 2d ago</span>
            </div>
        </div>

         {/* Script (Simplified, matching Script-Onboarding (2).png) */}
         <div className="space-y-4 mt-8">
            <h3 className="text-white font-semibold">Script Preview</h3>
            <pre className="text-zinc-400 text-xs bg-zinc-800 p-3 rounded-lg overflow-x-auto">
{`INT. SMALL APARTMENT - DAY
Dim light spills from a desk lamp. Books are scattered. A laptop glows.
JAMIE (mid-20s, thoughtful) stares at the screen, frustrated.

JAMIE
    (muttering)
    I'm done. I can't keep pretending this is working.

The screen glitches, then shifts. A clean interface appears. A soft chime.

SYSTEM (V.O.)
    Ready to learn your way?

Jamie pauses. Clicks.

INT. DREAMLIKE MONTAGE - VARIOUS
Quick flashes:`}
            </pre>
        </div>
    </div>
);


const ViewFramesEditor: React.FC = () => {
    const frames = [
        { id: 1, hasImage: true },
        { id: 2, hasImage: false }, // Placeholder box, matching Script-Onboarding (1).png
        { id: 3, hasImage: false },
        { id: 4, hasImage: true },
        { id: 5, hasImage: true },
        { id: 6, hasImage: true },
    ];

    return (
        <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full">
                    
                    {/* The main Frame being edited (top left in image 2) */}
                    <FrameEditorCard frameNumber={1} hasImage={true} /> 

                    {/* Add Frame Button (top middle in image 1) */}
                    <div className="flex flex-col items-center justify-center w-full aspect-video bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors cursor-pointer">
                        <PlusIcon className='w-6 h-6 text-zinc-400' />
                        <span className="text-zinc-400 text-sm mt-2">Add Frame</span>
                    </div>

                    {/* Other Frames from the grid view (image 3) */}
                    {frames.slice(3).map(frame => (
                         <FrameEditorCard key={frame.id} frameNumber={frame.id} hasImage={frame.hasImage} />
                    ))}
                </div>
            </div>
            
            <NotesPanel />
        </div>
    );
};


// --- App Composition ---

const SceneEditor: React.FC<{ 
    state: AppState; 
    dispatch: (action: { type: string, payload?: any }) => void;
    sceneTitle: string;
}> = ({ state, dispatch, sceneTitle }) => {
    
    // Header Logic
    const handleTabChange = (tab: 'Frames' | 'Elements') => {
        dispatch({ type: 'SET_TAB', payload: tab });
        if (tab === 'Frames' && state.frameView === 'FramesEditor') {
            dispatch({ type: 'SET_FRAME_VIEW', payload: 'FramesGrid' });
        }
    };

    const handleBack = () => {
        // In a real app, this would navigate to the Storyboard list (not implemented here)
        alert('Navigating back to the Storyboard list (simulated)');
    };

    return (
        <div className="flex-1 overflow-hidden">
            <div className="bg-zinc-900 rounded-xl h-full flex flex-col relative" style={{background: 'linear-gradient(180deg, #18181B 55%, #2F0626 86%, #26252B 100%)'}}>
                
                {/* Header Bar (Untitled Project) */}
                <div className="p-2 border-b border-zinc-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2 p-1">
                        <span className="text-sm font-semibold text-zinc-400">Untitled Project</span>
                        <ChevronDownIcon className="w-4 h-4 text-zinc-400" />
                    </div>
                </div>
                
                {/* Title Area & Tabs */}
                <div className="px-8 pt-6 pb-2">
                    <button onClick={handleBack} className="flex items-center text-zinc-400 text-sm font-semibold hover:text-white transition-colors">
                        <ChevronLeftIcon className="w-4 h-4 mr-1" />
                        <span>Back</span>
                    </button>
                    <h1 className="text-4xl font-semibold text-white mt-4">{sceneTitle}</h1>
                    
                    <div className="flex space-x-5 border-b border-zinc-800 pt-6">
                        <div 
                            onClick={() => handleTabChange('Frames')}
                            className={`pb-3 font-semibold cursor-pointer border-b-4 ${state.activeTab === 'Frames' ? 'text-sky-500 border-sky-500' : 'text-zinc-400 border-transparent hover:border-zinc-700'}`}
                        >
                            Frames
                        </div>
                        <div 
                            onClick={() => handleTabChange('Elements')}
                            className={`pb-3 font-semibold cursor-pointer border-b-4 ${state.activeTab === 'Elements' ? 'text-sky-500 border-sky-500' : 'text-zinc-400 border-transparent hover:border-zinc-700'}`}
                        >
                            Elements
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden">
                    {state.activeTab === 'Frames' && state.frameView === 'FramesEmpty' && (
                        <ViewFramesEmpty onGenerate={() => dispatch({ type: 'SET_FRAME_VIEW', payload: 'FramesEditor' })} />
                    )}
                    {state.activeTab === 'Frames' && state.frameView === 'FramesEditor' && (
                        <ViewFramesEditor />
                    )}
                     {state.activeTab === 'Elements' && (
                        <ViewElementsPanel 
                            elementView={state.elementView} 
                            selectedElement={state.selectedElement}
                            setSelectedElement={(el) => dispatch({ type: 'SET_ELEMENT_SELECTION', payload: el })}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};


const page: React.FC = () => {
    
    const sceneTitle = "INT. Some Location - DAY";
    
    // Initial state matching Script-Onboarding.png (Frames tab, Empty view)
    const [state, setState] = useState<AppState>({
        activeTab: 'Frames',
        frameView: 'FramesEmpty',
        elementView: 'ElementsCharacter', // default to character
        selectedElement: 'Jamie',
    });

    // Simple Reducer-like dispatch function
    const dispatch = (action: { type: string, payload?: any }) => {
        setState(prev => {
            switch (action.type) {
                case 'SET_TAB':
                    // If switching back to frames, ensure it's the editor if frames were generated
                    if (action.payload === 'Frames') {
                        return { ...prev, activeTab: action.payload, frameView: prev.frameView === 'FramesEmpty' ? 'FramesEmpty' : 'FramesEditor' };
                    }
                    return { ...prev, activeTab: action.payload };

                case 'SET_FRAME_VIEW':
                    return { ...prev, frameView: action.payload };
                    
                case 'SET_ELEMENT_SELECTION':
                    const selection = action.payload;
                    const view: ElementView = ['Jamie', 'SYSTEM (V.O.)'].includes(selection) ? 'ElementsCharacter' : 'ElementsProp';
                    return { ...prev, selectedElement: selection, elementView: view };

                default:
                    return prev;
            }
        });
    };
    
    return (
        <div className="flex h-screen bg-zinc-950 font-sans w-full">
            <SceneEditor state={state} dispatch={dispatch} sceneTitle={sceneTitle} />
        </div>
    );
};

export default page;