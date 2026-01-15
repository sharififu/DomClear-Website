import React, { useState } from 'react';
import { Pill, Calendar, Search, Clock, Shield, Trash2, Eye, X, AlertCircle, Plus, Users, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

interface Medication {
  id: string;
  name: string;
  type: 'regular' | 'high-risk';
  indication: string;
  dose?: string;
  route?: string;
  frequency?: string;
  status?: string;
  witnessRequired?: boolean;
  riskReason?: string;
  sideEffects?: string[];
}

interface RiskCategory {
  id: string;
  category_name: string;
  description: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  witness_required: boolean;
  special_precautions: string[];
}

const SAMPLE_MEDICATIONS: Medication[] = [
  {
    id: '1',
    name: 'Antimicrobials',
    type: 'high-risk',
    indication: 'Agents that inhibit the growth of or kill microorganisms, such as bacteria, viruses, fungi, and parasites, to prevent and treat infections in humans, animals, and plants.',
    dose: 'As prescribed',
    route: 'Oral',
    frequency: 'As needed',
    status: 'High Risk',
    witnessRequired: true,
    riskReason: 'Requires careful monitoring for antibiotic resistance and potential side effects',
    sideEffects: ['Nausea', 'Diarrhea', 'Allergic reactions', 'Antibiotic resistance']
  },
  {
    id: '2',
    name: 'Lithium',
    type: 'high-risk',
    indication: 'Mood stabilizer used to treat bipolar disorder and prevent manic episodes.',
    dose: 'As prescribed',
    route: 'Oral',
    frequency: 'Once daily',
    status: 'High Risk',
    witnessRequired: true,
    riskReason: 'Narrow therapeutic index - requires regular blood level monitoring',
    sideEffects: ['Tremor', 'Nausea', 'Weight gain', 'Kidney problems', 'Thyroid issues']
  },
  {
    id: '3',
    name: 'Warfarin',
    type: 'high-risk',
    indication: 'Anticoagulant used to prevent blood clots in patients with atrial fibrillation, deep vein thrombosis, or pulmonary embolism.',
    dose: 'As prescribed',
    route: 'Oral',
    frequency: 'Once daily',
    status: 'High Risk',
    witnessRequired: true,
    riskReason: 'High bleeding risk - requires regular INR monitoring',
    sideEffects: ['Bleeding', 'Bruising', 'Hair loss', 'Skin necrosis']
  },
  {
    id: '4',
    name: 'Paracetamol',
    type: 'regular',
    indication: 'Paracetamol, or acetaminophen, is a non-opioid analgesic and antipyretic agent used to treat fever and mild to moderate pain.',
    dose: '500mg',
    route: 'Oral',
    frequency: 'As needed',
    sideEffects: ['Rare allergic reactions', 'Liver damage (overdose)']
  },
  {
    id: '5',
    name: 'Metformin',
    type: 'regular',
    indication: 'Oral antidiabetic medication used to manage type 2 diabetes by reducing glucose production in the liver.',
    dose: '500mg',
    route: 'Oral',
    frequency: 'Twice daily',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Lactic acidosis (rare)']
  },
  {
    id: '6',
    name: 'Amlodipine',
    type: 'regular',
    indication: 'Calcium channel blocker used to treat high blood pressure and chest pain (angina).',
    dose: '5mg',
    route: 'Oral',
    frequency: 'Once daily',
    sideEffects: ['Dizziness', 'Swelling of ankles', 'Flushing', 'Headache']
  }
];

const SAMPLE_CATEGORIES: RiskCategory[] = [
  {
    id: 'cat-1',
    category_name: 'Anticoagulants',
    description: 'Medications that prevent blood clotting. Require careful monitoring of INR levels and bleeding risk.',
    risk_level: 'high',
    witness_required: true,
    special_precautions: ['Regular INR monitoring', 'Monitor for signs of bleeding', 'Avoid certain foods (vitamin K rich)', 'Check interactions with other medications']
  },
  {
    id: 'cat-2',
    category_name: 'Antipsychotics',
    description: 'Medications used to treat psychotic disorders. May cause sedation and movement disorders.',
    risk_level: 'high',
    witness_required: false,
    special_precautions: ['Monitor for extrapyramidal symptoms', 'Regular blood pressure checks', 'Weight monitoring', 'Monitor for signs of tardive dyskinesia']
  },
  {
    id: 'cat-3',
    category_name: 'Controlled Drugs',
    description: 'Schedule 2 and 3 controlled drugs requiring special storage and documentation.',
    risk_level: 'critical',
    witness_required: true,
    special_precautions: ['Locked storage required', 'Witness signature mandatory', 'Regular stock checks', 'Detailed documentation']
  }
];

export const EMARDemo: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>(SAMPLE_MEDICATIONS);
  const [categories] = useState<RiskCategory[]>(SAMPLE_CATEGORIES);
  const [activeTab, setActiveTab] = useState<'medications' | 'risk-categories'>('medications');
  const [filterType, setFilterType] = useState<'all' | 'regular' | 'high-risk'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMedication, setExpandedMedication] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedication, setNewMedication] = useState<{
    name: string;
    indication: string;
    type: 'regular' | 'high-risk';
    dose: string;
    route: string;
    frequency: string;
    witnessRequired: boolean;
    riskReason: string;
    sideEffects: string[];
  }>({
    name: 'Aspirin',
    indication: 'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. Also used as an antiplatelet agent to prevent blood clots.',
    type: 'regular',
    dose: '75mg',
    route: 'Oral',
    frequency: 'Once daily',
    witnessRequired: false,
    riskReason: '',
    sideEffects: ['Stomach irritation', 'Bleeding risk', 'Allergic reactions']
  });
  const [newSideEffect, setNewSideEffect] = useState('');
  const tour = useDemoTour('emar');

  const handleReset = () => {
    setMedications(SAMPLE_MEDICATIONS);
    setActiveTab('medications');
    setFilterType('all');
    setSearchQuery('');
    setExpandedMedication(null);
    setShowAddModal(false);
    setNewMedication({
      name: 'Aspirin',
      indication: 'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. Also used as an antiplatelet agent to prevent blood clots.',
      type: 'regular',
      dose: '75mg',
      route: 'Oral',
      frequency: 'Once daily',
      witnessRequired: false,
      riskReason: '',
      sideEffects: ['Stomach irritation', 'Bleeding risk', 'Allergic reactions']
    });
    setNewSideEffect('');
  };

  const handleAddMedication = () => {
    const medication: Medication = {
      id: `med-${Date.now()}`,
      name: newMedication.name,
      indication: newMedication.indication,
      type: newMedication.type,
      dose: newMedication.dose,
      route: newMedication.route,
      frequency: newMedication.frequency,
      status: newMedication.type === 'high-risk' ? 'High Risk' : '',
      witnessRequired: newMedication.witnessRequired,
      riskReason: newMedication.type === 'high-risk' ? newMedication.riskReason : undefined,
      sideEffects: newMedication.sideEffects.length > 0 ? newMedication.sideEffects : undefined
    };
    
    setMedications([...medications, medication]);
    setShowAddModal(false);
    // Reset form to default values
    setNewMedication({
      name: 'Aspirin',
      indication: 'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. Also used as an antiplatelet agent to prevent blood clots.',
      type: 'regular',
      dose: '75mg',
      route: 'Oral',
      frequency: 'Once daily',
      witnessRequired: false,
      riskReason: '',
      sideEffects: ['Stomach irritation', 'Bleeding risk', 'Allergic reactions']
    });
    setNewSideEffect('');
  };

  const handleAddSideEffect = () => {
    if (newSideEffect.trim()) {
      setNewMedication({
        ...newMedication,
        sideEffects: [...newMedication.sideEffects, newSideEffect.trim()]
      });
      setNewSideEffect('');
    }
  };

  const handleRemoveSideEffect = (index: number) => {
    setNewMedication({
      ...newMedication,
      sideEffects: newMedication.sideEffects.filter((_, i) => i !== index)
    });
  };

  const filteredMedications = medications.filter(med => {
    const matchesType = filterType === 'all' || med.type === filterType;
    const matchesSearch = searchQuery === '' || 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.indication.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalMedications = medications.length;
  const regularCount = medications.filter(m => m.type === 'regular').length;
  const highRiskCount = medications.filter(m => m.type === 'high-risk').length;

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  const getRiskLevelLabel = (level: string) => {
    switch (level) {
      case 'critical': return 'Critical';
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Standard';
    }
  };

  const toggleExpand = (medicationId: string) => {
    setExpandedMedication(expandedMedication === medicationId ? null : medicationId);
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]">
      <DemoHeader 
        title="Medication Management" 
        subtitle="CMS Dashboard"
        onReset={handleReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
        tourAnchorId="emar-header"
      />
      <DemoTour
        demoId="emar"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Compact Header with Quick Stats */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Medication Management</h2>
              <p className="text-sm text-slate-600 mt-1">
                {filteredMedications.length} of {totalMedications} medications
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{totalMedications}</p>
                <p className="text-xs text-slate-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{regularCount}</p>
                <p className="text-xs text-slate-600">Regular</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{highRiskCount}</p>
                <p className="text-xs text-slate-600">High Risk</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-teal-600">
                <Clock className="w-4 h-4" />
                Schedules
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                Add Medication
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2" data-tour="emar-tabs">
              <button
                onClick={() => setActiveTab('medications')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  activeTab === 'medications'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Pill className="w-4 h-4" />
                Medications
              </button>
              <button
                onClick={() => setActiveTab('risk-categories')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  activeTab === 'risk-categories'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                Risk Categories
              </button>
            </div>

            {/* Type Filters - Only show on medications tab */}
            {activeTab === 'medications' && (
              <div className="flex gap-2" data-tour="emar-filters">
                {['all', 'regular', 'high-risk'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={`px-3 py-1.5 rounded text-xs font-medium ${
                      filterType === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type === 'all' ? 'All' : type === 'regular' ? 'Regular' : 'High Risk'}
                  </button>
                ))}
              </div>
            )}

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'medications' ? (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              {/* Table Header */}
              <div className="bg-blue-50 border-b border-slate-200 grid grid-cols-12 gap-4 px-4 py-3">
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-blue-700 uppercase">Type</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-semibold text-blue-700 uppercase">Medication</p>
                </div>
                <div className="col-span-4">
                  <p className="text-xs font-semibold text-blue-700 uppercase">Indication</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-blue-700 uppercase">Status</p>
                </div>
                <div className="col-span-1">
                  <p className="text-xs font-semibold text-blue-700 uppercase">Actions</p>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-200" data-tour="emar-table">
                {filteredMedications.map((med) => (
                  <div key={med.id}>
                    {/* Main Row */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                      <div className="col-span-2 flex items-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          med.type === 'high-risk'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {med.type === 'high-risk' ? 'High Risk' : 'Regular'}
                        </span>
                      </div>
                      <div className="col-span-3 flex items-center gap-2">
                        <Pill className={`w-4 h-4 ${med.type === 'high-risk' ? 'text-red-600' : 'text-blue-600'}`} />
                        <span className="text-sm font-medium text-slate-900">{med.name}</span>
                      </div>
                      <div className="col-span-4 flex items-center">
                        <p className="text-sm text-slate-600 truncate">{med.indication}</p>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        {med.type === 'high-risk' && (
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3 text-red-600" />
                            <span className="text-xs text-red-600">High Risk</span>
                          </div>
                        )}
                        {med.witnessRequired && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-amber-600" />
                            <span className="text-xs text-amber-600">Witness</span>
                          </div>
                        )}
                      </div>
                      <div className="col-span-1 flex items-center gap-1">
                        <button
                          onClick={() => toggleExpand(med.id)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded text-xs font-medium hover:bg-blue-100"
                        >
                          {expandedMedication === med.id ? 'Hide' : 'Details'}
                        </button>
                        <button className="p-1.5 text-teal-600 hover:bg-teal-50 rounded" title="Schedule">
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" title="Risk">
                          <Shield className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedMedication === med.id && (
                      <div className="bg-slate-50 border-t border-slate-200 px-4 py-4">
                        <div className="space-y-4">
                          {med.indication && (
                            <div>
                              <p className="text-xs font-semibold text-slate-700 mb-1">Indication:</p>
                              <p className="text-sm text-slate-600">{med.indication}</p>
                            </div>
                          )}

                          {med.type === 'high-risk' && (
                            <div className="border-l-4 border-red-500 pl-3">
                              <p className="text-xs font-semibold text-red-700 mb-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                High Risk Medication
                              </p>
                              <p className="text-sm text-slate-600 mb-2">
                                This medication requires special attention and monitoring.
                              </p>
                              {med.riskReason && (
                                <p className="text-sm text-slate-700">
                                  <span className="font-medium">Reason:</span> {med.riskReason}
                                </p>
                              )}
                              {med.witnessRequired && (
                                <div className="flex items-center gap-2 mt-2">
                                  <Users className="w-4 h-4 text-amber-600" />
                                  <span className="text-sm text-amber-700 font-medium">Witness Signature Required</span>
                                </div>
                              )}
                            </div>
                          )}

                          {med.sideEffects && med.sideEffects.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-slate-700 mb-2">Side Effects:</p>
                              <div className="space-y-1">
                                {med.sideEffects.map((effect, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                                    <span className="text-sm text-slate-600">{effect}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-2 border-t border-slate-200">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                              View Administration Records
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredMedications.length === 0 && (
                <div className="px-4 py-12 text-center">
                  <Pill className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">No medications found</p>
                </div>
              )}
            </div>
          ) : (
            /* Risk Categories Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Risk Categories</h3>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-600">
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-slate-900">{category.category_name}</h4>
                      <span className={`px-2 py-1 ${getRiskLevelColor(category.risk_level)} text-white rounded text-xs font-bold`}>
                        {getRiskLevelLabel(category.risk_level)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{category.description}</p>
                    {category.witness_required && (
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-amber-700 font-medium">Witness Required</span>
                      </div>
                    )}
                    {category.special_precautions.length > 0 && (
                      <div className="pt-3 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-700 mb-2">Special Precautions:</p>
                        <ul className="space-y-1">
                          {category.special_precautions.map((precaution, index) => (
                            <li key={index} className="text-xs text-slate-600 flex items-start gap-2">
                              <span className="text-amber-600 mt-0.5">•</span>
                              <span>{precaution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
          onClick={() => setShowAddModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Add New Medication</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto">
              {/* Medication Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medication Name</label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter medication name"
                />
              </div>

              {/* Indication */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Indication (Optional)</label>
                <textarea
                  value={newMedication.indication}
                  onChange={(e) => setNewMedication({ ...newMedication, indication: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Describe what this medication is used for..."
                />
              </div>

              {/* Type and Risk Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select
                    value={newMedication.type}
                    onChange={(e) => setNewMedication({ 
                      ...newMedication, 
                      type: e.target.value as 'regular' | 'high-risk',
                      witnessRequired: e.target.value === 'high-risk' ? newMedication.witnessRequired : false
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="regular">Regular</option>
                    <option value="high-risk">High Risk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Dose</label>
                  <input
                    type="text"
                    value={newMedication.dose}
                    onChange={(e) => setNewMedication({ ...newMedication, dose: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 500mg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Route</label>
                  <select
                    value={newMedication.route}
                    onChange={(e) => setNewMedication({ ...newMedication, route: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Oral">Oral</option>
                    <option value="Topical">Topical</option>
                    <option value="Injection">Injection</option>
                    <option value="Inhalation">Inhalation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={newMedication.frequency}
                    onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Once daily"
                  />
                </div>
              </div>

              {/* High Risk Settings */}
              {newMedication.type === 'high-risk' && (
                <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h4 className="text-sm font-semibold text-red-900">High Risk Medication Settings</h4>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-red-900 mb-1">Risk Reason</label>
                    <textarea
                      value={newMedication.riskReason}
                      onChange={(e) => setNewMedication({ ...newMedication, riskReason: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      placeholder="Explain why this medication is high risk..."
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="witness-required"
                      checked={newMedication.witnessRequired}
                      onChange={(e) => setNewMedication({ ...newMedication, witnessRequired: e.target.checked })}
                      className="w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="witness-required" className="text-sm text-red-900 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Witness Signature Required
                    </label>
                  </div>
                </div>
              )}

              {/* Side Effects */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Side Effects</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSideEffect}
                    onChange={(e) => setNewSideEffect(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSideEffect();
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter side effect and press Enter"
                  />
                  <button
                    onClick={handleAddSideEffect}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                {newMedication.sideEffects.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newMedication.sideEffects.map((effect, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs"
                      >
                        {effect}
                        <button
                          onClick={() => handleRemoveSideEffect(index)}
                          className="hover:text-amber-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedication}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              >
                Add Medication
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
