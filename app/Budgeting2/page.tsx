"use client"

import React, { useState, useRef, useEffect } from 'react';

// --- Icon Components (Keeping existing icons) ---
const MenuIcon: React.FC = () => (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="10.34" width="22" height="7.66" rx="4.31" fill="#9D9D9D" />
      <rect x="2.59" y="2.59" width="16.82" height="7.66" rx="4.31" stroke="#9D9D9D" strokeWidth="2.59" />
    </svg>
);

const SearchIcon: React.FC = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 12.25L11.5 10.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 11.5C9.48528 11.5 11.5 9.48528 11.5 7C11.5 4.51472 9.48528 2.5 7 2.5C4.51472 2.5 2.5 4.51472 2.5 7C2.5 9.48528 4.51472 11.5 7 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

const ChevronDownIcon: React.FC = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 5.5L8 10L12.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ClipboardIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.28125" y="1.96875" width="16.3125" height="14.0625" rx="3" stroke="#71717B" strokeWidth="1.5"/>
      <path d="M4.125 0.5V3.4375" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.875 0.5V3.4375" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CalendarIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.25" y="2.25" width="13.5" height="14.25" rx="3" stroke="#71717B" strokeWidth="1.5"/>
      <path d="M6.75 0.75V3.75" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.25 0.75V3.75" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.25 6.75H15.75" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DollarSignIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="7" stroke="#FAFAFA" strokeWidth="1.5" />
      <text x="9" y="11" fill="#FAFAFA" fontSize="10" textAnchor="middle" dominantBaseline="central">$</text>
    </svg>
);

const UsersIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 15V13.75C1.5 12.5511 1.97411 11.4027 2.81802 10.5588C3.66193 9.71488 4.81031 9.24077 6 9.24077H12C13.1897 9.24077 14.3381 9.71488 15.182 10.5588C16.0259 11.4027 16.5 12.5511 16.5 13.75V15" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="4.875" r="3.375" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PenToolIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 2.25L10.5 8.25" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.25 15.75L8.25 9.75" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.75 2.25L15.75 5.25" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MoreHorizontalIcon: React.FC = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3.5" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="12.5" cy="8" r="1.5" fill="currentColor"/>
    </svg>
);

const PlusIcon: React.FC = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BriefcaseIcon: React.FC = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="5" width="11" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5 5V3.5C5.5 2.67157 6.17157 2 7 2H9C9.82843 2 10.5 2.67157 10.5 3.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PencilIcon: React.FC = ({ className = 'w-4 h-4 text-zinc-400' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 4.5L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 9.5L6 11.5L4.5 10L6.5 8L8.5 6L10.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.5 4.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CloseIcon: React.FC = ({ className = 'w-4 h-4 text-white' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- Component Props Types ---
type BudgetCategory = 'Above the line' | 'Below the line' | 'Post Production' | 'Additional Costs';

interface BudgetTabProps {
    label: BudgetCategory;
    count: number;
    active: boolean;
    onClick: (label: BudgetCategory) => void;
}

interface BudgetLineItemProps {
    name: string;
    role?: string; // Optional for non-talent items
    rate?: string; // Optional for non-talent items
    total: string;
    days?: number; // Optional for non-talent items
    onEdit: () => void;
    onDelete: () => void;
    isTalent?: boolean;
    isLast?: boolean;
}


// --- Utility Components ---

const DropdownMenu: React.FC<{
    onEdit: () => void;
    onDelete: () => void;
    children: React.ReactNode;
}> = ({ onEdit, onDelete, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-md hover:bg-zinc-700">
                {children}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-zinc-700 border border-zinc-600 rounded-lg shadow-xl overflow-hidden z-10">
                    <button
                        onClick={() => { onEdit(); setIsOpen(false); }}
                        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-zinc-600 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => { onDelete(); setIsOpen(false); }}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-zinc-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};


// --- Modal Components ---
interface ModalProps { isOpen: boolean; onClose: () => void; children: React.ReactNode; title: string; }
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => { 
    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-sm shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-800">
                        <CloseIcon className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    ) : null; 
};

interface InputFieldProps { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string; }
const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-zinc-400 sr-only">{label}</label>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder || label} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-sky-500 focus:border-sky-500 text-base"/>
    </div>
);

const AddModal: React.FC<{ isOpen: boolean, onClose: () => void, onAddItem: (name: string, amount: number) => void }> = ({ isOpen, onClose, onAddItem }) => {
    const [itemName, setItemName] = useState('');
    const [amount, setAmount] = useState('');
    
    const handleAddItem = () => {
        const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
        if (itemName && !isNaN(numericAmount)) {
            onAddItem(itemName, numericAmount);
            setItemName('');
            setAmount('');
            onClose();
        } else {
            alert('Please enter a valid item name and amount.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Item">
            <div className="space-y-4">
                <InputField label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="e.g. Payroll & Fringes"/>
                <InputField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value.replace('$', '').trim())} placeholder="e.g. 320,000" />
                <button onClick={handleAddItem} className="w-full py-3 bg-sky-500 text-black text-base font-semibold rounded-lg hover:bg-sky-400 transition-colors mt-6">
                    Add Item
                </button>
            </div>
        </Modal>
    );
};

const EditItemModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    // Simplified: in a real app, this would receive and edit actual item data
    const [itemName, setItemName] = useState('Development');
    const [amount, setAmount] = useState('120,000');

    const handleSaveChanges = () => {
        console.log(`Editing Item: ${itemName} to amount $${amount}`);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Details">
            <div className="space-y-4">
                <InputField label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                <InputField label="Amount" value={`$ ${amount}`} onChange={(e) => setAmount(e.target.value.replace('$', '').trim())} />
                <div className="flex justify-end space-x-3 pt-4">
                    <button onClick={onClose} className="px-4 py-2 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors border border-transparent">
                        Cancel
                    </button>
                    <button onClick={handleSaveChanges} className="px-4 py-2 bg-sky-500 text-black text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const EditTalentModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    // Omitted SelectField implementation for brevity but assume it works
    const SelectField = ({ label, options, value, onChange }: any) => (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-zinc-400 sr-only">{label}</label>
            <select value={value} onChange={onChange} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-sky-500 focus:border-sky-500 text-base appearance-none">
                <option value="" disabled>{`Select ${label}`}</option>
                {options.map((option: string) => (<option key={option} value={option} className='bg-zinc-800'>{option}</option>))}
            </select>
        </div>
    );

    const [name, setName] = useState('Pedro Pascal');
    const [character, setCharacter] = useState('Jamie');
    const [roleCategory, setRoleCategory] = useState('Lead Role');
    const [unionAffiliation, setUnionAffiliation] = useState('SAG Union');
    const [dailyRate, setDailyRate] = useState('5,000');

    const handleSaveChanges = () => {
        console.log(`Editing Talent: ${name} (Character: ${character})`);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Talent Details">
            <div className="space-y-4">
                <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <InputField label="Character" value={character} onChange={(e) => setCharacter(e.target.value)} />
                <SelectField label="Role Category" options={['Lead Role', 'Supporting Role', 'Background']} value={roleCategory} onChange={(e: any) => setRoleCategory(e.target.value)} />
                <div className="flex space-x-3">
                    <SelectField label="Union affiliations or SAG" options={['SAG Union', 'Non-Union']} value={unionAffiliation} onChange={(e: any) => setUnionAffiliation(e.target.value)} />
                    <InputField label="Daily Rate" value={`$ ${dailyRate}`} onChange={(e) => setDailyRate(e.target.value.replace('$', '').trim())} type="text"/>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button onClick={onClose} className="px-4 py-2 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors border border-transparent">
                        Cancel
                    </button>
                    <button onClick={handleSaveChanges} className="px-4 py-2 bg-sky-500 text-black text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </Modal>
    );
};


// --- Inline Edit Components ---

interface InlineEditAmountProps {
    initialAmount: number;
    onSave: (newAmount: number) => void;
}

const InlineEditAmount: React.FC<InlineEditAmountProps> = ({ initialAmount, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [amount, setAmount] = useState(initialAmount.toLocaleString());
    const [displayAmount, setDisplayAmount] = useState(initialAmount.toLocaleString());
    const [isHovered, setIsHovered] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const formatAmount = (num: number) => `$ ${num.toLocaleString()}`;

    const handleEditClick = () => {
        setIsEditing(true);
        setAmount(initialAmount.toString().replace(/,/g, ''));
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleSave = () => {
        const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
        if (!isNaN(numericAmount)) {
            onSave(numericAmount);
            setDisplayAmount(numericAmount.toLocaleString());
        }
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    const amountDisplayClass = isEditing ? 'bg-zinc-900 border border-sky-500' : (isHovered ? 'bg-zinc-700' : 'bg-transparent');

    return (
        <div 
            className="inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyPress}
                    className="px-3 py-1 bg-zinc-800 border border-sky-500 rounded-lg text-sm text-white w-28 text-right focus:outline-none"
                    style={{ paddingRight: 4, paddingLeft: 4 }}
                />
            ) : (
                <button
                    onClick={handleEditClick}
                    className={`px-3 py-1 rounded-lg text-sm font-normal text-white transition-colors ${amountDisplayClass}`}
                >
                    {formatAmount(parseFloat(displayAmount.replace(/,/g, '')))}
                </button>
            )}
        </div>
    );
};


// --- Budget Card Component ---

const EditBudgetCard: React.FC<{ initialBudget: number, onSave: (newBudget: number) => void }> = ({ initialBudget, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [budget, setBudget] = useState(initialBudget.toLocaleString());
    const [displayBudget, setDisplayBudget] = useState(initialBudget.toLocaleString());
    const [isHovered, setIsHovered] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const formatBudget = (num: number) => `$ ${num.toLocaleString()}`;

    const handleEditClick = () => {
        setIsEditing(true);
        setBudget(initialBudget.toString().replace(/,/g, ''));
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleSave = () => {
        const numericBudget = parseFloat(budget.replace(/[^0-9.]/g, ''));
        if (!isNaN(numericBudget)) {
            onSave(numericBudget);
            setDisplayBudget(numericBudget.toLocaleString());
        }
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div 
            className="bg-zinc-800 p-4 rounded-xl shadow-lg border border-zinc-700 flex flex-col space-y-3 w-48"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-zinc-300 uppercase">Budget</span>
                <button className='p-1 rounded-full hover:bg-zinc-700'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99961 4.33398V8.66732" stroke="#9F9FA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.99961 11.0007C8.01639 10.999 8.03318 10.999 8.05008 11.0007" stroke="#9F9FA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="8" cy="8" r="7.33333" stroke="#9F9FA9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            <div className="flex items-end text-xl font-semibold text-zinc-400">
                <span className="mr-0.5">$</span>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyPress}
                        className="bg-zinc-900 border border-sky-500 rounded-md text-xl font-semibold text-white px-1 py-0 w-full focus:outline-none"
                    />
                ) : (
                    <button
                        onClick={handleEditClick}
                        className={`font-semibold transition-colors ${isHovered ? 'hover:text-white' : ''} flex items-center group`}
                    >
                        {displayBudget}
                        <PencilIcon className={`ml-2 w-4 h-4 text-zinc-600 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                )}
            </div>
        </div>
    );
};


// --- Sub Components ---

const BudgetTab: React.FC<BudgetTabProps> = ({ label, count, active, onClick }) => {
    const containerClasses = active ? "bg-zinc-300 text-black" : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700";
    const countClasses = active ? "text-zinc-600" : "text-zinc-500";
    return (
        <button onClick={() => onClick(label)} className={`flex items-center px-3 py-1.5 rounded-xl transition-colors ${containerClasses}`}>
            <span className={`text-sm font-semibold ${active ? 'text-black' : 'text-zinc-400'}`}>{label}</span>
            <span className={`ml-2 text-sm font-semibold ${countClasses}`}>{count}</span>
        </button>
    );
};

const BudgetLineItemBase: React.FC<{
    item: { name: string, total: string };
    onEdit: () => void;
    onDelete: () => void;
}> = ({ item, onEdit, onDelete }) => (
    <div className="bg-zinc-800 p-3 rounded-lg flex justify-between items-center hover:bg-zinc-700 transition-colors">
        <div className="p-2">
            <span className="text-sm font-semibold text-white">{item.name}</span>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-sm font-normal text-white">{item.total}</span>
            <DropdownMenu onEdit={onEdit} onDelete={onDelete}>
                <MoreHorizontalIcon className="text-zinc-400 w-4 h-4 mr-1" />
            </DropdownMenu>
        </div>
    </div>
);

const TalentLineItem: React.FC<BudgetLineItemProps> = ({ item, onEdit, onDelete, isLast = false }) => {
    const borderClass = isLast ? '' : 'border-b border-zinc-800/50';

    const handleEdit = () => {
        // Talent uses a dedicated modal
        onEdit(); 
    }
    
    return (
        <div className={`flex justify-between items-center p-1 ${borderClass} w-full hover:bg-zinc-800/30 transition-colors rounded-lg`}>
            <div className="flex-1 min-w-0 p-2 text-zinc-300 text-sm font-normal">{item.name}</div>
            <div className="flex-1 min-w-0 p-2 text-zinc-400 text-sm font-normal">{item.role}</div>
            <div className="flex-1 min-w-0 p-2 text-zinc-400 text-sm font-normal">
                {item.rate} <span className="text-zinc-600">/day</span>
            </div>
            <div className="flex-1 min-w-0 p-2 text-right text-sm">
                <span className="text-zinc-400 font-normal">${item.total} ·</span>
                <span className="text-zinc-600 font-normal"> {item.days} days</span>
            </div>
            <div className="w-9 h-9 flex justify-center items-center">
                <DropdownMenu onEdit={handleEdit} onDelete={onDelete}>
                    <MoreHorizontalIcon className="text-zinc-400 w-4 h-4" />
                </DropdownMenu>
            </div>
        </div>
    );
};

// --- List Sections ---

const EmptyState: React.FC<{ onAddItem: () => void }> = ({ onAddItem }) => (
    <div className="flex flex-col items-center justify-center h-96 text-center text-zinc-500">
        <svg className="w-12 h-12 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
        </svg>
        <p className="text-lg font-semibold">Nothing here yet!</p>
        <p className="mb-8">You haven't added any line entries in this area yet. Start adding to track your budget.</p>
        <button onClick={onAddItem} className="flex items-center space-x-2 px-4 py-2 bg-zinc-700 text-white text-sm font-semibold rounded-lg hover:bg-zinc-600 transition-colors border border-zinc-600">
            <PlusIcon className='text-white w-4 h-4' />
            <span>Add Item</span>
        </button>
    </div>
);

const AboveTheLineSection: React.FC<{
    data: any; // Simplified data structure
    onEditItem: () => void;
    onEditTalent: () => void;
    onDelete: () => void;
    onSaveDevelopment: (amount: number) => void;
    onSaveScreenplay: (amount: number) => void;
}> = ({ data, onEditItem, onEditTalent, onDelete, onSaveDevelopment, onSaveScreenplay }) => (
    <div className="space-y-3">
        {/* Talent Section */}
        <div className="bg-zinc-800 p-3 rounded-lg flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3 p-2">
                    <span className="text-sm font-semibold text-white">Talent</span>
                    <span className="text-sm font-semibold text-zinc-400">({data.talent.length})</span>
                </div>
                <div className="p-2">
                    <span className="text-sm font-normal text-white">$ 250,000</span>
                </div>
            </div>
            
            {/* Talent List */}
            <div className="flex pl-4 pr-1">
                <div className="w-0.5 bg-zinc-700/50 rounded-full mr-2"></div>
                <div className="flex-1 space-y-1">
                    {data.talent.map((item: any, index: number) => (
                        <TalentLineItem 
                            key={item.name}
                            item={item}
                            onEdit={onEditTalent}
                            onDelete={onDelete}
                            isLast={index === data.talent.length - 1}
                        />
                    ))}
                </div>
            </div>

            <div className="p-1">
                <button onClick={onEditTalent} className="flex items-center space-x-2 p-2 rounded-lg text-zinc-400 hover:bg-zinc-700 transition-colors">
                    <PlusIcon className='w-4 h-4' />
                    <span className="text-sm font-semibold">Add Talent</span>
                </button>
            </div>
        </div>

        {/* Development Section (Inline Edit) */}
        <div className="bg-zinc-800 p-3 rounded-lg flex justify-between items-center">
            <div className="p-2">
                <span className="text-sm font-semibold text-white">Development</span>
            </div>
            <div className="flex items-center space-x-2">
                <InlineEditAmount initialAmount={data.development} onSave={onSaveDevelopment} />
                <DropdownMenu onEdit={onEditItem} onDelete={onDelete}>
                    <MoreHorizontalIcon className="text-zinc-400 w-4 h-4 mr-1" />
                </DropdownMenu>
            </div>
        </div>

        {/* Screenplay Section (Inline Edit) */}
        <div className="bg-zinc-800 p-3 rounded-lg flex justify-between items-center">
            <div className="p-2">
                <span className="text-sm font-semibold text-white">Screenplay</span>
            </div>
            <div className="flex items-center space-x-2">
                <InlineEditAmount initialAmount={data.screenplay} onSave={onSaveScreenplay} />
                <DropdownMenu onEdit={onEditItem} onDelete={onDelete}>
                    <MoreHorizontalIcon className="text-zinc-400 w-4 h-4 mr-1" />
                </DropdownMenu>
            </div>
        </div>
    </div>
);

const BelowTheLineSection: React.FC<{
    data: { name: string, total: string }[];
    onEditItem: () => void;
    onDelete: () => void;
    onAddItem: () => void;
}> = ({ data, onEditItem, onDelete, onAddItem }) => (
    <div className="space-y-3">
        {data.map((item) => (
            <BudgetLineItemBase 
                key={item.name}
                item={item}
                onEdit={onEditItem}
                onDelete={onDelete}
            />
        ))}

        <div className="flex justify-between items-center pt-3 pb-1">
            <div className="flex space-x-3">
                <button onClick={onAddItem} className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    <PlusIcon className='text-zinc-300 w-4 h-4' />
                    <span>Add Item</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    <PlusIcon className='text-zinc-300 w-4 h-4' />
                    <span>Grip Department</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    <PlusIcon className='text-zinc-300 w-4 h-4' />
                    <span>Electrical Department</span>
                </button>
            </div>
            <div className="text-xl font-semibold text-white">$ 100,000</div> 
        </div>
    </div>
);

// --- Main Components ---

const MainContent: React.FC = () => {
    // --- State Management ---
    const [selectedTab, setSelectedTab] = useState<BudgetCategory>('Above the line');
    const [budget, setBudget] = useState(272000);
    
    // Line item amounts (for Above the Line demo)
    const [developmentAmount, setDevelopmentAmount] = useState(25000);
    const [screenplayAmount, setScreenplayAmount] = useState(25000);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
    const [isEditTalentModalOpen, setIsEditTalentModalOpen] = useState(false);


    // --- Dummy Data ---
    const initialTalentData = [
        { name: "Ricky Smith", role: "Lead Role • SAG Union", rate: "$5,000", total: "50,000", days: 10 },
        { name: "Kimberly Mastrangelo", role: "Lead Role • SAG Union", rate: "$2,500", total: "30,000", days: 12 },
        { name: "Rhonda Rhodes", role: "Lead Role • SAG Union", rate: "$1,000", total: "10,000", days: 10 },
        { name: "Katie Sims", role: "Lead Role • SAG Union", rate: "$500", total: "10,000", days: 20 },
    ];
    
    const belowTheLineData = [
        { name: "Property Department", total: "$ 25,000" },
        { name: "Location Department", total: "$ 25,000" },
        { name: "Production Staff", total: "$ 25,000" },
        { name: "Production Department", total: "$ 25,000" },
    ];

    const tabCounts = {
        'Above the line': 3,
        'Below the line': belowTheLineData.length,
        'Post Production': 0,
        'Additional Costs': 0,
    };

    // --- Handlers ---
    const handleBudgetSave = (newBudget: number) => setBudget(newBudget);
    const handleDevelopmentSave = (newAmount: number) => setDevelopmentAmount(newAmount);
    const handleScreenplaySave = (newAmount: number) => setScreenplayAmount(newAmount);
    const handleAddItem = (name: string, amount: number) => {
        console.log(`Adding item to ${selectedTab}: ${name} - $${amount}`);
        // Logic to update the list for the selectedTab would go here
    };
    const handleDeleteItem = () => console.log(`Deleting item from ${selectedTab}`);


    // --- Content Rendering ---
    const renderContent = () => {
        const counts = tabCounts[selectedTab];
        
        if (counts === 0) {
            return <EmptyState onAddItem={() => setIsAddModalOpen(true)} />;
        }

        switch (selectedTab) {
            case 'Above the line':
                return (
                    <AboveTheLineSection 
                        data={{ talent: initialTalentData, development: developmentAmount, screenplay: screenplayAmount }}
                        onEditItem={() => setIsEditItemModalOpen(true)}
                        onEditTalent={() => setIsEditTalentModalOpen(true)}
                        onDelete={handleDeleteItem}
                        onSaveDevelopment={handleDevelopmentSave}
                        onSaveScreenplay={handleScreenplaySave}
                    />
                );
            case 'Below the line':
                return (
                    <BelowTheLineSection
                        data={belowTheLineData}
                        onEditItem={() => setIsEditItemModalOpen(true)}
                        onDelete={handleDeleteItem}
                        onAddItem={() => setIsAddModalOpen(true)}
                    />
                );
            case 'Post Production':
            case 'Additional Costs':
            default:
                return <EmptyState onAddItem={() => setIsAddModalOpen(true)} />;
        }
    };


    // --- JSX Return ---
    return (
        <div className="flex-1 p-2 bg-zinc-950">
            <div className="bg-zinc-900 rounded-xl h-full flex flex-col relative">
                {/* Header Bar */}
                <div className="p-2 border-b border-zinc-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2 p-1">
                        <span className="text-sm font-semibold text-zinc-400">Untitled Project</span>
                        <ChevronDownIcon className="w-4 h-4 text-zinc-400" />
                    </div>
                </div>

                {/* Main Area */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {/* Title and Budget Summary */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-6">Budgeting</h1>
                            <div className="flex space-x-5 border-b border-zinc-800 pt-2">
                                <div className="pb-3 text-zinc-400 font-semibold cursor-pointer border-b-4 border-transparent hover:border-zinc-700 transition-colors">
                                    Overview
                                </div>
                                <div className="pb-3 text-sky-500 font-semibold cursor-pointer border-b-4 border-sky-500">
                                    Line Items Breakdown
                                </div>
                            </div>
                        </div>
                        {/* THE FIX IS HERE: EditBudgetCard is now defined above */}
                        <EditBudgetCard initialBudget={budget} onSave={handleBudgetSave} />
                    </div>

                    {/* Budget Categories and Export */}
                    <div className="flex justify-between items-center mb-6 mt-4">
                        <div className="flex space-x-2">
                            {Object.keys(tabCounts).map((tab) => (
                                <BudgetTab 
                                    key={tab}
                                    label={tab as BudgetCategory}
                                    count={tabCounts[tab as BudgetCategory]}
                                    active={selectedTab === tab}
                                    onClick={setSelectedTab}
                                />
                            ))}
                        </div>
                        <button className="px-3 py-1.5 bg-sky-500 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-sky-400 transition-colors">
                            Export
                        </button>
                    </div>

                    {/* Dynamic Content Area */}
                    {renderContent()}

                    {/* Overall Footer Totals (Always visible, simplified for demo) */}
                    {/* NOTE: This total calculation is static in the demo; in a real app, it would sum the line items */}
                    <div className="flex justify-end items-center pt-8 border-t border-zinc-800/50 mt-4">
                        <div className="text-2xl font-semibold text-white">$ 325,000</div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddItem={handleAddItem} />
            <EditItemModal isOpen={isEditItemModalOpen} onClose={() => setIsEditItemModalOpen(false)} />
            <EditTalentModal isOpen={isEditTalentModalOpen} onClose={() => setIsEditTalentModalOpen(false)} />
        </div>
    );
};

const page: React.FC = () => {
    return (
        <div className="flex h-screen bg-zinc-950 font-sans">
            <MainContent />
        </div>
    );
};

export default page;