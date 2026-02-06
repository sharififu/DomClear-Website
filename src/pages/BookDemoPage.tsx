import React, { useState } from 'react';
import { TextField, Label, Input, Select, ListBox } from '@heroui/react';
import { Button } from '../components/Button';
import { Calendar, CheckCircle } from 'lucide-react';

export const BookDemoPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'calendly'>('form');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', organisation: '', role: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Load Calendly script
  React.useEffect(() => {
    if (viewMode === 'calendly') {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [viewMode]);

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#FAFBFC] flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6f7ff] mb-6">
            <CheckCircle className="w-10 h-10 text-[#4370B7]" />
          </div>
          <h1 className="text-4xl font-bold text-[#0F172A] mb-6">Thank you for your interest!</h1>
          <p className="text-xl text-[#4B5563] mb-8">
            We've received your demo request. A member of our team will be in touch within one business day to schedule your personalised demonstration.
          </p>
          <div className="bg-white rounded-2xl p-6 border border-[rgba(20,30,60,0.08)] mb-8">
            <p className="text-[#4B5563] mb-4">
              While you wait, explore our interactive demos to see the platform in action.
            </p>
            <Button variant="primary" size="md" href="/demos">
              View Interactive Demos
            </Button>
          </div>
          <Button variant="ghost" size="md" href="/">
            Return to homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#FAFBFC]" id="top">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-xs font-bold text-[#4370B7] uppercase tracking-wider mb-6 border border-[rgba(20,30,60,0.08)]">
            Book a Demo
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            See DomiClear in action
          </h1>
          <p className="text-xl text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
            Schedule a personalised demo with our team. We'll walk you through the platform, answer your questions, and show you how DomiClear can transform your agency.
          </p>
        </div>

        {/* Toggle between form and Calendly */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full p-1 border border-[rgba(20,30,60,0.08)] shadow-xs">
            <button 
              onClick={() => setViewMode('form')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                viewMode === 'form'
                  ? 'bg-[#4370B7] text-white'
                  : 'text-[#4B5563] hover:text-[#4370B7]'
              }`}
            >
              Request a demo
            </button>
            <button 
              onClick={() => setViewMode('calendly')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                viewMode === 'calendly'
                  ? 'bg-[#4370B7] text-white'
                  : 'text-[#4B5563] hover:text-[#4370B7]'
              }`}
            >
              Pick a time now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
          {/* Form version */}
          <div className={`bg-white rounded-2xl p-8 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)] ${viewMode !== 'form' ? 'hidden' : ''}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2ea0ff] to-[#7c6df0] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A]">Request a demo</h2>
            </div>

            {/* Import starter kit link */}
            <div className="mb-6 p-4 bg-[#FAFBFC] rounded-xl border border-[rgba(20,30,60,0.08)]">
              <a 
                href="#" 
                className="text-[#4370B7] font-semibold text-sm hover:underline inline-flex items-center gap-2"
              >
                Import starter kit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
              <p className="text-xs text-[#4B5563] mt-1">CSV templates for staff, service users, MAR</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField name="firstName" value={formData.firstName} onChange={(v) => setFormData((d) => ({ ...d, firstName: v }))} isRequired fullWidth>
                  <Label>First name</Label>
                  <Input placeholder="First name" />
                </TextField>
                <TextField name="lastName" value={formData.lastName} onChange={(v) => setFormData((d) => ({ ...d, lastName: v }))} isRequired fullWidth>
                  <Label>Last name</Label>
                  <Input placeholder="Last name" />
                </TextField>
              </div>

              <TextField name="email" type="email" value={formData.email} onChange={(v) => setFormData((d) => ({ ...d, email: v }))} isRequired fullWidth>
                <Label>Email address</Label>
                <Input type="email" placeholder="Email address" />
              </TextField>

              <TextField name="phone" type="tel" value={formData.phone} onChange={(v) => setFormData((d) => ({ ...d, phone: v }))} isRequired fullWidth>
                <Label>Phone number</Label>
                <Input type="tel" placeholder="Phone number" />
              </TextField>

              <TextField name="organisation" value={formData.organisation} onChange={(v) => setFormData((d) => ({ ...d, organisation: v }))} isRequired fullWidth>
                <Label>Organisation name</Label>
                <Input placeholder="Organisation name" />
              </TextField>

              <Select
                label="Your role"
                name="role"
                placeholder="Select a role"
                isRequired
                value={formData.role || null}
                onChange={(v) => setFormData((d) => ({ ...d, role: (v as string) || '' }))}
                fullWidth
              >
                <ListBox>
                  <ListBox.Item id="owner" textValue="Agency Owner/Director">Agency Owner/Director</ListBox.Item>
                  <ListBox.Item id="manager" textValue="Care Manager">Care Manager</ListBox.Item>
                  <ListBox.Item id="coordinator" textValue="Care Coordinator">Care Coordinator</ListBox.Item>
                  <ListBox.Item id="operations" textValue="Operations Manager">Operations Manager</ListBox.Item>
                  <ListBox.Item id="other" textValue="Other">Other</ListBox.Item>
                </ListBox>
              </Select>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Submit demo request
              </Button>
            </form>
          </div>

          {/* Calendly embed version */}
          <div className={`bg-white rounded-2xl p-8 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)] ${viewMode !== 'calendly' ? 'hidden' : ''}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2ea0ff] to-[#7c6df0] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A]">Pick a time now</h2>
            </div>
            {/* Calendly inline embed - replace CALENDLY_USERNAME with actual Calendly username */}
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/CALENDLY_USERNAME" 
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)]">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">What to expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e6f7ff] flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-[#4370B7]">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A]">Personalised walkthrough</p>
                    <p className="text-sm text-[#4B5563]">
                      We'll tailor the demo to your agency's size, workflows, and priorities.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e6f7ff] flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-[#4370B7]">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A]">Live Q&A</p>
                    <p className="text-sm text-[#4B5563]">
                      Ask questions, explore features, and discuss your specific needs.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e6f7ff] flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-[#4370B7]">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A]">Next steps</p>
                    <p className="text-sm text-[#4B5563]">
                      We'll provide pricing, implementation timelines, and answer any follow-up questions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F6FEB] to-[#14B8A6] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Prefer to talk now?</h3>
              <p className="text-white/90 mb-4">
                Our team is ready to answer your questions and schedule a demo.
              </p>
              <p className="text-lg font-semibold mb-1">0800 123 4567</p>
              <p className="text-sm text-white/80">Monday–Friday, 9:00–17:00 GMT</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)]">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">Try it yourself</h3>
              <p className="text-[#4B5563] mb-4">
                Explore our interactive demos to experience the platform firsthand. No login required.
              </p>
              <Button variant="primary" size="md" href="/demos" className="w-full">
                View Interactive Demos
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">Migration help</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">
                    We'll import your spreadsheets at no extra cost (Starter+).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">Security</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">
                    UK/EU data residency, audit trails, role-based access.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">Offline mode</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">
                    Carer app syncs when back online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

