"use client";

import React, { useState } from 'react';
import { ChevronDown, MoreHorizontal, Plus, X } from 'lucide-react';
import { useRouter } from "next/navigation";


// --- Utility Components (Unchanged) ---

const FilmIcon = ({ color }: { color: string }) => (
  <div className="w-9 h-9 relative overflow-hidden">
    <div 
      className="w-[24.75px] h-[29.25px] absolute left-[5.62px] top-[3.38px]"
      style={{ backgroundColor: color }}
    />
  </div>
);

const StackedLinesIcon = () => (
  <div className="w-[24.17px] h-[19.33px] shadow-[inset_0_1.13px_0_rgba(255,255,255,0.25)] flex flex-col gap-[1.96px]">
    <div className="w-full h-[8.69px] rounded-[4.89px] border-[2.94px] border-[#9D9D9D]" />
    <div className="w-full h-[8.69px] bg-[#9D9D9D] rounded-[4.89px]" />
  </div>
);

// --- Modal Components ---

/**
 * Renders the 'New Project' modal shown in the image.
 */
const NewProjectModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
    <div className="w-[440px] p-6 bg-[#27272A] rounded-[15px] shadow-2xl relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-semibold">New Project</h2>
        <button onClick={onClose} className="w-6 h-6 text-[#9F9FA9] hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <label htmlFor="projectName" className="text-white text-sm font-normal block mb-2">Project Name</label>
      <input
        id="projectName"
        type="text"
        defaultValue="Oppenheimer" // Example value
        className="w-full px-4 py-3  border border-[#3C3C43] rounded-xl text-white placeholder-[#9F9FA9] focus:outline-none focus:ring-1 focus:ring-white/20 mb-6"
      />

      <div className="flex justify-end gap-3">
        <button 
          onClick={onClose}
          className="px-5 py-3 text-[#9F9FA9] text-base font-semibold rounded-xl hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={onClose}
          className="px-5 py-3 bg-[#53EAFD] text-black text-base font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Create
        </button>
      </div>
    </div>
  </div>
);

/**
 * Renders the 'Delete Project Confirmation' modal shown in the image.
 */
const DeleteConfirmationModal = ({ project, onClose }: { 
  project: { name: string } | null; 
  onClose: () => void 
}) => {
  const [confirmText, setConfirmText] = useState('');
  const isConfirmDisabled = confirmText !== 'Delete';

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
      <div className="w-[440px]  bg-[#27272A] rounded-[15px] shadow-2xl relative border-t-4 border-[#FF4E4E]">
     <div className='p-6'>
         <div className="flex items-center justify-end">
            <button onClick={onClose} className="w-6 h-6 text-[#9F9FA9] hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        <h2 className="text-white text-xl font-semibold mt-[-8px] mb-4">Delete Project {project.name}?</h2>
        <p className="text-[#9F9FA9] text-sm font-normal mb-8">
          This will permanently remove all data in Script Breakdown, Budgeting, Schedule, and more. 
          **This action can't be undone.** Are you sure you want to delete this project?
        </p>
     </div>

        <div className='bg-[#4b3135] p-6'>

        <label htmlFor="confirmDelete" className="text-white text-sm font-normal block mb-2">
          Please type **"Delete"** to confirm action.
        </label>
        
        <input
          id="confirmDelete"
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className={`w-full px-4 py-3 bg-[#32282b] rounded-xl text-white placeholder-[#9F9FA9] focus:outline-none focus:ring-1 transition-all mb-6 ${
            confirmText === 'Delete' ? 'border border-[#FF4E4E]' : 'border border-[#3C3C43]'
          }`}
        />

        <button 
          onClick={() => { /* Implement actual delete logic here */ onClose(); }}
          disabled={isConfirmDisabled}
          className={`w-full py-3 text-base font-semibold rounded-xl transition-all ${
            isConfirmDisabled
              ? 'bg-[#18181B] text-[#9F9FA9]/50 cursor-not-allowed'
              : 'bg-[#FF4E4E] text-white hover:bg-red-600'
          }`}
        >
          Delete Project
        </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Component ---

export default function Home() {
    const router = useRouter();

  const projects = [
    {
      id: 1,
      name: "Project Odyssey",
      color: "#DAB2FF",
      createdDate: "Created 2 days ago"
    },
    {
      id: 2,
      name: "Untitled Project",
      color: "#53EAFD",
      createdDate: "Created 2 days ago"
    }
  ];

  // State for modals/popovers
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectActionsId, setProjectActionsId] = useState<number | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<number | null>(null);

  const selectedProject = projects.find(p => p.id === deleteConfirmationId);

  // Handlers
  const openDeleteModal = (id: number) => {
    setProjectActionsId(null); // Close the popover
    setDeleteConfirmationId(id);
  };
  
  const closeAllModals = () => {
    setIsNewProjectModalOpen(false);
    setProjectActionsId(null);
    setDeleteConfirmationId(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#18181B] overflow-hidden">
      {/* Header */}
      <div className="w-full px-[152px] pt-[45px]">
        <div className="w-full flex items-center justify-between">
          {/* Brand Name */}
          <div className='flex gap-5'> 
            <StackedLinesIcon />
            <h1 className="text-[#9D9D9D] text-[18.52px] font-bold leading-[24.07px] font-['Onest']">
              FilmForge
            </h1>
          </div>

          {/* User Profile */}
          <div className="w-[234px] p-2 bg-[#27272A] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div className="w-[33.81px] h-[33.81px] bg-[#FE9A00] rounded-[6px] flex items-center justify-center">
                <span className="text-black text-xl font-semibold leading-4">J</span>
              </div>
              
              {/* User Info */}
              <div className="w-[114px] flex flex-col gap-[1px]">
                <div className="text-white text-sm font-semibold leading-4">
                  John Doe
                </div>
                <div className="text-white/30 text-xs font-normal leading-4">
                  johndoe@gmail.com
                </div>
              </div>
            </div>

            {/* Dropdown Button */}
            <button className="w-9 h-9 rounded-[10px] flex items-center justify-center hover:bg-white/5 transition-colors">
              <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-[153px] mt-[62px]">
        <div className="w-full max-w-[1020px]">
          {/* Welcome Message */}
          <h1 className="text-white text-4xl font-bold leading-[46.8px] ">
            Welcome John doe
          </h1>

          {/* My Projects Section */}
          <div className="mt-[37px] mb-[14px]">
            <h2 className="text-[#9F9FA9] text-base font-normal leading-[20.8px]">
              My Projects
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="w-full max-w-[1135px] flex items-center gap-[22px]">
            {/* Existing Projects */}
            {projects.map((project) => (
              <div 
                key={project.id}
                className="flex-1 px-6 py-[23px] bg-[#27272A] rounded-xl flex flex-col gap-6"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between relative">
                  <FilmIcon color={project.color} />
                  
                  {/* More Options Button */}
                  <button 
                    onClick={() => setProjectActionsId(projectActionsId === project.id ? null : project.id)}
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center hover:bg-white/5 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4 text-[#9F9FA9]" />
                  </button>

                  {/* Project Actions Popover (Open Project, Edit, Delete) */}
                  {projectActionsId === project.id && (
                    <div className="absolute right-0 top-10 w-[150px] bg-[#27272A] rounded-lg shadow-xl z-10 p-1 border border-[#3C3C43]">
                      <div onClick={() => router.push("/projecthome")} className="px-3 py-2 text-white text-sm hover:bg-white/10 rounded-md cursor-pointer">
                        Open Project
                      </div>
                      <div className="px-3 py-2 text-white text-sm hover:bg-white/10 rounded-md cursor-pointer">
                        Edit
                      </div>
                      <div 
                        onClick={() => openDeleteModal(project.id)}
                        className="px-3 py-2 text-[#FF4E4E] text-sm hover:bg-[#FF4E4E]/20 rounded-md cursor-pointer"
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="flex flex-col gap-[5px]">
                  <div className="text-white text-xl font-semibold leading-[26px]">
                    {project.name}
                  </div>
                  <div className="text-[#9F9FA9] text-sm font-normal leading-[18.2px]">
                    {project.createdDate}
                  </div>
                </div>
              </div>
            ))}

            {/* New Project Card */}
            <div className="flex-1 h-[155px] px-6 py-[23px] bg-[#212124] rounded-xl flex flex-col items-center justify-center gap-6 cursor-pointer"
                 onClick={() => setIsNewProjectModalOpen(true)}
            >
              <button className="h-11 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
                <Plus className="w-6 h-6 text-[#9F9FA9]" />
                <span className="text-[#9F9FA9] text-base font-semibold leading-5">
                  New Project
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isNewProjectModalOpen && <NewProjectModal onClose={closeAllModals} />}
      {deleteConfirmationId !== null && selectedProject && (
        <DeleteConfirmationModal 
          project={selectedProject} 
          onClose={closeAllModals} 
        />
      )}
    </div>
  );
}