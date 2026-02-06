import React, { useState, useMemo } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  DollarSign, 
  Eye, 
  RefreshCw, 
  Settings, 
  Search, 
  Download, 
  FileText, 
  Printer,
  ChevronRight,
  X,
  BarChart3,
  ArrowLeft,
  MapPin
} from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, addWeeks, subMonths, addMonths } from 'date-fns';

interface PayrollReport {
  staffId: string;
  staffName: string;
  location?: string;
  contractHours?: number;
  baseRate: number;
  overtimeRate: number;
  nightRate: number;
  weekendRate: number;
  bankHolidayRate: number;
  travelRate: number;
  mileageRate: number;
  wageFrequency: string;
  totalHours: number;
  regularHours: number;
  nightHours: number;
  weekendHours: number;
  bankHolidayHours: number;
  overtimeHours: number;
  payRegular: number;
  payNight: number;
  payWeekend: number;
  payBankHoliday: number;
  payOvertime: number;
  payTravel: number;
  mileage: number;
  mileageReimbursement: number;
  grossPay: number;
  holidayAccrued: number;
  holidayTaken: number;
  holidayBalance: number;
}

const MOCK_PAYROLL_DATA: PayrollReport[] = [
  {
    staffId: 'staff-1',
    staffName: 'Emma Wilson',
    location: 'London',
    contractHours: 40,
    baseRate: 12.50,
    overtimeRate: 18.75,
    nightRate: 15.63,
    weekendRate: 15.63,
    bankHolidayRate: 25.00,
    travelRate: 12.50,
    mileageRate: 0.45,
    wageFrequency: 'weekly',
    totalHours: 42.5,
    regularHours: 35.0,
    nightHours: 4.0,
    weekendHours: 2.5,
    bankHolidayHours: 0,
    overtimeHours: 1.0,
    payRegular: 437.50,
    payNight: 62.50,
    payWeekend: 39.06,
    payBankHoliday: 0,
    payOvertime: 18.75,
    payTravel: 15.00,
    mileage: 25.0,
    mileageReimbursement: 11.25,
    grossPay: 584.06,
    holidayAccrued: 5.13,
    holidayTaken: 0,
    holidayBalance: 5.13
  },
  {
    staffId: 'staff-2',
    staffName: 'James Taylor',
    location: 'Manchester',
    contractHours: 40,
    baseRate: 13.00,
    overtimeRate: 19.50,
    nightRate: 16.25,
    weekendRate: 16.25,
    bankHolidayRate: 26.00,
    travelRate: 13.00,
    mileageRate: 0.45,
    wageFrequency: 'weekly',
    totalHours: 38.0,
    regularHours: 32.0,
    nightHours: 3.0,
    weekendHours: 3.0,
    bankHolidayHours: 0,
    overtimeHours: 0,
    payRegular: 416.00,
    payNight: 48.75,
    payWeekend: 48.75,
    payBankHoliday: 0,
    payOvertime: 0,
    payTravel: 12.00,
    mileage: 20.0,
    mileageReimbursement: 9.00,
    grossPay: 534.50,
    holidayAccrued: 4.59,
    holidayTaken: 0,
    holidayBalance: 4.59
  },
  {
    staffId: 'staff-3',
    staffName: 'Sarah Johnson',
    location: 'Birmingham',
    contractHours: 40,
    baseRate: 12.75,
    overtimeRate: 19.13,
    nightRate: 15.94,
    weekendRate: 15.94,
    bankHolidayRate: 25.50,
    travelRate: 12.75,
    mileageRate: 0.45,
    wageFrequency: 'weekly',
    totalHours: 45.0,
    regularHours: 35.0,
    nightHours: 5.0,
    weekendHours: 3.0,
    bankHolidayHours: 1.0,
    overtimeHours: 1.0,
    payRegular: 446.25,
    payNight: 79.69,
    payWeekend: 47.81,
    payBankHoliday: 25.50,
    payOvertime: 19.13,
    payTravel: 18.00,
    mileage: 30.0,
    mileageReimbursement: 13.50,
    grossPay: 648.88,
    holidayAccrued: 5.43,
    holidayTaken: 0,
    holidayBalance: 5.43
  },
  {
    staffId: 'staff-4',
    staffName: 'Dave Smith',
    location: 'Leeds',
    contractHours: 40,
    baseRate: 12.00,
    overtimeRate: 18.00,
    nightRate: 15.00,
    weekendRate: 15.00,
    bankHolidayRate: 24.00,
    travelRate: 12.00,
    mileageRate: 0.45,
    wageFrequency: 'weekly',
    totalHours: 36.0,
    regularHours: 30.0,
    nightHours: 4.0,
    weekendHours: 2.0,
    bankHolidayHours: 0,
    overtimeHours: 0,
    payRegular: 360.00,
    payNight: 60.00,
    payWeekend: 30.00,
    payBankHoliday: 0,
    payOvertime: 0,
    payTravel: 10.00,
    mileage: 15.0,
    mileageReimbursement: 6.75,
    grossPay: 466.75,
    holidayAccrued: 4.35,
    holidayTaken: 0,
    holidayBalance: 4.35
  }
];

export const PayrollDemo: React.FC = () => {
  const [payrollData, setPayrollData] = useState<PayrollReport[]>(MOCK_PAYROLL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('weekly');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    const now = new Date();
    const start = startOfWeek(now);
    const end = endOfWeek(now);
    return {
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd')
    };
  });
  const [customStartDate, setCustomStartDate] = useState(dateRange.startDate);
  const [customEndDate, setCustomEndDate] = useState(dateRange.endDate);
  const [selectedReport, setSelectedReport] = useState<PayrollReport | null>(null);
  const tour = useDemoTour('payroll');

  const handleReset = () => {
    setPayrollData(MOCK_PAYROLL_DATA);
    setSearchQuery('');
    setSelectedStaff('all');
    setSelectedFrequency('weekly');
    const now = new Date();
    const start = startOfWeek(now);
    const end = endOfWeek(now);
    setDateRange({
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd')
    });
  };

  const updateDateRangeForFrequency = (frequency: string) => {
    const now = new Date();
    let start: Date, end: Date;
    
    switch (frequency) {
      case 'weekly':
        start = startOfWeek(now);
        end = endOfWeek(now);
        break;
      case 'biweekly':
        start = startOfWeek(now);
        end = endOfWeek(addWeeks(now, 1));
        break;
      case 'monthly':
        start = startOfMonth(now);
        end = endOfMonth(now);
        break;
      default:
        start = startOfWeek(now);
        end = endOfWeek(now);
    }
    
    const newRange = {
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd')
    };
    setDateRange(newRange);
    setCustomStartDate(newRange.startDate);
    setCustomEndDate(newRange.endDate);
    setSelectedFrequency(frequency);
  };

  const applyCustomDateRange = () => {
    setDateRange({
      startDate: customStartDate,
      endDate: customEndDate
    });
    setSelectedFrequency('custom');
    setShowDatePicker(false);
  };

  // Filter and search
  const filteredData = useMemo(() => {
    return payrollData.filter(report => {
      const matchesSearch = searchQuery === '' || 
        report.staffName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStaff = selectedStaff === 'all' || report.staffId === selectedStaff;
      return matchesSearch && matchesStaff;
    });
  }, [payrollData, searchQuery, selectedStaff]);

  // Calculate totals
  const totalGrossPay = filteredData.reduce((sum, report) => sum + report.grossPay, 0);
  const totalHours = filteredData.reduce((sum, report) => sum + report.totalHours, 0);
  const avgRate = totalHours > 0 ? totalGrossPay / totalHours : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  const formatDateRange = () => {
    return `${format(new Date(dateRange.startDate), 'MMM dd')} - ${format(new Date(dateRange.endDate), 'MMM dd, yyyy')}`;
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]">
      <DemoHeader 
        title="Payroll Management" 
        subtitle="CMS Dashboard"
        onReset={handleReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
        tourAnchorId="payroll-header"
      />
      <DemoTour
        demoId="payroll"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Compact Header with Quick Stats */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Payroll Management</h2>
                <button
                  onClick={() => setShowDatePicker(true)}
                  className="flex items-center gap-2 mt-1 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{formatDateRange()}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{filteredData.length}</p>
                <p className="text-xs text-slate-600">Staff</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{totalHours.toFixed(1)}h</p>
                <p className="text-xs text-slate-600">Hours</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">£{totalGrossPay.toFixed(2)}</p>
                <p className="text-xs text-slate-600">Gross Pay</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">£{avgRate.toFixed(2)}</p>
                <p className="text-xs text-slate-600">Avg Rate</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-600">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4" data-tour="payroll-filters">
            {/* Frequency Filters */}
            <div className="flex gap-2">
              {['weekly', 'biweekly', 'monthly'].map((frequency) => (
                <button
                  key={frequency}
                  onClick={() => updateDateRangeForFrequency(frequency)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedFrequency === frequency
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {frequency === 'biweekly' ? 'Bi-weekly' : frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                </button>
              ))}
              <button
                onClick={() => setShowDatePicker(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Custom
              </button>
            </div>

            {/* Staff Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Staff</option>
                {payrollData.map((staff) => (
                  <option key={staff.staffId} value={staff.staffId}>
                    {staff.staffName}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-green-100 text-green-600 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-200">
                <FileText className="w-4 h-4" />
                CSV
              </button>
              <button className="px-3 py-2 bg-amber-100 text-amber-600 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-amber-200">
                <Download className="w-4 h-4" />
                Excel
              </button>
              <button className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-200">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Payroll Table */}
        <div className="flex-1 overflow-auto">
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <BarChart3 className="w-12 h-12 text-slate-400 mb-4" />
              <p className="text-lg font-medium text-slate-600">No Payroll Data</p>
              <p className="text-sm text-slate-500">No data for the selected period</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 m-6 overflow-hidden" data-tour="payroll-table">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase w-64">Staff Member</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase w-32">Total Hours</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase w-32">Hourly Rate</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase w-80">Hours Breakdown</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase w-32">Gross Pay</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredData.map((report) => (
                      <tr 
                        key={report.staffId} 
                        className="hover:bg-slate-50 cursor-pointer"
                        onClick={() => setSelectedReport(report)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{report.staffName}</p>
                              <p className="text-xs text-slate-500">{report.location || 'No location'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{report.totalHours.toFixed(1)}h</p>
                            <p className="text-xs text-slate-500 capitalize">
                              {report.wageFrequency === 'biweekly' ? 'Bi-weekly' : report.wageFrequency}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-slate-900">£{report.baseRate.toFixed(2)}/h</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-slate-600">Regular: <span className="font-medium">{report.regularHours.toFixed(1)}h</span></span>
                              <span className="text-amber-600">Night: <span className="font-medium">{report.nightHours.toFixed(1)}h</span></span>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-blue-600">Weekend: <span className="font-medium">{report.weekendHours.toFixed(1)}h</span></span>
                              <span className="text-red-600">Bank Hol: <span className="font-medium">{report.bankHolidayHours.toFixed(1)}h</span></span>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-purple-600">Overtime: <span className="font-medium">{report.overtimeHours.toFixed(1)}h</span></span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-green-600">£{report.grossPay.toFixed(2)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReport(report);
                            }}
                            className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-blue-200"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date Range Picker Modal */}
      {showDatePicker && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
          onClick={() => setShowDatePicker(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Select Date Range</h3>
              <button
                onClick={() => setShowDatePicker(false)}
                className="p-1 hover:bg-slate-100 rounded-sm"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={applyCustomDateRange}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Payroll Detail Modal */}
      {selectedReport && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
          onClick={() => setSelectedReport(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Payroll Details</h3>
                  <p className="text-sm text-slate-600">{formatDateRange()}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 hover:bg-slate-100 rounded-sm"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Staff Information */}
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h4 className="text-base font-semibold text-slate-900">Staff Information</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-slate-900">{selectedReport.staffName}</p>
                  {selectedReport.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedReport.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="w-4 h-4" />
                    <span>Base Rate: £{selectedReport.baseRate.toFixed(2)}/hour</span>
                  </div>
                  {selectedReport.contractHours && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>Contract Hours: {selectedReport.contractHours} hours/week</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Hours Summary */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="text-base font-semibold text-slate-900">Hours Summary</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Total Hours</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedReport.totalHours.toFixed(1)}h</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Regular</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedReport.regularHours.toFixed(1)}h</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Night</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedReport.nightHours.toFixed(1)}h</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Weekend</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedReport.weekendHours.toFixed(1)}h</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Bank Holiday</p>
                    <p className="text-lg font-semibold text-green-600">{selectedReport.bankHolidayHours.toFixed(1)}h</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Overtime</p>
                    <p className="text-lg font-semibold text-red-600">{selectedReport.overtimeHours.toFixed(1)}h</p>
                  </div>
                </div>
              </div>

              {/* Pay Breakdown */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <h4 className="text-base font-semibold text-slate-900">Pay Breakdown</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Regular Pay</span>
                    <span className="text-sm font-medium text-slate-900">£{selectedReport.payRegular.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Night Pay</span>
                    <span className="text-sm font-medium text-slate-900">£{selectedReport.payNight.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Weekend Pay</span>
                    <span className="text-sm font-medium text-slate-900">£{selectedReport.payWeekend.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Bank Holiday Pay (2x)</span>
                    <span className="text-sm font-medium text-green-600">£{selectedReport.payBankHoliday.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Overtime Pay</span>
                    <span className="text-sm font-medium text-red-600">£{selectedReport.payOvertime.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Travel Pay</span>
                    <span className="text-sm font-medium text-slate-900">£{selectedReport.payTravel.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Mileage Reimbursement</span>
                    <span className="text-sm font-medium text-slate-900">£{selectedReport.mileageReimbursement.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t-2 border-slate-300">
                    <span className="text-base font-bold text-slate-900">Gross Pay</span>
                    <span className="text-lg font-bold text-green-600">£{selectedReport.grossPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Holiday Information */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h4 className="text-base font-semibold text-slate-900">Holiday Information</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Holiday Accrued</p>
                    <p className="text-lg font-semibold text-green-600">{selectedReport.holidayAccrued.toFixed(1)}h</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Holiday Taken</p>
                    <p className="text-lg font-semibold text-red-600">{selectedReport.holidayTaken.toFixed(1)}h</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1">Holiday Balance</p>
                    <p className="text-lg font-semibold text-slate-900">{selectedReport.holidayBalance.toFixed(1)}h</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h4 className="text-base font-semibold text-slate-900">Additional Information</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mileage:</span>
                    <span className="text-slate-900 font-medium">{selectedReport.mileage.toFixed(1)} miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mileage Rate:</span>
                    <span className="text-slate-900 font-medium">£{selectedReport.mileageRate.toFixed(2)}/mile</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Wage Frequency:</span>
                    <span className="text-slate-900 font-medium capitalize">
                      {selectedReport.wageFrequency === 'biweekly' ? 'Bi-weekly' : selectedReport.wageFrequency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

