import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, DollarSign, Pencil, Plus, List, Users, ChevronDown } from 'lucide-react';

interface EnhancedVisitSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
  patientName?: string;
  patientAddress?: string;
  onCreateVisit?: (visitData: {
    patient: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    staffCount: number;
  }) => void;
}

export const EnhancedVisitScheduler: React.FC<EnhancedVisitSchedulerProps> = ({
  isOpen,
  onClose,
  selectedDate = '2025-11-27',
  patientName,
  patientAddress,
  onCreateVisit
}) => {
  const sampleStaff = [
    { id: '1', name: 'Emma Wilson', role: 'Senior Carer', avatar: 'EW' },
    { id: '2', name: 'James Taylor', role: 'Carer', avatar: 'JT' },
    { id: '3', name: 'Sarah Johnson', role: 'Senior Carer', avatar: 'SJ' },
    { id: '4', name: 'Michael Brown', role: 'Carer', avatar: 'MB' },
    { id: '5', name: 'Lisa Anderson', role: 'Carer', avatar: 'LA' }
  ];

  const [formData, setFormData] = useState({
    patient: patientName || '',
    date: selectedDate,
    startTime: '09:00',
    endTime: '10:00',
    staffCount: 1,
    selectedStaff: [] as string[],
    costType: 'cost-type', // 'cost-type' or 'manual-cost'
    costTypeValue: 'Regular Visit',
    manualCost: '',
    notes: '',
    funderName: patientName ? 'Leicester City Council' : '',
    funderReference: patientName ? '01236547856' : '',
    recurrenceEnabled: false,
    careTasks: [] as string[]
  });

  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);

  // Update patient and funder info when patientName prop changes
  useEffect(() => {
    if (patientName) {
      setFormData(prev => ({ 
        ...prev, 
        patient: patientName,
        funderName: 'Leicester City Council',
        funderReference: '01236547856'
      }));
    }
  }, [patientName]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isStaffDropdownOpen !== false) {
        setIsStaffDropdownOpen(false);
      }
    };

    if (isStaffDropdownOpen !== false) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isStaffDropdownOpen]);

  const calculateDuration = () => {
    const start = new Date(`2000-01-01T${formData.startTime}`);
    const end = new Date(`2000-01-01T${formData.endTime}`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60);
    return diff;
  };

  const duration = calculateDuration();
  const calculatedCost = formData.costType === 'cost-type' ? 30.00 : parseFloat(formData.manualCost) || 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(20,30,60,0.08)]">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#1a86f0]" />
            <h2 className="text-xl font-semibold text-[#0F172A]">Schedule New Visit</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#6b7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Select Patient */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Patient <span className="text-red-500">*</span>
            </label>
            {patientName ? (
              <div className="w-full px-4 py-3 border-2 border-[#1a86f0] rounded-lg bg-blue-50">
                <p className="text-sm font-semibold text-[#0F172A]">{patientName}</p>
                {patientAddress && (
                  <p className="text-xs text-[#6b7280] mt-1">{patientAddress}</p>
                )}
              </div>
            ) : (
              <input
                type="text"
                placeholder="Search patients by name..."
                value={formData.patient}
                onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
              />
            )}
          </div>

          {/* Visit Schedule */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-3">
              Visit Schedule <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#6b7280] mb-1">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
                  />
                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-[#6b7280] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#6b7280] mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b7280] mb-1">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-[#6b7280]">
              <Clock className="w-4 h-4" />
              <span>Duration: {duration} minutes</span>
            </div>
          </div>

          {/* Staff Requirements */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Staff Requirements
            </label>
            <p className="text-xs text-[#6b7280] mb-3">
              How many staff members are needed for this visit?
            </p>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => {
                  const newCount = Math.max(1, formData.staffCount - 1);
                  setFormData({ ...formData, staffCount: newCount, selectedStaff: formData.selectedStaff.slice(0, newCount) });
                }}
                className="w-8 h-8 flex items-center justify-center border border-[rgba(20,30,60,0.08)] rounded-lg hover:bg-[#f8fafc]"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={formData.staffCount}
                onChange={(e) => {
                  const newCount = parseInt(e.target.value) || 1;
                  setFormData({ ...formData, staffCount: newCount, selectedStaff: formData.selectedStaff.slice(0, newCount) });
                }}
                className="w-16 px-3 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
              />
              <button
                onClick={() => setFormData({ ...formData, staffCount: formData.staffCount + 1 })}
                className="w-8 h-8 flex items-center justify-center border border-[rgba(20,30,60,0.08)] rounded-lg hover:bg-[#f8fafc]"
              >
                +
              </button>
              <span className="text-sm text-[#6b7280]">
                {formData.staffCount === 1 ? 'Single staff member required' : `${formData.staffCount} staff members required`}
              </span>
            </div>

            {/* Staff Selection */}
            <div className="space-y-2">
              {Array.from({ length: formData.staffCount }).map((_, index) => {
                const selectedStaffId = formData.selectedStaff[index];
                const selectedStaffMember = sampleStaff.find(s => s.id === selectedStaffId);
                
                return (
                  <div key={index} className="relative">
                    <label className="block text-xs text-[#6b7280] mb-1">Staff Member {index + 1}</label>
                    <button
                      type="button"
                      onClick={() => setIsStaffDropdownOpen(isStaffDropdownOpen ? false : index)}
                      className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg text-left flex items-center justify-between hover:bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
                    >
                      {selectedStaffMember ? (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1a86f0] flex items-center justify-center text-white text-xs font-semibold">
                            {selectedStaffMember.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0F172A]">{selectedStaffMember.name}</p>
                            <p className="text-xs text-[#6b7280]">{selectedStaffMember.role}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-[#6b7280]">Select staff member...</span>
                      )}
                      <ChevronDown className={`w-4 h-4 text-[#6b7280] transition-transform ${isStaffDropdownOpen === index ? 'rotate-180' : ''}`} />
                    </button>
                    {isStaffDropdownOpen === index && (
                      <div 
                        className="absolute z-10 w-full mt-1 bg-white border border-[rgba(20,30,60,0.08)] rounded-lg shadow-lg max-h-48 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {sampleStaff.map((staff) => {
                          const isSelected = selectedStaffId === staff.id;
                          const isAlreadyAssigned = formData.selectedStaff.includes(staff.id) && !isSelected;
                          
                          return (
                            <button
                              key={staff.id}
                              type="button"
                              onClick={() => {
                                const newSelectedStaff = [...formData.selectedStaff];
                                newSelectedStaff[index] = staff.id;
                                setFormData({ ...formData, selectedStaff: newSelectedStaff });
                                setIsStaffDropdownOpen(false);
                              }}
                              disabled={isAlreadyAssigned}
                              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f8fafc] text-left ${
                                isAlreadyAssigned ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              <div className="w-8 h-8 rounded-full bg-[#1a86f0] flex items-center justify-center text-white text-xs font-semibold">
                                {staff.avatar}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-[#0F172A]">{staff.name}</p>
                                <p className="text-xs text-[#6b7280]">{staff.role}</p>
                                {isAlreadyAssigned && (
                                  <p className="text-xs text-amber-600 mt-1">Already assigned</p>
                                )}
                              </div>
                              {isSelected && (
                                <div className="ml-auto">
                                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cost Configuration */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Cost Configuration
            </label>
            <p className="text-xs text-[#6b7280] mb-3">
              Choose how to set the cost for this visit - either use a predefined cost type or enter a manual amount.
            </p>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFormData({ ...formData, costType: 'cost-type' })}
                className={`flex-1 px-4 py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-colors ${
                  formData.costType === 'cost-type'
                    ? 'border-[#1a86f0] bg-blue-50 text-[#1a86f0]'
                    : 'border-[rgba(20,30,60,0.08)] bg-white text-[#6b7280] hover:bg-[#f8fafc]'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Cost Type</span>
              </button>
              <button
                onClick={() => setFormData({ ...formData, costType: 'manual-cost' })}
                className={`flex-1 px-4 py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-colors ${
                  formData.costType === 'manual-cost'
                    ? 'border-[#1a86f0] bg-blue-50 text-[#1a86f0]'
                    : 'border-[rgba(20,30,60,0.08)] bg-white text-[#6b7280] hover:bg-[#f8fafc]'
                }`}
              >
                <Pencil className="w-4 h-4" />
                <span className="text-sm font-medium">Manual Cost</span>
              </button>
            </div>

            {formData.costType === 'cost-type' ? (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Regular Visit</p>
                    <p className="text-xs text-[#6b7280]">Standard care visit during normal hours</p>
                    <p className="text-xs text-[#6b7280] mt-1">GBP 30/hour • per visit</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-medium text-[#1a86f0] hover:bg-blue-100 rounded">
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  placeholder="Enter manual cost amount"
                  value={formData.manualCost}
                  onChange={(e) => setFormData({ ...formData, manualCost: e.target.value })}
                  className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
                />
              </div>
            )}

            <div className="mt-3 bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-sm font-medium text-green-700">
                Calculated Cost: GBP {calculatedCost.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Visit Notes */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Visit Notes
            </label>
            <p className="text-xs text-[#6b7280] mb-2">Optional notes about this visit</p>
            <textarea
              placeholder="Enter any additional notes about this visit..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0] resize-none"
            />
          </div>

          {/* Funder Information */}
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Funder Information
            </label>
            {patientName ? (
              <>
                <p className="text-xs text-[#6b7280] mb-3">
                  Auto-populated from {patientName}'s funding sources. You can override if needed.
                </p>
                {/* Primary Funder Highlight Box */}
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-green-700 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0F172A] mb-1">Leicester City Council</p>
                      <p className="text-xs text-[#6b7280] mb-1">Local Authority Social Care • Contract: 01236547856</p>
                      <p className="text-xs text-[#6b7280]">Payment: percentage (70%)</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#6b7280] mb-1">Funder Name</label>
                    <input
                      type="text"
                      value={formData.funderName}
                      onChange={(e) => setFormData({ ...formData, funderName: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50/50"
                    />
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-green-600">From funding source</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6b7280] mb-1">Funder Reference</label>
                    <input
                      type="text"
                      value={formData.funderReference}
                      onChange={(e) => setFormData({ ...formData, funderReference: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50/50"
                    />
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-green-600">From funding source</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-[#6b7280] mb-3">
                  Select a patient to auto-populate funder information.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter funder name"
                      value={formData.funderName}
                      onChange={(e) => setFormData({ ...formData, funderName: e.target.value })}
                      className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter funder reference"
                      value={formData.funderReference}
                      onChange={(e) => setFormData({ ...formData, funderReference: e.target.value })}
                      className="w-full px-4 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Recurrence Settings */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#0F172A]">
                Recurrence Settings
              </label>
              <button
                onClick={() => setFormData({ ...formData, recurrenceEnabled: !formData.recurrenceEnabled })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  formData.recurrenceEnabled ? 'bg-[#1a86f0]' : 'bg-[#d1d5db]'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    formData.recurrenceEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Care Tasks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-[#0F172A]">
                Care Tasks
              </label>
              <button className="px-3 py-1.5 bg-[#1a86f0] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1570d1]">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
            {formData.careTasks.length === 0 ? (
              <div className="bg-[#f8fafc] rounded-lg p-8 border-2 border-dashed border-[rgba(20,30,60,0.08)] text-center">
                <List className="w-12 h-12 text-[#9ca3af] mx-auto mb-3" />
                <p className="text-sm font-medium text-[#0F172A] mb-1">No care tasks added yet</p>
                <p className="text-xs text-[#6b7280]">Add tasks to define what care will be provided</p>
              </div>
            ) : (
              <div className="space-y-2">
                {formData.careTasks.map((task, index) => (
                  <div key={index} className="bg-white border border-[rgba(20,30,60,0.08)] rounded-lg p-3">
                    {task}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[rgba(20,30,60,0.08)]">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-[rgba(20,30,60,0.08)] rounded-lg text-sm font-medium text-[#6b7280] hover:bg-[#f8fafc]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onCreateVisit && formData.patient) {
                onCreateVisit({
                  patient: formData.patient,
                  date: formData.date,
                  startTime: formData.startTime,
                  endTime: formData.endTime,
                  duration: duration,
                  staffCount: formData.staffCount
                });
              }
              onClose();
            }}
            disabled={!formData.patient}
            className="px-6 py-2 bg-[#1a86f0] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1570d1] disabled:bg-[#9ca3af] disabled:cursor-not-allowed"
          >
            <Calendar className="w-4 h-4" />
            Create Visit
          </button>
        </div>
      </div>
    </div>
  );
};

