"use client"

import React, { useState, useEffect } from 'react';
import { LayoutGrid, Bell, FileText, Calendar, DollarSign, Image, Users, MapPin, Package, ChevronDown, Menu } from 'lucide-react';


const steps = [
  {
    title: "Welcome to FilmForge",
    description: "Your all-in-one tool to plan, budget, and manage your film production.",
    iconClass: "w-[274px]   flex items-center justify-center",
    icon: <img src='./model1.png'/>
  },
  {
    title: "Start with Your Script",
    description: "Upload your script to automatically extract scenes, characters, and props with AI.",
    iconClass: "w-[274px]  bg-[#3C57FF] flex items-center justify-center",
 icon: <img src='./model2.png'/>  },
  {
    title: "Build Your Budget",
    description: "Create a clear budget by adding line items, assigning categories, and monitoring totals.",
    iconClass: "w-[274px] bg-[#52525C] flex items-center justify-center",
 icon: <img src='./model3.png'/>  },
  {
    title: "Plan the Shoot",
    description: "Set up your shooting schedule, generate call sheets, and track scene progress in one place.",
    iconClass: "w-[274px]  bg-[#FFB86A] flex items-center justify-center",
 icon: <img src='./model4.png'/>  },
  {
    title: "Visualize Your Story",
    description: "Create visual frames using AI. Bring your scenes to life before the shoot begins.",
    iconClass: "w-[274px]  bg-[#C27AFF] flex items-center justify-center",
 icon: <img src='./model5.png'/>  },
];

const OnboardingModal = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {

    onClose();
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const stepContent = steps[currentStep];

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-[300px] p-3  bg-[#18181B] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        <div className={`flex-grow-0 ${stepContent.iconClass}`}>
          {stepContent.icon}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between gap-6">
          <div className="text-center">
            <h2 className="text-white text-xl font-semibold mb-3">{stepContent.title}</h2>
            <p className="text-[#9F9FA9] text-sm">{stepContent.description}</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-center gap-2 mb-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentStep ? 'bg-[#1A6CFF]' : 'bg-[#27272A]'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              {isFirstStep ? (
                <button
                  onClick={handleFinish}
                  className="text-[#9F9FA9] text-sm font-semibold hover:text-white"
                >
                  Skip
                </button>
              ) : (
                <button
                  onClick={handleBack}
                  className="text-[#9F9FA9] text-sm font-semibold hover:text-white"
                >
                  Back
                </button>
              )}

              {isFirstStep ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-[#1A6CFF] text-white text-sm font-semibold rounded-lg hover:bg-[#1A6CFF]/80"
                >
                  Get Started
                </button>
              ) : isLastStep ? (
                <button
                  onClick={handleFinish}
                  className="px-5 py-2 bg-[#1A6CFF] text-white text-sm font-semibold rounded-lg hover:bg-[#1A6CFF]/80"
                >
                  Finish
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-[#1A6CFF] text-white text-sm font-semibold rounded-lg hover:bg-[#1A6CFF]/80"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function FilmDashboard() {
  const [showOnboarding, setShowOnboarding] = useState(true); 

  useEffect(() => {

  }, []);

  return (
    <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">

      <div className="flex-1 p-2.5">
        <div className="h-full bg-[#18181B] rounded-xl overflow-auto">
          <div className="p-2 border-b border-[#27272A]">
            <button className="flex items-center gap-2 px-3 h-9 rounded-lg hover:bg-zinc-800">
              <span className="text-sm font-semibold text-[#9F9FA9]">Project Odyssey</span>
              <ChevronDown className="w-4 h-4 text-[#9F9FA9]" />
            </button>
          </div>

          <div className="p-9">
            <div className="mb-8 pt-16">
              <h1 className="text-[32px] font-semibold mb-2">Project Odyssey</h1>
              <p className="text-sm text-[#9F9FA9]">Created on : 17 Jul 2025</p>
            </div>

            <div className="flex gap-5 mb-14">
              <div className="w-64 p-5 bg-[#27272A] rounded-xl flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-zinc-300">Total Estimated Cost</h3>
                <div className="flex flex-col gap-2 text-center">
                  <p className="text-xs text-[#9F9FA9]">Add line items to your budgeting sheet to start tracking your costs.</p>
                  <button className="text-sm font-semibold text-[#00BCFF]">Open Budgeting</button>
                </div>
              </div>

              <div className="w-[441px] p-5 bg-[#27272A] rounded-xl">
                <h3 className="text-sm font-semibold text-zinc-300 mb-6">Schedule</h3>
                <div className="flex flex-col gap-2 text-center">
                  <p className="text-xs text-[#9F9FA9]">Once you add a shooting schedule for scenes, it will appear here for easy tracking.</p>
                  <button className="text-sm font-semibold text-[#00BCFF]">View Scheduling</button>
                </div>
              </div>

              <div className="flex-1 p-5 bg-[#27272A] rounded-xl">
                <h3 className="text-sm font-semibold text-zinc-300 mb-6">Activity</h3>
                <p className="text-xs text-[#9F9FA9] text-center">This panel will show any changes made to your budget. Use it to stay on top of edits and updates.</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-base font-semibold mb-1">Get Started</h2>
                <p className="text-base text-[#9F9FA9]">Build, plan, and visualize your film your way.</p>
              </div>

              <div className="flex gap-3.5">
                <div className="w-[261px] p-6 bg-[#052F4A]/50 rounded-xl flex flex-col gap-4">
                  <FileText className="w-6 h-6 text-[#00BCFF]" />
                  <div>
                    <h3 className="text-base font-semibold text-[#00BCFF] mb-1">Import Script</h3>
                    <p className="text-sm text-[#00BCFF]/60">Break your script into scenes, characters, and props automatically.</p>
                  </div>
                </div>

                <div className="w-[261px] p-6 bg-[#032E15] rounded-xl flex flex-col gap-4">
                  <DollarSign className="w-6 h-6 text-[#05DF72]" />
                  <div>
                    <h3 className="text-base font-semibold text-[#05DF72] mb-1">Plan your Budget</h3>
                    <p className="text-sm text-[#05DF72]/60">Build your budget by outlining key costs and tracking your total spend.</p>
                  </div>
                </div>

                <div className="w-[261px] p-6 bg-[#441306]/80 rounded-xl flex flex-col gap-4">
                  <Image className="w-6 h-6 text-[#FFB86A]" />
                  <div>
                    <h3 className="text-base font-semibold text-[#FFB86A] mb-1">Storyboarding</h3>
                    <p className="text-sm text-[#FFB86A]/60">Visualize scenes and generate frames, characters, and props with AI.</p>
                  </div>
                </div>

                <div className="w-[261px] p-6 bg-[#3C0366]/50 rounded-xl flex flex-col gap-4">
                  <Calendar className="w-6 h-6 text-[#C27AFF]" />
                  <div>
                    <h3 className="text-base font-semibold text-[#C27AFF] mb-1">Schedule Scenes</h3>
                    <p className="text-sm text-[#C27AFF]/60">Plan your shoot with scene scheduling, call sheets, and DOOD tracking.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="flex-1 p-5 bg-[#212124] rounded-xl flex flex-col gap-4">
                  <Users className="w-6 h-6 text-zinc-300" />
                  <h3 className="text-base font-semibold text-zinc-300">Create and manage talent, crew and more</h3>
                </div>

                <div className="flex-1 p-5 bg-[#212124] rounded-xl flex flex-col gap-4">
                  <Image className="w-6 h-6 text-zinc-300" />
                  <h3 className="text-base font-semibold text-zinc-300">Visualize Scenes, Characters and props with AI</h3>
                </div>

                <div className="flex-1 p-5 bg-[#212124] rounded-xl flex flex-col gap-4">
                  <FileText className="w-6 h-6 text-zinc-300" />
                  <h3 className="text-base font-semibold text-zinc-300">Call Sheet</h3>
                </div>

                <div className="flex-1 p-5 bg-[#212124] rounded-xl flex flex-col gap-4">
                  <Calendar className="w-6 h-6 text-zinc-300" />
                  <h3 className="text-base font-semibold text-zinc-300">Day-out-of Days</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
    </div>
  );
}