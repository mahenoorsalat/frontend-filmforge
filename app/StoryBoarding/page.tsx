"use client"

import React, { useState } from 'react';

// --- Icon Components (Keeping all existing icons, but adding necessary imports) ---

const MenuIcon: React.FC = () => (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="10.34" width="22" height="7.66" rx="4.31" fill="#9D9D9D" />
      <rect x="2.59" y="2.59" width="16.82" height="7.66" rx="4.31" stroke="#9D9D9D" strokeWidth="2.59" />
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

const ImageIconPlaceholder: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#52525C" strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="#52525C"/>
        <path d="M21 15L16 10L5 21" stroke="#52525C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


interface SceneData {
    id: number;
    sceneNumber: string;
    description: string;
    status: 'Done' | 'In Process' | 'Pending';
    imageStatus: 'Generated' | 'Placeholder' | 'Partial';
    imageCount?: number; // Only for 'Partial' or 'Generated' with multiple images
}


const StatusTag: React.FC<{ status: SceneData['status'] }> = ({ status }) => {
    let classes = "";
    let color = "";
    switch (status) {
        case 'Done':
            color = 'text-green-400';
            classes = 'bg-green-400/20'; // Adjusted for darker background tag look
            break;
        case 'In Process':
            color = 'text-sky-500';
            classes = 'bg-sky-500/20';
            break;
        case 'Pending':
            color = 'text-yellow-400';
            classes = 'bg-yellow-400/20';
            break;
    }
    return (
        // Adjusted from 'border' to 'background' for status tag to better match the image
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${color} ${classes}`}>
            {status}
        </div>
    );
};

const ImagePreview: React.FC<SceneData> = ({ imageStatus, imageCount }) => {
    // Re-implemented to better match the image's preview style (smaller, stacked)
    const baseClasses = 'p-1 bg-zinc-900 border rounded-lg';
    
    // Placeholder Images/Blocks
    const ImageBlock: React.FC<{ corner: 'tl' | 'tr' | 'bl' | 'br', children?: React.ReactNode }> = ({ corner, children }) => {
        const borderClasses = {
            'tl': 'rounded-tl-md rounded-tr-sm rounded-br-sm rounded-bl-sm',
            'tr': 'rounded-tl-sm rounded-tr-md rounded-br-sm rounded-bl-sm',
            'bl': 'rounded-tl-sm rounded-tr-sm rounded-br-sm rounded-bl-md',
            'br': 'rounded-tl-sm rounded-tr-sm rounded-br-md rounded-bl-sm',
        };
        const defaultStyle = 'w-9 h-5 bg-zinc-600 shadow-md'; 
        return (
            <div className={`w-9 h-5 ${defaultStyle} ${borderClasses[corner]} flex items-center justify-center`}>
                {children}
            </div>
        );
    };

    if (imageStatus === 'Placeholder' && imageCount === undefined) {
        return (
            <div className={`${baseClasses} border-zinc-700 flex items-center justify-center w-20 h-10`}>
                <ImageIconPlaceholder />
            </div>
        );
    }
    
    // For Generated and Partial (multiple images shown)
    // The image shows a set of 4 small previews, with a count overlay on the last one.
    return (
        <div className={`${baseClasses} border-zinc-700`}>
            <div className="flex flex-wrap w-20 space-x-0.5">
                <div className="space-y-0.5 flex flex-col">
                    <ImageBlock corner="tl" />
                    <ImageBlock corner="bl" />
                </div>
                <div className="space-y-0.5 flex flex-col">
                    <ImageBlock corner="tr" />
                    {/* The bottom right block has the count overlay in the image */}
                    <ImageBlock corner="br">
                        {imageCount && imageCount > 1 && (
                            <div className="flex items-center justify-center w-full h-full bg-black/60 rounded-md">
                                <span className="text-xs font-semibold text-zinc-400">+{imageCount - 1}</span>
                            </div>
                        )}
                    </ImageBlock>
                </div>
            </div>
        </div>
    );
};


const SceneRow: React.FC<{ scene: SceneData }> = ({ scene }) => {
    // Determine the type of image preview to show based on the status, matching the image example
    let imageStatus: SceneData['imageStatus'] = 'Placeholder';
    let imageCount: number | undefined;

    if (scene.status === 'Done') {
        imageStatus = 'Generated';
        imageCount = 4; // 4 images shown, no overlay count
    } else if (scene.status === 'In Process') {
        imageStatus = 'Partial';
        imageCount = scene.id % 2 === 0 ? 3 : 4; // Use 3 or 4 for In Process to show diversity, 4 means 3 + overlay
    } else { // Pending
        imageStatus = 'Placeholder';
    }
    
    // Check if image count needs an overlay display
    const actualImageCount = scene.status === 'Done' ? 4 : (scene.id % 2 === 0 ? 3 : 4);


    return (
        <div className="flex items-center justify-between p-3 bg-zinc-800/60 rounded-md hover:bg-zinc-800 transition-colors">
            {/* Image Preview */}
            <div className="w-1/5 min-w-[120px] flex items-center">
                <ImagePreview {...scene} imageStatus={imageStatus} imageCount={actualImageCount} />
            </div>

            {/* Scene Details */}
            <div className="flex-1 px-4">
                {/* Scene number is not visible in the rows in the image, but the desc is the main item */}
                <div className="text-zinc-300 text-sm font-semibold">{scene.sceneNumber}</div>
                <div className="text-zinc-400 text-sm">{scene.description}</div>
            </div>

            {/* Status Tag */}
            <div className="w-1/4 max-w-[120px] flex justify-center">
                <StatusTag status={scene.status} />
            </div>

            {/* Actions */}
            <div className="w-10 flex justify-end">
                <button className="p-2 rounded-lg hover:bg-zinc-700">
                    <ChevronRightIcon className="text-zinc-400 w-4 h-4" />
                </button>
            </div>
        </div>
    );
};


// --- Main Content Components ---

const StatusFilterTab: React.FC<{ label: string, active: boolean, onClick: (label: string) => void }> = ({ label, active, onClick }) => {
    const activeClasses = active ? "bg-zinc-300 text-black" : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700";
    return (
        <button onClick={() => onClick(label)} className={`px-3 py-1.5 rounded-xl transition-colors ${activeClasses} text-sm font-semibold`}>
            {label}
        </button>
    );
};


const SceneList: React.FC<{ scenes: SceneData[] }> = ({ scenes }) => (
    <div className="flex flex-col space-y-2 w-full max-w-4xl">
        {scenes.map(scene => (
            <SceneRow key={scene.id} scene={scene} />
        ))}
    </div>
);

// This component is the right side of the main content, replacing the existing one
const StoryboardRightPanel: React.FC<{ 
    scenesDone: number; 
    scenesInProcess: number; 
    scenesPending: number; 
    totalScenes: number;
    currentProgress: number; 
}> = ({ scenesDone, scenesInProcess, scenesPending, totalScenes, currentProgress }) => {

    // --- Generation Settings Component (Extracted and slightly refined) ---
    const GenerationSettings: React.FC = () => (
        <div className="w-full p-5 bg-zinc-900 rounded-xl flex flex-col space-y-8 border border-zinc-800">
            <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Generation Settings</h3>
                <p className="text-zinc-400 text-xs">
                    Adjust global settings for quicker generations. You can fine-tune these later for individual scenes.
                </p>
            </div>
            
            <div className="space-y-6"> {/* Reduced space to match image density */}
                {/* Image Style */}
                <div className="space-y-2">
                    <label className="text-zinc-400 text-sm">Image Style</label>
                    <div className="flex justify-between items-center h-9 px-3 bg-zinc-800 border border-zinc-700 rounded-lg"> {/* Changed bg to zinc-800 to match image */}
                        <span className="text-zinc-300 text-sm font-semibold">Doodle</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                </div>
                {/* Framing */}
                <div className="space-y-2">
                    <label className="text-zinc-400 text-sm">Framing</label>
                    <div className="flex justify-between items-center h-9 px-3 bg-zinc-800 border border-zinc-700 rounded-lg">
                        <span className="text-zinc-300 text-sm font-semibold">Wide shot</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                </div>
                {/* Image Dimensions */}
                <div className="space-y-2">
                    <label className="text-zinc-400 text-sm">Image Dimensions</label>
                    <div className="flex justify-between items-center h-9 px-3 bg-zinc-800 border border-zinc-700 rounded-lg">
                        <span className="text-zinc-300 text-sm font-semibold">Landscape 16:9</span>
                        <ChevronDownIcon className="text-zinc-300 w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
    // --- End Generation Settings Component ---

    const remainingScenes = totalScenes - currentProgress;
    
    return (
        <div className="w-full md:w-80 flex flex-col space-y-8">
            
            {/* Scene Summary Card - Matching the look of the image */}
            <div className="p-5 bg-zinc-950 rounded-xl flex flex-col space-y-4">
                <div className="space-y-1">
                    <h3 className="text-zinc-400 text-base font-semibold">Total Scenes Generated</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-white text-4xl font-bold">{currentProgress}</span>
                        <span className="text-zinc-400 text-lg font-medium">out of {totalScenes}</span>
                    </div>
                </div>

                {/* Progress Bar (Single bar with color segments) */}
                <div className="flex h-2 w-full rounded-full overflow-hidden my-2">
                    <div 
                        className="bg-green-400" 
                        style={{ width: `${(scenesDone / totalScenes) * 100}%` }} 
                        title={`${scenesDone} Done`}
                    />
                    <div 
                        className="bg-sky-500" 
                        style={{ width: `${(scenesInProcess / totalScenes) * 100}%` }} 
                        title={`${scenesInProcess} In Process`}
                    />
                    <div 
                        className="bg-yellow-400" 
                        style={{ width: `${(remainingScenes / totalScenes) * 100}%` }} 
                        title={`${remainingScenes} Pending`} // Correctly use remainingScenes for the last segment
                    />
                </div>
                
                {/* Status Breakdown (Updated to match image's format) */}
                <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        <span className="text-sm text-white">Done</span>
                        <span className="text-sm text-zinc-400 font-semibold">{scenesDone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                        <span className="text-sm text-white">In Process</span>
                        <span className="text-sm text-zinc-400 font-semibold">{scenesInProcess}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <span className="text-sm text-white">Pending</span>
                        <span className="text-sm text-zinc-400 font-semibold">{remainingScenes}</span>
                    </div>
                </div>
            </div>
            
            {/* Generation Settings Card */}
            <GenerationSettings />
        </div>
    );
};


const StoryboardDashboard: React.FC = () => {
    // Re-defined scene data to exactly match the image's status pattern for the visible rows
    const allScenes: SceneData[] = [
        { id: 1, sceneNumber: '1A', description: 'INT. Some Location - DAY', status: 'Done', imageStatus: 'Generated' },
        { id: 2, sceneNumber: '1A', description: 'INT. Some Location - DAY', status: 'In Process', imageStatus: 'Partial', imageCount: 3 }, // +3 in image
        { id: 3, sceneNumber: '1A', description: 'INT. Some Location - DAY', status: 'In Process', imageStatus: 'Partial', imageCount: 3 },
        { id: 4, sceneNumber: '1A', description: 'INT. Some Location - DAY', status: 'Pending', imageStatus: 'Placeholder' },
        { id: 5, sceneNumber: '1A', description: 'INT. Some Location - DAY', status: 'Pending', imageStatus: 'Placeholder' },
        { id: 6, sceneNumber: '1A', description: 'INT. Some Location - DAY', status: 'Done', imageStatus: 'Generated' },
        { id: 7, sceneNumber: '1A', description: 'INT. Some Location - DAY', status: 'Done', imageStatus: 'Generated' },
    ];
    
    const [selectedStatus, setSelectedStatus] = useState('All');
    
    const filteredScenes = selectedStatus === 'All' 
        ? allScenes 
        : allScenes.filter(scene => scene.status === selectedStatus);

    // Dynamic metrics calculation to match the image's summary
    const totalScenes = 120; // from image
    const scenesDone = 4; // from image
    const scenesInProcess = 3; // from image
    const currentProgress = scenesDone + scenesInProcess;
    const remainingScenes = totalScenes - currentProgress;
    const scenesPending = remainingScenes; // Pending is the rest of the bar

    return (
        <div className="flex-1 p-8 pt-0 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 overflow-y-auto">
            
            {/* Left Column: Scene List */}
            <div className="flex-1 min-w-[500px] space-y-4">
                {/* Scene Filter Tabs */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        {['All', 'Done', 'In Process', 'Pending'].map(status => (
                            <StatusFilterTab 
                                key={status}
                                label={status}
                                active={selectedStatus === status}
                                onClick={setSelectedStatus}
                            />
                        ))}
                    </div>
                    <button className="px-4 py-2 bg-sky-500 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-sky-400 transition-colors">
                        Export Images
                    </button>
                </div>

                <SceneList scenes={filteredScenes} />
            </div>

            {/* Right Column: Settings and Summary - Using the new combined component */}
            <StoryboardRightPanel 
                scenesDone={scenesDone}
                scenesInProcess={scenesInProcess}
                scenesPending={scenesPending}
                totalScenes={totalScenes}
                currentProgress={currentProgress}
            />
        </div>
    );
};

const Sidebar: React.FC<{ activeItem: string }> = ({ activeItem }) => {
    const navItems = [
        { label: 'Dashboard', icon: MenuIcon },
        { label: 'Notifications', icon: BellIcon },
    ];

    const workflowItems = [
        { label: 'Script breakdown', icon: MenuIcon }, // Placeholder icon
        { label: 'Scheduling', icon: BellIcon }, // Placeholder icon
        { label: 'Budgeting', icon: MenuIcon }, // Placeholder icon
        { label: 'Storyboarding', icon: MenuIcon }, // Placeholder icon
    ];

    const manageItems = [
        { label: 'Crew', icon: MenuIcon }, // Placeholder icon
        { label: 'Characters', icon: BellIcon }, // Placeholder icon
        { label: 'Sets and Locations', icon: MenuIcon }, // Placeholder icon
        { label: 'Production Elements', icon: BellIcon }, // Placeholder icon
    ];
    
    const NavItem: React.FC<{ label: string, Icon: React.FC, active: boolean }> = ({ label, Icon, active }) => (
        <a 
            href="#" 
            className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${active ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}
        >
            <Icon />
            <span className="text-sm font-medium">{label}</span>
        </a>
    );

    return (
        <div className="w-56 bg-zinc-900 flex-shrink-0 p-4 flex flex-col justify-between">
            <div>
                <div className="p-2 text-xl font-bold text-white mb-6">□</div> 
                
                {/* Workflow */}
                <div className="space-y-1 mb-6">
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 ml-3">Workflow</h3>
                    {workflowItems.map(item => (
                        <NavItem 
                            key={item.label} 
                            label={item.label} 
                            Icon={item.icon} 
                            active={item.label === activeItem}
                        />
                    ))}
                </div>
                
                {/* Manage */}
                <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 ml-3">Manage</h3>
                    {manageItems.map(item => (
                        <NavItem 
                            key={item.label} 
                            label={item.label} 
                            Icon={item.icon} 
                            active={item.label === activeItem}
                        />
                    ))}
                </div>
            </div>

            {/* User Profile */}
            <div className="p-2 bg-zinc-800 rounded-xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        JD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">John Doe</span>
                        <span className="text-xs text-zinc-400">johndoe@gmail.com</span>
                    </div>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-zinc-400" />
            </div>
        </div>
    );
};


const page: React.FC = () => {
    return (
        <div className="flex h-screen bg-zinc-950 font-sans w-full">
            {/* Sidebar (Added back for context) */}
            {/* <Sidebar activeItem="Storyboarding" /> */}

            <div className="flex-1 overflow-hidden">
                <div className="bg-zinc-900 rounded-xl h-full flex flex-col relative m-2">
                    {/* Header Bar */}
                    <div className="p-2 border-b border-zinc-800 flex justify-between items-center">
                        <div className="flex items-center space-x-2 p-1">
                            <span className="text-sm font-semibold text-zinc-400">Untitled Project</span>
                            <ChevronDownIcon className="w-4 h-4 text-zinc-400" />
                        </div>
                    </div>
                    
                    {/* Title */}
                    <div className="px-8 pt-6 pb-2">
                        <h1 className="text-4xl lg:text-5xl font-semibold text-white">Storyboarding</h1>
                    </div>

                    <StoryboardDashboard />
                </div>
            </div>
        </div>
    );
};

export default page;