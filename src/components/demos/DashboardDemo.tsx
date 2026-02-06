import React, { useState } from 'react';
import { Users, Heart, CheckCircle, MapPin, Calendar, Clock } from 'lucide-react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

interface StaffMember {
  id: string;
  name: string;
  status: 'active' | 'completed';
  visitTime: string;
  clockedIn: string;
  clockedOut?: string;
  location?: string;
  coordinates?: { lat: number; lng: number };
}

// Location coordinates for Derby, UK area (all staff on map use these)
const LOCATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Derby': { lat: 52.9225, lng: -1.4746 },
  'Spondon': { lat: 52.9333, lng: -1.4167 },
  'Borrowash': { lat: 52.9000, lng: -1.3833 },
  'Long Eaton': { lat: 52.8500, lng: -1.2667 },
  'Mickleover': { lat: 52.9167, lng: -1.5500 },
  'Littleover': { lat: 52.9167, lng: -1.5000 },
  'Allestree': { lat: 52.9550, lng: -1.4883 },
  'Chaddesden': { lat: 52.9242, lng: -1.4342 },
  'Oakwood': { lat: 52.9383, lng: -1.5017 },
  'Chellaston': { lat: 52.8683, lng: -1.4350 },
};

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
};

const MAP_CENTER = { lat: 52.92, lng: -1.47 }; // Center of Derby area

const SAMPLE_STAFF: StaffMember[] = [
  { id: '1', name: 'Barbara Walker', status: 'active', visitTime: '15:30', clockedIn: '15:19', location: 'Derby', coordinates: LOCATION_COORDINATES['Derby'] },
  { id: '2', name: 'Charles Evans', status: 'active', visitTime: '08:30', clockedIn: '08:28', location: 'Spondon', coordinates: LOCATION_COORDINATES['Spondon'] },
  { id: '3', name: 'Arthur Clarke', status: 'active', visitTime: '08:30', clockedIn: '08:20', location: 'Borrowash', coordinates: LOCATION_COORDINATES['Borrowash'] },
  { id: '4', name: 'Robert Wilson', status: 'active', visitTime: '08:00', clockedIn: '08:00', location: 'Long Eaton', coordinates: LOCATION_COORDINATES['Long Eaton'] },
  { id: '5', name: 'Margaret Holt', status: 'active', visitTime: '14:00', clockedIn: '13:52', location: 'Allestree', coordinates: LOCATION_COORDINATES['Allestree'] },
  { id: '6', name: 'David Shaw', status: 'active', visitTime: '16:00', clockedIn: '15:58', location: 'Chaddesden', coordinates: LOCATION_COORDINATES['Chaddesden'] },
  { id: '7', name: 'Susan Phillips', status: 'completed', visitTime: '18:00', clockedIn: '17:50', clockedOut: '18:35', location: 'Mickleover', coordinates: LOCATION_COORDINATES['Mickleover'] },
  { id: '8', name: 'Patricia Brown', status: 'completed', visitTime: '09:00', clockedIn: '08:48', clockedOut: '09:39', location: 'Littleover', coordinates: LOCATION_COORDINATES['Littleover'] },
  { id: '9', name: 'James Reid', status: 'completed', visitTime: '10:30', clockedIn: '10:22', clockedOut: '11:05', location: 'Oakwood', coordinates: LOCATION_COORDINATES['Oakwood'] },
  { id: '10', name: 'Linda Foster', status: 'completed', visitTime: '12:00', clockedIn: '11:55', clockedOut: '12:42', location: 'Chellaston', coordinates: LOCATION_COORDINATES['Chellaston'] },
];

export const DashboardDemo: React.FC = () => {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const tour = useDemoTour('dashboard');
  
  const activeStaff = SAMPLE_STAFF.filter(s => s.status === 'active');
  const completedStaff = SAMPLE_STAFF.filter(s => s.status === 'completed');
  const totalActive = activeStaff.length;
  const totalVisits = SAMPLE_STAFF.length;
  const completedToday = completedStaff.length;
  const locationsTracked = new Set(SAMPLE_STAFF.map(s => s.location)).size;

  const handleReset = () => {
    // Reset functionality if needed
  };

  // Google Maps API Key - use environment variable or demo key
  // For production, set VITE_GOOGLE_MAPS_API_KEY in your .env file
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  return (
    <div className="flex flex-col bg-[#F4F6F8] min-h-screen">
      <DemoHeader 
        title="Dashboard" 
        subtitle="CMS Dashboard"
        onReset={handleReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
            label="Guided tour"
          />
        }
        tourAnchorId="dashboard-header"
      />
      <DemoTour
        demoId="dashboard"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      <div className="p-6 space-y-4 flex flex-col">
        {/* Status Indicators - driven by same data as map and sidebar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-[#0F172A]">{totalActive} Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-sm font-medium text-[#0F172A]">0 Unclocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-[#0F172A]">{totalVisits} Today</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4" data-tour="dashboard-metrics">
          <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-[#4370B7]" />
              <span className="text-sm text-[#6b7280]">Staff Working</span>
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">{totalActive}</p>
          </div>
          <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-[#ef4444]" />
              <span className="text-sm text-[#6b7280]">Active Visits</span>
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">{totalVisits}</p>
          </div>
          <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-[#14B8A6]" />
              <span className="text-sm text-[#6b7280]">Completed Today</span>
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">{completedToday}</p>
          </div>
          <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-[#f59e0b]" />
              <span className="text-sm text-[#6b7280]">Locations Tracked</span>
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">{locationsTracked}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Left Column - Staff Activity */}
          <div className="lg:col-span-1 space-y-4 flex flex-col min-h-0">
            {/* Working Today Card */}
            <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#4370B7]" />
                <h3 className="text-base font-semibold text-[#0F172A]">Working Today</h3>
              </div>
              <p className="text-sm text-[#6b7280] mb-4">{totalActive} staff member{totalActive !== 1 ? 's' : ''} active</p>
              <div className="flex justify-center py-8">
                <Users className="w-16 h-16 text-[#9ca3af]" />
              </div>
            </div>

            {/* Pending Absences Card */}
            <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="text-base font-semibold text-[#0F172A]">Pending Absences</h3>
              </div>
              <p className="text-sm text-[#6b7280] mb-4">0 requests pending</p>
              <div className="flex justify-center py-8">
                <Calendar className="w-16 h-16 text-[#9ca3af]" />
              </div>
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4 flex-1 flex flex-col min-h-0" data-tour="dashboard-staff">
              <h3 className="text-base font-semibold text-[#0F172A] mb-4">Staff Activity</h3>
              <div className="flex-1 overflow-y-auto space-y-3">
                {/* Active Staff */}
                {activeStaff.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[#6b7280] uppercase mb-2">Active</h4>
                    <div className="space-y-2">
                      {activeStaff.map((staff) => (
                        <div key={staff.id} className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#0F172A]">{staff.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-[#6b7280]">{staff.visitTime}</span>
                              <span className="text-xs text-[#6b7280]">•</span>
                              <span className="text-xs text-[#6b7280]">Clocked in: {staff.clockedIn}</span>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-sm text-xs font-medium">
                            Active
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Staff */}
                {completedStaff.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-[#6b7280] uppercase mb-2">Completed ({completedStaff.length})</h4>
                    <div className="space-y-2">
                      {completedStaff.map((staff) => (
                        <div key={staff.id} className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#0F172A]">{staff.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-[#6b7280]">{staff.visitTime}</span>
                              <span className="text-xs text-[#6b7280]">•</span>
                              <span className="text-xs text-[#6b7280]">Clocked in: {staff.clockedIn}</span>
                              {staff.clockedOut && (
                                <>
                                  <span className="text-xs text-[#6b7280]">•</span>
                                  <span className="text-xs text-[#6b7280]">Out: {staff.clockedOut}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-sm text-xs font-medium">
                            Done
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-[rgba(20,30,60,0.08)] flex flex-col min-h-0" data-tour="dashboard-map">
            <div className="px-3 py-2 border-b border-[rgba(20,30,60,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setMapType('roadmap')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-medium ${
                      mapType === 'roadmap'
                        ? 'bg-[#4370B7] text-white'
                        : 'bg-[#f8fafc] text-[#6b7280] hover:bg-[#e5e7eb]'
                    }`}
                  >
                    Map
                  </button>
                  <button 
                    onClick={() => setMapType('satellite')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-medium ${
                      mapType === 'satellite'
                        ? 'bg-[#4370B7] text-white'
                        : 'bg-[#f8fafc] text-[#6b7280] hover:bg-[#e5e7eb]'
                    }`}
                  >
                    Satellite
                  </button>
                </div>
                <button className="p-1.5 hover:bg-[#f8fafc] rounded-sm">
                  <Clock className="w-3.5 h-3.5 text-[#6b7280]" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative bg-[#f8fafc] overflow-hidden">
              {googleMapsApiKey ? (
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                  <GoogleMap
                    mapContainerStyle={MAP_CONTAINER_STYLE}
                    center={MAP_CENTER}
                    zoom={11}
                    options={{
                      mapTypeId: mapType,
                      minZoom: 10,
                      maxZoom: 18,
                      styles: [
                        {
                          featureType: 'poi',
                          elementType: 'labels',
                          stylers: [{ visibility: 'off' }]
                        }
                      ],
                      disableDefaultUI: false,
                      zoomControl: true,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: true,
                    }}
                  >
                  </GoogleMap>
                </LoadScript>
              ) : (
                <div className="w-full h-full bg-[#f0f4f8] flex items-center justify-center">
                  <img 
                    src="/demo-media/demo-schedule-rota-planning.png" 
                    alt="Map view of scheduled visits"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

