import React from 'react';

const page = () => {
  return (
    // Outer Container: Responsive, taking full width and minimum full height
    <div className="w-full min-h-screen p-2.5 flex flex-col justify-start items-start gap-2.5 font-sans bg-black">
      {/* Inner Screen Area: The main dashboard canvas */}
      <div className="self-stretch flex-1 relative bg-[#18181B] overflow-auto rounded-xl shadow-2xl">

        {/* Top Bar / Header */}
        <header className="sticky top-0 z-10 w-full p-2 bg-[#18181B] border-b border-[#27272A] flex justify-between items-center">
          {/* Project Title Button (Left) */}
          <div data-leading-icon="false" data-size="Small" data-state="Default" data-trailing-icon="true" data-type="Tertiary" className="h-9 px-3 rounded-xl flex justify-center items-center gap-2 cursor-pointer hover:bg-[#27272A]">
            <div className="text-[#9F9FA9] text-sm font-semibold leading-5">Untitled Project</div>
            {/* Chevron Down Icon (Replaced original placeholder) */}
            <svg className="w-4 h-4 text-[#9F9FA9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {/* Menu Icon Placeholder (Right) */}
          <div className="w-9 h-9 mr-2 relative flex items-center justify-center cursor-pointer rounded-xl hover:bg-[#27272A]">
            <svg className="w-5 h-5 text-[#9F9FA9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </header>

        {/* Main Content Layout starts here */}
        <div className="p-9 pt-6 ">

          {/* Title, Tabs, and Floating Card Area (Row 0) */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-6">
            
            {/* Main Title and Tabs Section (Left) */}
            <div className="flex flex-col justify-end items-start gap-8 flex-1 mb-8 lg:mb-0">
              <div className="text-white text-[42px] font-semibold leading-[54.6px]">Budgeting</div>
              <div className="flex justify-start items-center gap-5 border-b border-[#27272A] w-full">
                {/* Overview Tab (Active) */}
                <div data-active="Yes" data-show-ammount="true" data-type="Underline" className="flex flex-col justify-start items-center gap-3 pb-3 cursor-pointer">
                  <div className="text-[#00BCFF] text-sm font-semibold leading-4">Overview</div>
                  <div className="self-stretch h-1 bg-[#00BCFF] rounded-xl" />
                </div>
                {/* Line Items Breakdown Tab (Inactive) */}
                <div data-active="No" data-show-ammount="true" data-type="Underline" className="flex flex-col justify-start items-center gap-3 pb-3 cursor-pointer">
                  <div className="self-stretch text-center text-[#9F9FA9] text-sm font-semibold leading-4">Line Items Breakdown</div>
                  {/* Invisible line for alignment */}
                  <div className="self-stretch h-1 opacity-0 bg-[#9F9FA9] rounded-xl" /> 
                </div>
              </div>
            </div>

            {/* Small Floating Card (Right) - Refactored to float logically next to the title section */}
            <div className="w-full max-w-xs p-4 bg-[#212124] shadow-xl rounded-2xl outline outline-[1px] outline-[#52525C] flex flex-col justify-start items-start gap-3 flex-shrink-0">
              <div className="self-stretch flex justify-between items-center">
                <div className="flex justify-start items-center gap-1">
                  <div className="text-[#D4D4D8] text-xs font-semibold">Budget</div>
                </div>
                {/* Notification Bell Icon */}
                <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
                  <svg className="w-4 h-4 text-[#9F9FA9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-start items-center gap-0.5">
                <div className="text-[#9F9FA9] text-xl font-semibold">$</div>
                <div className="text-[#52525C] text-xl font-semibold">Set Amount</div>
              </div>
            </div>

          </div>
          {/* End of Title/Tabs/Floating Card Area */}

          {/* Grid Row 1: Key Metrics (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* Total Estimated Cost Card (Left) */}
            <div className="p-4 bg-[#27272A] rounded-xl flex flex-col justify-start items-start gap-6">
              <div className="text-[#D4D4D8] text-sm font-normal">Total Estimated Cost</div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="text-white text-3xl font-semibold">$250,000</div>
                <div>
                  <span className="text-[#FF6467] text-xs font-normal">+5%</span>
                  <span className="text-[#9F9FA9] text-xs font-normal"> from last week</span>
                </div>
              </div>
            </div>

            {/* Top Expense Card (Middle Left) */}
            <div className="p-4 bg-[#27272A] rounded-xl flex flex-col justify-between items-start">
              <div className="text-[#D4D4D8] text-sm font-normal">Top Expense</div>
              <div className="flex flex-col justify-start items-start gap-1 pt-6">
                <div className="text-white text-2xl font-semibold">Cast</div>
                <div className="text-[#9F9FA9] text-xl font-semibold">$100,000</div>
              </div>
            </div>

            {/* Budget Variance Card (Middle Right) */}
            <div className="p-4 bg-[#27272A] rounded-xl flex flex-col justify-between items-start">
              <div className="text-[#D4D4D8] text-sm font-normal">Budget Variance</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1 pt-6">
                <div className="self-stretch">
                  <span className="text-[#7BF1A8] text-2xl font-semibold">$12,000</span>
                  <span className="text-white text-2xl font-semibold"> </span>
                  <span className="text-[#FAFAFA] text-2xl font-semibold">under budget</span>
                </div>
              </div>
            </div>

            {/* Burn Rate Card (Right) */}
            <div className="p-4 bg-[#27272A] rounded-xl flex flex-col justify-between items-start">
              <div className="text-[#D4D4D8] text-sm font-normal">Burn Rate</div>
              <div className="flex flex-col justify-start items-start gap-[9px]">
                <div className="flex justify-start items-center gap-1">
                  <div className="text-white text-2xl font-semibold">$10,000</div>
                  <div className="text-[#9F9FA9] text-xl font-semibold">per week</div>
                </div>
                <div>
                  <span className="text-[#FF6467] text-xs font-normal">+5%</span>
                  <span className="text-[#9F9FA9] text-xs font-normal"> from last week</span>
                </div>
              </div>
            </div>

          </div>
          {/* End of Grid Row 1 */}


          {/* Grid Row 2: Charts and Activity Log (Large/Medium) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            
            {/* Cost Pool Breakdown Card (Large Middle) - Span 2 columns on large screens */}
            <div className="lg:col-span-2 h-[290px] p-6 bg-[#27272A] rounded-xl flex flex-col justify-start items-start gap-4">
              <div className="text-[#D4D4D8] text-sm font-normal">Cost Pool Breakdown</div>
              <div className="self-stretch flex flex-col justify-start items-start gap-4 flex-1">
                <div className="text-white text-2xl font-semibold">$250,000</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                  <div className="self-stretch flex flex-col justify-start items-start gap-5">
                    {/* Horizontal Bar Chart */}
                    <div className="self-stretch h-7 flex justify-start items-center gap-1.5">
                      <div className="flex-1 self-stretch flex justify-start items-center gap-1.5">
                        <div className="flex-1 self-stretch bg-[#00D5BE] rounded-sm" /> {/* Above the Line (50%) */}
                        <div className-="flex-1 self-stretch bg-[#FDC700] rounded-sm" /> {/* Below the Line (50%) */}
                      </div>
                      <div className="w-[148.5px] self-stretch flex justify-start items-center gap-1.5">
                        <div className="w-[71.25px] self-stretch bg-[#DAB2FF] rounded-sm" /> {/* Post-Production (~25%) */}
                        <div className="w-[71.25px] self-stretch bg-[#71717B] rounded-sm" /> {/* Additional Costs (~25%) */}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap justify-start items-start gap-x-9 gap-y-3">
                      {/* Legend Item Component - Refactored for clean code and reusability */}
                      {[{ color: '#00D5BE', title: 'Above the Line', cost: '$250,000' }, 
                        { color: '#FDC700', title: 'Below the Line', cost: '$250,000' }, 
                        { color: '#DAB2FF', title: 'Post-Production', cost: '$250,000' }, 
                        { color: '#71717B', title: 'Additional Costs', cost: '$100,000' },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-start items-start gap-3">
                          <div className="w-1 h-6 rounded-lg" style={{ backgroundColor: item.color }} />
                          <div className="flex flex-col justify-center items-start gap-1">
                            <div className="text-[#D4D4D8] text-sm font-semibold">{item.title}</div>
                            <div className="text-[#D4D4D8] text-sm font-normal">{item.cost}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Card (Right Column) - Span 1 column */}
            <div className="h-[290px] p-6 bg-[#27272A] rounded-xl flex flex-col justify-start items-start gap-6 overflow-y-auto">
              <div className="text-[#D4D4D8] text-sm font-normal sticky top-0 bg-[#27272A] w-full pb-2 -mt-1">Activity</div>

              {/* Activity Items */}
              {[
                { name: 'Shanaya Kapoor’s', action: 'daily rate increased.', delta: '+$7,500 increase in Above the line budget', time: '2 hours ago', icon: 'User' },
                { name: '“Grip Department”', action: 'added to Below the line', delta: '+$7,500 increase in budget', time: '2 hours ago', icon: 'Folder' },
                { name: '“Payroll & Fringes”', action: 'added to Above the line', delta: '+$7,500 increase in budget', time: '2 hours ago', icon: 'Folder' },
                { name: '“Electrical Department”', action: 'added to Below the line', delta: '+$7,500 increase in budget', time: '2 hours ago', icon: 'Folder' },
                { name: 'Another Activity', action: 'was logged.', delta: 'No budget impact', time: '3 hours ago', icon: 'User' },
              ].map((item, index) => (
                <div key={index} className="self-stretch flex justify-start items-start gap-3">
                  <div className="w-9 h-9 p-[10.62px] bg-[#3F3F47] rounded-full flex justify-center items-center flex-shrink-0">
                    {/* Icon switch based on item type */}
                    {item.icon === 'User' ? (
                      <svg className="w-full h-full text-[#D4D4D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ) : (
                      <svg className="w-full h-full text-[#D4D4D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch">
                      <span className="text-white text-sm font-semibold">{item.name} </span>
                      <span className="text-white text-sm font-normal">{item.action}</span>
                    </div>
                    <div className="self-stretch text-[#9F9FA9] text-xs font-normal">{item.delta}</div>
                    <div className="self-stretch text-[#71717B] text-xs font-normal">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* End of Grid Row 2 */}

          {/* Grid Row 3: Cash Flow Projection (Full Width) */}
          <div className="w-full">
            <div className="h-[296px] p-6 bg-[#27272A] rounded-xl flex flex-col justify-between items-start">
              <div className="text-[#D4D4D8] text-sm font-normal">Cash Flow Projection</div>
              
              {/* Bar Chart Area */}
              <div className="self-stretch flex justify-around items-end gap-3 mt-4 flex-1">
                {/* Bar Component - Refactored into a map for cleanliness */}
                {[
                  { label: 'Week 2', scenes: 12, height: 'h-[120px]', active: false, amount: null },
                  { label: 'Week 3', scenes: 12, height: 'h-[135px]', active: false, amount: null },
                  { label: 'This Week', scenes: 12, height: 'h-[181px]', active: true, amount: '$25,000' },
                  { label: 'Week 4', scenes: 12, height: 'h-[113px]', active: false, amount: null },
                  { label: 'Week 5', scenes: 12, height: 'h-[88px]', active: false, amount: null },
                  { label: 'Week 6', scenes: 12, height: 'h-[88px]', active: false, amount: null },
                ].map((bar, index) => (
                  <div 
                    key={index} 
                    className={`flex-1 min-w-[70px] max-w-[100px] px-3 pt-4 pb-4 rounded-sm flex flex-col justify-between items-center transition-all duration-300 ${bar.height} ${bar.active ? 'bg-[#D4D4D8]' : 'bg-[#3F3F47] hover:bg-[#52525C]'}`}
                  >
                    {/* Amount on active bar */}
                    {bar.active && (
                      <div className="self-stretch opacity-90 text-center text-[#18181B] text-sm font-semibold">{bar.amount}</div>
                    )}
                    
                    {/* Spacer for inactive bars to push content down */}
                    {!bar.active && <div className="flex-1" />}

                    {/* Labels at the bottom */}
                    <div className="flex flex-col justify-center items-center gap-0.5 mt-auto">
                      <div className={`self-stretch text-center text-sm font-semibold ${bar.active ? 'text-[#18181B]' : 'text-[#F4F4F5]'}`}>{bar.label}</div>
                      <div className={`self-stretch opacity-75 text-center text-xs font-normal ${bar.active ? 'text-[#18181B]' : 'text-[#F4F4F5]'}`}>{bar.scenes} scenes</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
          {/* End of Grid Row 3 */}

        </div>
        {/* End of Main Content Layout */}

      </div>
    </div>
  );
};

export default page;