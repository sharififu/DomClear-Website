import React, { useState } from 'react';
import { TextField, TextArea, Select, ListBox, Label, Input } from '@heroui/react';
import { Button } from '../components/Button';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', organisation: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#FAFBFC] flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6f7ff] mb-6">
            <EnvelopeIcon className="w-10 h-10 text-[#1F6FEB]" />
          </div>
          <h1 className="text-4xl font-bold text-[#0F172A] mb-6">Thank you for your message!</h1>
          <p className="text-xl text-[#4B5563] mb-8">
            We've received your inquiry and will get back to you within one business day.
          </p>
          <Button variant="primary" size="md" href="/">
            Return to homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#FAFBFC]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-xs font-bold text-[#1F6FEB] uppercase tracking-wider mb-6 border border-[rgba(20,30,60,0.08)]">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            Ready to transform your agency?
          </h1>
          <p className="text-xl text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
            Have questions about DomiClear? Our team is here to help you find the right solution for your care agency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)]">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Send us a message</h2>

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

              <TextField name="organisation" value={formData.organisation} onChange={(v) => setFormData((d) => ({ ...d, organisation: v }))} fullWidth>
                <Label>Organisation name</Label>
                <Input placeholder="Organisation name" />
              </TextField>

              <Select
                label="Subject"
                name="subject"
                placeholder="Select a subject"
                isRequired
                value={formData.subject || null}
                onChange={(v) => setFormData((d) => ({ ...d, subject: (v as string) || '' }))}
                fullWidth
              >
                <ListBox>
                  <ListBox.Item id="demo" textValue="Request a demo">Request a demo</ListBox.Item>
                  <ListBox.Item id="pricing" textValue="Pricing inquiry">Pricing inquiry</ListBox.Item>
                  <ListBox.Item id="support" textValue="Technical support">Technical support</ListBox.Item>
                  <ListBox.Item id="partnership" textValue="Partnership opportunity">Partnership opportunity</ListBox.Item>
                  <ListBox.Item id="other" textValue="Other">Other</ListBox.Item>
                </ListBox>
              </Select>

              <TextField name="message" value={formData.message} onChange={(v) => setFormData((d) => ({ ...d, message: v }))} isRequired fullWidth>
                <Label>Message</Label>
                <TextArea placeholder="Tell us how we can help..." minRows={4} className="resize-none" />
              </TextField>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send message
              </Button>

              <p className="text-sm text-[#4B5563] text-center">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="text-[#1F6FEB] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)]">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">Contact information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#e6f7ff] flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5 text-[#1F6FEB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Phone</p>
                    <p className="text-[#4B5563]">0800 123 4567</p>
                    <p className="text-sm text-[#4B5563]">Monday–Friday, 9:00–17:00 GMT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#e6f7ff] flex items-center justify-center">
                    <EnvelopeIcon className="w-5 h-5 text-[#1F6FEB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Email</p>
                    <p className="text-[#4B5563]">hello@homecaremana.co.uk</p>
                    <p className="text-sm text-[#4B5563]">We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#e6f7ff] flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 text-[#1F6FEB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Office</p>
                    <p className="text-[#4B5563]">London, United Kingdom</p>
                    <p className="text-sm text-[#4B5563]">Serving agencies across the UK</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1F6FEB] to-[#14B8A6] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Prefer a demo?</h3>
              <p className="text-white/90 mb-4">
                Book a personalised demonstration and see how DomiClear can transform your agency.
              </p>
              <Button 
                variant="secondary" 
                size="md" 
                href={EXTERNAL_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
                className="!bg-white !text-[#1F6FEB] border-0 hover:!bg-white/90"
              >
                Start free trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
