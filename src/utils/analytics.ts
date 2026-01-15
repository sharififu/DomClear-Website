// Lightweight analytics utility for tracking CTA events
// Privacy-friendly: no cookies, no personal data collection

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  constructor() {
    // Only enable analytics in production or when explicitly enabled
    this.isEnabled = process.env.NODE_ENV === 'production' || 
                     localStorage.getItem('analytics-enabled') === 'true';
  }

  track(event: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        url: window.location.pathname,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);

    // Send to analytics service (placeholder for future integration)
    this.sendEvent(analyticsEvent);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', analyticsEvent);
    }
  }

  private sendEvent(event: AnalyticsEvent) {
    // Placeholder for sending to analytics service
    // Could integrate with PostHog, Plausible, or custom endpoint
    try {
      // Example: Send to custom endpoint
      // fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  }

  // CTA tracking methods
  trackDemoRequest(source: string) {
    this.track('demo_request', { source });
  }

  trackPricingView(tier?: string) {
    this.track('pricing_view', { tier });
  }

  trackContactForm(source: string) {
    this.track('contact_form', { source });
  }

  trackFeatureClick(feature: string, source: string) {
    this.track('feature_click', { feature, source });
  }

  trackPageView(page: string) {
    this.track('page_view', { page });
  }

  // Additional tracking methods for sales optimization
  trackPricingTierClick(tier: string, billingPeriod?: string) {
    this.track('pricing_tier_click', { tier, billing_period: billingPeriod });
  }

  trackStartTrialClicked(source: string) {
    this.track('start_trial_clicked', { source });
  }

  trackSignupCompleted(source?: string) {
    this.track('signup_completed', { source });
  }

  trackDemoScenarioStarted(scenario: string, demoId?: string) {
    this.track('demo_scenario_started', { scenario, demo_id: demoId });
  }

  trackDemoTaskCompleted(taskType: 'rota' | 'mar' | 'incident', taskId?: string) {
    this.track(`demo_task_completed_${taskType}`, { task_id: taskId });
  }

  trackInviteCarerSent(source?: string) {
    this.track('invite_carer_sent', { source });
  }

  trackFirstVisitScheduled() {
    this.track('first_visit_scheduled');
  }

  trackFirstMarLogged() {
    this.track('first_mar_logged');
  }

  trackExportClicked(exportType: string, details?: Record<string, any>) {
    this.track('export_clicked', { export_type: exportType, ...details });
  }

  trackUpgradeClicked(fromTier: string, toTier: string) {
    this.track('upgrade_clicked', { from_tier: fromTier, to_tier: toTier });
  }

  trackCheckoutCompleted(tier: string, billingPeriod: string, amount?: number) {
    this.track('checkout_completed', { tier, billing_period: billingPeriod, amount });
  }

  // Funnel tracking helpers
  trackDemoToTrialFunnel(scenario: string) {
    this.trackDemoScenarioStarted(scenario);
    // This will be called when user clicks trial from demo
    // The signup_completed will complete the funnel
  }

  trackTrialActivation(eventType: 'visit_scheduled' | 'mar_logged') {
    if (eventType === 'visit_scheduled') {
      this.trackFirstVisitScheduled();
    } else if (eventType === 'mar_logged') {
      this.trackFirstMarLogged();
    }
  }

  // Enable/disable analytics
  enable() {
    this.isEnabled = true;
    localStorage.setItem('analytics-enabled', 'true');
  }

  disable() {
    this.isEnabled = false;
    localStorage.removeItem('analytics-enabled');
  }

  // Get analytics data (for debugging)
  getEvents() {
    return this.events;
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Export for use in components
export default analytics;
