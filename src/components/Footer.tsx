import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { EXTERNAL_SIGNUP_URL, EXTERNAL_LOGIN_URL } from '../constants/links';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="DomiClear Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-xl">DomiClear</span>
            </div>
            <p className="text-white/70 mb-6 max-w-sm">
              The connected homecare platform for UK agencies. Operational clarity, quality compliance, and empowered care teams.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@homecaremana.co.uk"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="/platform#care-planning" className="text-white/70 hover:text-white transition-colors">
                  Care Planning
                </a>
              </li>
              <li>
                <a href="/platform#scheduling" className="text-white/70 hover:text-white transition-colors">
                  Scheduling
                </a>
              </li>
              <li>
                <a href="/platform#carer-app" className="text-white/70 hover:text-white transition-colors">
                  Carer App
                </a>
              </li>
              <li>
                <a href="/platform#compliance" className="text-white/70 hover:text-white transition-colors">
                  Compliance
                </a>
              </li>
              <li>
                <a href="/platform#security" className="text-white/70 hover:text-white transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-white/70 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/about#careers" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/about#press" className="text-white/70 hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="/demos" className="text-white/70 hover:text-white transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href={EXTERNAL_LOGIN_URL} className="text-white/70 hover:text-white transition-colors">
                  Log in
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/dpa" className="text-white/70 hover:text-white transition-colors">
                  Data Processing Addendum
                </a>
              </li>
              <li>
                <a href="/sub-processors" className="text-white/70 hover:text-white transition-colors">
                  Sub-processors
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-white/70 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} DomiClear Ltd. All rights reserved. UK Company Registration pending.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>UK/EU Data Residency</span>
            <span>•</span>
            <span>ISO 27001 Aligned</span>
            <span>•</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
