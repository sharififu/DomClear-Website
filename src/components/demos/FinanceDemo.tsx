import React, { useState, useMemo } from 'react';
import { Eye, Download, Plus, Search, Mail, Edit, Trash2, User, CheckCircle, Clock, AlertCircle, RefreshCw, FileText, X, ArrowLeft, Calendar, DollarSign, CreditCard, Save } from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

interface Invoice {
  id: string;
  invoice_number: string;
  patient_name: string;
  patient_id?: string;
  invoice_date: string;
  due_date: string;
  period_start?: string;
  period_end?: string;
  total_amount: number;
  subtotal?: number;
  tax_amount?: number;
  tax_rate?: number;
  discount_amount?: number;
  discount_percentage?: number;
  paid_amount?: number;
  balance_due: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  currency?: string;
  reference_number?: string;
  notes?: string;
}

interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_type: string;
  unit_price: number;
  line_total: number;
  visit_date?: string;
  visit_start_time?: string;
  visit_end_time?: string;
  visit_duration_minutes?: number;
  staff_name?: string;
}

interface InvoicePayment {
  id: string;
  invoice_id: string;
  payment_amount: number;
  payment_date: string;
  payment_method: string;
  reference_number?: string;
  notes?: string;
}

const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    invoice_number: 'INV-2025-001',
    patient_name: 'Margaret Henderson',
    patient_id: 'patient-1',
    invoice_date: '2025-11-15',
    due_date: '2025-11-29',
    period_start: '2025-11-01',
    period_end: '2025-11-14',
    total_amount: 1250.00,
    subtotal: 1041.67,
    tax_amount: 208.33,
    tax_rate: 20,
    discount_amount: 0,
    discount_percentage: 0,
    paid_amount: 0,
    balance_due: 1250.00,
    status: 'sent',
    currency: 'GBP',
    reference_number: 'REF-001',
    notes: 'Weekly care package'
  },
  {
    id: '2',
    invoice_number: 'INV-2025-002',
    patient_name: 'Sarah Johnson',
    patient_id: 'patient-2',
    invoice_date: '2025-11-18',
    due_date: '2025-12-02',
    period_start: '2025-11-01',
    period_end: '2025-11-17',
    total_amount: 890.50,
    subtotal: 742.08,
    tax_amount: 148.42,
    tax_rate: 20,
    discount_amount: 0,
    discount_percentage: 0,
    paid_amount: 890.50,
    balance_due: 0,
    status: 'paid',
    currency: 'GBP'
  },
  {
    id: '3',
    invoice_number: 'INV-2025-003',
    patient_name: 'Mary Brown',
    patient_id: 'patient-3',
    invoice_date: '2025-11-01',
    due_date: '2025-11-15',
    period_start: '2025-10-15',
    period_end: '2025-10-31',
    total_amount: 2100.75,
    subtotal: 1750.63,
    tax_amount: 350.12,
    tax_rate: 20,
    discount_amount: 0,
    discount_percentage: 0,
    paid_amount: 0,
    balance_due: 2100.75,
    status: 'overdue',
    currency: 'GBP'
  },
  {
    id: '4',
    invoice_number: 'INV-2025-004',
    patient_name: 'John Smith',
    patient_id: 'patient-4',
    invoice_date: '2025-11-20',
    due_date: '2025-12-04',
    period_start: '2025-11-15',
    period_end: '2025-11-19',
    total_amount: 675.25,
    subtotal: 562.71,
    tax_amount: 112.54,
    tax_rate: 20,
    discount_amount: 0,
    discount_percentage: 0,
    paid_amount: 0,
    balance_due: 675.25,
    status: 'draft',
    currency: 'GBP'
  },
  {
    id: '5',
    invoice_number: 'INV-2025-005',
    patient_name: 'Emma Wilson',
    patient_id: 'patient-5',
    invoice_date: '2025-11-10',
    due_date: '2025-11-24',
    period_start: '2025-10-25',
    period_end: '2025-11-09',
    total_amount: 1450.00,
    subtotal: 1208.33,
    tax_amount: 241.67,
    tax_rate: 20,
    discount_amount: 0,
    discount_percentage: 0,
    paid_amount: 1450.00,
    balance_due: 0,
    status: 'paid',
    currency: 'GBP'
  },
  {
    id: '6',
    invoice_number: 'INV-2025-006',
    patient_name: 'David Taylor',
    patient_id: 'patient-6',
    invoice_date: '2025-11-22',
    due_date: '2025-12-06',
    period_start: '2025-11-08',
    period_end: '2025-11-21',
    total_amount: 980.00,
    subtotal: 816.67,
    tax_amount: 163.33,
    tax_rate: 20,
    discount_amount: 0,
    discount_percentage: 0,
    paid_amount: 0,
    balance_due: 980.00,
    status: 'sent',
    currency: 'GBP'
  }
];

const MOCK_INVOICE_ITEMS: InvoiceItem[] = [
  {
    id: 'item-1',
    invoice_id: '1',
    description: 'Personal Care Visit - Morning',
    quantity: 14,
    unit_type: 'visit',
    unit_price: 45.00,
    line_total: 630.00,
    visit_date: '2025-11-01',
    visit_start_time: '09:00',
    visit_end_time: '10:30',
    visit_duration_minutes: 90,
    staff_name: 'Emma Wilson'
  },
  {
    id: 'item-2',
    invoice_id: '1',
    description: 'Personal Care Visit - Evening',
    quantity: 14,
    unit_type: 'visit',
    unit_price: 29.40,
    line_total: 411.67,
    visit_date: '2025-11-01',
    visit_start_time: '18:00',
    visit_end_time: '19:00',
    visit_duration_minutes: 60,
    staff_name: 'James Taylor'
  }
];

const MOCK_INVOICE_PAYMENTS: InvoicePayment[] = [
  {
    id: 'payment-1',
    invoice_id: '2',
    payment_amount: 890.50,
    payment_date: '2025-11-20',
    payment_method: 'bank_transfer',
    reference_number: 'TXN-2025-001',
    notes: 'Payment received via bank transfer'
  },
  {
    id: 'payment-2',
    invoice_id: '5',
    payment_amount: 1450.00,
    payment_date: '2025-11-15',
    payment_method: 'card',
    reference_number: 'CARD-2025-045',
    notes: 'Card payment processed'
  }
];

export const FinanceDemo: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    patient_name: 'Margaret Henderson',
    patient_id: 'patient-1',
    invoice_date: new Date().toISOString().split('T')[0],
    period_start: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    period_end: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tax_rate: '20',
    discount_percentage: '0',
    reference_number: 'REF-DEMO-001',
    notes: 'Demo invoice for care services provided'
  });
  const tour = useDemoTour('finance');

  const handleReset = () => {
    setInvoices(MOCK_INVOICES);
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedInvoice(null);
    setShowCreateModal(false);
  };

  const getInvoiceItems = (invoiceId: string): InvoiceItem[] => {
    return MOCK_INVOICE_ITEMS.filter(item => item.invoice_id === invoiceId);
  };

  const getInvoicePayments = (invoiceId: string): InvoicePayment[] => {
    return MOCK_INVOICE_PAYMENTS.filter(payment => payment.invoice_id === invoiceId);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCreateInvoice = () => {
    const invoiceNumber = `INV-2025-${String(invoices.length + 1).padStart(3, '0')}`;
    const subtotal = 1041.67;
    const taxAmount = parseFloat(newInvoice.tax_rate) / 100 * subtotal;
    const discountAmount = parseFloat(newInvoice.discount_percentage) / 100 * subtotal;
    const totalAmount = subtotal + taxAmount - discountAmount;

    const invoice: Invoice = {
      id: `invoice-${Date.now()}`,
      invoice_number: invoiceNumber,
      patient_name: newInvoice.patient_name,
      patient_id: newInvoice.patient_id,
      invoice_date: newInvoice.invoice_date,
      due_date: newInvoice.due_date,
      period_start: newInvoice.period_start,
      period_end: newInvoice.period_end,
      total_amount: totalAmount,
      subtotal: subtotal,
      tax_amount: taxAmount,
      tax_rate: parseFloat(newInvoice.tax_rate),
      discount_amount: discountAmount,
      discount_percentage: parseFloat(newInvoice.discount_percentage),
      paid_amount: 0,
      balance_due: totalAmount,
      status: 'draft',
      currency: 'GBP',
      reference_number: newInvoice.reference_number,
      notes: newInvoice.notes
    };

    setInvoices([invoice, ...invoices]);
    setShowCreateModal(false);
    alert(`Invoice ${invoiceNumber} created successfully!`);
  };

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);
    const pendingAmount = invoices
      .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
      .reduce((sum, inv) => sum + inv.balance_due, 0);
    const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;
    
    return {
      totalInvoices,
      totalAmount,
      pendingAmount,
      overdueCount
    };
  }, [invoices]);

  // Filter and search invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      const matchesSearch = searchQuery === '' || 
        invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.patient_name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [invoices, statusFilter, searchQuery]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'sent': return 'Sent';
      case 'paid': return 'Paid';
      case 'overdue': return 'Overdue';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#6B7280';
      case 'sent': return '#3B82F6';
      case 'paid': return '#10B981';
      case 'overdue': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="w-3 h-3" style={{ color: getStatusColor(status) }} />;
      case 'sent':
        return <Mail className="w-3 h-3" style={{ color: getStatusColor(status) }} />;
      case 'paid':
        return <CheckCircle className="w-3 h-3" style={{ color: getStatusColor(status) }} />;
      case 'overdue':
        return <AlertCircle className="w-3 h-3" style={{ color: getStatusColor(status) }} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]">
      <DemoHeader 
        title="Invoice Management" 
        subtitle="CMS Dashboard"
        onReset={handleReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
        tourAnchorId="finance-header"
      />
      <DemoTour
        demoId="finance"
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
              <h2 className="text-lg font-semibold text-slate-900">Invoice Management</h2>
              <p className="text-sm text-slate-600 mt-1">
                {filteredInvoices.length} of {invoices.length} invoices
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{statistics.totalInvoices}</p>
                <p className="text-xs text-slate-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">£{statistics.totalAmount.toFixed(2)}</p>
                <p className="text-xs text-slate-600">Amount</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">£{statistics.pendingAmount.toFixed(2)}</p>
                <p className="text-xs text-slate-600">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{statistics.overdueCount}</p>
                <p className="text-xs text-slate-600">Overdue</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4" data-tour="finance-filters">
            {/* Status Filters */}
            <div className="flex gap-2">
              {['all', 'draft', 'sent', 'paid', 'overdue'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    statusFilter === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All' : getStatusText(status)}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white rounded-lg border border-slate-200 m-6 overflow-hidden" data-tour="finance-table">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">INVOICE #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">PATIENT</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">DATE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">DUE DATE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">AMOUNT</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">STATUS</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => handleViewInvoice(invoice)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {invoice.invoice_number}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-900">{invoice.patient_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-700">{formatDate(invoice.invoice_date)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-700">{formatDate(invoice.due_date)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-slate-900">£{invoice.total_amount.toFixed(2)}</p>
                          {invoice.balance_due > 0 && (
                            <p className="text-xs text-red-600">Due: £{invoice.balance_due.toFixed(2)}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${getStatusColor(invoice.status)}15`,
                            color: getStatusColor(invoice.status)
                          }}
                        >
                          {getStatusIcon(invoice.status)}
                          {getStatusText(invoice.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewInvoice(invoice)}
                            className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                            title="View"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          {invoice.status === 'draft' && (
                            <>
                              <button
                                className="p-1.5 bg-amber-100 text-amber-600 rounded hover:bg-amber-200"
                                title="Edit"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                title="Send"
                              >
                                <Mail className="w-3 h-3" />
                              </button>
                            </>
                          )}
                          <button
                            className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200"
                            title="Download"
                          >
                            <Download className="w-3 h-3" />
                          </button>
                          <button
                            className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="w-12 h-12 text-slate-400" />
                        <p className="text-sm text-slate-600">No invoices found</p>
                        <button 
                          onClick={() => setShowCreateModal(true)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 mt-2"
                        >
                          Create New Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
          onClick={() => setSelectedInvoice(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Invoice Details</h3>
                  <p className="text-sm text-slate-600">{selectedInvoice.invoice_number}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedInvoice.status === 'draft' && (
                  <>
                    <button className="p-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                      <Mail className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Invoice Summary */}
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{selectedInvoice.invoice_number}</p>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mt-2"
                      style={{
                        backgroundColor: `${getStatusColor(selectedInvoice.status)}15`,
                        color: getStatusColor(selectedInvoice.status)
                      }}
                    >
                      {getStatusIcon(selectedInvoice.status)}
                      {getStatusText(selectedInvoice.status)}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">£{selectedInvoice.total_amount.toFixed(2)}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">Patient:</span>
                    <span className="text-slate-900 font-medium">{selectedInvoice.patient_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">Invoice Date:</span>
                    <span className="text-slate-900">{formatDate(selectedInvoice.invoice_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">Due Date:</span>
                    <span className="text-slate-900">{formatDate(selectedInvoice.due_date)}</span>
                  </div>
                  {selectedInvoice.period_start && selectedInvoice.period_end && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Period:</span>
                      <span className="text-slate-900">
                        {formatDate(selectedInvoice.period_start)} - {formatDate(selectedInvoice.period_end)}
                      </span>
                    </div>
                  )}
                  {selectedInvoice.reference_number && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Reference:</span>
                      <span className="text-slate-900">{selectedInvoice.reference_number}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="text-base font-semibold text-slate-900 mb-4">Financial Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="text-slate-900 font-medium">£{(selectedInvoice.subtotal || selectedInvoice.total_amount).toFixed(2)}</span>
                  </div>
                  {selectedInvoice.tax_amount && selectedInvoice.tax_amount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tax ({selectedInvoice.tax_rate}%):</span>
                      <span className="text-slate-900 font-medium">£{selectedInvoice.tax_amount.toFixed(2)}</span>
                    </div>
                  )}
                  {selectedInvoice.discount_amount && selectedInvoice.discount_amount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Discount ({selectedInvoice.discount_percentage}%):</span>
                      <span className="text-red-600 font-medium">-£{selectedInvoice.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-900 font-semibold">Total:</span>
                    <span className="text-slate-900 font-bold">£{selectedInvoice.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Paid:</span>
                    <span className="text-green-600 font-medium">£{(selectedInvoice.paid_amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-900 font-semibold">Balance Due:</span>
                    <span className={`font-bold ${selectedInvoice.balance_due > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      £{selectedInvoice.balance_due.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              {getInvoiceItems(selectedInvoice.id).length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <h4 className="text-base font-semibold text-slate-900 mb-4">Invoice Items</h4>
                  <div className="space-y-3">
                    {getInvoiceItems(selectedInvoice.id).map((item) => (
                      <div key={item.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium text-slate-900">{item.description}</p>
                          <p className="text-sm font-semibold text-slate-900">£{item.line_total.toFixed(2)}</p>
                        </div>
                        <div className="space-y-1 text-xs text-slate-600">
                          <p>{item.quantity} {item.unit_type} × £{item.unit_price.toFixed(2)}</p>
                          {item.visit_date && (
                            <p>Visit: {formatDate(item.visit_date)}</p>
                          )}
                          {item.visit_start_time && item.visit_end_time && (
                            <p>Time: {item.visit_start_time.substring(0, 5)} - {item.visit_end_time.substring(0, 5)} ({item.visit_duration_minutes} mins)</p>
                          )}
                          {item.staff_name && (
                            <p>Staff: {item.staff_name}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments */}
              {getInvoicePayments(selectedInvoice.id).length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <h4 className="text-base font-semibold text-slate-900 mb-4">Payments</h4>
                  <div className="space-y-3">
                    {getInvoicePayments(selectedInvoice.id).map((payment) => (
                      <div key={payment.id} className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-green-600" />
                            <p className="text-sm font-medium text-slate-900 capitalize">
                              {payment.payment_method.replace('_', ' ')}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-green-600">£{payment.payment_amount.toFixed(2)}</p>
                        </div>
                        <div className="space-y-1 text-xs text-slate-600">
                          <p>Date: {formatDate(payment.payment_date)}</p>
                          {payment.reference_number && (
                            <p>Ref: {payment.reference_number}</p>
                          )}
                          {payment.notes && (
                            <p>{payment.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedInvoice.notes && (
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <h4 className="text-base font-semibold text-slate-900 mb-2">Notes</h4>
                  <p className="text-sm text-slate-600">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Create New Invoice</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Patient Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Patient</label>
                <input
                  type="text"
                  value={newInvoice.patient_name}
                  onChange={(e) => setNewInvoice({ ...newInvoice, patient_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Select patient"
                />
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Invoice Date</label>
                  <input
                    type="date"
                    value={newInvoice.invoice_date}
                    onChange={(e) => setNewInvoice({ ...newInvoice, invoice_date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newInvoice.due_date}
                    onChange={(e) => setNewInvoice({ ...newInvoice, due_date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Period Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Period Start</label>
                  <input
                    type="date"
                    value={newInvoice.period_start}
                    onChange={(e) => setNewInvoice({ ...newInvoice, period_start: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Period End</label>
                  <input
                    type="date"
                    value={newInvoice.period_end}
                    onChange={(e) => setNewInvoice({ ...newInvoice, period_end: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Tax and Discount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={newInvoice.tax_rate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, tax_rate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Discount (%)</label>
                  <input
                    type="number"
                    value={newInvoice.discount_percentage}
                    onChange={(e) => setNewInvoice({ ...newInvoice, discount_percentage: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Reference Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reference Number (Optional)</label>
                <input
                  type="text"
                  value={newInvoice.reference_number}
                  onChange={(e) => setNewInvoice({ ...newInvoice, reference_number: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="REF-001"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
